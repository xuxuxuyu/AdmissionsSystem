<template>
  <!-- 登录超时页面 -->
  <div class="page-timeout">
    <div class="ripple">
      <img :src="ripple" width="100%" />
    </div>
    <div class="page-timeout-con">
      <p>
        您已经注册成功，
        <span>{{ time }}</span> 秒后将自动跳转到登录页面
      </p>
      <p>
        您也可以
        <el-button type="text" @click="jumpPage()">点击这里</el-button>直接跳转到登录页面
      </p>
    </div>
  </div>
</template>

<script>
import ripple from "@/assets/images/error-bg.png";
export default {
  name: "PageTimeout",
  data() {
    return {
      ripple: ripple,
      // 定时器
      timer: null,
      // 时间(单位: 秒)
      time: 5
    };
  },
  methods: {
    jumpPage() {
      this.$router.push({path:'/StudentSelfAdmissionLogin'})
    },
    createTimer() {
      this.timer = setInterval(() => {
        if (this.time > 0) {
          this.time--;
        } else {
          this.jumpPage();
        }
      }, 1000);
    },
    clearTimer() {
      if (this.timer !== null) {
        window.clearInterval(this.timer);
      }
    }
  },
  mounted() {
    this.clearTimer();
    this.createTimer();
  },
  destroyed() {
    this.clearTimer();
  }
};
</script>

<style>
.page-timeout {
  position: relative;
  width: 100%;
  height: 100%;
  color: #ffffff;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: linear-gradient(
    90deg,
    RGBA(16, 84, 156, 1) 50%,
    RGBA(29, 95, 166, 1)
  );
}
.page-timeout .ripple {
  position: absolute;
  width: 100%;
  bottom: -1px;
  z-index: 1;
}
.page-timeout .page-timeout-con {
  position: relative;
}
.page-timeout .page-timeout-con p {
  width: 100%;
}
.page-timeout .page-timeout-con p:first-child {
  margin-bottom: 10px;
}
.page-timeout .page-timeout-con p span {
  color: #ffbc83;
  font-size: 28px;
}
</style>