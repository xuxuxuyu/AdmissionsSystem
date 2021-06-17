<template>
  <div id="page-outApplicationTime">
    <div class="ripple">
      <img :src="ripple" width="100%">
    </div>
    <div class="error-box">
      <div class="error-text">当前不在报名时间内，不可注册！
        <span><a href="javascript:void(0)" @click="goBack">返回</a></span></div>
    </div>
  </div>
</template>

<script>
  import ripple from '@/assets/images/error-bg.png';

  export default {
    name: 'pageOutApplicationTime',
    data() {
      return {
        ripple: ripple,
      }
    },
    methods: {
      goBack: function() {
        this.$router.push({path: '/StudentSelfAdmissionLogin'});
      }
    }
  }
</script>


<style>
  #page-outApplicationTime {
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;
    background-image: linear-gradient(90deg, RGBA(16, 84, 156, 1) 50%, RGBA(29, 95, 166, 1));
  }

  #page-outApplicationTime .ripple {
    position: absolute;
    width: 100%;
    bottom: -1px;
    z-index: 1;
  }

  #page-outApplicationTime .error-box {
    text-align: center;
    position: absolute;
    top: 45%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;
  }

  #page-outApplicationTime .error-text {
    margin-top: 30px;
    color: #fff;
  }

  #page-outApplicationTime .error-text span a {
    color: #fff;
  }
</style>
