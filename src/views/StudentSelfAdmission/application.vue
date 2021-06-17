<template>
	<div class="page-application">
		<div class="application-from">
			<div class="application-form-title">填写报名信息</div>
			<el-form
        status-icon
        :model="editForm"
        class="form-clear-bottom"
        :rules="editFormRules"
        ref="elForm">
        <el-form-item prop="ksh" label="考生号:">
	        <el-input v-model="editForm.ksh" placeholder="请输入考生号" clearable disabled></el-input>
        </el-form-item>
        <el-form-item prop="xm" label="姓名:">
	        <el-input v-model="editForm.xm" placeholder="请输入姓名" clearable disabled></el-input>
        </el-form-item>
        <el-form-item prop="zjhm" label="身份证号码:">
          <el-input v-model="editForm.zjhm" placeholder="请输入身份证号" clearable disabled></el-input>
        </el-form-item>
        <el-form-item prop="xb" label="性别:">
          <el-input v-model="editForm.xb" clearable disabled></el-input>
        </el-form-item>
        <el-form-item prop="csrq" label="出生日期:">
		      <el-input v-model="editForm.csrq" clearable disabled></el-input>
        </el-form-item>
        <el-form-item prop="mz" label="民族:">
	        <el-select v-model="editForm.mz" placeholder="请选择" class="bigWidth">
            <el-option
              v-for="item in optionMZ"
              :key="item.id"
              :label="item.dmmc"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="zzmm" label="政治面貌:">
	        <el-select v-model="editForm.zzmm" placeholder="请选择" class="bigWidth">
            <el-option
              v-for="item in optionZZMM"
              :key="item.id"
              :label="item.dmmc"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item 
        	v-for="num in 3"  
        	:label="'报考志愿'+num" 
        	:key="'报考志愿'+num" 
        	:prop="'bkzyzy' + num" 
        	:rules="num == 1 ? {required: true, message: '报考志愿不能为空', trigger: 'blur'} : {}">
	        <el-input v-model="editForm['bkzyzy' + num]" placeholder="请选择" clearable disabled>
	        	<el-button slot="append" @click="selectMajor(num)">选择</el-button>
	        </el-input>
        </el-form-item>
        <el-form-item prop="lxfs1" label="联系方式1:">
	        <el-input v-model="editForm.lxfs1" placeholder="请输入联系方式" clearable></el-input>
        </el-form-item>
        <el-form-item prop="lxfs2" label="联系方式2:">
	        <el-input v-model="editForm.lxfs2" placeholder="请输入联系方式" clearable></el-input>
        </el-form-item>
        <el-form-item prop="xxdz" label="详细地址:">
	        <el-input v-model="editForm.xxdz" placeholder="请输入详细地址" clearable></el-input>
        </el-form-item>
        <el-form-item prop="sffctj" label="是否服从调剂:">
	        <el-checkbox class="sffctj" v-model="editForm.sffctj" ></el-checkbox>
        </el-form-item>
      </el-form>
      <div class="application-form-footer">
      	<el-button type="primary" class="save" @click="saveInfo()">保存</el-button>
      </div>
		</div>
		<!-- 选择专业 dialog -->
    <el-dialog
      ref="editDialog"
      class="edit-dialog Department-unit-dialog"
      width="30%"
      append-to-body
      title="选择志愿专业"
      :visible.sync="editDialogVisible">
			<!-- 树 -->
			<appTree ref="appTreeRef" @clickItem="clickItem" :treeData='treeData' :showLine="false" @checkedData="checkedData"></appTree>
      <span slot="footer" class="dialog-footer">
        <el-button
          ref="btnEditFormSave"
          type="primary"
          size="medium"
          class="app-dialog-btn app-confirm"
          @click="saveMajor()"
        >确认</el-button>
        <el-button
          size="medium"
          class="app-dialog-btn app-close"
          @click="editDialogVisible = false"
        >关闭</el-button>
      </span>
    </el-dialog>
	</div>
