<!-- 成绩审核 -->
<template>
  <div class="page-ScoreAudit">
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
              <el-form-item label="科目名称:">
                <el-select v-model="kmId" placeholder="请选择" style="width: 100%" @change="handleChangeKMMC()">
                  <el-option
                    v-for="item in kmmc"
                    :key="item.kmId"
                    :label="item.kmmc"
                    :value="item.kmId">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-form>
          </div>
          <el-button
            type="primary"
            icon="icon iconfont"
            @click="audit()"
            v-if="btn.update">审批
          </el-button>
          <el-button
            type="primary"
            icon="icon iconfont"
            @click="searchWTJ()"
            v-if="btn.update">查看未提交
          </el-button>
        </div>
      </div>
      <!-- 列表 -->
      <div class="app-page-box-table big-height">
        <el-table
          height="100%"
          border
          tooltip-effect="dark"
          ref="tableElement"
          :data="tableData"
          highlight-current-row
          @sort-change="handleSortChange"
          @selection-change="handleSelectionChange">
          <el-table-column align="center" type="selection" width="40"></el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="ksh"
            label="考生号"
            align="center"
            min-width="180"
            :render-header="renderHeader">
            <template slot-scope="scope">{{ scope.row.ksh }}</template>
          </el-table-column>  
          <el-table-column
            show-overflow-tooltip
            prop="xm"
            label="姓名"
            align="center"
            min-width="120"
            :render-header="renderHeader">
            <template slot-scope="scope">{{ scope.row.xm }}</template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="zjhm"
            label="身份证号码"
            align="center"
            min-width="180"
            :render-header="renderHeader">
            <template slot-scope="scope">{{ scope.row.zjhm }}</template>
          </el-table-column>
          <el-table-column prop="spzt" label="审批状态" align="center" width="100" :render-header="renderHeader">
            <template slot-scope="scope">
              <span v-if="scope.row.spzt==1">审批通过</span>
              <span v-if="scope.row.spzt==2">审批未通过</span>
              <span v-if="scope.row.spzt==0 || scope.row.spzt==null ||scope.row.spzt==''">未审批</span>
            </template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="cj"
            label="成绩"
            align="center"
            min-width="120"
            :render-header="renderHeader">
            <template slot-scope="scope">{{ scope.row.cj }}</template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="ccName"
            label="考试科目"
            align="center"
            min-width="120"
            :render-header="renderHeader">
            <template slot-scope="scope">{{ scope.row.ccName }}</template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="bkzyzy1"
            label="志愿专业1"
            align="center"
            min-width="120"
            :render-header="renderHeader">
            <template slot-scope="scope">{{ scope.row.bkzyzy1 }}</template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="bkzyzy2"
            label="志愿专业2"
            align="center"
            min-width="120"
            :render-header="renderHeader">
            <template slot-scope="scope">{{ scope.row.bkzyzy2 }}</template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="bkzyzy3"
            label="志愿专业3"
            align="center"
            min-width="120"
            :render-header="renderHeader">
            <template slot-scope="scope">{{ scope.row.bkzyzy3 }}</template>
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
      <!-- 未提交的列表 -->
      <el-dialog
        ref="editDialog"
        class="edit-dialog page-ClassInfo-dialog kmxqDialog"
        width="80%"
        append-to-body
        title="未提交成绩"
        :visible.sync="cjDialogVisible">
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
            <el-table-column prop="tjzt" label="提交状态" align="center" width="120">
              <template slot-scope="scope">
                <span v-if="scope.row.tjzt == 1">已提交</span>
                <span v-if="scope.row.tjzt !=1 ">未提交</span>
              </template>
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="kmmc"
              label="科目名称"
              align="center"
              min-width="120">
              <template slot-scope="scope">{{ scope.row.kmmc }}</template>
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="kc"
              label="考场"
              align="center"
              min-width="120">
              <template slot-scope="scope">{{ scope.row.kc }}</template>
            </el-table-column>  
            <el-table-column
              show-overflow-tooltip
              prop="jklsxm1"
              label="监考老师1"
              align="center"
              min-width="80">
              <template slot-scope="scope">{{ scope.row.jklsxm1 }}</template>
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="jklsxm2"
              label="监考老师2"
              align="center"
              min-width="60">
              <template slot-scope="scope">{{ scope.row.jklsxm2 }}</template>
            </el-table-column>
          </el-table>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button size="medium" @click="cjDialogVisible = false">关闭</el-button>
        </span>
      </el-dialog>

    </div>
  </div>
