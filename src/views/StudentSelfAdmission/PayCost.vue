<!-- 缴费 -->
<template>
	<div class="page-PayCost">
		<div>
			<!-- <div class="tipsInfo">请等待查看考试信息...</div> -->
			<div class="tipsInfo">请缴费</div>
		</div>
		<div class="bottom">
			您可以尝试刷新页面，或点击<el-button type="primary" @click="toNext()">查询状态</el-button>
		</div>
	</div>
</template>
<script>
	export default {
		name:'PayCost',
		computed:{
			SELFADMUSER_INFO() {
        return this.$store.getters.SELFADMUSER_INFO
      },
		},
		data(){
			return {
			}
		},
		methods:{
			toNext(){
				let ksh = this.SELFADMUSER_INFO
				this.$post("/studentsRegister/getList.action", {
          data: {
           dto:{ksh:ksh} 
          }
        }).then(data=>{
        	// if(data.dtoList[0].jfzt == '1' && data.dtoList[0].fbzt == 1){
        	// 	this.$alert('请查看考试信息', '', {
		       //    confirmButtonText: '确定',
		       //    callback: action => {
		       //      this.$router.push({path:'/StudentSelfAdmissionHome/TestInfo'})
		       //    }
		       //  });
		       //  return
        	// }else if(data.dtoList[0].jfzt == 1 && data.dtoList[0].fbzt != 1){
	        // 	this.$alert('您的考试信息还未出来，请等待', '', {
		       //    confirmButtonText: '确定',
		       //    callback: action => {}
		       //  });
        	// }
        	if(data.dtoList[0].approval == 1 && data.dtoList[0].jfzt == 1){
        		this.$alert('您的缴费信息已审核成功，点击查看考试信息', '审核成功', {
		          confirmButtonText: '确定',
		          callback: action => {
		            this.$router.push({path:'/StudentSelfAdmissionHome/TestInfo'})
		          }
		        });
        	}else{
        		this.$alert('请缴费，若已缴费，请等待', '请缴费', {
		          confirmButtonText: '确定',
		          callback: action => {}
		        });
        	}
        })
			},
		},
		mounted(){
		}
	}
</script>
<style>
	.page-PayCost{
		width: 100%;
		height: 100%;
		position: relative;
	}
	.page-PayCost .tipsInfo{
		font-size: 16px;
		width: 50%;
		height: 30px;
		position: absolute;
		left: 50%;
		top: 30%;
		transform: translate(-50%,-50%);
	}
	.page-PayCost .bottom{
		position: absolute;
		left: 50%;
		top: 40%;
		transform: translate(-50%,-50%);
	}
</style>