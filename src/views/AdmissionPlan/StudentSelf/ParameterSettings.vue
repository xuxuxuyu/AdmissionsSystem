<!-- 参数设置 -->
<template>
  <div class="page-ParameterSettings">
    <div class="page-container">
      <!-- 操作框 -->
      <div class="page-operation-box clearfix">
        <div class="pull-left">
          <el-button 
            type="primary" 
            icon="icon iconfont icon-add" @click="openAdd()" v-if="btn.add">新增
          </el-button>
          <el-button 
            type="primary" 
            icon="icon iconfont"  @click="openUpdate()" :disabled="updateBatchBtnDisabled" v-if="btn.update">修改
          </el-button>
          <el-button
            type="primary"
            icon="icon iconfont iconshanchu"
            :disabled="deleteBatchBtnDisabled"
            @click="del()" v-if="btn.del">删除
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
            prop="year"
            label="年份"
            align="center"
            min-width="100">
            <template slot-scope="scope">{{ scope.row.year }}</template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="startDate"
            label="开始时间"
            align="center"
            min-width="100">
            <template slot-scope="scope"> {{ scope.row.startDate }} </template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="endDate"
            label="结束时间"
            align="center"
            min-width="100">
            <template slot-scope="scope"> {{ scope.row.endDate }}</template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="name"
            label="自主招生名称"
            align="center"
            min-width="100">
            <template slot-scope="scope"> {{ scope.row.name }}</template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="bmzysx"
            label="报名注意事项"
            align="center"
            min-width="100">
            <template slot-scope="scope"> {{ scope.row.bmzysx }}</template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="zczysx"
            label="注册注意事项"
            align="center"
            min-width="100">
            <template slot-scope="scope"> {{ scope.row.zczysx }}</template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="dqbj"
            label="是否当前标记"
            align="center"
            min-width="100">
            <template slot-scope="scope">
              <el-checkbox v-model="scope.row.dqbj == '1' ? true : false" disabled></el-checkbox>
            </template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="zcjbyxtx"
            label="是否可填总成绩"
            align="center"
            min-width="100">
            <template slot-scope="scope">
              <el-checkbox v-model="scope.row.zcjbyxtx == '1' ? true : false" disabled></el-checkbox>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 新增 & 修改 dialog -->
      <el-dialog
        ref="editDialog"
        class="edit-dialog page-ClassInfo-dialog"
        width="60%"
        append-to-body
        :title="title"
        :visible.sync="editDialogVisible">
        <!-- <el-row class="timeBox">
          <el-col :span="16"> -->
            <div class="block">
              <el-form
                status-icon
                label-width="105px"
                :model="editForm"
                class="form-clear-bottom"
                :rules="editFormRules"
                ref="editForm">
                <el-form-item label="年份" prop="year">
                  <el-select style="width: 100%" v-model="editForm.year" placeholder="请选择">
                    <el-option
                      v-for="item in options"
                      :key="item.rxnf"
                      :label="item.rxnf"
                      :value="item.rxnf">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="开始时间" prop="startDate">
                  <el-date-picker
                    style="width: 100%"
                    v-model="editForm.startDate"
                    type="datetime"
                    placeholder="选择开始时间">
                  </el-date-picker>
                </el-form-item>
                <el-form-item label="结束时间" prop="endDate">
                  <el-date-picker
                    style="width: 100%"
                    v-model="editForm.endDate"
                    type="datetime"
                    placeholder="选择结束时间">
                  </el-date-picker>
                </el-form-item>
                <el-form-item label="自主招生名称" prop="name">
                  <el-input clearable v-model="editForm.name" placeholder="请输入自主招生名称"></el-input>
                </el-form-item>
                <el-form-item label="报名注意事项" prop="bmzysx">
                  <el-input
                    :rows="4"
                    type="textarea"
                    placeholder="请输入报名注意事项"
                    v-model="editForm.bmzysx">
                  </el-input>
                </el-form-item>
                <el-form-item label="注册注意事项" prop="zczysx">
                  <el-input
                    :rows="4"
                    type="textarea"
                    placeholder="请输入注册注意事项"
                    v-model="editForm.zczysx">
                  </el-input>
                </el-form-item>
                <el-form-item label="是否当前标记" prop="dqbj">
                  <el-checkbox v-model="editForm.dqbj"></el-checkbox>
                </el-form-item>
                <el-form-item label="是否可填总成绩" prop="zcjbyxtx">
                  <el-checkbox v-model="editForm.zcjbyxtx"></el-checkbox>
                </el-form-item>
              </el-form>
            </div>
          <!-- </el-col>
          <el-col :span="8" class="tips">
            <div>
              <div class="tipsHead">注意事项</div>
              <div class="tipsBody">
                <p>1.早规定时间内报名</p>
                <p>2.逾期不可报名</p>
              </div>
            </div>
          </el-col>
        </el-row> -->
        <span slot="footer" class="dialog-footer">
          <el-button
            ref="btnEditFormSave"
            type="primary"
            size="medium"
            class="app-dialog-btn app-confirm" @click="saveInfo()">确认</el-button>
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
    name:'Approval',
    computed: {
      USER_INFO() {
        return this.$store.getters.USER_INFO
      }
    },
    data(){
      return {
        title:'',
        editDialogVisible:false,
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
        editForm:{
          startDate:'',
          endDate:'',
          year:''
        },
        editFormRules:{
          startDate:[{ required: true, message: "请选择开始时间", trigger: "blur" }],
          endDate:[{ required: true, message: "请选择结束时间", trigger: "blur" }],
          year:[{ required: true, message: "请输入年份", trigger: "blur" },
          {min: 4,max: 4,message: "年份长度为4个字符", trigger: "blur"}]
        },
        dialogType:'',
        options:[],
        btn:{}
      }
    },
    methods:{
      saveInfo(){
        // console.log(this.editForm);
        this.$refs["editForm"].validate(async valid => {
          if (!valid) {
            return false;
          }
          let dtoData = this.editForm
          dtoData.startDate = new Date(dtoData.startDate).getTime()
          dtoData.endDate = new Date(dtoData.endDate).getTime()
          dtoData.dqbj = this.handleBoolean(dtoData.dqbj)
          dtoData.zcjbyxtx = this.handleBoolean(dtoData.zcjbyxtx)
          this.$post('/examDate/'+ this.dialogType +'.action',{
            data:{
              dto:dtoData
            }          
          }).then(data=>{
            if(data.succsess != 1){
              this.$message({message: data.msg, type: "error"});
              return 
            }
            this.editDialogVisible = false
            this.getList()
          })
        })
      },
      handleBoolean(a){
        if(a){
          return 1
        }else {
          return 0
        }
      },
      del(){
        this.$confirm("是否确认删除?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(()=>{
          let ids = this.multipleSelection.map(item => item.id)
          this.$post("/examDate/delete.action",{
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
      getList(){
        this.$post('/examDate/getList.action',{
          loadingEl: this.$refs.tableElement,
          data:{
            dto:{}
          }
        }).then(data=>{
          if(data.succsess == 1){
            this.tableData = data.list
          }else{
            this.$message({message: data.msg, type: "error"});
          }
          // this.tableData.forEach(item=>{
          //   item.startDate = new Date(Number(item.startDate)).toLocaleString()
          //   item.endDate = new Date(Number(item.endDate)).toLocaleString()
          // })
        })
      },
      openAdd(){
        this.editForm = {}
        this.title = "新增报名时间"
        this.editDialogVisible = true
        this.dialogType = 'insert'
        this.getYears()
      },
      openUpdate(){
        this.editForm = {}
        this.editForm = this.multipleSelection[0]
        if(this.multipleSelection[0].zcjbyxtx == 0){
          this.multipleSelection[0].zcjbyxtx = false
        }else{
          this.multipleSelection[0].zcjbyxtx = true
        }
        if(this.multipleSelection[0].dqbj == 0){
          this.multipleSelection[0].dqbj = false
        }else{
          this.multipleSelection[0].dqbj = true
        }

        this.title = "修改报名时间"
        this.editDialogVisible = true
        this.dialogType = 'update'
      },
      // 获取专业的年份
      async getYears(){
        await this.$post('/bdrxnf/getList.action',{
          loadingEl:'all',
          data:{}
        }).then(data=>{
          if(data.succsess){
            this.options = data.list
          }
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
    },
    mounted(){
      this.getList()
      this.getBtns()
    }
  }
</script>
<style>
  .page-ParameterSettings{
    position: relative;
    text-align: left;
  }
  .timeBox{
    margin: 2% 0 0 5%;
    width: 80%;
    height:350px;
    border: 1px solid #ccc;
    text-align: left !important;
    padding: 1%;
  }
  .tips{
    border-left: 1px dotted #ccc;
    height: 100%;
  }
  .tipsHead{
    text-align: center;
    margin: 10px 0 20px 0;
    font-size: 18px;
  }
  .tipsBody{
    margin:0 10px 0 10px;
    font-size:14px; 
  }
  .tipsBody p{
    height: 30px;
    line-height: 30px;
  }
</style>