<!-- 查询 -->
<template>
	<div class="page-SelfAdmissionQuery">
		<el-tabs class="tabsCard" type="border-card" v-model="activeName" @tab-click="handleClick">
			<el-tab-pane label="成绩查询" name="first">
				<el-form ref="scoreForm" :model="scoreForm" :rules="scoreFormRules">
          <el-form-item prop="ksh" label="考生号:">
            <el-input v-model="scoreForm.ksh" placeholder="请输入考生号" clearable></el-input>
          </el-form-item>
          <!-- <el-form-item prop="sfzh" label="身份证号:">
            <el-input v-model="scoreForm.zjhm" placeholder="请输入身份证号" clearable></el-input>
          </el-form-item> -->
        </el-form>
        <el-button type="primary" @click="getScore()">查询</el-button>
			</el-tab-pane>
	    <el-tab-pane label="录取查询" name="second">
	    	<el-form ref="adminForm" :model="adminForm" :rules="adminFormRules">
          <el-form-item prop="ksh" label="考生号:">
            <el-input v-model="adminForm.ksh" placeholder="请输入考生号" clearable></el-input>
          </el-form-item>
          <el-form-item prop="sfzh" label="身份证号:">
            <el-input v-model="adminForm.zjhm" placeholder="请输入身份证号" clearable></el-input>
          </el-form-item>
        </el-form>
        <el-button type="primary">查询</el-button>
	    </el-tab-pane>
	  </el-tabs>
    <!-- 显示成绩dialog -->
    <el-dialog
        ref="editDialog"
        class="edit-dialog page-ClassInfo-dialog"
        width="50%"
        append-to-body
        title="您的成绩如下"
        :visible.sync="editDialogVisible">
        <!-- 列表 -->
      <div class="app-page-box-table big-height">
        <div style="color: red;margin-bottom: 10px;">若查询到的成绩为零不要紧张，可能代表老师还未给出成绩，可过段时间再重试</div>
        <el-table
          border
          stripe
          tooltip-effect="dark"
          ref="tableElement"
          :data="tableData"
          highlight-current-row>
          <el-table-column
            show-overflow-tooltip
            prop="ksh"
            label="考生号"
            align="center"
            min-width="100">
            <template slot-scope="scope">{{ scope.row.ksh }}</template>
          </el-table-column>  
          <el-table-column
            show-overflow-tooltip
            prop="xm"
            label="姓名"
            align="center"
            min-width="100">
            <template slot-scope="scope">{{ scope.row.xm }}</template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="zjhm"
            label="身份证号码"
            align="center"
            min-width="100">
            <template slot-scope="scope">{{ scope.row.zjhm }}</template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            label="考生分数"
            align="center"
            min-width="100">
            <template slot-scope="scope">
              <span v-if="scope.row.ksxs == 1">{{ scope.row.cj1 }}</span>
              <span v-if="scope.row.ksxs == 2">{{ scope.row.cj2 }}</span>
              <span v-if="scope.row.ksxs == 3">{{ scope.row.cj3 }}</span>
            </template>
          </el-table-column> 
        </el-table>
      </div>
        <span slot="footer" class="dialog-footer">
          <el-button
            ref="btnEditFormSave"
            type="primary"
            size="medium"
            class="app-dialog-btn app-confirm" @click="editDialogVisible = false">确认</el-button>
        </span>
      </el-dialog>
	</div>
</template>
<script>
	export default {
		data(){
			return {
				activeName:'first',
				scoreForm:{
					ksh:'',
					zjhm:''
				},
				adminForm:{
					ksh:'',
					zjhm:''
				},
				scoreFormRules:{},
				adminFormRules:{},
        editDialogVisible:false,
        tableData:[]
			}
		},
		methods:{
			handleClick(tab, event) {
        console.log(tab, event);
      },
      getScore(){
        this.$post('/studentsRegister/getList.action',{
          loadingEl:'all',
          data:{
            dto:{
              ksh:this.scoreForm.ksh
            }
          }
        }).then(data=>{
          if(data.succsess == 1){
            this.editDialogVisible = true
            this.tableData = data.dtoList
            return
          }
          this.$message({message: "考生号有误，请重新输入", type: "error"});
          this.scoreForm.ksh = ''
           
          
        })
        // this.editDialogVisible = true
      }
		}
	}
</script>
<style>
	.page-SelfAdmissionQuery{
		width: 100%;
		height: 100%;
		position: relative;
	}
	.page-SelfAdmissionQuery .tabsCard{
		width: 70%;
		height: 60%;
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%,-50%);
	}
	.page-SelfAdmissionQuery .el-form{
		margin-top: 10%;
	}
	.page-SelfAdmissionQuery .tabsCard .el-input{
		width: 300px;
	}
	.page-SelfAdmissionQuery .el-form-item__label{
	width: 80px;
}
</style>