<template>
	<!-- 专业调整 -->
	<div class="page-ProfessionalAdjustment">
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
						<el-button type="primary" size="small" v-if="btn.search">查询</el-button>
					</el-form-item>
  			</el-form>
  		</div>
  		<!-- 操作框 -->
    	 <div class="page-operation-box clearfix">
        <div class="pull-left">
          <el-button type="primary" icon="icon iconfont icon-add" @click="editDialogVisible=true" v-if="btn.add">增加</el-button>
          <el-button type="primary" icon="icon iconfont iconshanchu" v-if="btn.del">删除</el-button>
          <el-button type="primary" v-if="btn.update">审核通过</el-button>
          <el-button type="primary" v-if="btn.update">取消审核</el-button>
          <el-button type="primary" v-if="btn.export">导出</el-button>
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
            prop="sfsh"
            label="是否审核"
            align="center"
            min-width="100">
            <template slot-scope="scope">
            	<el-checkbox v-model="scope.row.sfsh"></el-checkbox>
            </template>
          </el-table-column>
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
            prop="tzqzy"
            label="调整前专业"
            align="center"
            min-width="100">
            <template slot-scope="scope">{{ scope.row.tzqzy }}</template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="tzhzy"
            label="调整后专业"
            align="center"
            min-width="100">
            <template slot-scope="scope">{{ scope.row.tzhzy }}</template>
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
      <!-- 新增 & 修改 dialog -->
      <el-dialog
        ref="editDialog"
        class="edit-dialog page-ClassInfo-dialog"
        width="60%"
        append-to-body
        title="新增专业调整"
        :visible.sync="editDialogVisible">
        <el-row>
        	<div class="cascade-select">
		  			<el-form :inline="true" :model="dataBase" class="demo-form-inline">
		  				<el-form-item label="考生号/姓名:">
			          <el-input v-model="dataBase.name" placeholder="请输入考生号/姓名"></el-input>
			        </el-form-item>
			        <el-form-item>
								<el-button type="primary" size="small">获取分数</el-button>
							</el-form-item>
						</el-form>
		  		</div>
        </el-row>
        	<el-form
	          status-icon
	          label-width="105px"
	          :model="editForm"
	          class="form-clear-bottom"
	          :rules="editFormRules"
	          ref="editForm">
	          <el-row :span="24" type="flex" justify="center">
	          	<el-form-item label="姓名" prop="xm">
		            <el-input clearable v-model="editForm.xm" placeholder="请输入姓名"></el-input>
		          </el-form-item>
		          <el-form-item label="录取专业" prop="lqzy">
		            <el-input clearable v-model="editForm.lqzy" placeholder="请输入录取专业"></el-input>
		          </el-form-item>
		          <el-form-item label="考生号" prop="ksh">
		            <el-input clearable v-model="editForm.ksh" placeholder="请输入考生号"></el-input>
		          </el-form-item>
		          <el-form-item label="身份证号" prop="sfzh">
		            <el-input clearable v-model="editForm.sfzh" placeholder="请输入身份证号"></el-input>
		          </el-form-item>
	          </el-row>
	        </el-form>
        <el-row>
        	<el-col :span="12">
        		
        	</el-col>
        	<el-col :span="12">
        		
        	</el-col>
        </el-row>
        
        
        <span slot="footer" class="dialog-footer">
          <el-button
            ref="btnEditFormSave"
            type="primary"
            size="medium"
            class="app-dialog-btn app-confirm">确认</el-button>
          <el-button
            size="medium"
            class="app-dialog-btn app-close"
            @click="editDialogVisible = false">关闭</el-button>
        </span>
      </el-dialog>
    </div>
	</div>
</template>
<script>
	import table from "@/mixin/table.vue";
	export default {
		mixins: [table],
    computed: {
      USER_INFO() {
        return this.$store.getters.USER_INFO
      }
    },
		name:"ProfessionalAdjustment",
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
					zsjh:'',
					naem:''
				},
				tableData:[],
				editDialogVisible:false,
				editForm:{},
				editFormRules:{},
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
	.page-ProfessionalAdjustment{
		position: relative;
		text-align: left;
    height: 94%;
	}
</style>