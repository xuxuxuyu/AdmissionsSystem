<!-- 分数录入 -->
<template>
	<div class="page-ScoreEntry">
		<div class="page-container">
      <el-row style="height: 100%;">
        <el-col :span="3" style="margin-top: 15px;height: calc(100% - 15px)">
          <el-tree
            class="elT"
            ref="tree"
            :data="treeData"
            node-key="id"
            @node-click="handleNodeClick">
          </el-tree>
        </el-col>
        <el-col :span="21" style="height: 100%">
          <!-- 操作框 -->
          <div class="page-operation-box clearfix">
            <div class="pull-left">
              <div class="cascade-select">
                <el-form 
                  :inline="true"
                  class="demo-form-inline"
                  tatus-icon
                  label-width="105px"
                  :model="editForm"
                  :rules="editFormRules"
                  ref="editForm">
                  <el-form-item label="招生计划:" prop="id">
                    <el-select v-model="editForm.id" placeholder="请选择" @change="handlechangeZSJH" style="width: 100%">
                      <el-option
                        v-for="item in optionsYear"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="科目名称:" prop="ccId">
                    <el-select v-model="editForm.ccId" placeholder="请选择" style="width: 100%" @change="handleChangeKMMC()">
                      <el-option
                        v-for="item in kmmc"
                        :key="item.id"
                        :label="item.kmmc"
                        :value="item.id">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="录取方式:" prop="value">
                    <el-select v-model="editForm.value" placeholder="请选择" @change="handleChangeLQFS">
                      <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-form>
              </div>
              <el-button
                type="primary"s
                @click="setScore()"
                icon="icon iconfont">保存
              </el-button>
              <el-button
                type="primary"
                @click="submit()"
                icon="icon iconfont">提交
              </el-button>
            </div>
          </div>
          <!-- 列表 -->
          <div class="app-page-box-table big-height">
            <el-table
              border
              tooltip-effect="dark"
              ref="tableElement"
              :data="tableData"
              height="100%"
              highlight-current-row
              @sort-change="handleSortChange"
              @selection-change="handleSelectionChange">
              <el-table-column align="center" type="selection" width="40"></el-table-column>
              <el-table-column
                show-overflow-tooltip
                prop="ksh"
                label="考生号"
                align="center"
                min-width="180">
                <template slot-scope="scope">{{ scope.row.ksh }}</template>
              </el-table-column>  
              <el-table-column
                show-overflow-tooltip
                prop="xm"
                label="姓名"
                align="center"
                min-width="120">
                <template slot-scope="scope">{{ scope.row.xm }}</template>
              </el-table-column>
              <el-table-column
                show-overflow-tooltip
                prop="zjhm"
                label="身份证号码"
                align="center"
                min-width="180">
                <template slot-scope="scope">{{ scope.row.zjhm }}</template>
              </el-table-column>
              <el-table-column
                v-for="(item,key) in column"
                :key=key
                show-overflow-tooltip
                :label="item.kmmc"
                align="center"
                min-width="180">
                <template slot-scope="scope">
                  <el-input v-model="scope.row[item.id].cj" @blur="isNum(scope.row[item.id].cj);calcFS(scope.row)" :disabled="scope.row.tjzt == 1 || scope.row[item.id].fId == '' "></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="tjzt" label="提交状态" align="center" width="120">
                <template slot-scope="scope">
                  <!-- {{ scope.row.tjzt }} -->
                  <el-checkbox v-model="scope.row.tjzt == 1" disabled></el-checkbox>
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
          <!-- 选择条件 -->
          <el-dialog
            ref="editDialog"
            class="edit-dialog page-ClassInfo-dialog"
            width="25%"
            append-to-body
            title="请选择录入成绩科目"
            :visible.sync="editDialogVisible"
            @close="close">
            <el-form
              status-icon
              label-width="105px"
              :model="editForm"
              class="form-clear-bottom"
              :rules="editFormRules"
              ref="editForm">
              <el-form-item label="招生计划:" prop="id">
                <el-select v-model="editForm.id" placeholder="请选择" @change="handlechangeZSJH" style="width: 100%">
                  <el-option
                    v-for="item in optionsYear"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="科目名称:" prop="ccId">
                <el-select v-model="editForm.ccId" placeholder="请选择" style="width: 100%">
                  <el-option
                    v-for="item in kmmc"
                    :key="item.id"
                    :label="item.kmmc"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button
                ref="btnEditFormSave"
                type="primary"
                size="medium"
                class="app-dialog-btn app-confirm" @click="saveForm()">确认</el-button>
              <el-button
                size="medium"
                class="app-dialog-btn app-close"
                @click="close">关闭</el-button>
            </span>
          </el-dialog>
        </el-col>
      </el-row>
		</div>
	</div>
