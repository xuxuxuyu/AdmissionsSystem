<template>
    <!-- 许可证管理设置 -->
    <div class="page-LicenseManagement">
      <div class="page-container">
        <!-- 操作框 -->
        <div class="page-operation-box clearfix">
          <div class="pull-left">
            <el-upload
              name="licFile"
              class="el-button upload"
              accept=".lic"
              :show-file-list="false"
              ref="upload"
              icon="icon iconfont icondaoru"
              :action=uploadUrl
              :auto-upload="true"
              :on-success="reloadHTML">
              <el-button slot="trigger"icon="icon" type="primary" v-if="btn.add">导入许可证</el-button>
            </el-upload>
            <el-button
              icon="icon"
              type="primary"
              @click="setCurrentLicense()" v-if="btn.update">设置为当前许可证
            </el-button>
            <el-button type="primary" icon="icon iconfont iconshanchu" :disabled="deleteBatchBtnDisabled"
            @click="deleteLicense('id')" v-if="btn.del">删除</el-button>
          </div>
        </div>
        <!-- 列表 -->
        <div class="app-page-box-table big-height">
          <el-table
            border
            stripe
            tooltip-effect="dark"
            ref="tableElement"
            :data="tableData"
            height="100%"
            highlight-current-row
            @sort-change="handleSortChange"
            @selection-change="handleSelectionChange"
            @row-dblclick="doubleClickTableRow">
            <el-table-column align="center" type="selection" width="40"></el-table-column>
            <el-table-column fixed label="序号" align="center" type="index" width="50"></el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="xkzwjmc"
              label="许可证文件名称"
              align="center"
              min-width="100">
              <template slot-scope="scope">{{ scope.row.xkzwjmc }}</template>
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="xkzyxlx"
              label="许可证有效类型"
              align="center"
              min-width="100">
              <template slot-scope="scope">{{ scope.row.xkzyxlx }}</template>
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="xkzyxsj"
              label="许可证有效时间"
              align="center"
              min-width="100">
              <template slot-scope="scope">{{ scope.row.xkzyxsj }}</template>
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="sfwdqsydxkz"
              label="是否为当前使用的许可证"
              align="center"
              min-width="100">
              <template slot-scope="scope">{{ scope.row.sfwdqsydxkz }}</template>
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="drsj"
              label="导入时间"
              align="center"
              min-width="100">
              <template slot-scope="scope">{{ scope.row.drsj }}</template>
            </el-table-column>
          </el-table>
        </div>
        <!--分页-->
        <div class="page-pagination">
          <div class="page-show-disable">
            <el-checkbox v-model="showColumnDisable" @change="search">显示全部数据</el-checkbox>
          </div>
          <el-pagination
            :total="total"
            :page-size="pageSize"
            :page-sizes="pageSizes"
            :current-page="currentPage"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            layout="total, sizes, prev, pager, next, jumper"
          ></el-pagination>
        </div>
      </div>
    </div>
</template>
<script>
  import table from "@/mixin/table.vue";
  let project = process.env.NODE_ENV === 'production' ? '/StudentWork' : '/SW';
  export default {
    name:"LicenseManagement",
    mixins: [table],
    data(){
      return {
        tableData:[],
        uploadUrl: project + "/licenseManager/uploadLicFile.action",
        requestSuffix:{
          select:'/licenseManager/getLicenseManagersByPage.action',
        },
        selectConfig: {
          // 表格的通用请求
          table: {
            order: [
            ],
            fuzzy: [

            ],
            where: [
            ]
          }
        },
        btn:{}
      }
    },
    methods:{
      search() {
        this.currentPage = 1;
        // this.getList();
      },
      getList(){
        this.$post('/licenseManager/getLicenseManagersByPage.action',{
          loadingEl: this.$refs.tableElement,
          data:{
            pageNum: 1,
            pageCnt: 10
          }
        }).then(data=>{
          let dtos = data.dtos;
          var dataArry = [];
          for (var i = 0; i < dtos.length; i++) {
            let dto = dtos[i];
            var item = {
              id: dto.id,
              xkzwjmc: dto.xkzwjmc,
              xkzyxlx: dto.xkzxzlx == 1 ? "永久有效" : "截至时间有效",
              xkzyxlxValue: dto.xkzxzlx,
              xkzyxsjValue: dto.xkzxzsj,
              xkzyxsj: dto.xkzxzlx == 1 ? "" : dto.xkzxzsj,
              sfwdqsydxkzValue: dto.sfdqxkz,
              sfwdqsydxkz: dto.sfdqxkz ? '是' : '否',
              drsj: dto.drsj ? new Date(dto.drsj).toLocaleString() : '',
            }
            dataArry.push(item);
          }
          this.tableData = dataArry;
        })
      },
      // 导入许可证
      importLicense(){},
      // 设置为当前许可证
      setCurrentLicense(){
        if (this.multipleSelection.length != 1 ) {
          return;
        }
        this.$post('/licenseManager/setCurrentLicenseManager.action',{
          loadingEl: this.$refs.tableElement,
          data:{
            id: this.multipleSelection[0].id
          }
        }).then(data=>{
          this.getList();
        })
      },
      deleteLicense() {
        if (this.multipleSelection.length == 0) {
          return;
        }
        this.$confirm("是否确认删除?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(() => {
          var ids = [];
          for (var i = 0; i < this.multipleSelection.length; i++) {
            ids.push(this.multipleSelection[i].id);
          }
          this.$post('/licenseManager/deleteLicenseManagerByIds.action',{
            loadingEl: this.$refs.tableElement,
            data:{
              baseIds: ids
            }
          }).then(data=>{
            this.getList();
          });
        }).catch(() => {
          this.$message({type: "info", message: "已取消删除"});
        });
      },
      reloadHTML(a,b){
        console.log(a)
        console.log(b)
        console.log("上传成功");
        // window.location.reload()
        this.getList()
      },
      async getBtns(){
        await this.$post('/qxdj/getBtns.action',{
          loadingEl:'all',
          data:{
            dto:{
              jsId:this.USER_INFO.userId,
              mljd:this.$route.name
            }
          }
        }).then(data=>{
          if(data.dtoList != null){
            data.dtoList.forEach(item=>{
            this.$set(this.btn,[item.gnjd],true)
          })
          }
        })
      },
    },
    mounted(){
      this.getList()
      this.getBtns()
    }
  }
</script>
<style>
  .page-LicenseManagement{
    text-align: left;
    position: relative;
  }
  .upload{
    padding: 0;
    margin: 0;
    border: none;
    background:#fff !important;
  }
</style>