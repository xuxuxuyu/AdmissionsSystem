<template>
  <div class="app-register">
  	<!-- logo -->
    <div class="logo">
      <img src="../../assets/images/lylogo.jpg"/>
    </div>
    <div class="register-content">
    	<div class="register-right"  style="height: 100%">
    		<el-row style="height: 100%">
    			<el-col :span="12" style="border-right: 1px solid #ccc;height:100%">
    				<div class="title">注册账号</div>
    				<div class="register-right_content">
		        	<el-form ref="registerForm" :model="registerForm" :rules="registerFormRules">
			          <el-form-item prop="ksh" label="考生号:">
			            <el-input v-model="registerForm.ksh" placeholder="请输入考生号" clearable></el-input>
			          </el-form-item>
			          <el-form-item prop="xm" label="姓名">
			            <el-input v-model="registerForm.xm" placeholder="请输入姓名" clearable></el-input>
			          </el-form-item>
			          <el-form-item prop="zjhm" label="身份证号:">
			            <el-input v-model="registerForm.zjhm" placeholder="请输入身份证号" clearable></el-input>
			          </el-form-item>
								<el-form-item prop="pwd" label="密码:">
			            <el-input type="password" v-model="registerForm.pwd" placeholder="请输入密码" clearable @keyup.native="changeMeter()" @focus="focus()" @blur="blur()"></el-input> 
	    						<!-- <meter v-if="pswyz" class="pswMeter" max="100" min="0" high="80" low="30" :value="meterValue" optimum="90"></meter>   -->
    						</el-form-item>
			          <el-form-item prop="pswDoubel" label="确认密码:">
			            <el-input type="password" v-model="registerForm.pswDoubel" placeholder="请再次输入密码" clearable></el-input>
			          </el-form-item>
				      </el-form>
				      <el-button type="primary" @click="toRegister()">注册</el-button>
		        </div>
    			</el-col>
    			<el-col :span="12">
    				<div class="tips">
    					<p v-for="(item,key) in zczysx">{{item}}</p>
    				</div>
    			</el-col>
    		</el-row>
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
		name:'register',
		data(){
			var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.registerForm.pwd) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      var validateksh = (rule, value, callback) => {
        // let dt = new Date()
        // let str = dt.getFullYear().toString()
        // let newStr = str.slice(2,4)
        // let reg = new RegExp("^" + newStr)
        if (! /^(\d{14})/.test(value)) {
          callback(new Error('考生号为14位数字'));
        } 
        // else if (! reg.test(value)) {
        //   callback(new Error('考生号有误，请输入正确的考生号'));
        // } 
        else {
          callback();
        }
      };
      var validatePwd = (rule, value, callback) => {
        var reg=/^[0-9]{6,16}$|^[a-zA-Z]{6,16}$/; //  全是数字或字母
        var reg1=/^[A-Za-z0-9]{6,16}$/;  //  数字和字母混合
        var reg2=/^(?=^.{6,16})[0-9A-Za-z]*[^0-9A-Za-z][0-9A-Za-z]*$/;  //  数字字母符号混
        if(value.length < 6){
          callback(new Error('密码长度为6-16位'));
        }else if (reg.test(value)) {
          callback(new Error('密码必须包含至少两种数字,字母,符号'));
        }else{
          callback();
        }
      };
      var validateZjhm = (rule, value, callback) => {
        var reg = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
        if(value.length != 18){
          callback(new Error('身份证号码为18位数字'));
        }else if (! reg.test(value)){
          callback(new Error('身份证号码不合法，请重新输入'));
        }else{
          callback();
        }
      }
			return {
        pswyz:false,
				meterValue:0,
				registerForm:{
					ksh:'',
					xm:'',
					zjhm:'',
					pwd:'',
					pswDoubel:'',
				},
				registerFormRules:{
					ksh: [
						{ required: true, message: "请输入考生号", trigger: "blur" },
						{ pattern:/^(\d{14})/,message: '考生号为14位数字', trigger:'blur'}
            // { validator: validateksh, trigger: 'blur' }
					],
					xm:[
						{ required:true ,message:"请输入姓名", trigger:"blur"},
						{ min: 2, max: 10, message: '姓名长度不超过10字', trigger:'blur'}
					],
					zjhm:[
						{ required:true ,message:"请输入身份证号", trigger:"blur"},
						// { pattern:/^(\d{18}|(\d{17}[Xx]$))/,message: '身份证号为18位数字', trigger:'blur'}
            { validator: validateZjhm, trigger: 'blur' }
					],
					pwd:[
						{ required:true ,message:"请输入密码", trigger:"blur"},
						// { min: 6, max: 16,message: '请输入6-16位数字,字母,特殊符号', trigger:'blur'},
            { validator: validatePwd, trigger: 'blur' }
					],
					pswDoubel:[
            { required:true ,message:"请再次输入密码", trigger:"blur"},
  					{ validator: validatePass2, trigger: 'blur' }
					]
				},
        zczysx:[]
			}
		},
		methods:{
			toRegister(){
				if(this.meterValue < 30){
					this.$message({
            message: "密码过于简单，请重置",
            type: "error"
          });
          return
				}
				this.$refs["registerForm"].validate((valid) => {
          if (!valid) {
          	return 
          }
          let dto = JSON.parse(JSON.stringify(this.registerForm));
          dto.pwd = this.$setRSACode(dto.pwd.trim())
					this.$post("/studentsRegister/insert.action", {
	          data: {
	           dto:dto
	          }
	        }).then(data=>{
	        	if(data.succsess == 1){
	              this.loginLoading = false;
	              this.$router.push({path:'/page-timeout'})
	            }else {
	              this.$message({
	                message: data.msg,
	                type: "error"
	              });
	            }
	          }).catch(err => {
	              this.loginLoading = false;
	            });
        });
			},
			changeMeter(){
        var reg=/^[0-9]{6,16}$|^[a-zA-Z]{6,16}$/; //  全是数字或字母
        var reg1=/^[A-Za-z0-9]{6,16}$/;  //  数字和字母混合
        var reg2=/^(?=^.{6,16})[0-9A-Za-z]*[^0-9A-Za-z][0-9A-Za-z]*$/;  //  数字字母符号混
				if(this.registerForm.pwd.length < 6 || this.registerForm.pwd.match(reg)){
					this.meterValue = 20
				}else if(this.registerForm.pwd.match(reg1)){
        	this.meterValue = 50
        }else if(this.registerForm.pwd.match(reg2)){
        	this.meterValue = 80
        }
			},
      focus(){
        // console.log("触发聚焦")
        this.pswyz = true
        // console.log(this.pswyz)
      },
      blur(){
        // console.log("触发失焦")
        this.pswyz = false
        // console.log(this.pswyz)
      },
      // 判断当前时间是否可以注册
      time(){
        // console.log(new Date())
        let dt = new Date()
        let year = dt.getFullYear()
        this.$post('/examDate/getList.action',{
          loadingEl: this.$refs.tableElement,
          data:{
            dto:{
              dqbj:'1'
            }
          }
        }).then(data=>{
          if(data.succsess==1){
            let now = new Date().getTime()
            let start = new Date(data.list[0].startDate).getTime()
            let end = new Date(data.list[0].endDate).getTime()
            if(now <= Number(start) || now >= Number(end)){
              console.log(111);
              this.$router.push({path:'/page-outApplicationTime'})
              return
            }
            this.handleZYSX(data.list[0].zczysx)
          }else{
            alert(data.msg)
          }
        })
      },
      handleZYSX(str){
        this.zczysx = str.split('\n')
      }
		},
    mounted(){
      this.time()
    }
	}