</template>
<script>
	import table from "@/mixin/table.vue";
	export default {
		name:'ScoreEntry',
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
        editDialogVisible:false,
        fs:'',
        btn:{},
        treeData:[],
        options: [{
          value: '1',
          label: '按考场录入成绩'
        }, {
          value: '2',
          label: '按监考录入成绩'
        }],
        zcj:false,
        optionsYear:[],
        kmmc:[],
        show:false,
        editDialogVisible:true,
        editForm:{
          value:'1'
        },
        editFormRules: {
          id: [
            {required: true, message: "招生计划必选", trigger: 'blur'}
          ],
          ccId:[
            {required: true, message: "科目必选", trigger: 'blur'}
          ],
          value:[
            {required: true, message: "录取方式必选", trigger: 'blur'}
          ]
        },
        // ccId:'',
        isClose:false,
        column:[],
        kcId:''
			}
		},
		methods:{
      // 搜索
      search() {
        this.currentPage = 1;
        // this.getList();
      },
      calcFS(row){
        this.column.forEach(item=>{
          if(row[item.id].fId == ''){
            row[item.id].cj = ''
            this.column.forEach(val=>{
              if(row[val.id].fId != ''){
                row[item.id].cj = Number(row[val.id].cj) + Number(row[item.id].cj)
              }
            })
          }
        })
      },
      setScore(){
        let json = []
        if(this.multipleSelection && this.multipleSelection.length){
          json = this.multipleSelection
        }else{
          json = this.tableData
        }
        this.handleList(json)
      },
      handleList(json){
        let arr = []
        json.forEach(item=>{
          this.column.forEach(val=>{
            arr.push({
              id:item.id,
              cj:item[val.id].cj,
              ccId:item[val.id].ccId
            })
          })
        })
        this.saveData(arr)
      },
      saveData(arr){
        this.$post('/studentsRegister/cjlr.action',{
          loadingEl: this.$refs.tableElement,
          data:{
            list: arr
          }
        }).then(data=>{
          if(data.succsess == 1){
            this.editDialogVisible = false
            this.$message({message: "保存成功", type: "success"});
            // this.getList()
          }else{
            this.$message({message: data.msg, type: "error"});
          }
        })
      },
      // 提交
      submit(){
        this.setScore()
        let ids = []
        let a = this.kmmc.find(item=>item.id == this.editForm.ccId)
        if(this.multipleSelection && this.multipleSelection.length){
          ids = this.multipleSelection.map(d => d.id)
        }else{
          ids = this.tableData.map(d => d.id)
        }
        this.$post('/studentsRegister/tj.action',{
          loadingEl: this.$refs.tableElement,
          data:{
            dto:{
              ids:ids.join(),
              ccId:a.kmId,
              kcId:this.kcId
            }
          }
        }).then(data=>{
          if(data.succsess == 1){
            this.$message({message: "提交成功", type: "success"});
            // this.getList()
          }else{
            this.$message({message: data.msg, type: "error"});
          }
        })
      },
      handleNodeClick(obj,node,compont){
        if(this.editForm.ccId == '' || this.editForm.ccId==undefined){
          this.$message({message: "请选择科目", type: "warning"});
          return
        }
        if(obj.children){
          this.$message({message: "请选择确切的考场/监考", type: "warning"});
          return
        }
        if(this.editForm.value == 1){
          this.getRoomTableData(obj.id)
        }else if(this.editForm.value== 2){
          this.getTeacherTableData(obj.id)
        }
      },
      // 获取按考场录入的考生信息
      async getRoomTableData(id){
        this.kcId = id
        await this.smallLMMC()
        let a = this.kmmc.find(item=>item.id == this.editForm.ccId)
        this.$post("/studentsRegister/getListByKc.action", {
          loadingEl: this.$refs.tableElement,
          data:{ 
           dto:{
            ids:id,
            examDateId:this.editForm.id,
            ccId:a.kmId
           } 
          }
        }).then(data=>{
          if(data.succsess != 1){
            this.$message({
              message: data.msg,
              type: "error"
            });
            return
          }
          let tableData = data.dtoList
          let cjData = data.cjList
          if(tableData && tableData.length){
            tableData.forEach(item=>{
              if(cjData && cjData.length){
                // 有成绩且成绩可以匹配到学生的数据
                let have = cjData.filter(val =>{
                  return val.srId == item.id
                })
                if(have.length){
                  this.column.forEach(v=>{
                    // 匹配到学生的成绩数据找到对应科目放进去
                    let obj = have.find(o => o.ccId == v.id)
                    if(obj){
                      item[v.id] = {}
                      item[v.id].cj = obj.cj ? obj.cj : ''
                      item[v.id].ccId = obj.ccId  ? obj.ccId  : ''
                      item[v.id].fId =  v.fId  ? v.fId  : ''
                      item.tjzt = obj.tjzt ? obj.tjzt : 0
                    }else{
                      item[v.id] = {}
                      item[v.id].cj = ''
                      item[v.id].ccId = v.id
                      item[v.id].fId = v.fId 
                      item.tjzt = 0
                    }
                  })
                }else{
                  // 有成绩没匹配到学生(假设)
                  this.column.forEach(v=>{
                    item[v.id] = {}
                    item[v.id].cj = ''
                    item[v.id].ccId = v.id
                    item[v.id].fId = v.fId 
                    item.tjzt = 0
                  })
                }
              }else{
                // 没有成绩
                this.column.forEach(v=>{
                  item[v.id] = {}
                  item[v.id].cj = ''
                  item[v.id].ccId = v.id
                  item[v.id].fId = v.fId 
                  item.tjzt = 0
                })
              }
            })
          }else{
            this.tableData = []
          }
          this.tableData = tableData
          console.log(this.column);
          console.log(this.tableData)
        })
      },
      // 获取按监考录入的考生信息
      getTeacherTableData(id){
        this.kcId = id
        this.$post("/studentsRegister/getListByJk.action", {
          loadingEl: this.$refs.tableElement,
          data:{ 
           dto:{
            examDateId:this.editForm.id,
            ids:id,
            ccId:this.editForm.ccId
           } 
          }
        }).then(data=>{
          if(data.succsess != 1){
            this.tableData = []
            this.$message({
              message: data.msg,
              type: "error"
            });
            return
          }
          this.tableData = data.dtoList
        })
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
      getTeacherTree(){
        this.$post('/getTree/getJKTree.action',{
          loadingEl:'all',
          data:{
            dto:{
              ccId:this.editForm.ccId
            }
          }
        }).then(data=>{
          this.treeData = []
          this.treeData = data
        })
      },
      getRooomTree(){
        this.$post('/getTree/getKCTree.action',{
          loadingEl:'all',
          data:{
            dto:{
              cjbh:this.editForm.ccId
            }
          }
        }).then(data=>{
          this.treeData = []
          this.treeData = data
        })
      },
      handleChangeLQFS(a){
        if(this.editForm.ccId == undefined || this.editForm.ccId==''){
          this.$message({message: "请选择科目名称", type: "error"});
          this.treeData = []
          return
        }
        if(a == 1){
          this.getRooomTree()
        }else if(a == 2){
          this.getTeacherTree()
        }
      },
      getYear(){
        this.$post('/examDate/getList.action',{
          loadingEl: this.$refs.editDialog,
          data:{
            dto:{}
          }
        }).then(data=>{
          if(data.succsess == 1){
            this.optionsYear = []
            data.list.forEach(item=>{
              if(item.dqbj == 1){
                this.editForm.id = item.id
                this.getKMMC()
              }
              this.optionsYear.push(item)
            })
          }else{
            this.$message({message: data.msg, type: "error"});
          }
        })
      },
      handlechangeZSJH(){
        this.getKMMC()
      },
      // 获取科目名称
      getKMMC(){
        this.$post('/ccsz/getList.action',{
          data:{
            dto:{examDateId:this.editForm.id}
          }
        }).then(data=>{
          if(data.succsess < 0 ){
            this.$message({type: "error", message: data.msg});
            return 
          }
          this.kmmc = data.dtoList
        })
      },
      saveForm(){
        this.$refs["editForm"].validate(async valid => {
          if (!valid) {
            return false;
          }
          this.isClose = true
          this.editDialogVisible = false
          // this.ccId = this.editForm.ccId
          this.getRooomTree()
        })
      },
      async smallLMMC(){
        let cur = this.kmmc.find(item=>item.id == this.editForm.ccId)
        this.$post('/kmdj/getSingle.action',{
          loadingEl: this.$refs.tableElement,
          data:{
            dto:{
              id:cur.kmId
            }
          }
        }).then(data=>{
          if(data.dtoList){
            this.column = data.dtoList
          }
        })
      },
      close(){
        // if(!this.isClose){
        // this.$refs["editForm"].validate(async valid => {
        //   if (!valid) {
        //     return false;
        //   }
        //   this.editDialogVisible = true
        //   this.$message({message: "请确认", type: "warning"});
        // })
        //   this.editDialogVisible = true
        //   this.isClose = false
        // }
        // console.log();
        if(!this.isClose){
          this.editForm.ccId = ''
          this.getYear()
        }
        this.editDialogVisible = false
      },
      handleChangeKMMC(){
        this.handleChangeLQFS(this.editForm.value)
      },
      isNum(num){
        if(num != ''){
          if(parseInt(num) != num){
            // alert('非法输入，请重新填写') 
            this.$message({message: "非法输入，请重新填写", type: "error"});
          }
        }
      },
    },
		mounted(){
      this.getYear()
    },
	}
</script>
<style>
  .page-ScoreEntry{
    position: relative;
  }
  /*.page-ScoreEntry .sel{
    margin-left: 15px;
  }*/
  .page-ScoreEntry .elT{
    overflow: scroll;
    height: calc(100% - 40px);
  }
  .page-ScoreEntry .el-form-item__label{
    width: 80px !important;
  }
  .page-ScoreEntry .el-input__inner{
    width: 160px !important;
  }
  .page-ScoreEntry .cascade-select .el-form-item {
    margin: 5px 25px 5px 0px;
  }
</style>