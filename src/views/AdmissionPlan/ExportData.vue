<template>
	<!-- 数据导出 -->
	<div class="page-ExportData">
    	<div class="page-container">
    		<!-- 操作框 -->
      	<div class="page-operation-box clearfix">
        	<div class="pull-left">
        		<el-button
              type="primary"
              icon="icon iconfont icondaochu" v-if="btn.export">导出
            </el-button>
        	</div>
        </div>
    		<!-- 列表 -->
    		<div class="app-page-box-table big-height">
	       	  <el-table 
		          border 
		          stripe 
		          tooltip-effect="dark" 
		          highlight-current-row 
		          ref="tableElement" 
		          :data="tableData" 
		          height="100%">
		          <el-table-column align="center" type="selection" width="40"></el-table-column>
	          	<el-table-column fixed label="序号" align="center" type="index" width="50"></el-table-column>
	          	<el-table-column
		            show-overflow-tooltip
		            prop="zd"
		            label="字段"
		            align="center"
		            min-width="100">
		            <template slot-scope="scope">{{ scope.row.zd }}</template>
	          	</el-table-column>
	          	<el-table-column
		            show-overflow-tooltip
		            prop="tj"
		            label="条件"
		            align="center"
		            min-width="100">
		            <template slot-scope="scope">{{ scope.row.tj }}</template>
	          	</el-table-column>
	          	<el-table-column
		            show-overflow-tooltip
		            prop="nr"
		            label="内容"
		            align="center"
		            min-width="100">
		            <template slot-scope="scope">{{ scope.row.nr }}</template>
	          	</el-table-column>
	        </el-table>
	      </div>
    	</div>
	</div>
</template>
<script>
	export default {
		name:"ExportData",
    computed: {
      USER_INFO() {
        return this.$store.getters.USER_INFO
      }
    },
		data(){
			return {
				tableData:[],
        btn:{}
			}
		},
		methods:{
      async getBtns(){
        await this.$post('/qxdj/getBtns.action',{
          loadingEl:'all',
          data:{
            dto:{
              jsId:this.USER_INFO.userId,
              mljd:this.$route.name
            }
          }
        }).then(data=>{
          if(data.dtoList != null){
            data.dtoList.forEach(item=>{
            this.$set(this.btn,[item.gnjd],true)
          })
          }
        })
      },
		},
    mounted(){
	this.getBtns()
    },
    beforeMount(){
      
    }
	}
</script>
<style>
</style>