<template>
  <!-- 校园风采 -->
  <div class="page-SchoolScenery">
    <div class="page-container">
      <el-upload
        class="load"
        v-for="index of 9" :key="index"
        action="https://jsonplaceholder.typicode.com/posts/"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
        :on-change="handleSuccess"
        :http-request="function(val){ customPictureUpload() }">
        <i class="el-icon-plus"></i>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="">
      </el-dialog>

    </div>
  </div>
</template>
<script>
  export default {
    name:"SchoolScenery",
    data(){
      return {
        dialogImageUrl: '',
        dialogVisible: false
      }
    },
    methods:{
      handleRemove(file, fileList) {
        // console.log(file, fileList);
        console.log(111);
        document.querySelector(".el-upload--picture-card").style.display = 'inline-block'
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      customPictureUpload () {
        // console.log(11111);
        // document.querySelector(".el-upload--picture-card").style.display = 'inline-block'
      },
      handleSuccess(){
        console.log(2222);
        document.querySelector(".el-upload--picture-card").style.display = 'none'
      }
    },
    mounted(){

    }
  }
</script>
<style>
  .page-SchoolScenery{
    position: relative;
  }
  .page-SchoolScenery .page-container{
    width: 100%;
    height: 100%;
  }
  .load{
    margin-top: 30px;
    width: 30%;
    display: inline-block;
  }  
  .load .el-upload{
    width: 200px;
    height: 200px;
    margin-bottom: 30px;
  }
  .page-SchoolScenery .el-upload-list__item-thumbnail,
  .page-SchoolScenery .el-upload-list__item .is-ready,
  .page-SchoolScenery .el-upload-list__item-actions{
    width: 200px;
    height: 200px;
  }
</style>