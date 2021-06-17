<template>
	<!-- 数据导入 -->
	<div class="page-DataImport">
		<div class="page-container">
			<div class="DataImport">
				<p class="title">数据导入</p>
  	 	  <el-form
          status-icon
          :rules="editFormRules"
          ref="editForm"
          class="form-DataImport">
				  <el-form-item label="选择上传数据:">
				  	<el-input readonly placeholder="上传文件" :value="fileName" class="input-with-select">
              <app-file slot="append" accept="*" type="file" @change="fileUpload">
                <el-button>选择文件</el-button>
              </app-file>
            </el-input>
				  </el-form-item>
				  <el-form-item class="zysx" label="注意事项:" prop="zysx">
				  	<p>1.数据导入有先后顺序,请按照导入项目列出的先后顺序依次导入。</p>
				  	<p class="maginP">2.准备数据时要仔细阅读模板中的提示,红色标题为必填项。</p>
				  	<p class="maginP">3.请不要更改模板中的信息</p>
				  </el-form-item>
      	</el-form>
			</div>
			<el-button class="btn" type="primary" @click="impo()" v-if="btn.import">导入</el-button>
			<div class="checkInfo">
				
			</div>
		</div>
	</div>
</template>
<script>
	import appFile from "../../components/app-file-base64"
	export default {
		components:{
      appFile
    },
		name:"DataImport",
		data(){
			return {
				editFormRules:{},
				fileName:''
			}
		},
		methods:{
			impo(){
			},
			fileUpload(val){
				console.log(val);
      	this.fileName = val.fileName
      }
		},
	}
</script>
<style>
	.DataImport{
		width: 60%;
		border: 1px solid #3d9df4;
		border-bottom: none;
	}
	.title{
		width: 100%;
		text-align: left;
		padding-left: 5%;
		border-bottom: 1px solid #3d9df4;
		height: 40px;
		line-height: 40px;
		color: #606266;
	}
	.form-DataImport .el-form-item{
		border-bottom: 1px solid #3d9df4;
		margin:0;
		text-align: left;
	}
	.form-DataImport .el-form-item__label{
		border-right: 1px solid #3d9df4;
		margin: 0 20px;
		width: 30%;
	}
	.form-DataImport .el-form-item .el-input{
		width: 300px;
	}
	.form-DataImport .el-form-item .el-input /deep/ input{
		height: 26px;
		font-size: 10px;
		line-height: 26px;
	}
	.zysx{
		height: 100px;
		color: red;
	}
	.maginP{
		margin-left: calc(30% + 40px);
	}
	.zysx .el-form-item__label{
		height: 100%;
		line-height: 100px;
		color: red;
	}
	.btn{
		margin: 20px 0 0 -800px;
	}
</style>