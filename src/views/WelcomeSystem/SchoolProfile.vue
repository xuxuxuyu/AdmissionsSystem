<template>
  <!-- 校园简介 -->
  <div class="page-SchoolProfile">
    <div class="page-container">
      <el-input
        class="textInfo"
        type="textarea"
        placeholder="请输入内容"
        v-model="textarea"
        :disabled="dis">
      </el-input>
      <br>
      <el-button
        type="primary"
        icon="icon iconfont"
        @click="edit()"
        v-if="dis">编辑
      </el-button>
      <el-button
        type="primary"
        icon="icon iconfont"
        @click="sub()"
        v-if="!dis">提交
      </el-button>
    </div>
  </div>
</template>
<script>
  export default {
    name:"SchoolProfile",
    data(){
      return {
        textarea:'',
        dis:true,
        id:''
      }
    },
    methods:{
      edit(){
        this.dis = false
      },
      sub(){
        console.log(this.id)
        this.$post('/schoolIntroduction/saveWSSchoolIntroduction.action',{
          loadingEl:'all',
          data:{
            xxjjnr:this.textarea,
            wsxxjjid:this.id
          }
        }).then(data=>{
          if(data.succsess == 1){
            this.$message({message: "操作成功", type: "success"});
            this.dis = true
            this.getList()
          }
        })
      },
      getList(){
        this.$post('/schoolIntroduction/getList.action',{
          loadingEl:'all',
          data:{
            dto:{}
          }
        }).then(data=>{
          if(data.succsess == 1){
            this.textarea = data.dtos[0].xxjjnr
            this.id = data.dtos[0].wsxxjjid
          }
        })
      }
    },
    mounted(){
      this.getList()
    }
  }
</script>
<style>
  .page-SchoolProfile{
    position: relative;
    /*background: pink;*/
    }
    .textInfo{
      margin: 20px 0 30px 0;
      width: 90%;
      height: 70%;
    }
    .textInfo textarea{
      height: 100%;
    }
</style>