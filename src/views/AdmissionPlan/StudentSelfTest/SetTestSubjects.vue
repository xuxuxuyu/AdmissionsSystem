<!-- 设置考试科目 -->
<template>
	<div class="page-SetTestSubjects">
		<div class="page-container">
			<!-- 操作框 -->
			<div class="page-operation-box clearfix">
        <div class="pull-left">
        	<el-button
            type="primary"
            icon="icon iconfont icon-add"
            @click="openDialog('insert')"
            v-if="btn.add">新增
          </el-button>
          <el-button
            type="primary"
            icon="icon iconfont icon-piliangxiugai"
            @click="openDialog('update')"
            :disabled="updateBatchBtnDisabled">修改
          </el-button>
          <el-button
            type="primary"
            icon="icon iconfont iconshanchu"
            :disabled="deleteBatchBtnDisabled"
            @click='del()'
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
          @selection-change="handleSelectionChange"
          @row-dblclick="doubleClickTableRow">
          <el-table-column align="center" type="selection" width="40"></el-table-column>
          <el-table-column fixed label="序号" align="center" type="index" width="50"></el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="kmmc"
            label="科目名称"
            align="center"
            min-width="100">
            <template slot-scope="scope">
              <span v-if="scope.row.fId == null || scope.row.fId == ''">{{ scope.row.kmmc }}</span>
            </template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="kmmcX"
            label="小科目名称"
            align="center"
            min-width="100">
            <template slot-scope="scope">{{ scope.row.kmmcX }}</template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="lskm"
            label="隶属科目"
            align="center"
            min-width="100">
            <template slot-scope="scope">{{ scope.row.lskm }}</template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="ksxszs"
            label="考试形式"
            align="center"
            min-width="100">
            <template slot-scope="scope">{{ scope.row.ksxszs }}</template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 新增科目dialog -->
      <el-dialog
        ref="editDialog"
        class="edit-dialog page-ClassInfo-dialog"
        width="30%"
        append-to-body
        title="新增科目"
        :visible.sync="editDialogVisible">
        <el-form
          :model="editForm"
          :rules="editFormRule"
          status-icon
          label-width="80px"
          class="form-clear-bottom"
          ref="addEditForm">
          <el-form-item label="科目名称:">
            <el-input v-model="editForm.kmmc"></el-input>
          </el-form-item>
          <el-form-item label="隶属科目:">
            <el-select style="width: 100%" v-model="editForm.fId" placeholder="请选择" clearable @change="handleChange">
              <el-option
                v-for="item in tableData0"
                :key="item.id"
                :label="item.kmmc"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="考试形式:">
            <el-select style="width: 100%" v-model="editForm.ksxs" placeholder="请选择" clearable :disabled="dic">
              <el-option
                v-for="item in optionsKSXS"
                :key="item.dmbh"
                :label="item.dmmc"
                :value="item.dmbh">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button
            ref="btnEditFormSave"
            type="primary"
            size="medium"
            class="app-dialog-btn app-confirm" @click="addSubject()">确认</el-button>
          <el-button
            size="medium"
            class="app-dialog-btn app-close"
            @click="editDialogVisible = false">关闭</el-button>
        </span>
      </el-dialog>
      <!--分页-->
      <div class="page-pagination">
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
		name:'SetTestSubjects',
		mixins: [table],
    computed: {
      USER_INFO() {
        return this.$store.getters.USER_INFO
      }
    },
		data(){
			return {
				tableData:[],
				requestSuffix:{},
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
        editDialogVisible:false,
        btn:{},
        editForm:{},
        editFormRule:{
          kmmc:[{required: true, message: "请输入科目名称"}],
          ksxs:[{required: true, message: "请选择考试形式"}]
        },
        optionsKSXS:[],
        dic:false,
        tableData0:[]
			}
		},
		methods:{
			// 搜索
      search() {
        this.currentPage = 1;
      },
      // 获取列表
      async getList(){
        await this.getKSXS()
        this.$post('/kmdj/getList.action',{
          loadingEl:this.$refs.tableElement,
          data:{
            dto:{}
          }
        }).then(data=>{
          if(data.succsess != 1){
            this.$message({type: "error", message: data.msg});
            return 
          }
          this.handleTableData(data.dtoList)
        })
      },
      // 删除科目
      del(){
        this.$confirm("是否确认删除?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(()=>{
          let ids = this.multipleSelection.map(item => item.id)
          this.$post("/kmdj/delete.action",{
            data:{
              dto:{
                id:ids.join()
              }
            }
          }).then(data=>{
            if(data.succsess==1){
              this.$message({
                message: "删除成功",
                type: "success"
              });
              this.getList()
            }else{
              this.$message({
                showClose: true,
                message: data.msg,
                type: "error"
              });
            }
          })
        })
        .catch(() => {
            this.$message({type: "info", message: "已取消删除"});
          });
      },
      // 新增科目
      addSubject(){
        this.$refs["addEditForm"].validate(async valid => {
          if (!valid) {
            return false;
          }
          this.$post('/kmdj/'+this.type+'.action',{
            data:{
              dto:this.editForm
            }
          }).then(data=>{
            if(data.succsess != 1){
              this.$message({type: "error", message: data.msg});
              return 
            }
            this.editDialogVisible = false
            this.getList()
          })
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
      load(){
        this.getList()
      },
      // 获取考试形式
      async getKSXS(){
        await this.$post('/STCode/getList.action',{
          loadingEl:this.$refs.editDialog,
          data:{
            dmbt:'KSXS',
            sfsyzjd:'1'
          }
        }).then(data=>{
          if(data.succsess){
            this.optionsKSXS = data.list
          }
        })
      },
      handleTableData(data){
        let tableData = []
        data.forEach(item=>{
          this.optionsKSXS.forEach(val=>{
            if(item.ksxs == val.dmbh){
              item.ksxszs = val.dmmc
            }
          })
          if(item.fId){
            item.kmmcX = item.kmmc
          }
        })
        data.forEach(item=>{
          if(item.fId){
            data.forEach(val=>{
              if(item.fId == val.id){
                tableData.push(val)
                tableData.push(item)
              }
            })
          }else{
            tableData.push(item)
          }
        })
        // this.tableData = tableData
        this.tableData = [...new Set(tableData)]
      },
      handleChange(cur){
        if(cur == ''){
          this.dic = false
        }else {
          this.dic = true
          let a = this.tableData.find(item=> item.id == cur)
          this.editForm.ksxs = a.ksxs
        }
      },
      openDialog(type){
        if(type == 'update'){
          this.type = 'update'
          this.editForm = this.multipleSelection[0]
        }else if(type == 'insert'){
          this.editForm = {}
          this.type = 'insert'
        }
        this.editDialogVisible = true;
        this.getKM()
      },
      async getKM(){
        this.tableData0 = []
        await this.getKSXS()
        this.$post('/kmdj/getList.action',{
          loadingEl:this.$refs.tableElement,
          data:{
            dto:{flag:1}
          }
        }).then(data=>{
          if(data.succsess < 0){
            this.$message({type: "error", message: data.msg});
            return 
          }
          data.dtoList.forEach(item=>{
            this.optionsKSXS.forEach(val=>{
              if(item.ksxs == val.dmbh){
                item.ksxszs = val.dmmc
                this.tableData0.push(item)
              }
            })
          })
        })
      }
    },

    mounted(){
      this.getBtns()
      this.load()
    }
	}
</script>
<style>
  .page-SetTestSubjects{
    position: relative;
  }
  .sel{
    position: relative;
    left: 50%;
    transform: translateX(-50%);
  }
</style>