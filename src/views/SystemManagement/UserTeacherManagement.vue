<template>
    <!-- 教师用户管理 -->
    <div class="page-UserTeacherManagement">
      <div class="page-container">
        <!-- 操作框 -->
        <div class="page-operation-box clearfix">
          <div class="pull-left">
            <!-- 查询条件 -->
            <div class="cascade-select">
              <el-form :inline="true" :model="dataBase" class="demo-form-inline">
                <el-form-item class="lab" label="教师姓名/一卡通号:">
                  <el-input v-model="dataBase.name" size="small"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="getSearchList()" size="small">查询</el-button>
                </el-form-item>
              </el-form>
            </div>
          </div>
          <div class="pull-right">
            <el-button
              type="primary"
              icon="icon iconfont icon-add"
              @click="add()"
              v-if="btn.add">生成用户账号
            </el-button>
            <el-button
              type="primary"
              icon="icon iconfont iconpiliangxiugai"
              @click="reset()" :disabled="deleteBatchBtnDisabled"
              v-if="btn.update">重置用户密码
            </el-button>
            <el-button 
              type="primary" 
              icon="icon iconfont iconshanchu" 
              @click="del()" 
              :disabled="deleteBatchBtnDisabled"
              v-if="btn.del">删除
            </el-button>
          </div>
        </div>
        <!-- 列表 -->
        <div class="app-page-box-table big-height">
          <el-table
            border
            tooltip-effect="dark"
            ref="tableElement"
            :data="tableData"
            height="100%"
            highlight-current-row
            @sort-change="handleSortChange"
            @selection-change="handleSelectionChange">
            <el-table-column align="center" type="selection" width="40"></el-table-column>
            <el-table-column fixed label="序号" align="center" type="index" width="50"></el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="zgh"
              label="教职工编号"
              align="center"
              min-width="100">
              <template slot-scope="scope">{{ scope.row.zgh }}</template>
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="roleName"
              label="教师姓名"
              align="center"
              min-width="100">
              <template slot-scope="scope">{{ scope.row.roleName }}</template>
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="xb"
              label="性别"
              align="center"
              min-width="100">
              <template slot-scope="scope">{{ scope.row.xb }}</template>
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="ssbm"
              label="所属部门"
              align="center"
              min-width="100">
              <template slot-scope="scope">{{ scope.row.ssbm }}</template>
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="loginName"
              label="用户名"
              align="center"
              min-width="100">
              <template slot-scope="scope">{{ scope.row.loginName }}</template>
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
  export default {
    name:"UserTeacherManagement",
    mixins: [table],
    data(){
      return {
        requestSuffix:{
          
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
        dataBase:{
          name:'',
        },
        tableData:[],
        btn:{}
      }
    },
    methods:{
      search() {
        this.currentPage = 1;
        // this.getList();
      },
      // 搜索
      getSearchList(){
        this.$post('/user/getList.action',{
          loadingEl:this.$refs.tableElement,
          data:{
            dto:{
              roleState:"1"
            },
            state:'1',
            info:this.dataBase.name
          }
        }).then(data=>{
          if(data.succsess == 1){
            this.tableData = data.list
          }
        })
      },
      // 生成用户账号
      add(){
        let id = this.multipleSelection.map(d=>d.id)
        this.$post('/user/insert.action',{
          loadingEl:this.$refs.tableElement,
          data:{
            ids:id.join(),
            state:'1'
          }
        }).then(data=>{
          if(data.succsess == 1){
            this.$message({type: "success", message: "已成功生成用户帐号"});
            this.getList()
          }
          
        })
      },
      // 重置用户密码
      reset(){
        let id = this.multipleSelection.map(d=>d.id)
        this.$post('/user/reset.action',{
          loadingEl:this.$refs.tableElement,
          data:{
            ids:id.join(),
            state:'1'
          }
        }).then(data=>{
          if(data.succsess == 1){
            this.$message({type: "success", message: "重置成功"})
            this.getList()
          }else{
            this.$message({type: "error", message: "重置失败"})
          }
        })
      },
      // 删除
      del(){
        this.$confirm("是否确认删除?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(() => {
          let id = this.multipleSelection.map(d=>d.id)
          this.$post('/user/delete.action',{
            loadingEl:this.$refs.tableElement,
            data:{
              ids:id.join(),
              state:'1'
            }
          }).then(data=>{
            if(data.succsess == 1){
              this.$message({type: "success", message: "删除成功"});
              this.getList()
            }else{
              this.$message({type: "error", message: "删除失败"});
            }  
          })
        }).catch(() => {
            this.$message({type: "info", message: "已取消删除"});
          });
      },
      getList(){
        this.$post('/user/getList.action',{
          loadingEl:this.$refs.tableElement,
          data:{
            dto:{
              roleState:"1"
            },
            state:'1'
          }
        }).then(data=>{
          if(data.succsess == 1){
            this.tableData = data.list
          }
        })
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
  .page-UserTeacherManagement{
    position: relative;
    text-align: left;
    height: 96%;
  }
  .page-UserTeacherManagement .cascade-select .el-form-item__label{
    width: 140px;
  }
</style>