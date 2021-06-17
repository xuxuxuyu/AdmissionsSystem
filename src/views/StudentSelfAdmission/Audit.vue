<!-- 审核 -->
<template>
	<div class="page-Audit">
		<div v-if="approval == 0">
			<el-button type="primary" class="back" @click="back()">返回修改志愿</el-button>
			<div class="tipsInfo">您的报名信息正在审核，请等待审核。。。</div>
		</div>
		<!-- <div v-if="approval == 1 && jfzt != 1">
			<div class="tipsInfo">您的报名信息已审核成功，请等待缴费审核。。。</div>
		</div> -->
		<div class="bottom">
			您可以尝试刷新页面，或点击<el-button type="primary" @click="getzt()">查询状态</el-button>
		</div>
	</div>
</template>
<script>
	export default {
		name:'Audit',
		computed:{
			SELFADMUSER_INFO() {
        return this.$store.getters.SELFADMUSER_INFO
      },
		},
		data(){
			return {
				approval:'',
				jfzt:''
			}
		},
		methods:{
			getzt(){
				let ksh = this.SELFADMUSER_INFO
				this.$post("/studentsRegister/getList.action", {
          loadingEl:this.$refs.elForm,
          data: {
           dto:{ksh:ksh} 
          }
        }).then(data=>{
        	if(data.dtoList[0].approval == 0){
        		this.$alert('您的报名信息正在审核，请等待审核', '', {
		          confirmButtonText: '确定',
		          callback: action => {
		          	this.approval = data.dtoList[0].approval
        				this.jfzt = data.dtoList[0].jfzt
		          }
		        });
        	}else if(data.dtoList[0].approval == 1 && data.dtoList[0].jfzt != 1){
	        	this.$alert('您的报名信息已审核成功，请缴费', '审核成功', {
		          confirmButtonText: '确定',
		          callback: action => {
		          // 	this.approval = data.dtoList[0].approval
        				// this.jfzt = data.dtoList[0].jfzt
        				this.$router.push({path:'/StudentSelfAdmissionHome/PayCost'})
		          }
		        });
        	}
        	// else if(data.dtoList[0].approval == 1 && data.dtoList[0].jfzt == 1){
        	// 	this.$alert('您的缴费信息已审核成功，点击查看考试信息', '审核成功', {
		       //    confirmButtonText: '确定',
		       //    callback: action => {
		       //      this.$router.push({path:'/StudentSelfAdmissionHome/PayCost'})
		       //    }
		       //  });
        	// }
        	this.approval = data.dtoList[0].approval
  				this.jfzt = data.dtoList[0].jfzt
        })
			},
			back(){
				this.$router.push({path:'/StudentSelfAdmissionHome/Application'})
			}
		},
		mounted(){
			// this.getzt()
		}
	}
</script>
<style>
	.page-Audit{
		width: 100%;
		height: 100%;
		position: relative;
	}
	.page-Audit .tipsInfo{
		font-size: 16px;
		width: 50%;
		height: 30px;
		position: absolute;
		left: 50%;
		top: 30%;
		transform: translate(-50%,-50%);
	}
	.page-Audit .bottom{
		position: absolute;
		left: 50%;
		top: 40%;
		transform: translate(-50%,-50%);
	}
	.page-Audit .back{
		position: absolute;
		top: 3%;
		left: 3%;
	}
</style>