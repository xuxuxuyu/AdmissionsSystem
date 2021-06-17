<template>
  <div class="app-forgetchangepass">
    <!-- logo -->
    <div class="logo">
      <img src="../../assets/images/login-logo.png" class="logo-icon" />
      <img src="../../assets/images/login-logo-name.png" class="logo-icon-name" />
    </div>
    <div class="forget-content">
      <h1>重置密码</h1>

      <div class="forget-right">
        <div class="forget-right_content">
          <el-form
            :model="forgetForm"
            :rules="forgetRules"
            ref="forgetForm"
            label-width="100px"
            label-position="right"
          >
            <div class="page-box-content">
              <el-row :gutter="20">
                <el-col :span="24">
                  <el-form-item prop="name" label="姓名">
                    <el-input v-model="forgetForm.name" placeholder readonly></el-input>
                  </el-form-item>
                  <el-form-item prop="newPass" label="新密码" :style="{'margin-bottom': '20px'}">
                    <el-input
                      v-model.trim="forgetForm.newPass"
                      placeholder="6-15位数字，字母，特殊符号"
                      @keyup.native="mmqd()"
                      clearable
                    ></el-input>
                    <el-progress
                      :show-text="false"
                      :stroke-width="10"
                      :percentage="mmqdObj.percentage"
                      :color="mmqdObj.color"
                      :style="{'margin-top': '8px','width': '250px', 'float': 'right'}"
                    ></el-progress>
                  </el-form-item>
                  <el-form-item prop="qrPass" label="确认密码">
                    <el-input v-model.trim="forgetForm.qrPass" placeholder="请确认密码" clearable></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </el-form>
          <el-button :style="{'margin-top': '50px'}" type="primary" @click="toGetPass">确定</el-button>
        </div>
      </div>
    </div>
    <!-- 提醒 -->
    <div class="company-info">
      Copyright © 2019
      <a href="http://www.lingzhansoft.com/" target="_Blank">长春凌展软件有限责任公司</a>
      All rights reserved.
    </div>
  </div>
</template>

<script>
export default {
  name: "app",
  computed: {},
  watch: {
    "forgetForm.newPass"(newVal, oldVal) {
      if (!newVal) {
        this.mmqdObj = {
          percentage: 0,
          color: "#f56c6c"
        };
      }
    }
  },
  data() {
    let validateResetPass = (rule, value, callback) => {
      if (value !== this.forgetForm.newPass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    let mmqdPass = (rule, value, callback) => {
      if (this.mmqdObj.percentage == 0) {
        callback(new Error("请保证密码强度!"));
      } else {
        callback();
      }
    };
    return {
      mmqdObj: {
        percentage: 0,
        color: "#f56c6c"
      },
      user: null,
      PWYHID: "",
      sj: "",
      forgetForm: {
        name: "",
        newPass: "",
        qrPass: ""
      },
      //登录表单校验
      forgetRules: {
        newPass: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { validator: mmqdPass, trigger: "blur" }
        ],
        qrPass: [
          { required: true, message: "请确认密码", trigger: "blur" },
          { validator: validateResetPass, trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    mmqd() {
      let colorList = {
        lv: "#67c23a",
        hong: "#f56c6c",
        huang: "#fd9236"
      };
      let code_length = 0;
      let value = this.forgetForm.newPass;
      if (value.length > 15 || value.length < 6) {
        this.mmqdObj = {
          percentage: 0,
          color: colorList.hong
        };
        return;
      }

      if (/[0-9]/.test(value)) {
        code_length++;
      }
      if (/[a-z]/.test(value)) {
        code_length++;
      }
      if (/[A-Z]/.test(value)) {
        code_length++;
      }
      if (/[^a-zA-Z0-9]/.test(value)) {
        code_length++;
      }
      if (code_length == 0) {
        this.mmqdObj = {
          percentage: 0,
          color: colorList.hong
        };
        return;
      }

      if (code_length == 1) {
        this.mmqdObj = {
          percentage: 33,
          color: colorList.hong
        };
      } else if (code_length == 2) {
        this.mmqdObj = {
          percentage: 50,
          color: colorList.huang
        };
      } else if (code_length == 3) {
        this.mmqdObj = {
          percentage: 70,
          color: colorList.huang
        };
      } else if (code_length == 4) {
        this.mmqdObj = {
          percentage: 100,
          color: colorList.lv
        };
      }
    },
    toGetPass() {
      if (this.mmqdObj.percentage == 0) {
        return;
      }
      this.$refs["forgetForm"].validate(valid => {
        if (valid) {
          this.$post("/LoginApi/ModifyPwd", {
            data: {
              param: {
                ModifyPwdParam: {
                  PWYHID: this.PWYHID,
                  NewPassWord: this.forgetForm.newPass
                }
              }
            },
            action: "select",
            loadingEl: "all"
          }).then(data => {
            if (!data.message) {
              this.$confirm("重置密码成功，请重新登陆！", "提示", {
                showCancelButton: false,
                confirmButtonText: "确定",
                type: "success"
              }).then(() => {
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
  mounted() {
    this.PWYHID = this.$route.params.PWYHID;
    this.sj = this.$route.params.sj;
    if (this.PWYHID == "null" || this.sj == "null") {
      this.$message({
        type: "warning",
        message: "路径错误，请输入正确地址"
      });
    } else {
      this.$post("/LoginApi/GetDtoByPWYHID", {
        data: {
          param: {
            SJ: this.sj,
            RelationID: this.PWYHID
          }
        },
        action: "select"
      }).then(data => {
        this.user = data;
        this.forgetForm.name = data.YHM;
      });
    }
  }
};
</script>
<style>
.app-forgetchangepass {
  width: 100%;
  height: 100%;
  position: absolute;
}

.app-forgetchangepass .logo {
  position: absolute;
  top: 36px;
  left: 28px;
}

.app-forgetchangepass .logo .logo-icon-name {
  position: relative;
  top: -4px;
}

.app-forgetchangepass .logo .logo-icon {
  margin-right: 29px;
}

.app-forgetchangepass .app-header {
  box-shadow: none;
  margin: 30px 0 0 20px;
}

.app-forgetchangepass .forget-content {
  width: 1078px;
  height: 506px;
  overflow: hidden;
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -539px;
  margin-top: -253px;
}
.app-forgetchangepass .forget-content > h1 {
  text-align: center;
  font-size: 20px;
  color: #333;
}

.app-forgetchangepass .forget-left {
  float: left;
}

.app-forgetchangepass .forget-left > img {
  /*width: 500px;*/
  height: 500px;
}

.app-forgetchangepass .forget-right {
  width: 400px;
  margin: auto;
}

.app-forgetchangepass .forget-right_content {
  text-align: center;
  margin-top: 4vh;
}

.app-forgetchangepass .company-info {
  position: absolute;
  right: 100px;
  bottom: 18px;
  font-size: 12px;
  color: #b9b9b9;
}

.app-forgetchangepass .header {
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
.app-forgetchangepass .el-input {
  float: right;
  width: 250px;
}
.app-forgetchangepass .el-form-item--mini.el-form-item,
.app-forgetchangepass .el-form-item--small.el-form-item {
  margin-bottom: 30px;
}
.app-forgetchangepass .el-form-item__error {
  margin-left: 60px;
}
</style>
