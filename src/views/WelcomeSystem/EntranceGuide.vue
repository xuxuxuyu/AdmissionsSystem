<template>
  <!-- 入学指南 -->
  <div class="page-EntranceGuide">
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
    name:"EntranceGuide",
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
        this.$post('/admissionGuide/saveWSAdmissionGuide.action',{
          loadingEl:'all',
          data:{
            rxznnr:this.textarea,
            wsrxznid:this.id
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
        this.$post('/admissionGuide/getList.action',{
          loadingEl:'all',
          data:{}
        }).then(data=>{
          if(data.succsess == 1){
            this.textarea = data.dtos[0].rxznnr
            this.id = data.dtos[0].wsrxznid
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
    .page-EntranceGuide{
      position: relative;
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