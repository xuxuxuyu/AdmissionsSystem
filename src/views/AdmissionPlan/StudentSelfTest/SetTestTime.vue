<!-- 设置考试场次 -->
<template>
	<div class="page-SetTestTime">
		<div class="page-container">
			<!-- 操作框 -->
			<div class="page-operation-box clearfix">
        <div class="pull-left">
          <!-- 查询条件 -->
          <div class="cascade-select">
            <el-form :inline="true" class="demo-form-inline">
              <el-form-item label="招生计划:">
                <el-select v-model="id" placeholder="请选择" @change="handlechange">
                  <el-option
                    v-for="item in optionsYear"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-form>
          </div>
          <el-button
            type="primary"
            icon="icon iconfont icon-add"
            @click="openDialog('add')"
            v-if="btn.add">新增
          </el-button>
          <el-button
            type="primary"
            icon="icon iconfont iconshanchu"
            :disabled="deleteBatchBtnDisabled"
            @click='del()'
            v-if="btn.del">删除
          </el-button>
          <el-button
            type="primary"
            icon="icon iconfont icon-update"
            :disabled="deleteBatchBtnDisabled"
            @click = "openDialog('update')"
            v-if="btn.update">修改
          </el-button>
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
            prop="ccbh"
            label="场次编号"
            align="center"
            min-width="100">
            <template slot-scope="scope">{{ scope.row.ccbh }}</template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="startTime"
            label="开始时间"
            align="center"
            min-width="100">
            <template slot-scope="scope"> {{ scope.row.startTime }} </template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="endTime"
            label="结束时间"
            align="center"
            min-width="100">
            <template slot-scope="scope"> {{ scope.row.endTime }}</template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="kmmc"
            label="科目名称"
            align="center"
            min-width="100">
            <template slot-scope="scope"> {{ scope.row.kmmc }} </template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="fsx"
            label="分数线"
            align="center"
            min-width="100">
            <template slot-scope="scope"> {{ scope.row.fsx }} </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 新增场次dialog -->
      <el-dialog
        ref="editDialog"
        class="edit-dialog page-ClassInfo-dialog"
        width="25%"
        append-to-body
        title="新增场次"
        :visible.sync="editDialogVisible">
        <el-form
          status-icon
          label-width="105px"
          :model="editForm"
          class="form-clear-bottom"
          :rules="editFormRules"
          ref="editForm">
          <el-form-item label="开始时间" prop="startTime">
            <el-date-picker
              style="width: 100%"
              v-model="editForm.startTime"
              type="datetime"
              placeholder="选择开始时间">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="结束时间" prop="endTime">
            <el-date-picker
              style="width: 100%"
              v-model="editForm.endTime"
              type="datetime"
              placeholder="选择结束时间">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="科目名称" prop="kmmc">
            <el-select v-model="editForm.kmmc" placeholder="请选择" @change="getKSXS" style="width: 100%">
              <el-option
                v-for="item in km"
                :key="item.id"
                :label="item.kmmc"
                :value="item.kmmc">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="分数线" prop="fsx">
            <el-input v-model="editForm.fsx" placeholder="请输入分数线">
            </el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button
            ref="btnEditFormSave"
            type="primary"
            size="medium"
            class="app-dialog-btn app-confirm" @click="saveForm()">确认</el-button>
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
		name:'SetTestTime',
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
        km:[],
        editForm:{},
        editFormRules:{
          startTime:[{ required: true, message: "请选择开始时间", trigger: "blur" }],
          endTime:[{ required: true, message: "请选择结束时间", trigger: "blur" }],
          kmmc:[{ required: true, message: "请选择科目名称", trigger: "blur" }],
          fsx:[{ required: true, message: "请输入分数线", trigger: "blur" }]
        },
        editDialogVisible:false,
        editDialogType:'',
        btn:{},
        optionsYear:[],
        id:'',
        KSXS:''
			}
		},
		methods:{
      // 搜索
      search() {
        this.currentPage = 1;
      },
      getKSXS(cur){
        this.km.forEach(item=>{
          if(item.kmmc == cur){
            this.KSXS = item.ksxs
          }
        })
      },
			// 搜索
      search() {
        this.currentPage = 1;
      },
      // 新增考试场次
      addTime(){
        this.handelEditForm()
        console.log(this.editForm);
        this.$post('/ccsz/insert.action',{
          data:{
            dto:this.editForm
          }
        }).then(data=>{
          if(data.succsess != 1){
            this.$message({type: "error", message: data.msg});
            return 
          }
          this.$message({type: "success", message: data.msg});
          this.getList()
          this.editDialogVisible = false
        })
      },
      // 处理editForm参数
      handelEditForm(){
        this.editForm.examDateId = this.id
        let startTime = new Date(this.editForm.startTime)
        let endTime = new Date(this.editForm.endTime)
        this.editForm.startTime = startTime.getTime()
        this.editForm.endTime = endTime.getTime()
        this.km.forEach(item=>{
          if(item.kmmc == this.editForm.kmmc){
            this.editForm.kmId = item.id
          }
        })
      },
      // 获取列表
      getList(){
        this.$post('/ccsz/getList.action',{
          data:{
            dto:{examDateId:this.id,flag:1}
          }
        }).then(data=>{
          if(data.succsess < 0 ){
            this.$message({type: "error", message: data.msg});
            return 
          }
          this.tableData = data.dtoList
        })
      },
      // 获取科目列表
      getSubjectList(){
        let info = []
        if(this.tableData){
          info = this.tableData.map(d => d.kmId)
        }
        this.$post('/kmdj/getList.action',{
          loadingEl:this.$refs.tableElement,
          data:{
            dto:{
              flag:2,
              examDateId:this.id,
              info:info.join()
            }
          }
        }).then(data=>{
          if(data.succsess < 0){
            this.$message({type: "error", message: data.msg});
            return 
          }
          this.km = data.dtoList
        })
      },
      // 修改考试场次
      update(){ 
        this.handelEditForm()
        this.$post('/ccsz/update.action',{
          data:{
            dto:this.editForm
          }
        }).then(data=>{
          if(data.succsess != 1){
            this.$message({type: "error", message: data.msg});
            return 
          }
          this.$message({type: "success", message: data.msg});
          this.getList()
          this.editDialogVisible = false
        })
      },
      // 删除考试场次
      del(){
        this.$confirm("是否确认删除?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(()=>{
          let ids = this.multipleSelection.map(item => item.id)
          this.$post("/ccsz/delete.action",{
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
                message: '删除失败',
                type: "error"
              });
            }
          })
        })
        .catch(() => {
            this.$message({type: "info", message: "已取消删除"});
          });
      },
      openDialog(type){
        this.getSubjectList()
        this.editDialogType = type;
        if(type == 'update'){
          if (this.multipleSelection.length != 1) {
            this.$message({
              message: "请选择数据，有且只能选择一条",
              type: "warning"
            });
            return;
          }
          this.editForm = this.multipleSelection[0]
        }else{
          this.editForm = {}
        }
        this.editDialogVisible = true
      },
      // 保存editform
      saveForm(){
        console.log(this.editForm);
        this.$refs["editForm"].validate(async valid => {
          if (!valid) {
            return;
          }
          let start = new Date(this.editForm.startTime).getTime()
          let end = new Date(this.editForm.endTime).getTime()
          if(end < start){
            this.$message({
              message: "开始时间不能大于结束时间，请重新设置",
              type: "error"
            });
            return
          }
          let data = []
          // 拿到考试形式一样的数据
          if(this.tableData != null){
            let tableData = JSON.parse(JSON.stringify(this.tableData))
            tableData.forEach(item=>{
              if(item.ksxs == this.KSXS){
                data.push(item)
              }
            })
          }
          if(data != []){
            for(let i = 0;i < data.length; i++){
              if(start <= new Date(data[i].endTime).getTime()){
                this.$message({message: "当前时间与已有时间冲突，请重新设置",type: "error"});
              }
              return
            }
          }
          // console.log(data);
          // 对比时间
          if (this.editDialogType === "add") {
            await this.addTime()
          } else if (this.editDialogType === "update") {
            await this.update();
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
            // this.btn[item.gnjd] = true
            this.$set(this.btn,[item.gnjd],true)
          })
          }
        })
      },
      getYears(){
        this.$post('/examDate/getList.action',{
          loadingEl: this.$refs.tableElement,
          data:{
            dto:{}
          }
        }).then(data=>{
          if(data.succsess == 1){
            this.optionsYear = []
            data.list.forEach(item=>{
              if(item.dqbj == 1){
                this.id = item.id
                this.getList()
              }
              this.optionsYear.push(item)
            })
          }else{
            this.$message({message: data.msg, type: "error"});
          }
        })
      },
      handlechange(){
        this.getList()
      },
      load(){
        // this.getList()
        // this.getSubjectList()
        this.getYears()
      }
		},
		mounted(){
      this.load()
      this.getBtns()
    }
	}
</script>
<style>
  .page-SetTestTime{
    position: relative;
  }
</style>