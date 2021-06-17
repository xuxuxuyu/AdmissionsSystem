]<!-- 考试信息 -->
<template>
	<div class="page-TestInfo" id="printTestInfo">
		<div v-if="one" class="one">
			<div class="tipsInfo">请等待考试信息。。。</div>
			<div class="bottom">
				您可以尝试刷新页面，或点击<el-button type="primary" @click="toNext()">查询状态</el-button>
			</div>
		</div>
		<div v-if="!one">
			<div class="page-operation-box clearfix">
	      <div class="pull-left">
	        <el-button type="primary" @click="print()" class="btn">打印准考证</el-button>
	        <!-- <el-button type="primary" @click="next()" class="btn">查看成绩</el-button> -->
	      </div>
    	</div>
			<div class="printTestInfo" >
				<div class="TestInfo-title">
					<span>辽阳职业技术学院2019年单独招生考试</span>
					<span>准考证</span>
				</div>
				<div class="TestInfo-center">
					<div class="center-content">
						<el-row class="item">
							<el-col :span='8' class="item-label">报名号:</el-col>
							<el-col :span="16" class="item-content">
								<span>{{info.bmh}}</span>
							</el-col>
						</el-row>
						<el-row class="item">
							<el-col :span='8' class="item-label">考生号:</el-col>
							<el-col :span="16" class="item-content">
								<span>{{info.ksh}}</span>
							</el-col>
						</el-row>
						<el-row class="item">
							<el-col :span='8' class="item-label">姓名:</el-col>
							<el-col :span="16" class="item-content">
								<span>{{info.ksxm}}</span>
							</el-col>
						</el-row>
						<el-row class="item">
							<el-col :span='8' class="item-label">性别:</el-col>
							<el-col :span="16" class="item-content">
								<span>{{info.ksxb}}</span>
							</el-col>
						</el-row>
						<el-row class="item">
							<el-col :span='8' class="item-label">身份证号:</el-col>
							<el-col :span="16" class="item-content">
								<span>{{info.zjhm}}</span>
							</el-col>
						</el-row>
						<el-row class="itemBig">
							<el-col :span='4' class="item-label">报考科类:</el-col>
							<el-col :span="8" class="item-content">
								<span>{{info.bkkl}}</span>
							</el-col>
							<el-col :span='4' class="item-label">考生类别:</el-col>
							<el-col :span="8" class="item-content">
								<span>{{info.kslb}}</span>
							</el-col>
						</el-row>
						<el-row class="itemBig">
							<el-col :span='4' class="item-label">考试形式:</el-col>
							<el-col :span="8" class="item-content">
								<span>{{info.ksxs}}</span>
							</el-col>
							<el-col :span='2' class="item-label">专业:</el-col>
							<el-col :span="10" class="item-content">
								<span>{{info.bkzy}}</span>
							</el-col>
						</el-row>
						<el-row class="itemBig">
							<el-col :span='4' class="item-label">考试时间:</el-col>
							<el-col :span="20" class="item-content">
								<span>{{info.kskssj}} —— {{info.ksjssj}}</span>
							</el-col>
						</el-row>
						<el-row class="itemBig">
							<el-col :span='4' class="item-label">考试地点:</el-col>
							<el-col :span="20" class="item-content">
								<span>{{info.bjmc}}</span>
							</el-col>
						</el-row>
						<el-row class="itemBig">
							<el-col :span='4' class="item-label">考场号:</el-col>
							<el-col :span="8" class="item-content">
								<span>{{info.kh}}</span>
							</el-col>
							<el-col :span='4' class="item-label">报到序号:</el-col>
							<el-col :span="8" class="item-content">
								<span>{{info.bmh}}</span>
							</el-col>
						</el-row>
						<div class="photo">
							<!-- <span><img src="@/assets/images/code.jpg" alt=""></span> -->
							<span>考生相片</span>
						</div>
					</div>
				</div>
				<div class="TestInfo-footer">
					<div class="tips">
						<div class="tipsTitle">考试须知</div>
						<div class="tipsContent">
							<p>1、考试前30分钟凭准考证和身份证入场.</p>
							<p>2、与考试无关的物品（包括书籍、资料、智能手表、手机和各种缓存与传输信息的器具）禁止带入考室。</p>
							<p>3、保持考室及候考室安静，不准议论、喧哗，不准吸烟，不准自行传递物品，不准暗语。</p>
							<p>4、考试结束后，依次退出考室，不得在考室外逗留。</p>
						</div>
					</div>
				</div>
			</div>
		</div>
		
	</div>
