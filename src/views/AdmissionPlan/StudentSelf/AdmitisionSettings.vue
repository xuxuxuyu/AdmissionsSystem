<!-- 录取设置 -->
<template>
  <div class="page-AdmitisionSettings">
    <div class="page-container">
      <!-- 操作框 -->
      <div class="page-operation-box clearfix">
        <div class="pull-left">
          <div class="cascade-select">
            <el-form :inline="true" class="demo-form-inline">
              <el-form-item label="招生计划:">
                <el-select v-model="examDateId" placeholder="请选择" @change="handlechange">
                  <el-option
                    v-for="item in optionsYear"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-form>
          </div>
          <el-button 
            type="primary" 
            icon="icon iconfont"
            @click="admit()">一键录取
          </el-button>
          <el-button 
            type="primary" 
            icon="icon iconfont"
            v-if="btn.export">导出
          </el-button>
        </div>
        <!-- <div class="pull-right" style="margin-right: 20px;">
          <el-button 
            type="primary" 
            icon="icon iconfont"
            @click="editDialogVisible = true">查询
          </el-button>
        </div> -->
      </div>
      <!-- 列表 -->
      <div class="app-page-box-table big-height">
        <el-table
          border
          tooltip-effect="dark"
          ref="tableElement"
          :data="tableData"
          highlight-current-row
          height="100%"
          @sort-change="handleSortChange"
          @selection-change="handleSelectionChange">
          <el-table-column align="center" type="selection" width="40"></el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="zybh"
            label="专业编号"
            align="center"
            min-width="120">
            <template slot-scope="scope">{{ scope.row.zybh }}</template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="zymc"
            label="专业名称"
            align="center"
            min-width="120">
            <template slot-scope="scope">{{ scope.row.zymc }}</template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="ylqrs2"
            label="应录人数"
            align="center"
            min-width="120">
            <template slot-scope="scope">{{ scope.row.ylqrs2 }}</template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="ylqrs1"
            label="已录人数"
            align="center"
            min-width="120">
            <template slot-scope="scope">
              <el-link :underline="false" @click="seeYLRS(scope)">
                {{ scope.row.ylqrs1 }}
              </el-link>
            </template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="fs"
            label="分数"
            align="center"
            min-width="120">
            <template slot-scope="scope">{{ scope.row.fs }}</template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="zy"
            label="操作"
            align="center"
            min-width="100">
            <template slot-scope="scope">
              <el-button type="primary" @click="bl(scope)">补录
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 补录的dialog -->
      <el-dialog
        ref="editDialog"
        class="edit-dialog page-ClassInfo-dialog kmxqDialog"
        width="80%"
        append-to-body
        :title="dialogTitle"
        :visible.sync="blDialogVisible">
        <!-- <el-button 
          type="primary" 
          icon="icon iconfont"
          style="position: absolute;left: 100px;top: 12px;"
          @click="admitB()"
          v-if="showLQ">录取
        </el-button> -->
        <div class="app-page-box-table big-height">
          <el-table
            border
            tooltip-effect="dark"
            ref="tableElement2"
            :data="tableData2"
            highlight-current-row
            @sort-change="handleSortChange"
            @selection-change="handleSelectionChange"
            @row-dblclick="doubleClickTableRow">
            <el-table-column align="center" type="selection" width="40"></el-table-column>
            <el-table-column label="序号" align="center" type="index" width="50"></el-table-column>
            <el-table-column prop="lqzt" label="录取状态" align="center" width="120">
              <template slot-scope="scope">
                <span v-if="scope.row.lqzt == 1">已录取</span>
                <span v-if="scope.row.lqzt !=1 ">未录取</span>
              </template>
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="bkzyzy1"
              label="报考专业"
              align="center"
              min-width="120">
              <template slot-scope="scope">{{ scope.row.bkzyzy1 }}</template>
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="ksh"
              label="考生号"
              align="center"
              min-width="120">
              <template slot-scope="scope">{{ scope.row.ksh }}</template>
            </el-table-column>  
            <el-table-column
              show-overflow-tooltip
              prop="xm"
              label="姓名"
              align="center"
              min-width="80">
              <template slot-scope="scope">{{ scope.row.xm }}</template>
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="xb"
              label="性别"
              align="center"
              min-width="60">
              <template slot-scope="scope">{{ scope.row.xb }}</template>
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="zjhm"
              label="身份证号码"
              align="center"
              min-width="120">
              <template slot-scope="scope">{{ scope.row.zjhm }}</template>
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="cj"
              label="总成绩"
              align="center"
              min-width="120">
              <template slot-scope="scope">{{ scope.row.cj }}</template>
            </el-table-column>
            <!-- <el-table-column
              v-if="column != []"
              v-for="(item,index) in column"
              show-overflow-tooltip
              prop=""
              :label="item.kmmc"
              align="center"
              min-width="100">
              <template slot-scope="scope">{{ scope.row.bszf }}</template>
            </el-table-column> -->
          </el-table>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" size="medium" @click="saveBl()" v-if="showLQ">确认录取</el-button>
          <el-button size="medium" @click="blDialogVisible = false">关闭</el-button>
        </span>
      </el-dialog>
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
    name:'AdmitisionSettings',
    mixins: [table],
    computed: {
      USER_INFO() {
        return this.$store.getters.USER_INFO
      }
    },
    data(){
      return {
        tableData:[{xm:'李四'}],
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
        tableData:[],
        dataBase:{
          value:''
        },
        year:'',
        value:'',
        options: [{
          value: '0',
          label: '未录取'
        }, {
          value: '1',
          label: '已录取'
        }],
        btn:{},
        editForm:{},
        editFormRules:{},
        editDialogVisible:false,
        optionMZ:[],
        examDateId:'',
        optionsYear:[],
        // column:[],
        show:false,
        blDialogVisible:false,
        tableData2:[],
        dialogTitle:'',
        showLQ:'',
        showColumnDisable:false
      }
    },
    methods:{
      // 搜索
      search() {
        this.currentPage = 1;
        // this.getList();
      },
      handlechange(){
        this.$post('/studentsRegister/getList.action',{
          loadingEl: this.$refs.tableElement,
          data:{
            dto:{
              examDateId:this.examDateId
            }
          }
        }).then(data=>{
          if(data.succsess == 1){
            this.tableData = data.dtoList
          }else{
            this.tableData = []
          }
        })
      },
      // 获取录取人数的list
      getList(){
        console.log(11111);
        this.$post('/studentsRegister/lqqk.action',{
          loadingEl: this.$refs.tableElement,
          data:{
            dto:{
              examDateId:this.examDateId
            }
          }
        }).then(data=>{
          if(data.succsess == 1){
            this.tableData = data.lqxxList
          }
        })
      },
      // 获取补录的人数
      getBlList(bkzyzyId1){
        this.tableData2 = []
        this.$post('/studentsRegister/getList.action',{
          loadingEl: this.$refs.tableElement2,
          data:{
            dto:{
              lqzt:"0",
              bkzyzyId1:bkzyzyId1,
              examDateId:this.examDateId
            },
            showColumnDisable:true
          }
        }).then(data=>{
          if(data.succsess >= 0){
            this.tableData2 = data.dtoList
          }
        })
      },
      admit(){
        this.$post('/studentsRegister/lq.action',{
          loadingEl:this.$refs.tableElement,
          data:{
            dto:{}
          }
        }).then(data=>{
          if(data.succsess == 1){
            this.$message({message: "录取成功", type: "success"});
            this.getList()
          }else{
            this.$message({message: "录取失败，请重试", type: "error"});
          }
        })
      },
      chaxun(){
        console.log(this.dataBase.value);
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
      },
      getYears(){
        this.$post('/examDate/getList.action',{
          loadingEl: this.$refs.tableElement,
          data:{
            dto:{}
          }
        }).then(data=>{
          if(data.succsess >= 0){
            this.optionsYear = []
            data.list.forEach(item=>{
              if(item.dqbj == 1){
                this.examDateId = item.id
                this.getList()
              }
              this.optionsYear.push(item)
            })
          }else{
            this.$message({message: data.msg, type: "error"});
          }
        })
      },
      // 补录
      bl(scope){
        let bkzyzyId1 = scope.row.zyId
        this.blDialogVisible = true
        this.showLQ = true
        this.dialogTitle = '补录'
        this.getBlList(bkzyzyId1)
      },
      // 保存补录信息
      saveBl(){
        let ids = this.multipleSelection.map(d => d.id)
        console.log(ids);
        this.$post('/studentsRegister/bllq.action',{
          loadingEl:this.$refs.tableElement2,
          data:{
            dto:{
              ids:ids.join()
            }
          }
        }).then(data=>{
          if(data.succsess >= 0){
            this.$message({message: "录取成功", type: "success"});
            this.blDialogVisible = false
            this.getList()
          }else{
            this.$message({message: data.msg, type: "error"});
          }
        })
      },
      // 查看已录人数
      seeYLRS(scope){
        let bkzyzyId1 = scope.row.zyId
        this.blDialogVisible = true
        this.showLQ = false
        this.dialogTitle = '已录取'
        this.getYLRSList(bkzyzyId1)
      },
      // 获取已录取学生list
      getYLRSList(bkzyzyId1){
        this.tableData2 = []
        this.$post('/studentsRegister/getList.action',{
          loadingEl: this.$refs.tableElement2,
          data:{
            dto:{
              lqzt:"1",
              bkzyzyId1:bkzyzyId1,
              examDateId:this.examDateId
            },
            showColumnDisable:true
          }
        }).then(data=>{
          if(data.succsess >= 0){
            this.tableData2 = data.dtoList
          }
        })
      }
    },
    mounted(){
      this.getBtns()
      this.getYears()
    }

  }
</script>
<style>
  .page-AdmitisionSettings{
    position: relative;
    /*text-align: left;*/
  }
  .page-AdmitisionSettings .kmxqDialog {
    height: 80% !important;
    background: pink;
    width: 90%;
  }
  .page-AdmitisionSettings .el-dialog .el-table{
    height: 600px;
    overflow: hidden !important;
  }
  .page-AdmitisionSettings .elSel{
    width: 20%;
    margin: 0 10px 0 0;
  }
  .page-AdmitisionSettings .el-link {
    color: #898989;
  }
  .kmxqDialog .el-table__body-wrapper{
    height: 92%;
    overflow-y:scroll;
    overflow-x: hidden;
  }
  .page-AdmitisionSettings .el-link {
    color: #898989;
  }
</style>