</template>
<script>
  import table from "@/mixin/table.vue";
  export default {
    name:'ScoreAudit',
    mixins: [table],
    computed: {
      USER_INFO() {
        return this.$store.getters.USER_INFO
      }
    },
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
        dataBase:{
          value:''
        },
        obj:{
          ksh:"" ,  //考生号
          xm:"" ,   //姓名
          zjhm:"" , //证件号码
          ywcj:"" , //语文成绩
          sxcj:"" , //数学成绩
          wycj:"" , //外语成绩
          bszf:"" , //笔试总分
          whnlcj:"" , //文化能力成绩
          zynlcj:"" , //职业能力成绩
          yybdcj:"" , //语言表达成绩
          mszf:"" , //面试总分
          jscj:"" , //机试成绩
          bkzyzy1:"" ,//报考志愿专业名称1
          bkzyzy2:"" ,//报考志愿专业名称2
          bkzyzy3:"" ,//报考志愿专业名称3
          tjzt:"1" ,  //提交状态  0:未提交  1:已提交
          cjspzt:""   //成绩审批状态
        },
        btn:{},
        examDateId:'',
        optionsYear:[],
        kmmc:[],
        show:false,
        kmId:'',
        cjDialogVisible:false,
        tableData2:[]
      }
    },
    methods:{
      search() {
        this.currentPage = 1;
      },
      getList(){
        this.$post('/studentsRegister/getCjList.action',{
          loadingEl: this.$refs.tableElement,
          data:{
            dto:{ approval:"1",tjzt:"1",examDateId:this.examDateId,ccId:this.kmId}
          }
        }).then(data=>{
          if(data.succsess >= 0){
            // let tabledata = []
            // tabledata = data.dtoList
            // if(data.cjList && data.cjList.length  && tabledata && tabledata.length){
            //   tabledata.forEach(item=>{
            //     let a = data.cjList.find(val=>{
            //       return val.srId == item.id
            //     })

            //     a && (item[a.ccId] = a)

            //   })
            // }
            // this.tableData = tabledata
            this.tableData = data.cjList
          }

        })



      },
      // 模糊查询
      chaxun(){
        console.log(this.dataBase.value);
      },
      // 审批通过
      audit(){
        if(this.kmId == ''){
          this.$message({message:'请选择科目',type:'warning'})
          return
        }
        let ids = []
        if(this.multipleSelection && this.multipleSelection.length){
          ids = this.multipleSelection.map(d => d.id)
        }else{
          ids = this.tableData.map(d => d.id)
        }
        this.$post('/studentsRegister/cjsp.action',{
          loadingEl:this.$refs.tableElement,
          data:{
            dto:{
              ids:ids.join(),
              examDateId:this.examDateId
            }
          }
        }).then(data=>{
          if(data.succsess != 1){
            this.$message({message:'审批失败',type:'error'})
          }else{
            this.$message({message:'审批成功',type:'success'})
            this.getList()
          }
        })
      },
      // 自定义表头U绘制（实现多列排序）
      renderHeader(
        h, {
          column,
          store: {
            states,
            table
          }
        }
        ) {
        // const currentOrder =
        // this.selectConfig.table.order.find(
        //   order => order.Field === column.property
        //   ) || {};
        // const index = this.selectConfig.table.order.indexOf(currentOrder);
        return h(
          "span", 
          [
          column.label,
          h(
            "span", {
              class: {
                "caret-wrapper": true,
                // ascending: currentOrder.IsDesc === false,
                // descending: currentOrder.IsDesc === true
                  // ascending: index === 0 && currentOrder.IsDesc === false,
                  // descending: index === 0 && currentOrder.IsDesc === true,
                  // "ascending-2": index > 0 && currentOrder.IsDesc === false,
                  // "descending-2": index > 0 && currentOrder.IsDesc === true
                },
                 on: {
              click: () => this.handleSortChange(column)
            }
              },
              [
              h("i", {
                class: {
                  "sort-caret": true, ascending: true
                }
              }),
              h("i", {
                class: {
                  "sort-caret": true, descending: true
                }
              })
              ]
              ),
          h("br", {
              }),
          column.label == "禁用" ? 
          h(
            "input", {
              class: {
                "column-search": true
              },
              style: {
                // width: column.minWidth ? column.minWidth - 30 + 'px' : column.width - 30 + 'px',
                width:"90%",
                height:'18px',
              },
              // disabled:true
              domProps:{
                disabled:true
              }
            }
          ):h(
            "input", {
              on: {
                keydown: (e) => this.columnSearch(e, column)
              },
              class: {
                "column-search": true
              },
              style: {
                // width: column.minWidth ? column.minWidth - 30 + 'px' : column.width - 30 + 'px',
                width:"90%",
                height:'18px',
                fontSize:'10px',
                textIndent:'10px',
                color:"#898989"
              }
            }
          )
          ]
          );
      },
      columnSearch(event, a) {
        if (event.keyCode == 13) {
          if(event.target.value == ""){
            this.getList()
          }else{
            this.obj[a.property] = event.target.value
            console.log(this.obj)
            this.$post('/studentsRegister/getList.action',{
              loadingEl: this.$refs.tableElement,
              data:{
                dto:this.obj
              }
            }).then(data=>{
              if(data.succsess == 1){
                this.tableData = data.dtoList
              }
            })
          }
        }
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
      handlechange(){
        // this.getList()
        this.getKMMC()
      },
      getYears(){
        this.$post('/examDate/getList.action',{
          loadingEl: this.$refs.tableElement,
          data:{
            dto:{}
          }
        }).then(data=>{
          if(data.succsess == 1){
            this.optionsYear = []
            data.list.forEach(item=>{
              if(item.dqbj == 1){
                this.examDateId = item.id
                this.getKMMC()
              }
              this.optionsYear.push(item)
            })
          }else{
            this.$message({message: data.msg, type: "error"});
          }
        })
      },
      // 获取科目名称
      getKMMC(){
        this.$post('/ccsz/getList.action',{
          loadingEl: this.$refs.tableElement,
          data:{
            dto:{examDateId:this.examDateId}
          }
        }).then(data=>{
          if(data.succsess < 0 ){
            this.$message({type: "error", message: data.msg});
            return 
          }
          this.kmmc = data.dtoList
        })
      },
      handleChangeKMMC(){
        this.getList()
      },
      // 查看未提交
      searchWTJ(){
        this.$post('/kcapdj/getList.action',{
          data:{
            dto:{
              examDateId:this.examDateId,
              tjzt:"0"
            }
          }
        }).then(data=>{
          if(data.succsess >= 0){
            this.tableData2 = data.list
            this.cjDialogVisible = true
          }
        })
      }
    },
    mounted(){
      this.getYears()
      this.getBtns()
    }
  }
</script>
<style>
  .page-ScoreAudit{
    position: relative;
    text-align: left;
  }
</style>