</template>
<script>
	export default {
		name:'TestInfo',
		computed: {
      SELFADMUSER_INFO() {
        return this.$store.getters.SELFADMUSER_INFO
      },
    },
	  data() {
	    return {
	      active:'',
	      one:true,
	      info:{
	      	ksh:"5645"
	      },
	      optionsKSXS:[]
	    }
	  },
	  methods: {
	  	print(){
	  		var printhtml = document.getElementById('printTestInfo').innerHTML // 获取打印区域
	  		var oldhtml = document.body.innerHTML
				document.body.innerHTML = printhtml // 赋值打印
				window.print()
		  	window.document.body.innerHTML = oldhtml
  			window.location.reload()
				window.close()
	  	},
	  	getInfo(){
	  		let ksh = this.SELFADMUSER_INFO
				this.$post("/administration/getList.action", {
          data: {
           dto:{ksh:ksh} 
          }
        }).then(data=>{
        	if(data.succsess != 1){
        		this.$message({
              message: data.msg,
              type: "error"
            });
            return
        	}
        	this.optionsKSXS.forEach(item=>{
            if(data.list[0].ksxs == item.dmbh){
              data.list[0].ksxs = item.dmmc
            }
          })
        	this.info = data.list[0]
        })
	  	},
	  	toNext(){
	  		let ksh = this.SELFADMUSER_INFO
				this.$post("/studentsRegister/getList.action", {
          data: {
           dto:{ksh:ksh} 
          }
        }).then(data=>{
        	if(data.dtoList[0].fbzt == 1 && data.dtoList[0].jfzt == 1){
        		this.one = false
        		this.$alert('点击查看考试信息', '审核成功', {
		          confirmButtonText: '确定',
		          callback: action => {
		          	this.$route.meta.index = 4
		          	console.log(this.$route)
		            this.one = false
		            this.getInfo()
		          }
		        });
        	}else{
        		this.$alert('请等待查看考试信息', '', {
		          confirmButtonText: '确定',
		          callback: action => {}
		        });
        	}
        })
	  	},
	  	// 获取考试形式
      async getKSXS(){
        this.$post('/STCode/getList.action',{
          loadingEl:this.$refs.editDialog,
          data:{
            dmbt:'KSXS',
            sfsyzjd:'1'
          }
        }).then(data=>{
          if(data.succsess){
            this.optionsKSXS = data.list
          }
        })
      },
	  },
	  mounted(){
	  	this.toNext()
			this.getKSXS()
	  	// console.log(this.$route.meta);
	  }
	}
