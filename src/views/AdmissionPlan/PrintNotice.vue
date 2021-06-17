<template>
	<!-- 打通知书 -->
	<div class="page-PrintNotice">
    <div class="page-container">
  		<div class="page-operation-box clearfix">
        <div class="pull-left">
          <!-- 查询条件 -->
          <div class="cascade-select">
            <el-form :inline="true" :model="dataBase" class="demo-form-inline">
              <el-form-item label="考生号/姓名:">
                <el-input v-model="dataBase.name" placeholder="请输入考生号/姓名"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" size="small" v-if="btn.search">获取分数</el-button>
              </el-form-item>
            </el-form>
          </div>
          <el-button
            size="small"
            type="primary"
            v-if="btn.printNotice">打印通知书
          </el-button>
        </div>
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
            prop="lysf"
            label="来源省份"
            align="center"
            min-width="100">
            <template slot-scope="scope">{{ scope.row.lysf }}</template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="bkkl"
            label="报考科类"
            align="center"
            min-width="100">
            <template slot-scope="scope">{{ scope.row.bkkl }}</template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="xm"
            label="姓名"
            align="center"
            min-width="100">
            <template slot-scope="scope">{{ scope.row.xm }}</template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="xy"
            label="学院"
            align="center"
            min-width="100">
            <template slot-scope="scope">{{ scope.row.xy }}</template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="xnzy"
            label="校内专业"
            align="center"
            min-width="100">
            <template slot-scope="scope">{{ scope.row.xnzy }}</template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="lqzy"
            label="录取专业"
            align="center"
            min-width="100">
            <template slot-scope="scope">{{ scope.row.lqzy }}</template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="ksh"
            label="考生号"
            align="center"
            min-width="100">
            <template slot-scope="scope">{{ scope.row.ksh }}</template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="xh"
            label="学号"
            align="center"
            min-width="100">
            <template slot-scope="scope">{{ scope.row.xh }}</template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="xb"
            label="性别"
            align="center"
            min-width="100">
            <template slot-scope="scope">{{ scope.row.xb }}</template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="csrq"
            label="出生日期"
            align="center"
            min-width="100">
            <template slot-scope="scope">{{ scope.row.csrq }}</template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="zjhm"
            label="证件号码"
            align="center"
            min-width="100">
            <template slot-scope="scope">{{ scope.row.zjhm }}</template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="mz"
            label="民族"
            align="center"
            min-width="100">
            <template slot-scope="scope">{{ scope.row.mz }}</template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="zzmm"
            label="政治面貌"
            align="center"
            min-width="100">
            <template slot-scope="scope">{{ scope.row.zzmm }}</template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="jkzk"
            label="健康状况"
            align="center"
            min-width="100">
            <template slot-scope="scope">{{ scope.row.jkzk }}</template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="wyyz"
            label="外语语种"
            align="center"
            min-width="100">
            <template slot-scope="scope">{{ scope.row.wyyz }}</template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="zydm"
            label="专业代码"
            align="center"
            min-width="100">
            <template slot-scope="scope">{{ scope.row.zydm }}</template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="zf"
            label="总分"
            align="center"
            min-width="100">
            <template slot-scope="scope">{{ scope.row.zf }}</template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="tdcj"
            label="投档成绩"
            align="center"
            min-width="100">
            <template slot-scope="scope">{{ scope.row.tdcj }}</template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="wycj"
            label="外语成绩"
            align="center"
            min-width="100">
            <template slot-scope="scope">{{ scope.row.wycj }}</template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="ywcj"
            label="语文成绩"
            align="center"
            min-width="100">
            <template slot-scope="scope">{{ scope.row.ywcj }}</template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="wykscj"
            label="外语口试成绩"
            align="center"
            min-width="100">
            <template slot-scope="scope">{{ scope.row.wykscj }}</template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="sxcj"
            label="数学成绩"
            align="center"
            min-width="100">
            <template slot-scope="scope">{{ scope.row.sxcj }}</template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="zhcj"
            label="综合成绩"
            align="center"
            min-width="100">
            <template slot-scope="scope">{{ scope.row.zhcj }}</template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="zy1"
            label="专业1"
            align="center"
            min-width="100">
            <template slot-scope="scope">{{ scope.row.zy1 }}</template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="zy2"
            label="专业2"
            align="center"
            min-width="100">
            <template slot-scope="scope">{{ scope.row.zy2 }}</template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="zy3"
            label="专业3"
            align="center"
            min-width="100">
            <template slot-scope="scope">{{ scope.row.zy3 }}</template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="zy4"
            label="专业4"
            align="center"
            min-width="100">
            <template slot-scope="scope">{{ scope.row.zy4 }}</template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="zy5"
            label="专业5"
            align="center"
            min-width="100">
            <template slot-scope="scope">{{ scope.row.zy5 }}</template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="zy6"
            label="专业6"
            align="center"
            min-width="100">
            <template slot-scope="scope">{{ scope.row.zy6 }}</template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="rxnf"
            label="入学年份"
            align="center"
            min-width="100">
            <template slot-scope="scope">{{ scope.row.rxnf }}</template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="zkzh"
            label="准考证号"
            align="center"
            min-width="100">
            <template slot-scope="scope">{{ scope.row.zkzh }}</template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="sjr"
            label="收件人"
            align="center"
            min-width="100">
            <template slot-scope="scope">{{ scope.row.sjr }}</template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="jtzz"
            label="家庭住址"
            align="center"
            min-width="100">
            <template slot-scope="scope">{{ scope.row.jtzz }}</template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="jtyb"
            label="家庭邮编"
            align="center"
            min-width="100">
            <template slot-scope="scope">{{ scope.row.jtyb }}</template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="jtdh"
            label="家庭电话"
            align="center"
            min-width="100">
            <template slot-scope="scope">{{ scope.row.jtdh }}</template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="byxx"
            label="毕业学校"
            align="center"
            min-width="100">
            <template slot-scope="scope">{{ scope.row.byxx }}</template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="drrq"
            label="导入日期"
            align="center"
            min-width="100">
            <template slot-scope="scope">{{ scope.row.drrq }}</template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="sfyzp"
            label="是否有照片"
            align="center"
            min-width="100">
            <template slot-scope="scope">
            	<el-checkbox :disabled="true" v-model="scope.row.sfyzp"></el-checkbox>
            </template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="fctj"
            label="服从调剂"
            align="center"
            min-width="100">
            <template slot-scope="scope">
            	<el-checkbox :disabled="true" v-model="scope.row.fctj"></el-checkbox>
            </template>
          </el-table-column>
					<el-table-column
            show-overflow-tooltip
            prop="tdzy"
            label="投档志愿"
            align="center"
            min-width="100">
            <template slot-scope="scope">{{ scope.row.tdzy }}</template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="kslb"
            label="考生类别"
            align="center"
            min-width="100">
            <template slot-scope="scope">{{ scope.row.kslb }}</template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="tjjl"
            label="体检结论"
            align="center"
            min-width="100">
            <template slot-scope="scope">{{ scope.row.tjjl }}</template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="tjsxbz"
            label="体检受限标志"
            align="center"
            min-width="100">
            <template slot-scope="scope">{{ scope.row.tjsxbz }}</template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="lqfs"
            label="录取方式"
            align="center"
            min-width="100">
            <template slot-scope="scope">{{ scope.row.lqfs }}</template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="wytl"
            label="外语听力"
            align="center"
            min-width="100">
            <template slot-scope="scope">
            	<el-checkbox :disabled="true" v-model="scope.row.wytl"></el-checkbox>
            </template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="wyks"
            label="外语口试"
            align="center"
            min-width="100">
            <template slot-scope="scope">
            	<el-checkbox :disabled="true" v-model="scope.row.wyks"></el-checkbox>
            </template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="kslx"
            label="考生类型"
            align="center"
            min-width="100">
            <template slot-scope="scope">{{ scope.row.kslx }}</template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="bz"
            label="备注"
            align="center"
            min-width="100">
            <template slot-scope="scope">{{ scope.row.bz }}</template>
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
	export default {
		name:"PrintNotice",
    computed: {
      USER_INFO() {
        return this.$store.getters.USER_INFO
      }
    },
		data(){
			return {
				dataBase:{
					name:''
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
      arraySpanMethod(){},
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

    },
    beforeMount(){
          }
	}
</script>
<style>
	.page-PrintNotice{
		position: relative;
		text-align:left;
	}
  .el-form-item__label{
    width: 85px !important;
  }
</style>