<template>
  <div class="StudentSelfAdmissionLogin">
    <!-- logo -->
    <div class="logo">
      <img src="../assets/images/lylogo.jpg" />
    </div>
    <div class="login-content">
      <div class="login-right">
        <div class="login-right_content">
        	<div class="loginTitle">单招网上报名系统</div>
            <el-form ref="loginForm" :model="loginForm" :rules="loginRules" label-width="0px">
                <el-form-item prop="LoginName">
                  <el-input
                    auto-complete="new-password"
                    v-model="loginForm.LoginName"
                    placeholder="请输入考生号"
                    clearable
                    @keyup.enter.native="submit('loginForm')"
                    autofocus="true"
                    ref="LoginName_INPUT"
                    class="login-input"
                  ></el-input>
                </el-form-item>
                <el-form-item prop="PassWord">
                  <el-input
                    auto-complete="new-password"
                    v-model="loginForm.PassWord"
                    placeholder="请输入密码"
                    clearable
                    type="password"
                    class="login-input"
                    @keyup.enter.native="submit('loginForm')"
                  ></el-input>
                </el-form-item>
                <!-- 验证码 -->
                <el-form-item prop="Code">
                  <el-input
                    v-model="loginForm.Code"
                    placeholder="请输入验证码"
                    type="text"
                    class="login-input"
                    @keyup.enter.native="submit('loginForm')"
                  ></el-input>
                  <div class="verification-code" @click="loadVerification">
                    <div style="width: 100px;height: 35px;" ref="verificationCode">
                      <img style="width: 90px; height: 35px;" :src="photoUrl" alt />
                      <canvas id="canvas"></canvas>
                    </div>
                  </div>
                </el-form-item>
                <!-- 登录 -->
                <el-form-item>
                  <el-row>
                    <el-col :span="12">
                      <el-button
                        :loading="loginLoading"
                        type="primary"
                        class="app-log-btn loadingButton"
                        @click="submit()"
                      >登&nbsp;录</el-button>
                    </el-col>
                    <el-col :span="12">
                      <router-link to="register">
                        <el-button type="text" class="app-log-btn loadingButton">注册</el-button>
                      </router-link>
                    </el-col>
                  </el-row>
                </el-form-item>
            </el-form>
              <!-- 提醒 -->
              <div class="warning" v-show="messageVisible">
                {{message}}。请重试。如果总是不能登录，请
                <!--点击“忘记密码”或-->
                联系管理员。
              </div>
          <div class="loginTips">
            <p>1.咨询电话：36118。</p>
            <p>2.建议使用谷歌、火狐、IE10及以上版本或360浏览器极速模式。</p>
            <p>3.注意事项3</p>
            <p>4.注意事项4</p>
          </div>
        </div>
      </div>
    </div>
    <!-- 提醒 -->
    <div class="company-info">
      技术支持
      <a href="http://www.lingzhansoft.com/" target="_Blank">长春凌展软件有限责任公司</a>
    </div>
  </div>
</template>