</template>
<script>
	import appTree from "@/components/app-tree"
	export default {
		name:'application',
		components:{
      appTree
    },
		computed: {
      SELFADMUSER_INFO() {
        return this.$store.getters.SELFADMUSER_INFO
      },
      ShowTree(){
        return this.$store.getters.SHOW_TREE
      }
    },
		data(){
			return {
				editForm:{
				},
				editFormRules:{
          mz:[{ required: true, message: "请输入民族", trigger: "blur" }],
          zzmm:[{ required: true, message: "请输入政治面貌", trigger: "blur" }],
          ccrq:[{ required: true, message: "请输入出生日期", trigger: "blur" }],
					bkzyzy1:[{ required: true, message: "请选择报考志愿专业", trigger: "blur" }],
					lxfs1:[
						{ required:true ,message:"请输入联系方式1", trigger:"blur"},
						{ pattern:/^(\d{11})/,message: '联系方式为11位数字号码', trigger:'blur'},
						{ min: 11, max: 11, message: '联系方式为11位数字号码', trigger: 'blur' }
					],
					lxfs2:[
						// { required:true ,message:"请输入联系方式2", trigger:"blur"},
						{ pattern:/^(\d{11})/,message: '联系方式为11位数字号码', trigger:'blur'},
						{ min: 11, max: 11, message: '联系方式为11位数字号码', trigger: 'blur' }
					],
					xxdz:[
						{ required:true ,message:"请输入详细地址", trigger:"blur"},
					]
				},
				editDialogVisible:false,
				treeData:[],
        nodesInfo:[],
        currentMajor:'',
        selectedMajor:[],
        optionsXB: [
          { value: '女',label: '女'}, 
          { value: '男',label: '男'}
        ],
        optionZZMM:[],
        optionMZ:[]
			}
		},
		methods:{
      // 保存志愿
			saveInfo(){
				this.delRepeat()
				this.$refs["elForm"].validate((valid) => {
          if (!valid) {
          	return 
          }
          let a = this.delRepeat()
          if(!a){
          	return
          }else{
          	let dto = this.editForm
	          this.$confirm('提交报名信息后等待审核，审核前可以修改信息，审核后不可修改, 是否继续?', '提示', {
			          confirmButtonText: '确定',
			          cancelButtonText: '取消',
			          type: 'warning'
			        }).then(() => {
			        	//提交报名信息
			        	this.$post("/studentsRegister/update.action", {
				          data: {
				           dto:dto
				          }
				        })
				        .then(data=>{
				        	if(data.succsess == 1){
			              this.loginLoading = false;
		            		this.$router.push({path:'/StudentSelfAdmissionHome/Audit'})
			            }else {
			              this.$message({
			                message: data.msg,
			                type: "error"
			              });
			            }
			          })
				        .catch(err => {
			            this.loginLoading = false;
			        	});
			        }).catch(() => {
			          this.$message({
			            type: 'info',
			            message: '已取消'
			          });          
			      });
          }
    		});
			},
			// 判断志愿是否重复
			delRepeat(){
				this.selectedMajor = []
				for(let i = 1; i <= 3; i++){
					this.selectedMajor.push(this.editForm['bkzyzyId'+i])
				}
				this.selectedMajor.forEach((item,index)=>{
					if(item == null){
						this.selectedMajor.splice(index,1)
					}
				})
				if(this.selectedMajor.length != [...new Set(this.selectedMajor)].length){
          this.$alert('', '所填志愿不能重复，请重新选择', {
            confirmButtonText: '确定',
            callback: action => {}
          });
          return false
				}else{
					return true
				}
			},
			// 获取考生基本信息
			getList(){
				let ksh = this.SELFADMUSER_INFO
				this.$post("/studentsRegister/getList.action", {
          loadingEl:this.$refs.elForm,
          data: {
           dto:{ksh:ksh} 
          }
        }).then(data=>{
        	if(data.succsess != 1){
        		this.$message({
              message: data.msg,
              type: "error"
            });
            return
        	}
        	this.editForm = {...this.editForm,...data.dtoList[0]}
        	let rq = this.editForm.zjhm.toString()
        	this.editForm.csrq = rq.slice(6,14)
        	if(data.dtoList[0].approval == 1 && data.dtoList[0].jfzt != 1){
	        	this.$alert('您的报名信息已审核成功，请等待缴费审核', '审核成功', {
		          confirmButtonText: '确定',
		          callback: action => {
		            this.$router.push({path:'/StudentSelfAdmissionHome/Audit'})
		          }
		        });
		        return
        	}else if(data.dtoList[0].jfzt == 1 && data.dtoList[0].fbzt != 1){
        		this.$alert('您的缴费信息已审核成功，请等待查看考试信息', '审核成功', {
		          confirmButtonText: '确定',
		          callback: action => {
		            this.$router.push({path:'/StudentSelfAdmissionHome/TestInfo'})
		          }
		        });
		        return
        	}else if(data.dtoList[0].jfzt == 1 && data.dtoList[0].fbzt == 1){
        		this.$alert('您的考试信息已生成，请查看', '', {
		          confirmButtonText: '确定',
		          callback: action => {
		            this.$router.push({path:'/StudentSelfAdmissionHome/TestInfo'})
		          }
		        });
		        return 
        	}
        	this.$nextTick(()=>{
        		this.$refs["elForm"].clearValidate();	
        	});
        })
			},
			// 当前点击节点
      clickItem(val){
      },
      // 所有选中的节点(获取所选节点的id)
      checkedData(val){
        this.nodesInfo = []
        val.forEach(item=>{
          this.nodesInfo.push(item)
        })
      },
			// 选择报考专业
			selectMajor(num){
				this.currentMajor = num
				this.editDialogVisible = true
				this.getTreeData()
			},
			// 获取可选专业的树
			getTreeData(){
				this.$post('/major/getZyTree.action',{
					loadingEl: this.$refs.appTreeRef,
          data:{

          }
				}).then(data=>{
					this.treeData = data.array
				})
			},
			// 保存所选志愿专业
			saveMajor(){
				if(this.nodesInfo.length != 1){
					this.$message({
            message: "请重新选择志愿专业（有且仅有一个）",
            type: "error"
          });
          return 
				}
				this.editForm['bkzyzy' + this.currentMajor] = this.nodesInfo[0].label
				this.editForm['bkzyzyId' + this.currentMajor] = this.nodesInfo[0].id
				if(this.currentMajor == 1){
					this.editForm.ksxs = this.nodesInfo[0].sfsf
				}
        this.editDialogVisible = false
			},
      getMZ(){
        this.$post('/STCode/getList.action',{
          data:{
            dmbt:'MZ'
          }
        }).then(data=>{
          this.optionMZ = data.list
        })
      },
      getZZMM(){
      	this.$post('/STCode/getList.action',{
          data:{
            dmbt:'ZZMM'
          }
        }).then(data=>{
          this.optionZZMM = data.list
        })
      }
		},
		mounted(){
			this.getList()
			this.getMZ()
			this.getZZMM()
      // this.time()
		}
	}
</script>
<style>
	.page-application{
		width: 100%;
		height: 100%;
		position: relative;
	}
	.page-application .application-from{
		width: 100%;
		height: 100%;
		padding-bottom: 20px;
	}
	.page-application .application-from .application-form-title{
		font-size: 20px;
		margin: 22px;
		text-align: left;
	}
	.page-application .application-from  .el-form{
		padding-top: 2%;
		height: 85%;
		overflow: scroll;
		border: 1px solid #ccc;
		border-left: none;
	}
	.page-application .application-from .el-form-item__label{
		width: 120px !important;
	}
	.page-application .application-from .el-form-item__content{
		width:68%;
		display: inline-block;
	}
	.page-application .save{
		margin-top: 20px;
	}
	.sffctj{
		position: absolute;
		left: 0;
	}
  .bigWidth{
    width: 100%;
  }
    @media only screen and (max-width: 1366px) {
    	.page-application .application-from .application-form-footer{
				margin-top: -1px;
			}
    }
  
  @media only screen and (max-width: 500px) {
    .page-application .application-from .application-form-title{
      font-size: 16px;
      margin: 20px;
      text-align: left;
    }
  }
</style>