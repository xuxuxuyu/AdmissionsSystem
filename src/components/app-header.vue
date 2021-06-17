<template>
  <!-- 顶部栏 -->
  <div class="app-header">
    <div class="app-header-logo">
      <img src="../assets/images/lylogo.jpg" />
    </div>
    <!-- 中间导航部分 -->
    <!-- :default-active="$route.path" -->
    <div class="center">
      <el-menu
        mode="horizontal" 
        @select="handleSelect"
        router>
        <el-menu-item :class="$route.path.slice(0,$route.path.indexOf('/',6)) == /home/ + item.url ? 'navbg' : ''" v-for="(item,index) in MENU_DATA" :key="index" :index="/home/ + item.url" @click="handleClick(item)">{{item.name}}</el-menu-item>
      </el-menu>`
    </div>
    <div class="app-header-menu">
      <div class="el-dropdown-link">
        <i class="iconfont icon-user"></i>
        <span style="margin-left: 5px">{{ USER_INFO.roleName }}</span>
        <!-- <i class="el-icon-caret-bottom"></i> -->
      </div>
      <div class="line" style="background: #2196f3"></div>
      <div class="change-pwd">
        <i class="icon iconfont iconxiugaimima" title="修改密码" style="color: #2196f3" @click="changePasswd"></i>
      </div>
      <div class="line"  style="background: #2196f3"></div>
      <div class="logout">
        <i class="icon iconfont icontuichu" title="退出"  style="color: #2196f3" @click="logOutConfirm"></i>
      </div>
    </div>
    <!-- 修改个人密码接口 -->
    <el-dialog
      class="edit-dialog"
      width="500px"
      append-to-body
      title="修改密码"
      :visible.sync="updatePasswdFormDialogVisible">
      <el-form
        :model="updatePasswdForm"
        :rules="updatePasswdFormRules"
        ref="updatePasswdFormElement"
        label-width="100px"
      >
        <el-form-item label="旧密码" prop="OMM">
          <el-input
            v-model="updatePasswdForm.OMM"
            placeholder="请输入"
            type="password"
            clearable
            :autofocus="true"
            ref="OMM_INPUT"
          ></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="NMM">
          <el-input
            v-model="updatePasswdForm.NMM"
            placeholder="6-15位数字，字母，特殊符号"
            type="password"
            clearable
            @keyup.native="mmqd('1')"
          ></el-input>
          <el-progress
            :show-text="false"
            :stroke-width="10"
            :percentage="mmqdObj.percentage"
            :color="mmqdObj.color"
            :style="{'margin-top': '10px'}"
          ></el-progress>
        </el-form-item>
        <el-form-item label="确认密码" prop="RNMM">
          <el-input
            v-model="updatePasswdForm.RNMM"
            placeholder="6-15位数字，字母，特殊符号"
            type="password"
            clearable
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer bottom-btn">
        <el-button
          type="primary"
          class="app-dialog-btn app-confirm"
          @click="changePasswdSave"
        >确认</el-button>
        <el-button
          class="app-dialog-btn app-close"
          @click="updatePasswdFormDialogVisible = false"
        >关闭</el-button>
      </span>
    </el-dialog>
    <!--  初始密码 强制 修改 -->
    <el-dialog
      class="resetPass-edit-dialog"
      width="500px"
      append-to-body
      title="修改密码"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :visible.sync="resetPassDialogVisible">
      <el-form
        :model="resetPassForm"
        :rules="resetPassFormRules"
        ref="resetPassFormElement"
        label-width="100px"
      >
        <el-form-item label="新密码" prop="NMM">
          <el-input
            v-model.trim="resetPassForm.NMM"
            placeholder="6-15位数字，字母，特殊符号"
            type="password"
            clearable
            @keyup.native="mmqd('2')"
          ></el-input>
          <el-progress
            :show-text="false"
            :stroke-width="10"
            :percentage="mmqdObj.percentage"
            :color="mmqdObj.color"
            :style="{'margin-top': '10px'}"
          ></el-progress>
        </el-form-item>
        <el-form-item label="确认密码" prop="RNMM">
          <el-input
            v-model="resetPassForm.RNMM"
            placeholder="6-15位数字，字母，特殊符号"
            type="password"
            clearable
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer bottom-btn">
        <el-button
          ref="resetPassFormSaveBtn"
          type="primary"
          class="app-dialog-btn app-confirm"
          @click="changeResetPass"
        >确认</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  export default{
    name: "appHeader",
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
      //光标默认到输入框上
      // updatePasswdFormDialogVisible(newData) {
      //   this.$nextTick(() => {
      //     if (newData && this.$refs.OMM_INPUT) {
      //       this.$refs.OMM_INPUT.focus();
      //     }
      //   });
      // }
    },
    data(){
      let validatePass = (rule, value, callback) => {
        if (value !== this.updatePasswdForm.NMM) {
          callback(new Error("两次输入密码不一致!"));
        } else {
          callback();
        }
      };
      let validateResetPass = (rule, value, callback) => {
        if (value !== this.resetPassForm.NMM) {
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
        // 修改密码弹框显隐状态
        updatePasswdFormDialogVisible: false,
        // 修改密码表单
        updatePasswdForm: {
          OMM: "",
          NMM: "",
          RNMM: ""
        },
        // 修改密码验证规则
        updatePasswdFormRules: {
          OMM: [{ required: true, message: "请输入旧密码", trigger: "blur" }],
          NMM: [
            { required: true, message: "请输入新密码", trigger: "blur" },
            { validator: mmqdPass, trigger: "blur" }
          ],
          RNMM: [
            { required: true, message: "请再次输入密码", trigger: "blur" },
            { validator: validatePass, trigger: "blur" }
          ]
        },
        mmqdObj: {
          percentage: 0,
          color: "#f56c6c" // 绿  #67c23a   黄 #fd9236   红 #f56c6c
        },
        resetPassDialogVisible: false,
        resetPassForm: {
          NMM: "",
          RNMM: ""
        },
        resetPassFormRules: {
          NMM: [
            { required: true, message: "请输入新密码", trigger: "blur" },
            { validator: mmqdPass, trigger: "blur" }
          ],
          RNMM: [
            { required: true, message: "请再次输入密码", trigger: "blur" },
            { validator: validateResetPass, trigger: "blur" }
          ]
        },
      }
    },
    methods:{
      handleSelect(key, keyPath) {
        // console.log(key, keyPath);
      },
      // 修改密码 -> 打开弹框
      changePasswd() {
        this.updatePasswdForm = {
          OMM: "",
          NMM: "",
          RNMM: ""
        };
        this.updatePasswdFormDialogVisible = true;
      },
      // 修改密码 -> 保存
      changePasswdSave() {
        this.$refs["updatePasswdFormElement"].validate(valid => {
          if (valid) {
            let _url = "";
            let _param = {
              Dto: {
                OMM: this.updatePasswdForm.OMM,
                NMM: this.updatePasswdForm.NMM
              }
            };
            if (this.USER_INFO.ZHLX == "1") {
              // 管理员
              _param = {
                param: {
                  Dto: {
                    OMM: this.updatePasswdForm.OMM,
                    NMM: this.updatePasswdForm.NMM
                  }
                }
              };
              _url = "/LoginApi/UpdatePassword";
            } else if (this.USER_INFO.ZHLX == "2") {
              // 学生
              _url = "/ClientStudent/Home/StudentHomeApi/UpdatePassword";
            } else if (this.USER_INFO.ZHLX == "3") {
              // 教师
              _url = "/ClientTeacher/Home/TeacherHomeApi/UpdatePassword";
            }
            this.$post(_url, {
              loadingEl: this.$refs.updatePasswdFormSaveBtn,
              action: "update",
              data: _param
            }).then(data => {
              this.$message({
                showClose: true,
                message: "修改密码成功",
                type: "success"
              });
              this.logOut();
            });
          }
        });
      },
      //  初始密码 修改保存
      changeResetPass() {
        this.$refs["resetPassFormElement"].validate(valid => {
          if (valid) {
            let _param = {
              param: {
                Dto: {
                  NMM: this.resetPassForm.NMM
                }
              },
              __log: {
                MenuID: new Date().getTime(),
                Logtype: 6,
                Context: "查询"
              },
              __permission: { MenuID: new Date().getTime(), Operation: 0 }
            };
            this.$post("/LoginApi/InitUpdatePassword", {
              loadingEl: this.$refs.resetPassFormSaveBtn,
              data: _param
            }).then(data => {
              // let info = this.$store.getters.USER_INFO
              // info.MMZT = true
              // this.$store.commit("USER_INFO", info);
              // this.resetPassDialogVisible = false
              this.$message({
                showClose: true,
                message: "修改密码成功",
                type: "success"
              });
              this.logOut();
            });
          }
        });
      },
      // 退出系统确认
      logOutConfirm() {
        this.$confirm("是否确认退出系统？", "提示", { type: "warning" })
          .then(() => {
            this.logOut();
          })
          .catch(() => {});
      },
      // 退出系统
      logOut() {
        // let user = this.$store.getters.USER_INFO;
        // this.$post("/LoginApi/Logout", { data: { param: "" } }).then(() => {
        //   this.$store.commit("USER_INFO", null);
        //   this.$store.commit("USER_DATA_POWER", null);
          this.$store.commit("MENU_DATA", null);
          this.$store.commit("CURRENT_MENU_MATE",null);
          this.$store.commit("CURRENT_MENU",null);
        //   if (user && user.WELCOME) {
        //     window.location.href = JSON.parse(sessionStorage.dataUrl).welcomeLogOutUrl;
        //   } else {
        //     window.location.href = JSON.parse(sessionStorage.dataUrl).redirectUrl;
        //     // this.$router.push({ path: JSON.parse(sessionStorage.dataUrl).redirectUrl });
        //   }
        // });
        this.$router.push({path:'/'})
      },
      handleClick(item) {
        this.$store.commit("CURRENT_MENU",null);
        this.$store.commit("CURRENT_MENU_MATE",null);
        this.$store.commit("CURRENT_MENU_MATE",item.children);
        this.$store.commit("CURRENT_MENU",item);
      },
    },
    mounted(){
    }
  }
</script>
<style>
  .app-header {
    position: relative;
    width: 100%;
    height: 40px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
    z-index: 3;
  }
  .app-header .app-header-logo {
    width: 225px;
    position: absolute;
    height: 40px;
    cursor: pointer;
  }
  .app-header .app-header-logo img{
    height:100%;
    width: 100%;
  }
  .app-header .center{
    height: 40px;
    margin-left: 250px;
  }
  .app-header .center .el-menu{
    height: 100%;
    /*width: 50%;*/
    height: 100%;
    position: absolute;
    left: 280px;
    border: 1px solid #fff;
  }
  .app-header .center .el-menu-item{
    color: #2aa1ef;
    height: 100%;
    width: 100px !important;
    text-align: center;
    line-height:40px ;
    padding: 0;
  }
  .app-header .center .el-menu-item:hover{
    background: #ecf5ff !important;
    color: #2aa1ef !important;
  }
  .app-header .center .el-menu-item:focus{
    background: #79BBFF !important;
    color: #fff !important;
  }
  .el-menu .is-active{
    background: #fff;
  }
  .app-header .app-header-logo:after {
    content: "";
    display: inline-block;
    position: absolute;
    right: -25px;
    top: 5px;
    width: 2px;
    height: 30px;
    border-radius: 50%;
    background: #2196f3;
  }
  .app-header .app-header-logo img + img {
    margin-left: 6px;
  }
  .app-header .app-header-menu {
    width: 200px;
    position: absolute;
    right: 100px;
    top: 0;
    height: 100%;
    display: flex;
    align-items: center;
    font-size: 13px;
    color: #898989;
  }
  .app-header .app-header-menu .last-landing-time {
    margin-right: 25px;
  }
  .app-header .app-header-menu .el-badge {
    cursor: pointer;
  }
  .app-header .app-header-menu .el-badge .el-badge__content.is-fixed {
    z-index: 1;
  }
  .app-header .app-header-menu .el-badge .el-icon-bell {
    font-size: 18px;
  }
  .app-header .app-header-menu .el-dropdown-link {
    cursor: pointer;
  }
  .app-header .app-header-menu .change-pwd,
  .app-header .app-header-menu .logout {
    cursor: pointer;
  }
  .app-header .app-header-menu .change-pwd i,
  .app-header .app-header-menu .logout i {
    font-size: 16px;
  }
  .app-header .app-header-menu .change-pwd:hover,
  .app-header .app-header-menu .logout:hover {
    color: #479de6;
  }
  .resetPass-edit-dialog .el-dialog__headerbtn {
    display: none;
  }
  .app-header .navbg{
    background: #79BBFF !important;
    color: #fff !important;
  }

@media screen and (max-width: 1920px) {
  .app-header .app-header-menu .line {
    margin: 23px 10px;
    position: relative;
    width: 1px;
    height: 16px;
  }
}

@media screen and (max-width: 1680px) {
  .app-header .app-header-menu .line {
    margin: 23px 6px;
    position: relative;
    width: 1px;
    height: 16px;
  }
  .app-header .center .el-menu-item{
    color: #2aa1ef;
    height: 100%;
    width: 100%;
    text-align: center;
    line-height: 380%;
  }
}
@media screen and (max-width: 1600px) {
  .app-header .center .el-menu-item{
    color: #2aa1ef;
    height: 100%;
    width: 100%;
    text-align: center;
    line-height: 300%;
  }
}
@media screen and (max-width: 1366px) {
  .app-header .center .el-menu-item{
    color: #2aa1ef;
    height: 100%;
    width: 100%;
    text-align: center;
    line-height: 250%;
  }
}


</style>