<script>
  export default {
    name: "app",
    watch: {
      //监听路由的变化,光标默认到输入框上
      routerPathStatus(newData) {
        this.$nextTick(() => {
          if (newData && this.$refs.LoginName_INPUT) {
            this.$refs.LoginName_INPUT.focus();
          }
        });
      }
    },
    computed: {
      SELFADMUSER_INFO() {
        return this.$store.getters.SELFADMUSER_INFO
      },
    },
    data() {
      // 验证码错误
      let checkCaptcha = (rule, value, callback) => {
        let Code = value.toUpperCase();
        if (Code != this.verification.toUpperCase()) {
          callback(new Error("验证码不正确，请重新输入"));
          this.verification = this.getVerification(4);
        } else {
          callback();
        }
      };
      return {
        activeName:'first',
        photoUrl: "",
        loading: false,
        //登陆表单
        loginLoading: false,
        loginForm: {
          LoginName: "",
          PassWord: "",
          Code: ""
        },
        //登录表单校验
        loginRules: {
          LoginName:  [
            { required: true, message: "请输入正确的考生号", trigger: "blur" },
            { pattern:/^(\d{14})/,message: '考生号为14位数字', trigger:'blur'}
          ],
          PassWord: [{
            required: true,
            message: "请输入密码",
            trigger: "blur"
          }],
          Code: [{
              required: true,
              message: "请输入验证码",
              trigger: "blur"
            },
            { validator: checkCaptcha, trigger: "blur" }
          ]
        },
        verification: "",
        loginStatus: false, // 是否保存用户名和密码  false为session,true为cookie(7天)
        loginStatusTime: 7, // 用户信息保存有效期(单位/日)
        //账号密码输入错误提示
        messageVisible: false,
        message: "您的考生号和密码错误",
        // 记住密码缓存表单
        rememberUserForm: {
          createTime: this.getDateTime(), // 创建时间
          LoginName: "", // 用户名
          PassWord: "", // 密码
          loginStatus: false // 是否记住密码
        },
        routerPathStatus: "", // 路由Path值
        xianliu: true
      };
    },
    methods: {
    	draw(show_num) {
        var canvas_width = 100;
        var canvas_height = 30;
        var canvas = document.getElementById("canvas"); //获取到canvas的对象
        var context = canvas.getContext("2d"); //获取到canvas画图的环境
        canvas.width = canvas_width;
        canvas.height = canvas_height;
        for (var i = 0; i < show_num.length; i++) {
          var deg = Math.random() - 0.5; //产生一个随机弧度
          var x = 10 + i * 20; //文字在canvas上的x坐标
          var y = 20 + Math.random() * 8; //文字在canvas上的y坐标
          context.font = "bold 23px 微软雅黑";

          context.translate(x, y);
          context.rotate(deg);

          context.fillStyle = this.randomColor();
          context.fillText(show_num[i], 0, 0);

          context.rotate(-deg);
          context.translate(-x, -y);
        }
        for (var i = 0; i <= 6; i++) {
          //验证码上显示线条
          context.strokeStyle = this.randomColor();
          context.beginPath();
          context.moveTo(
            Math.random() * canvas_width,
            Math.random() * canvas_height
          );
          context.lineTo(
            Math.random() * canvas_width,
            Math.random() * canvas_height
          );
          context.stroke();
        }
        for (var i = 0; i <= 100; i++) {
          //验证码上显示小点
          context.strokeStyle = this.randomColor();
          context.beginPath();
          var x = Math.random() * canvas_width;
          var y = Math.random() * canvas_height;
          context.moveTo(x, y);
          context.lineTo(x + 1, y + 1);
          context.stroke();
        }
      },
      randomColor() {
       	var r = Math.floor(Math.random() * 256);
        var g = Math.floor(Math.random() * 256);
        var b = Math.floor(Math.random() * 256);
        return "rgb(" + r + "," + g + "," + b + ")";
    	},
      // 获取任意个数的 数字+字母 组合的验证码
      getVerification(length) {
        let list = [
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9",
          "A",
          "B",
          "C",
          "D",
          "E",
          "F",
          "G",
          "H",
          "J",
          "K",
          "L",
          "M",
          "N",
          "P",
          "Q",
          "R",
          "S",
          "T",
          "U",
          "V",
          "W",
          "X",
          "Y",
          "Z"
        ];
        let verification = "";
        for (let i = 0; i < length; i++) {
          let num = Math.floor(Math.random() * list.length);
          verification += list[num];
        }
        return verification;
      },
      // 随机获取4位验证码
      loadVerification() {
        this.verification = this.getVerification(4)
        this.draw(this.verification);
        // if (!this.xianliu) {
        //   return;
        // }
        // this.xianliu = false;
        // let _this = this;
        // this.$post("/VerifyCodeApi/SecurityCode", {
        //   data: {},
        //   loadingEl: this.$refs["verificationCode"]
        // })
        //   .then(data => {
        //     // this.draw(data);
        //     this.photoUrl = "data:image/png;base64," + data;
        //     setTimeout(() => {
        //       _this.xianliu = true;
        //     }, 1500);
        //   })
        //   .catch(error => {
        //     setTimeout(() => {
        //       _this.xianliu = true;
        //     }, 500);
        //   });
      },
      // 获取当前时间戳（单位/秒）
      getDateTime() {
        // 获取当前时间(时间戳/秒)
        var DateTime = new Date();
        var dateNow = DateTime.getTime() / 1000;
        return dateNow;
      },
      // 登录
      submit() {
        this.$refs["loginForm"].validate(valid => {
          if (!valid) {
            this.loadVerification();
            return false;
          }
          // 加密
          let loginForm = JSON.parse(JSON.stringify(this.loginForm));
          loginForm.PassWord = this.$setRSACode(loginForm.PassWord.trim())
          this.$post("/webLogin/login.action", {
            data: {
             dto:{
              ksh:loginForm.LoginName,
              pwd:loginForm.PassWord
             } 
            }
          })
            .then(async data => {
              if(data.succsess != 1){
                this.$message({
                  message: data.msg,
                  type: "error"
                });
                return
              }
              this.loginLoading = false;
              this.$store.commit("SELFADMUSER_INFO", null);
              this.$store.commit("SELFADMUSER_INFO", this.loginForm.LoginName);
              this.$router.push({path:'/StudentSelfAdmissionHome'})
            })
            .catch(err => {
                this.loginLoading = false;
            });
        })
      },
    },
    mounted() {
      this.loadVerification();
    }
  };
