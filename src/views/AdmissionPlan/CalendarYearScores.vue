<template>
	<!-- 历年分数 -->
	<div class="page-CalendarYearScores">
  	<div class="page-container">
  		<!-- 查询条件 -->
  		<div class="cascade-select">
  			<el-form :inline="true" :model="dataBase" class="demo-form-inline">
  				<el-form-item label="招生计划:">
	          <el-input v-model="dataBase.year" placeholder="请选择年份"></el-input>
	        </el-form-item>
	        <el-form-item>
	        	<el-input v-model="dataBase.zsjh" placeholder="请选择招生计划"></el-input>
	        </el-form-item>
	        <el-form-item>
						<el-button type="primary" size="small" v-if="btn.search">获取分数</el-button>
					</el-form-item>
  			</el-form>
  		</div>
  		<!-- 列表 -->
  		<div class="app-page-box-table big-height">
  			<el-table
          border
          stripe
          tooltip-effect="dark"
          ref="tableElement"
          :data="tableData"
          height="100%"
          highlight-current-row
          :span-method="arraySpanMethod">
          <el-table-column align="center" type="selection" width="40"></el-table-column>
          <el-table-column fixed label="序号" align="center" type="index" width="50"></el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="provinceName"
            label="省份"
            align="center"
            min-width="100">
            <template slot-scope="scope">{{ scope.row.provinceName }}</template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="SpecialtyName"
            label="专业"
            align="center"
            min-width="100">
            <template slot-scope="scope">{{ scope.row.SpecialtyName }}</template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="subjectName"
            label="科类"
            align="center"
            min-width="100">
            <template slot-scope="scope">{{ scope.row.subjectName }}</template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="maxScore"
            label="最高分"
            align="center"
            min-width="100">
            <template slot-scope="scope">{{ scope.row.maxScore }}</template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="minScore"
            label="最低分"
            align="center"
            min-width="100">
            <template slot-scope="scope">{{ scope.row.minScore }}</template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="avgScore"
            label="平均分"
            align="center"
            min-width="100">
            <template slot-scope="scope">{{ scope.row.avgScore }}</template>
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
    computed: {
      USER_INFO() {
        return this.$store.getters.USER_INFO
      }
    },
		mixins: [table],
		name:"CalendarYearScores",
		data(){
			return {
				requestSuffix:{
          select:'',
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
					year:'',
					zsjh:''
				},
				tableData:[],
        btn:{}
			}
		},
		methods:{
			 // 搜索
      search() {
        this.currentPage = 1;
        // this.getList();
      },
      // 合并表格行
      arraySpanMethod({ row, column, rowIndex, columnIndex }) {

        // if (rowIndex % 2 === 0) {
        //   if (columnIndex === 0) {
        //     return [1, 2];
        //   } else if (columnIndex === 1) {
        //     return [0, 0];
        //   }
        // }
      },
      async load() {
        // 获取列表
        this.getList(true);

      },
      async getList(isPaging, callback) {
      // @特殊处理 是否分页 字段, 要区分 分页 与 不分页的情况
      	await this.setIsPaging(isPaging || true).requestList(callback);
      },
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
      }
		},
		mounted(){
      this.getBtns()
      this.load()
    }
	}
</script>
<style>
	.page-CalendarYearScores{
    position: relative;
		text-align: left;
	}
	.cascade-select .el-form-item /deep/ .el-input{
  	width: 220px;
  	text-align: right;
  }
  .cascade-select .el-form-item__label{
  	width: 80px;
  	text-align: right;
  }
  .cascade-select{
  	margin-bottom: 15px;
  }
</style>