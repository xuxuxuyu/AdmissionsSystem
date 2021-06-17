<template>
	<!-- 日志查询 -->
	<div class="page-LogQuery">
    <div class="page-container">
  		<!-- 查询条件 -->
  		<div class="cascade-select">
  			<el-form :inline="true" :model="dataBase" class="demo-form-inline">
  				<el-row>
  					<el-form-item label="开始日期:">
  						<el-date-picker
  		          v-model="dataBase.rqStart"
  		          type="date"
  		          value-format="yyyy-MM-dd"
  		          placeholder="格式：yyyy-MM-dd">
  	          </el-date-picker>
  					</el-form-item>
  					<el-form-item label="结束日期:">
  						<el-date-picker
  		          v-model="dataBase.rqEnd"
  		          type="date"
  		          value-format="yyyy-MM-dd"
  		          placeholder="格式：yyyy-MM-dd">
  	          </el-date-picker>
  					</el-form-item>
  					<el-form-item label="教职员:">
  	          <el-input v-model="dataBase.name" placeholder="请输入教职员"></el-input>
  	        </el-form-item>
  				</el-row>
  				<el-row>
  					<el-form-item label="用户:">
  	          <el-input v-model="dataBase.userName" placeholder="请输入用户"></el-input>
  	        </el-form-item>
  	        <el-form-item label="操作类型">
  	        	<el-select v-model="dataBase.czlx" clearable placeholder="请选择">
                <el-option :label="item.label" :value="item.value" v-for="item in CZLXoption" :key="item.value"></el-option>
              </el-select>
  	        </el-form-item>
  	        <el-form-item label="操作状态">
  	        	<el-select v-model="dataBase.czzt" class="width-percent-100" clearable placeholder="请选择">
                <el-option :label="item.label" :value="item.value" v-for="item in CZZToption" :key="item.value"></el-option>
              </el-select>
  	        </el-form-item>
  					<el-form-item>
  						<el-button type="primary" class="btn0" @click="onSubmit()" size="small" >查询</el-button>
  					</el-form-item>
  				</el-row>
  			</el-form>
  		</div>
  		<!-- 操作 -->
  		<div class="page-operation-box clearfix btn">
        <div class="pull-right">
        	<el-button>列表设置</el-button>
        </div>
      </div>
     	<!-- 列表 -->
     	<div class="app-page-box-table big-height">
     		<el-table
          border
          stripe
          height="100%"
          tooltip-effect="dark"
          ref="tableElement"
          :data="tableData"
          highlight-current-row>
          <el-table-column align="center" type="selection" width="40"></el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="userName"
            label="用户"
            align="center"
            min-width="80">
            <template slot-scope="scope">{{scope.row.userName}}</template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="name"
            label="教职员"
            align="center"
            min-width="80">
            <template slot-scope="scope">{{scope.row.name}}</template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="czrq"
            label="操作日期"
            align="center"
            min-width="80">
            <template slot-scope="scope">{{scope.row.czrq}}</template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="czzt"
            label="操作状态"
            align="center"
            min-width="80">
            <template slot-scope="scope">
              <span v-if="scope.row.czzt == 1"> 正常 </span>
              <span v-if="scope.row.czzt == 2"> 无效 </span>
            </template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="czlx"
            label="操作类型"
            align="center"
            min-width="80">
            <template slot-scope="scope">
              <span v-if="scope.row.czlx == 1"> 新增 </span>
              <span v-if="scope.row.czlx == 2"> 修改 </span>
              <span v-if="scope.row.czlx == 3"> 删除 </span>
              <span v-if="scope.row.czlx == 4"> 登录 </span>
            </template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="ssdh"
            label="所属导航"
            align="center"
            min-width="80">
            <template slot-scope="scope">{{scope.row.ssdh}}</template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="ip"
            label="IP地址"
            align="center"
            min-width="80">
            <template slot-scope="scope">{{scope.row.ip}}</template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="cznr"
            label="操作内容"
            align="center"
            min-width="80">
            <template slot-scope="scope">{{scope.row.cznr}}</template>
          </el-table-column>
        </el-table>
     	</div>
     	<!--分页-->
      <div class="page-pagination">
        <div class="page-show-disable">
          <el-checkbox v-model="showColumnDisable" @change="search">显示全部数据</el-checkbox>
        </div>
        <el-pagination
          :total="total"
          :page-size="pageSize"
          :page-sizes="pageSizes"
          :current-page="currentPage"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          layout="total, sizes, prev, pager, next, jumper"
        ></el-pagination>
      </div>
    </div>
	</div>
</template>
<script>
	import table from "@/mixin/table.vue";
	export default {
		mixins: [table],
		name:"LogQuery",
		data(){
			return {
				requestSuffix:{

        },
				selectConfig: {
          // 表格的通用请求
          table: {
            order: [
            ],
            fuzzy: [
            ],
            where: [
            ]
          }
        },
				dataBase:{
          czlx : '',
          czzt : '',
          jsrq : '',
          ksrq : '',
          name : '',
          rqEnd : '',
          rqStart : '',
          userName : ''
        },
				CZLXoption:[
					{value:'1',label:'新增'},
          {value:'2',label:'修改'},
          {value:'3',label:'删除'},
          {value:'4',label:'登录'}
				],
				CZZToption:[
					{value:'1',label:'正常'},
          {value:'2',label:'无效'}
				],
				tableData:[],
			}
		},
		methods:{
			onSubmit(){
        this.$post('/STOperationLog/getList.action',{
          loadingEl: this.$refs.tableElement,
          data: this.dataBase
        }).then(data=>{
          if(data.succsess){
            this.tableData = data.list
          }else{
            this.$message({message: "未查询到该信息", type: "error"});
            this.tableData = []
          }
        })
      },
      async getList() {
        this.$post('/STOperationLog/getList.action',{
          loadingEl: this.$refs.tableElement,
          data:{
            dto:{}
          }
        }).then(data=>{
          if(data.succsess){
            this.tableData = data.list
          }
        })
      },
      async load() {
        // 获取列表
        this.getList();
      },
      // 搜索
      search() {
        this.currentPage = 1;
        // this.getList();
      },

		},
    mounted(){
      this.load()
    }
	}
</script>
<style>
	.page-LogQuery {
    position: relative;
		text-align: left;
    height: 92%;
	}
  .cascade-select .el-form-item /deep/ .el-input{
  	width: 220px;
  	text-align: right;
  }
  .cascade-select .el-form-item__label{
  	width: 80px;
  	text-align: right;
  }
  .page-LogQuery .btn{
    position: absolute;
    top: 43px;
    right: 50px;
  }
   @media screen and (max-width: 1600px) {
    .cascade-select .el-form-item /deep/ .el-input{
      width: 200px;
      text-align: right;
    }
    .page-LogQuery .btn0{
      position: absolute;
      top: 0;
      right: -30px;
    }
  }
</style>