</script>
<style>
  .StudentSelfAdmissionLogin{
    width: 100%;
    height: 100%;
    position: relative;
    background: url(../assets/images/bac.jpg) no-repeat;
    /*background-size: cover;*/
    background-size: 100% 95%;
  }

  .StudentSelfAdmissionLogin .logo {
    height: 95px;
    width: 100%;
    background: #fff;
  }

  .StudentSelfAdmissionLogin .logo  img{
    position: absolute;
    top: 10px;
    left: 28px;
  }


  .StudentSelfAdmissionLogin #canvas {
    vertical-align: middle;
    box-sizing: border-box;
    /* border: 1px solid #ddd; */
    cursor: pointer;
    background: #fff;
  }

  .StudentSelfAdmissionLogin .login-content {
    width: 100%;
    height: 88%;
  }

  .StudentSelfAdmissionLogin .login-right {
    width: 360px;
    height: 420px;
    position: absolute;
    top:55%;
    right: 15%;
    border-radius: 20px;
    background: rgba(255,255,255,.8);
    margin-top:-200px;
  }

  .StudentSelfAdmissionLogin .login-right_content {
    text-align: center;
    margin-top: 10%;
  }
  .StudentSelfAdmissionLogin .company-info {
    width: 100%;
    height: 35px;
    line-height: 35px;
    position: absolute;
    /*left: 50%;*/
    bottom: 0;
    /*transform: translate(-50%);*/
    font-size: 12px;
    color: #3B81FC;
    text-align: center;
  }
  .StudentSelfAdmissionLogin .company-info a{
    color: #3B81FC;
  }

  .StudentSelfAdmissionLogin .verification-code {
    position: absolute;
    right: 50px;
    bottom: 0px;
    cursor: pointer;
    user-select: none;
  }

  .StudentSelfAdmissionLogin .verification-code>span {
    font-size: 14px;
    font-weight: 400;
    color: #009cff;
    letter-spacing: 4px;
  }

  .StudentSelfAdmissionLogin .remember-password {
    overflow: hidden;
    text-align: left;
    margin-top: 25px;
  }

  .StudentSelfAdmissionLogin .remember-password .el-checkbox {
    padding-left: 38px;
  }
  .StudentSelfAdmissionLogin .remember-password .el-button{
    padding-right: 38px;
    margin-top: -6px;
  }
  .StudentSelfAdmissionLogin .remember-password .el-checkbox__label {
    color: #333;
    font-size: 12px;
    font-weight: normal;
    padding-right: 3px;
  }

  .StudentSelfAdmissionLogin .remember-password .el-button--text {
    float: right;
  }

  .StudentSelfAdmissionLogin .app-log-btn {
    color: #fff;
    position: relative;
    width: 80%;
    height: 40px;
    border-color: #ffa018;
    margin-top: 5px;
    background: linear-gradient(0deg,
        rgba(253, 136, 36, 1),
        rgba(253, 154, 68, 1));
    box-shadow: 0px 3px 8px 0px rgba(253, 147, 52, 0.3);
    border-radius: 30px;
    font-size: 16px;
    font-weight: normal;
    padding: 0;
  }
  .StudentSelfAdmissionLogin .app-log-btn:hover,
  .StudentSelfAdmissionLogin .app-log-btn:focus {
    background: linear-gradient(0deg,
        rgba(252, 125, 17, 1),
        rgba(253, 154, 68, 1));
  }

  .StudentSelfAdmissionLogin .app-log-btn:active {
    background: linear-gradient(0deg,
        rgba(253, 154, 68, 1),
        rgba(252, 125, 17, 1));
  }

  .StudentSelfAdmissionLogin .el-checkbox__label {
    padding-left: 4px;
  }

  .StudentSelfAdmissionLogin .login-input /deep/ input{
    width: 80%;
    height: 30px;
    border-bottom: 1px solid #ccc;
    background: rgba(0,0,0,0);
  }

  .el-form-item__error{
    margin-left: 38px;
  }
  .StudentSelfAdmissionLogin .el-form-item--mini.el-form-item,
  .StudentSelfAdmissionLogin .el-form-item--small.el-form-item {
    margin-bottom: 5%;
  }

  .StudentSelfAdmissionLogin .login-input>.el-input__inner {
    background-image: linear-gradient(#ffa018, #ffa018),
    linear-gradient(#dcdfe6, #dcdfe6);
    background-position: left bottom, right bottom;
    background-size: 0 1px, 100% 1px;
    border: none;
    box-shadow: none;
    background-repeat: no-repeat;
    outline: none;
  }

  .StudentSelfAdmissionLogin .login-input>.el-input__inner:focus {
    border: none;
    box-shadow: none;
    background-size: 100% 1px, 100% 1px;
    transition: all 0.3s linear;
  }

  .StudentSelfAdmissionLogin .el-form-item.is-error .el-input__inner,
  .StudentSelfAdmissionLogin .el-form-item.is-error .el-input__inner:focus {
    box-shadow: 0 2px 8px rgba(248, 93, 99, 0.2);
    border-color: #f56c6c;
    border-bottom: 1px solid #f56c6c;
    border-radius: 0;
    background-image: none;
  }

  .StudentSelfAdmissionLogin .rememberPassword .el-checkbox__inner {
    width: 12px;
    height: 12px;
  }

  .StudentSelfAdmissionLogin .rememberPassword .el-checkbox__label {
    font-size: 12px;
  }

  .StudentSelfAdmissionLogin .rememberPassword .el-checkbox__input.is-checked .el-checkbox__inner,
  .el-checkbox__input.is-indeterminate .el-checkbox__inner {
    border-color: #409eff;
    background: #409eff;
  }

  .StudentSelfAdmissionLogin .rememberPassword .el-checkbox__input.is-checked+.el-checkbox__label {
    color: #409eff;
  }

  .StudentSelfAdmissionLogin .warning {
    font-size: 14px;
    margin-top: 10px;
    color: red;
    line-height: 20px;
  }

  /* 加载样式重写 */
  .StudentSelfAdmissionLogin .app-login-btn_custom {
    border-radius: 30px;
  }

  .StudentSelfAdmissionLogin .app-login-btn_custom .el-loading-spinner {
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }

  .StudentSelfAdmissionLogin .app-login-btn_custom .el-loading-spinner i,
  .StudentSelfAdmissionLogin .app-login-btn_custom .el-loading-spinner p {
    display: inline-block;
    vertical-align: middle;
  }
  .StudentSelfAdmissionLogin .login-right_content .loginTitle{
    font-size: 18px;
    color: #0d59a7;
    margin: 0 0 20px 0;
  }

  .StudentSelfAdmissionLogin .el-form-item.is-error .el-input__inner,
  .StudentSelfAdmissionLogin .el-form-item.is-error .el-input__inner:focus,
  .StudentSelfAdmissionLogin .el-form-item.is-error .el-textarea__inner,
  .StudentSelfAdmissionLogin .el-form-item.is-error .el-textarea__inner:focus {
    box-shadow: none;
  }

  .StudentSelfAdmissionLogin .el-form-item.is-error .el-input__inner,
  .StudentSelfAdmissionLogin .el-form-item.is-success .el-input__inner:focus,
  .StudentSelfAdmissionLogin .el-form-item.is-error .el-textarea__inner,
  .StudentSelfAdmissionLogin .el-form-item.is-success .el-textarea__inner:focus {
    box-shadow: none;
  }
  .loginTips{
    border-top: 1px dotted  #717171;
    box-sizing: border-box;
    padding: 10px 0 0 20px;
    height: 35%;
    /*background: green;*/
    position: absolute;
    bottom: 0;
  }
  .loginTips p{
    font-size: 12px;
    text-align: left;
    color: #444;
    line-height: 25px;
  }
  .loginText{
    font-size: 12px;
    color: #0d59a7;
    margin-top: 20px;
  }
  .codeImg{
    margin-top: 20px;
  }
  .loginTips{
    border-top: 1px dotted  #717171;
    box-sizing: border-box;
    padding: 10px 0 0 20px;
    height: 35%;
    /*background: green;*/
    position: absolute;
    bottom: 0;
  }
  .loginTips p{
    font-size: 12px;
    text-align: left;
    color: #444;
    line-height: 25px;
  }

@media only screen and (max-width: 1440px) {
.StudentSelfAdmissionLogin .login-right {
    width: 300px;
    height: 380px;
    position: absolute;
    top:55%;
    right: 15%;
    border-radius: 20px;
    background: rgba(255,255,255,.8);
    margin-top:-200px;
  }
   .StudentSelfAdmissionLogin .app-log-btn{
    width: 60%;
    height:30px;
    font-size: 15px;
   }
   .loginTips{
      border-top: 1px dotted  #717171;
      box-sizing: border-box;
      padding: 0px 0 0 20px;
      height: 35%;
      /*background: green;*/
      position: absolute;
      bottom: 0;
    }
    .loginTips p{
      font-size: 12px;
      text-align: left;
      color: #444;
      line-height: 20px;
    }
}


  @media only screen and (max-width: 500px) {
    .StudentSelfAdmissionLogin {
      min-width: 100vw;
      width: 100vw;
      position: relative;
      background: pink;
    }
     .StudentSelfAdmissionLogin .login-right {
        width: 350px;
        height: 380px;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        border-radius: 20px;
        background: rgba(255,255,255,.8);
      }  
  }

</style>