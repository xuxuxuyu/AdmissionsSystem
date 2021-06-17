<template>
	<!-- 可报专业设置 -->
	<div class="page-SetMajor">
  	<div class="page-container">
  		<!-- 操作框 -->
			<div class="page-operation-box clearfix">
				<div class="pull-left">
          <div class="cascade-select">
            <el-form :inline="true" class="demo-form-inline">
              <el-form-item label="年份:">
                <el-select v-model="year" placeholder="请选择" @change="getList()">
                  <el-option
                    v-for="item in options"
                    :key="item.rxnf"
                    :label="item.rxnf"
                    :value="item.rxnf">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-form>
          </div>
          <el-button
            type="primary"
            icon="icon iconfont"
            v-if="btn.add"
            @click="handlechangeNF()">初始化专业
          </el-button>
          <el-button
            type="primary"
            icon="icon iconfont"
            @click="editDialogVisible=true;getKSXS()"
            :disabled="deleteBatchBtnDisabled" 
            v-if="btn.update">设置考试形式
          </el-button>
          <el-button 
          	type="primary" 
          	icon="icon iconfont iconshanchu"
            :disabled="deleteBatchBtnDisabled"
            v-if="btn.del"
            @click="del()">删除
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
          @sort-change="handleSortChange"
          @selection-change="handleSelectionChange"
          @row-dblclick="doubleClickTableRow">
          <el-table-column align="center" type="selection" width="40"></el-table-column>
          <el-table-column fixed label="序号" align="center" type="index" width="50"></el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="ndzymc"
            label="专业名称"
            align="center"
            min-width="100">
            <template slot-scope="scope">{{ scope.row.ndzymc }}</template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="sfbz"
            label="考试形式"
            align="center"
            min-width="100">
            <template slot-scope="scope">
              {{scope.row.sfbz}}
              <!-- <span v-if="scope.row.sfbz == '01'">笔试</span> -->
              
            </template>
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
      <!-- 设置考试形式dialog -->
      <el-dialog
        ref="editDialog"
        class="edit-dialog"
        width="500px"
        append-to-body
        title="设置考试形式"
        @close="editDialogVisible=false"
        :visible.sync="editDialogVisible">
        <el-form
          status-icon
          label-width="80px"
          class="form-clear-bottom"
          ref="addEditForm">
          <el-form-item label="考试形式:">
            <el-select style="width: 100%" v-model="ksxs" placeholder="请选择">
              <el-option
                v-for="item in optionsKSXS"
                :key="item.dmbh"
                :label="item.dmmc"
                :value="item.dmbh">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button ref="btnClassbeginsFormSave" type="primary" size="medium" class="app-dialog-btn app-confirm" @click="setKSXS()">确认</el-button>
          <el-button size="medium" class="app-dialog-btn app-close" @click="editDialogVisible=false">关闭</el-button>
        </span>
      </el-dialog>
  	</div>
  </div>
</template>
<script>
	import table from "@/mixin/table.vue";
	export default {
    computed:{
      ShowTree(){
        return this.$store.getters.SHOW_TREE
      },
      USER_INFO() {
        return this.$store.getters.USER_INFO
      }
    },
		name:'SetMajor',
		mixins: [table],
		data(){
			return {
				tableData:[],
				requestSuffix:{},
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
        editDialogVisible:false,
        btn:{},
        year:'',
        options:[],
        ksxs:'',
        optionsKSXS:[]
			}
		},
		methods:{
			// 搜索
      search() {
        this.currentPage = 1;
      },
      // 保存已选专业
      saveForm(){},
      // 删除表格所选专业
      del(){
        if (this.multipleSelection.length <= 0) {
          this.$message({
            showClose: true,
            message: "请先选择一条信息",
            type: "warning"
          });
          return;
        }
        this.$confirm("是否确认删除?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(()=>{
          let ids = this.multipleSelection.map(item => item.id)
          this.$post("/major/delete.action",{
            data:{
              dto:{
                id:ids.join()
              }
            }
          }).then(data=>{
            if(data.succsess==1){
              this.$message({
                message: "删除成功",
                type: "success"
              });
              this.getList()
            }else{
              this.$message({
                showClose: true,
                message: '删除失败',
                type: "error"
              });
            }
          })
        })
        .catch(() => {
            this.$message({type: "info", message: "已取消删除"});
          });
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
          if(data.dtoList.length != 0){
            data.dtoList.forEach(item=>{
              this.$set(this.btn,[item.gnjd],true)
            })
          }
        })
      },
      // 根据年份初始化专业
      handlechangeNF(){
        if(this.year == ''){
          this.$message({message: "请先选择年份",type: "error"});
          return
        }
        this.$post('/major/getZyList.action',{
          loadingEl:this.$refs.tableElement,
          data:{
            dto:{
              year:this.year
            }
          }
        }).then(data=>{
          if(data.succsess == 1){
            this.tableData = data.dtoList
            this.handleTableData(this.tableData)
          }else{
            this.$message({message: data.msg,type: "error"});
            this.tableData = []
          }
        })
      },
      // 获取专业的年份
      async getYears(){
        await this.$post('/bdrxnf/getList.action',{
          loadingEl:'all',
          data:{}
        }).then(data=>{
          if(data.succsess){
            this.options = data.list
            this.year = this.options[0].rxnf
            this.getList()
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
      // 给所选专业设置考试形式
      setKSXS(){
        let id = this.multipleSelection.map(v=>v.bdzyxxndId)
        this.$post('/major/update.action',{
          loadingEl:this.$refs.editDialog,
          data:{
            dto:{
              bdzyxxndId:id.join(),
              year:this.year,
              sfbz:this.ksxs
            }
          }
        }).then(data=>{
          if(data.succsess == 1 ){
            this.editDialogVisible = false
            this.getList()
          }
        })
      },
      // 获取已选的专业
      getList(){
        if(this.year == ''){
          this.$message({message: "请先选择年份",type: "warning"});
          return
        }
        this.$post('/major/getList.action',{
          loadingEl:this.$refs.tableElement,
          data:{
            dto:{
              year:this.year
            }
          }
        }).then(data=>{
          if(data.succsess == 1){
            this.tableData = data.dtoList
            this.handleTableData(this.tableData)
          }else{
            this.$message({message: data.msg,type: "warning"});
            this.tableData = []
          }
        })
      },
      handleTableData(data){
        data.forEach(item=>{
          this.optionsKSXS.forEach(val=>{
            if(item.sfbz == val.dmbh){
              item.sfbz = val.dmmc
            }
          })
        })
      }
		},
    mounted(){
      this.getBtns()
      this.getYears()
      this.getKSXS()
    }
	}
</script>
<style>
  .page-SetMajor{
    position: relative;
  }
  .borderRight{
    height: 93.5%;
    width: 300px;
    margin-left: -20px;
    overflow: scroll;
  }
</style>