</script>
<style>
.app-register {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: scroll;
}
.app-register .logo {
  height: 95px;
  width: 100%;
  background: #fff;
}

.app-register .logo  img{
  position: absolute;
  top: 10px;
  left: 28px;
}
.app-register .company-info {
  position: absolute;
  bottom: 2px;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  font-size: 12px;
  color: #3B81FC;
}
.app-register .register-content {
	margin-top: 40px;
  width: 58%;
  /*overflow: scroll;*/
  position: absolute;
  height:60%;
  left: 50%;
	transform: translateX(-50%);
	border: 1px solid #ccc;
  overflow: scroll;
}
.app-register .register-content .register-right .title{
	font-size: 20px;
	margin: 30px;
  margin-bottom: 0;
	text-align: left;
}
.app-register .register-right_content {
  text-align: center;
  margin-top: 4vh;
  margin-left: 20px;
}
.app-register .el-input {
  width: 300px;
}
.app-register .el-form-item--mini.el-form-item,
.app-register .el-form-item--small.el-form-item {
  margin-bottom: 40px;
}
.app-register .el-form-item__error {
  margin: 5px 0 0 25%;
}
.app-register .el-form-item__label{
	width: 80px;
}
.app-register .el-form-item--small.el-form-item .el-input{
  /*background-color: green;*/
  width: 70%;
}
.register-right .tips{
	padding-left: 50px;
  padding-top: 50px;
	text-align: left;
	font-size:14px;
}
.register-right .tips p{
	height: 40px;
	line-height: 40px;
}
.pswMeter{
	display: block;
	width: 150px;
	margin-top: 2vh;
}
@media screen and (max-width: 1440px) {
  .app-register .el-form-item__error {
    margin: 5px 0 0 50px;
  }
  .app-register .el-form-item--mini.el-form-item,
  .app-register .el-form-item--small.el-form-item {
    margin-bottom: 32px;
  }
}@media screen and (max-width: 1366px) {
  .app-register .el-form-item__error {
    margin: 5px 0 0 40px;
  }
}
@media screen and (max-width: 1366px) {
  .app-register .el-form-item__error {
    margin: 5px 0 0 30px;
  }
}
@media screen and (max-width: 1680px) {
  .app-register .el-form-item__error {
    margin: 5px 0 0 100px;
  }
  .app-register .register-content {
    margin-top: 40px;
    width: 58%;
    /*overflow: scroll;*/
    position: absolute;
    height:75%;
    left: 50%;
    transform: translateX(-50%);
    border: 1px solid #ccc;
    overflow: scroll;
  }
}
</style>