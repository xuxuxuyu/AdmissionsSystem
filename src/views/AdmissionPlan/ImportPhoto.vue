<template>
  <!-- 导入照片 -->
  <div class="page-ImportPhoto">
    <div class="page-container">
      <div class="ImportPhoto">
      	<el-row class="conten">
      		<el-col :span="6" class="left">
      			<appTree :treeData='treeData' :showLine="false" ref="appTreeRef" @clickItem="clickItem" @checkedData="checkedData"></appTree>
      		</el-col>
      		<el-col :span="8">
      			<el-form
		          status-icon
		          :model="editForm"
		          :rules="editFormRules"
		          label-position="right"
		          ref="editForm"
		          label-width="130px"
		          >
		          <!-- class="ImportPhoto-form"  class="last_item" -->
		          <el-form-item label="根据：">
		            <el-radio-group v-model="editForm.gj">
		              <el-radio label="根据学号"></el-radio>
		              <el-radio label="根据身份证号"></el-radio>
		              <el-radio label="根据考生号"></el-radio>
		            </el-radio-group>
		          </el-form-item>
		          <el-form-item label="选择上传数据:">
		          	<el-input readonly placeholder="上传文件" :value="fileName" class="input-with-select">
	                <app-file slot="append" accept="*" type="file" @change="fileUpload">
	                  <el-button>选择文件</el-button>
	                </app-file>
	              </el-input>
		          </el-form-item>
		          <el-form-item >
		            <el-button type="primary" @click="saveInfo()">保存</el-button>
		            <el-button type="primary">关闭</el-button>
		          </el-form-item>
		        </el-form>
      		</el-col>
      	</el-row>
      </div>
    </div>
  </div>
</template>
<script>
  import appTree from "../../components/app-tree"
  import appFile from "../../components/app-file-base64"
  export default {
    components:{
      appTree,
      appFile
    },
    name:"ImportPhoto",
    data(){
      return {
        editForm:{
          gj:'根据身份证号',
          bj:[],
        },
        editFormRules:{},
        treeData:[],
        fileName:''
      }
    },
    methods:{
      load(){
        this.getTreeData()
      },
      saveInfo(){
        console.log(this.editForm);
      },
      getTreeData(){
        this.$post('/getMenu/getBdzyxxndTree.action', {
          data:{}
        }).then(data=>{
          this.treeData = data
        })
      },
      clickItem(val){
      },
      checkedData(val){
      	this.editForm.bj = val
      },
      fileUpload(val){
      	this.fileName = val.fileName
      }
    },
    mounted(){
      this.load()
    }
  }
</script>
<style>
	.page-ImportPhoto{
		position: relative;
	}
	.page-container,.conten{
		height: 100%;
	}
  .ImportPhoto{
    height: 100%;
    padding: 2px;
  }
  .ImportPhoto-form .el-form-item{
    margin:20px 0 0 0;
    background: #fff;
  }
  .left{
    overflow-y: scroll;
    height: 100%;
  }
  .ImportPhoto-form .el-form-item__label{
  	width: 20%;
  }
  .ImportPhoto-form .el-form-item .el-input{
		width: 300px;
	}
	.last_item{
		margin-top: 50px !important;
	}
</style>