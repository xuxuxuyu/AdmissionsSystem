<template>
  <div class="app-login">
    <!-- logo -->
    <div class="logo">
      <img src="../assets/images/lylogo.jpg" />
    </div>
    <div class="login-content">
      <div class="login-right">
        <div class="login-right_content">
          <el-tabs v-model="activeName" class="login-right_tabpane">
            <el-tab-pane label="账号登录" name="first">
              <div class="loginTitle">学生工作管理平台</div>
              <el-form ref="loginForm" :model="loginForm" :rules="loginRules" label-width="0px">
                <el-form-item prop="LoginName">
                  <el-input
                    auto-complete="new-password"
                    v-model="loginForm.LoginName"
                    placeholder="请输入登录名"
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
                      <!-- <img style="width: 90px; height: 35px;" :src="photoUrl" alt /> -->
                      <canvas id="canvas"></canvas>
                    </div>
                  </div>
                </el-form-item>

                <!-- 记住密码 & 找回密码 -->
                <div class="remember-password">
                  <el-checkbox v-model="loginStatus">记住密码</el-checkbox>
                  <router-link to="forget">
                    <el-button type="text">找回密码？</el-button>
                  </router-link>
                </div>

                <!-- 登录 -->
                <el-form-item>
                  <el-button
                    :loading="loginLoading"
                    type="primary"
                    class="app-login-btn loadingButton"
                    @click="submit()"
                  >登&nbsp;录</el-button>
                </el-form-item>
              </el-form>
              <!-- 提醒 -->
              <div class="warning" v-show="messageVisible">
                {{message}}。请重试。如果总是不能登录，请
                <!--点击“忘记密码”或-->
                联系管理员。
              </div>
            </el-tab-pane>
            <el-tab-pane label="二维码登录" name="second">
              <div class="loginTitle">学生工作管理平台</div>
              <div class="codeImg">
                <img src="../assets/images/code.jpg" alt="">
              </div>
              <div class="loginText">请扫描二维码登录</div>
            </el-tab-pane>
          </el-tabs>
          <div class="loginTips">
            <p>1.当用户登录系统后，请及时修改初始密码！</p>
            <p>2.教职工用户名为教职工号，初始密码为教工号</p>
            <p>3.学生用户名为学号，初始密码身份证号后六位</p>
            <p>4.推荐使用扫描二维码方式登录。</p>
            <p>5.咨询电话：36118。</p>
            <p>6.建议使用谷歌、火狐、IE10及以上版本或360浏览器极速模式。</p>
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
    computed: {
      MENU_DATA() {
        return this.$store.getters.MENU_DATA
      },
      CURRENT_MENU_MATE() {
        return this.$store.getters.CURRENT_MENU_MATE;
      },
      CURRENT_MENU() {
        return this.$store.getters.CURRENT_MENU;
      },
      USER_INFO() {
        return this.$store.getters.USER_INFO
      }
    },
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
    data() {
      // 验证码错误
      let checkCaptcha = (rule, value, callback) => {
        let Code = value.toUpperCase();
        if (Code != this.verification.toUpperCase()) {
          callback(new Error("验证码不正确，请重新输入"));
          // this.verification = this.getVerification(4);
        } else {
          callback();
        }
      };
      return {
        activeName:'first',
        photoUrl: "",
        loading: false,
        dict: {
          ZHLX: {
            1: "Admin", // 管理员
            2: "Student", // 学生
            3: "Teacher" // 教师
          }
        },
        //登陆表单
        loginLoading: false,
        loginForm: {
          LoginName: "",
          PassWord: "",
          Code: ""
        },
        //登录表单校验
        loginRules: {
          LoginName: [{
            required: true,
            message: "请输入登录名",
            trigger: "blur"
          }],
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
        message: "您的用户名和密码错误",
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
        console.log(this.verification)
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
        // localStorage.clear()
        this.$refs["loginForm"].validate(valid => {
          if (!valid) {
            this.loadVerification();
            return false;
          }
          // this.loginLoading = true;
          // @特殊处理, 补充密码加密
          let loginForm = JSON.parse(JSON.stringify(this.loginForm));
          loginForm.PassWord = this.$setRSACode(loginForm.PassWord.trim())
          this.$post("/login/localLogin.action", {
              data: {
                userName:loginForm.LoginName,
                password:loginForm.PassWord
              }
            })
            .then(async data => {
              if(data.succsess){
                this.loginLoading = false;
                this.$store.commit("USER_INFO",data);
                if(data.loginName == "admin"){
                  await this.getMenuData()
                  this.$router.push({path:'/home'})
                  return 
                }
                await this.getMenuData2(data.userId)
                this.$router.push({path:'/home'})
              }else{
                this.$message({
                  message: data.Msg,
                  type: "error"
                });
              }
            })
            .catch(err => {
              this.loginLoading = false;
            });
        });
      },
      async getMenuData(){
        await this.$post("/getMenu/getMenu.action", {
          })
          .then(data=>{
            data = data.sort((a,b)=>{
              return parseInt(a.order) - parseInt(b.order)
            })
            this.getMenu(data)
          })
      },
      async getMenuData2(id){
        await this.$post('/qxdj/getMenu.action',{
          data:{
            dto:{jsId:id}
          }
        }).then(data=>{
          let da = data.menuList.sort((a,b)=>{
              return parseInt(a.order) - parseInt(b.order)
            })
            this.getMenu(da)
        })
      },
      getMenu(arr){
        arr.forEach((item,index)=>{
          if(item.level == 2){
            let l3 = arr.filter(e=>{
              return e.ascription == item.id && e.level == 3
            })
            item.children = l3
          } else if (item.level == 1){
            let l2 = arr.filter(e=>{
              return e.ascription == item.id && e.level == 2
            })
            item.children = l2
          }
        })
        let data = arr.filter(e=>e.level == 1)
        this.$store.commit("MENU_DATA",data);
        this.$store.commit("CURRENT_MENU",data[0]);
        this.$store.commit("CURRENT_MENU_MATE",data[0].children);
      },
      // 记住密码
      rememberPassWord() {
        /**
         * @author  LJQ
         *
         * 第一类页面加载时
         * 1、获取缓存中的用户信息
         * 2、对缓存信息进行JSON转换，使用try-catch放置转换报错
         * 3-1、判断记住密码字段false，无操作
         * 3-2、判断记住密码字段true
         * 3-2-1、是否处于有效的时间内（7天）
         * 3-2-1-1、将缓存中的信息赋值到页面
         * 第二类登录提交时
         * 1、获取表单用户名、密码、记住密码、缓存创建时间
         * 2、确认记住密码
         * 2-1、将用户名密码记住密码转为JSON并存储至缓存
         * 3、未确认记住密码,无操作
         */
        // 获取当前时间
        let dateNow = this.getDateTime();
        // 有效验证时间(单位/秒)
        var userTime = this.loginStatusTime * 24 * 60 * 60;
        // 获取缓存中的用户信息
        let jsonUserName = this.$store.getters.REMEMBER_PASSWORD;
        if (![null, undefined, "", "[]", "null"].includes(jsonUserName)) {
          // 对缓存信息进行JSON转换，使用try-catch防止转换报错
          try {
            let _jsonUserName = JSON.parse(jsonUserName.params);
            // 验证是否记住密码true
            if (_jsonUserName.loginStatus === true) {
              // 验证有效期
              if (dateNow - _jsonUserName.createTime < userTime) {
                // 将缓存中的信息赋值到页面
                this.loginForm.LoginName = _jsonUserName.LoginName;
                this.loginForm.PassWord = _jsonUserName.PassWord;
                this.loginStatus = _jsonUserName.loginStatus;
              }
            }
          } catch (e) {
            // 清空REMEMBER_PASSWORD缓存
            this.$store.commit("REMEMBER_PASSWORD", null);
          }
        }
      }
    },
    mounted() {
      this.loadVerification();
      this.rememberPassWord();
    }
  };
