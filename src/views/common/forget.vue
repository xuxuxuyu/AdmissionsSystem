<template>
  <div class="app-forget">
    <!-- logo -->
    <div class="logo">
      <img src="../../assets/images/logo.png"/>
    </div>
    <div class="forget-content">
      <h1>忘记密码</h1>
      <div class="forget-right">
        <div class="forget-right_content">
          <el-form ref="forgetForm" :model="forgetForm" :rules="forgetRules">
            <el-form-item prop="radio" label="身份">
              <el-radio-group v-model="forgetForm.radio">
                <el-radio :label="1">学生</el-radio>
                <el-radio :label="2">教师</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item prop="email" label="邮箱">
              <el-input v-model="forgetForm.email" placeholder="请输入关联邮箱" clearable></el-input>
            </el-form-item>
          </el-form>
          <el-button :style="{'margin-top': '50px'}" type="primary" @click="toGetPass">找回密码</el-button>
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
  name: "forget",
  computed: {},

  data() {
    return {
      forgetForm: {
        radio: "",
        email: ""
      },
      //登录表单校验
      forgetRules: {
        radio: [{ required: true, message: "请选择身份", trigger: "change" }],
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          {
            pattern: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/,
            message: "请输入正确邮箱地址",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    toGetPass() {
      this.$refs["forgetForm"].validate(valid => {
        if (valid) {
          this.$post("/LoginApi/CheckPassWord", {
            data: {
              param: {
                CheckPwdParam: {
                  DZYJ: this.forgetForm.email,
                  LX: this.forgetForm.radio
                }
              }
            },
            action: "select",
            loadingEl: "all"
          }).then(data => {
            if (!data.message) {
              this.$confirm(
                "已将重置密码链接发至您的邮箱，请注意查收！",
                "提示",
                {
                  showCancelButton: false,
                  confirmButtonText: "确定",
                  type: "success"
                }
              ).then(() => {
                this.$router.push({ name: "Login" });
              });
            } else {
              this.$message({
                type: "warning",
                message: data.message
              });
            }
          });
        }
      });
    }
  },
  mounted() {}
};
</script>
<style>
.app-forget {
  width: 100%;
  height: 100%;
  position: absolute;
}

.app-forget .logo {
  position: absolute;
  top: 36px;
  left: 28px;
}

.app-forget .logo .logo-icon-name {
  position: relative;
  top: -4px;
}

.app-forget .logo .logo-icon {
  margin-right: 29px;
}

.app-forget .app-header {
  box-shadow: none;
  margin: 30px 0 0 20px;
}

.app-forget .forget-content {
  width: 1078px;
  height: 506px;
  overflow: hidden;
  position: absolute;
  left: 48%;
  top: 50%;
  margin-left: -539px;
  margin-top: -253px;
}
.app-forget .forget-content > h1 {
  text-align: center;
  font-size: 20px;
  color: #333;
}

.app-forget .forget-left {
  float: left;
}

.app-forget .forget-left > img {
  /*width: 500px;*/
  height: 500px;
}

.app-forget .forget-right {
  width: 310px;
  margin: auto;
}

.app-forget .forget-right_content {
  text-align: center;
  margin-top: 4vh;
}

.app-forget .company-info {
  position: absolute;
  right: 100px;
  bottom: 18px;
  font-size: 12px;
  color: #3B81FC;;
}

.app-forget .header {
  font-size: 20px;
  letter-spacing: 1px;
  font-weight: 500;
  text-shadow: 0px 2px 1px rgba(51, 51, 51, 0.3);
  background-image: linear-gradient(0deg, rgb(56, 56, 56), rgb(90, 90, 90));
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  padding-bottom: 18px;
}
.app-forget .el-input {
  width: 200px;
}
.app-forget .el-form-item--mini.el-form-item,
.app-forget .el-form-item--small.el-form-item {
  margin-bottom: 30px;
}
.app-forget .el-form-item__error {
  margin-left: 90px;
}
</style>