</script>
<style>
	.page-TestInfo{
		width: 100%;
		height: 100%;
		position: relative;
		overflow-y: scroll;
	}
	.page-TestInfo .one{
		position: absolute;
		top: 30%;
		left: 50%;
		transform: translateX(-50%);
	}
	 .printTestInfo{
	 	margin-top: 30px;
	 	text-align: center;
		border: 1px solid #ccc;
		width: 70%;
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
	}
	.printTestInfo .tipsInfo{
		font-size: 16px;
		width: 50%;
		height: 30px;
		position: absolute;
		left: 50%;
		top: 30%;
		transform: translate(-50%,-50%);
	}
	.printTestInfo .bottom{
		position: absolute;
		left: 50%;
		top: 40%;
		transform: translate(-50%,-50%);
	}
	 .printTestInfo .TestInfo-title{
		width: 100%;
		height: 10%;
		font-size: 20px;
		padding-top: 20px;
	}
	 .printTestInfo .TestInfo-title span:nth-of-type(1){
		display: block;
		margin-bottom: 10px;
	}
	 .printTestInfo .TestInfo-center{
		width: 100%;
		height: 60%;
	}
	 .printTestInfo .TestInfo-center .center-content{
		margin: 10px auto;
		width: 95%;
		height: 95%;
		position: relative;
	}
	 .printTestInfo .TestInfo-center .center-content .item{
		width: 50%;
		height: 8%;
		margin-bottom: 1%;
	}
	 .printTestInfo .TestInfo-center .center-content .itemBig{
		width: 100%;
		height: 8%;
		margin-bottom: 2%;
	}
	 .printTestInfo .TestInfo-center .center-content .item-label{
		margin-top: 5%;
		text-align-last:justify;
		text-align:justify;
		text-justify:distribute-all-lines;
	}
	 .printTestInfo .TestInfo-center .center-content .itemBig .item-label{
		margin-top: 2.5%;
	}

	 .printTestInfo .TestInfo-center .center-content .item-content{
		height: 100%;
		border-bottom: 1px solid #000;
		position: relative;
		margin-top: 30px;
	}
	 .printTestInfo .TestInfo-center .center-content .item-content span{
		display: block;
		position: absolute;
		bottom: 0;
		left: 50%;
		transform: translateX(-50%);
		width: 100%;
	}
	 .printTestInfo .TestInfo-center .center-content .photo{
		margin-top: 2%;
		width: 25%;
		height: 42%;
		position: absolute;
		top: 0;
		right: 10%;
		border: 1px dotted #ccc;
	}
	 .printTestInfo .TestInfo-center .center-content .photo span{
		display: block;
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%,-50%);
	}
	 .printTestInfo .TestInfo-footer {
		width: 100%;
		/*height: 30%;*/
		margin-top: 20px;
	}
	 .printTestInfo .TestInfo-footer .tips{
		width: 90%;
		height: 80%;
		border: 1px solid #ccc;
		margin:15px auto;
	}
	 .printTestInfo .TestInfo-footer .tips .tipsTitle{
		margin: 5px;
	}
	 .printTestInfo .TestInfo-footer .tips .tipsContent{
		text-align: left;
		font-size: 14px;
		display: flex;
		flex-direction:column;
		align-content: stretch;
	}
	 .printTestInfo .TestInfo-footer .tips .tipsContent p{
		margin: 0 0 5px 10px;
	}
	@media only screen and (max-width: 1440px) {
		.printTestInfo{
			width: 90%;
		}
	}
	@media only screen and (max-width: 1680px) {
		.printTestInfo{
			width: 90%;
		}
	}
	@media print{
		.btn{
			display: none;
		}
		.printTestInfo{
			margin-top: 30px;
			width: 90%;
			height: 85%;
		}
		.TestInfo-title{
			margin-top: 40px;
			font-size: 30px !important;
			margin-bottom: 40px !important;
		}
		.printTestInfo .TestInfo-center .center-content .item-label{
			font-size: 24px;
			font-weight: bold;
		}
		.printTestInfo .TestInfo-center .center-content .item-content{
			font-size: 22px;
			height: 15px;
		}
		.printTestInfo .TestInfo-footer{
			height: 50px;
			margin-top: -20px !important;
		}
		.printTestInfo .TestInfo-footer .tips{
			border: 1px solid #ccc;
			height: 265px;
			width: 80%;
			padding: 0 20px 0 20px;
		}
		.printTestInfo .TestInfo-footer .tipsTitle{
			margin-top: 20px !important;
			font-size: 24px;
		}
		.printTestInfo .TestInfo-footer .tipsContent{
			font-size: 22px !important;
		}
		.printTestInfo .TestInfo-footer .tipsContent p{
			margin-top: 10px !important;
		}
		/*.printTestInfo .TestInfo-center .center-content .photo{
			position: absolute;
			top: 0;
			left: 60%;
		}*/
	}
</style>