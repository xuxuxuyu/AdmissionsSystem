<template>
  <div class="page-StudentSelfAdmissionHome">
    <div class="logo">
      <img src="../assets/images/lylogo.jpg"/>
    </div>
    <div class="StudentSelfAdmissionHome-container clearfix">
      <div class="content-left">
        <div class="AdmisStep">
          <el-steps direction="vertical" :active="actived" finish-status="success">
            <el-step title="我要报名"></el-step>
            <el-step title="报名审核"></el-step>
            <el-step title="请缴费"></el-step>
            <el-step title="考试信息"></el-step>
          </el-steps>
        </div>
      </div>
      <div class="content-right">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name:'StudentSelfAdmissionHome',
  data() {
    return {
      active:1
    }
  },
  computed:{
    actived(){
      return this.$route.meta.index
    }
  },
  methods: {

  },
  mounted(){
    
  }

};
</script>
<style>
  .page-StudentSelfAdmissionHome{
    width: 100%;
    height: 100%;
    position: relative;
  }
  .page-StudentSelfAdmissionHome .logo {
    height: 95px;
    width: 100%;
    background: #fff;
  }

  .page-StudentSelfAdmissionHome .logo  img{
    position: absolute;
    top: 10px;
    left: 28px;
  }
  .StudentSelfAdmissionHome-header .app-header-logo:after {
    content: "";
    display: inline-block;
    position: absolute;
    right: 0;
    top: 15px;
    width: 2px;
    height: 30px;
    border-radius: 50%;
    background: #2196f3;
  }
  .StudentSelfAdmissionHome-container{
    width: 60%;
    height: 80%;
    min-height: 500px;
    clear: both;
    margin: 5px auto;
    border: 1px solid #ccc;
  }
  .StudentSelfAdmissionHome-container .content-left{
    width: 30%;
    height: 100%;
    float: left;
    border-right:1px solid #ccc; 
  }
  .AdmisStep{
    height: calc(100% - 70px);
    margin: 10% 0 0 40%;
  }
  .StudentSelfAdmissionHome-container .content-right{
    width: 70%;
    height: 100%;
    float: right;
  }

  @media only screen and (max-width: 500px) {
    .page-StudentSelfAdmissionHome{
      width: 90%;
      position: relative;
      margin-left: 5%;
      /*min-width: 100vw*/
    }
    .page-StudentSelfAdmissionHome .StudentSelfAdmissionHome-header{
      width: 100%;
      height: 8%;
      text-align: left;
    }
    .page-StudentSelfAdmissionHome .StudentSelfAdmissionHome-header img{
      width: 100%;
      /*height: 100%;*/
    }
    .StudentSelfAdmissionHome-container{
      width: 100%;
      height: 85%;
      min-height: 500px;
      clear: both;
      margin: 5px auto;
      border: 1px solid #ccc;
    }
    .StudentSelfAdmissionHome-container .content-left{
      width: 20%;
      height: 100%;
      float: left;
      border-right:1px solid #ccc; 
    }
    .AdmisStep{
      height: calc(100% - 70px);
      margin: 10% 0 0 10%;
    }
    .StudentSelfAdmissionHome-container .content-right{
      width: 80%;
      height: 100%;
      float: right;
    }
  }
</style>