</script>
<style>
  .app-login {
    width: 100%;
    height: 100%;
    position: relative;
    background: url(../assets/images/bac.jpg) no-repeat;
    /*background-size: cover;*/
    background-size: 100% 95%;

  }

  .app-login .input-val {
    width: 200px;
    height: 32px;
    border: 1px solid #ddd;
    box-sizing: border-box;
  }

  .app-login #canvas {
    vertical-align: middle;
    box-sizing: border-box;
    /* border: 1px solid #ddd; */
    cursor: pointer;
    background: #fff;
    position: absolute;
    bottom: 2px;
    right: 0;
  }

  .app-login .btn {
    display: block;
    margin-top: 20px;
    height: 32px;
    width: 100px;
    font-size: 16px;
  }

  .app-login .logo {
    height: 95px;
    width: 100%;
    background: #fff;
  }

  .app-login .logo img{
    position: absolute;
    top: 10px;
    left: 28px;
  }

  .app-login .login-content {
    width: 100%;
    height: 88%;
  }

  .app-login .login-right {
    width: 380px;
    height: 480px;
    position: absolute;
    top:55%;
    right: 15%;
    border-radius: 20px;
    background: rgba(255,255,255,.8);
    margin-top:-200px;
  }

  .app-login .login-right_content {
    text-align: center;
  }
  .app-login .login-right_content .loginTitle{
    font-size: 18px;
    color: #0d59a7;
    margin: 5px 0 5px 0;
  }
  .app-login .login-right_content .login-right_tabpane .el-tabs__header .el-tabs__nav-wrap .el-tabs__nav-scroll .el-tabs__nav{
    width: 100%;
  }
  .login-right_tabpane .el-tabs__item:hover{
    color: #0d59a7;
  }
  .login-right_tabpane .is-active{
    color: #0d59a7 !important;
  }
  .app-login .login-right_content .login-right_tabpane .el-tabs__item{
    width: 50%;
  }

  .app-login .company-info {
    width: 100%;
    height: 35px;
    line-height: 35px;
    position: absolute;
    left: 50%;
    bottom: 0;
    transform: translate(-50%);
    font-size: 12px;
    color: #3B81FC;
    background: rgba(255,255,255,.6);
  }
  .app-login .company-info a{
    color: #3B81FC;
  }

  .app-login .verification-code {
    position: absolute;
    right: 50px;
    bottom: 0px;
    cursor: pointer;
    user-select: none;
  }

  .app-login .verification-code>span {
    font-size: 14px;
    font-weight: 400;
    color: #009cff;
    letter-spacing: 4px;
  }

  .app-login .remember-password {
    overflow: hidden;
    text-align: left;
    margin-top: 25px;
  }

  .app-login .remember-password .el-checkbox {
    padding-left: 38px;
  }
  .app-login .remember-password .el-button{
    padding-right: 38px;
    margin-top: -6px;
  }
  .app-login .remember-password .el-checkbox__label {
    color: #333;
    font-size: 12px;
    font-weight: normal;
    padding-right: 3px;
  }

  .app-login .remember-password .el-button--text {
    float: right;
  }

  .app-login .app-login-btn {
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
  .app-login .app-login-btn:hover,
  .app-login .app-login-btn:focus {
    background: linear-gradient(0deg,
        rgba(252, 125, 17, 1),
        rgba(253, 154, 68, 1));
  }

  .app-login .app-login-btn:active {
    background: linear-gradient(0deg,
        rgba(253, 154, 68, 1),
        rgba(252, 125, 17, 1));
  }

  .app-login .el-checkbox__label {
    padding-left: 4px;
  }

  .app-login .login-input input{
    width: 80%;
    height: 40px;
    border-bottom: 1px solid #ccc;
    background: rgba(0,0,0,0);
  }

  .el-form-item__error{
    margin-left: 38px;
  }
  
  .login-right_tabpane .el-form-item{
    margin-bottom: 10px;
  }
  .app-login .el-form-item--mini.el-form-item,
  .app-login .el-form-item--small.el-form-item {
    margin-bottom: 0;
  }

  .app-login .login-input>.el-input__inner {
    background-image: linear-gradient(#ffa018, #ffa018),
    linear-gradient(#dcdfe6, #dcdfe6);
    background-position: left bottom, right bottom;
    background-size: 0 1px, 100% 1px;
    border: none;
    box-shadow: none;
    background-repeat: no-repeat;
    outline: none;
  }

  .app-login .login-input>.el-input__inner:focus {
    border: none;
    box-shadow: none;
    background-size: 100% 1px, 100% 1px;
    transition: all 0.3s linear;
  }

  .app-login .el-form-item.is-error .el-input__inner,
  .app-login .el-form-item.is-error .el-input__inner:focus {
    box-shadow: 0 2px 8px rgba(248, 93, 99, 0.2);
    border-color: #f56c6c;
    border-bottom: 1px solid #f56c6c;
    border-radius: 0;
    background-image: none;
  }

  .app-login .rememberPassword .el-checkbox__inner {
    width: 12px;
    height: 12px;
  }

  .app-login .rememberPassword .el-checkbox__label {
    font-size: 12px;
  }

  .app-login .rememberPassword .el-checkbox__input.is-checked .el-checkbox__inner,
  .el-checkbox__input.is-indeterminate .el-checkbox__inner {
    border-color: #409eff;
    background: #409eff;
  }

  .app-login .rememberPassword .el-checkbox__input.is-checked+.el-checkbox__label {
    color: #409eff;
  }

  .app-login .warning {
    font-size: 14px;
    margin-top: 10px;
    color: red;
    line-height: 20px;
  }

  /* 加载样式重写 */
  .app-login .app-login-btn_custom {
    border-radius: 30px;
  }

  .app-login .app-login-btn_custom .el-loading-spinner {
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }

  .app-login .app-login-btn_custom .el-loading-spinner i,
  .app-login .app-login-btn_custom .el-loading-spinner p {
    display: inline-block;
    vertical-align: middle;
  }

  .app-login .el-form-item.is-error .el-input__inner,
  .app-login .el-form-item.is-error .el-input__inner:focus,
  .app-login .el-form-item.is-error .el-textarea__inner,
  .app-login .el-form-item.is-error .el-textarea__inner:focus {
    box-shadow: none;
  }

  .app-login .el-form-item.is-error .el-input__inner,
  .app-login .el-form-item.is-success .el-input__inner:focus,
  .app-login .el-form-item.is-error .el-textarea__inner,
  .app-login .el-form-item.is-success .el-textarea__inner:focus {
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
  @media screen and (max-width: 1280px){
    .app-login .login-right {
      width: 380px;
      height: 480px;
      position: absolute;
      top:55%;
      right: 26%;
      border-radius: 20px;
      background: rgba(255,255,255,.8);
      margin-top:-250px;
    }
  }
  @media screen and (max-width: 1440px){
    .app-login .login-right {
      width: 300px;
      height: 400px;
      position: absolute;
      top:55%;
      right: 15%;
      border-radius: 20px;
      background: rgba(255,255,255,.8);
      margin-top:-200px;
    }
    .app-login .app-login-btn {
      position: relative;
      width: 70%;
      height: 30px;
      margin-top: 0px;
    }
    .app-login .login-input /deep/ input{
      width: 80%;
      height: 30px;
      border-bottom: 1px solid #ccc;
      background: rgba(0,0,0,0);
      font-size: 10px;
      margin-top: 6px;
    }
    .el-form-item__error{
      font-size: 1px;
    }
    .app-login .remember-password {
      overflow: hidden;
      text-align: left;
      margin-top: 5px;
    }
    .loginTips{
      border-top: 1px dotted  #717171;
      box-sizing: border-box;
      padding: 0px 0 0 20px;
      height: 35%;
      position: absolute;
      bottom: 0;
    }
    .loginTips p{
      font-size: 12px;
      text-align: left;
      color: #444;
      line-height: 20px;
    }
    .codeImg{
      margin-top: 2px;
    }
  }
</style>