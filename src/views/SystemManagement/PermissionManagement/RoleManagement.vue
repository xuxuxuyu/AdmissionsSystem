<template>
    <!-- 角色管理 -->
    <div class="page-RoleManagement">
      <div class="page-container">
        <!-- 操作框 -->
        <div class="page-operation-box clearfix">
          <div class="pull-left">
            <!-- 查询条件 -->
            <div class="cascade-select">
              <el-form :inline="true" :model="dataBase" class="demo-form-inline">
                <el-form-item class="lab" label="角色名称/角色编号:">
                  <el-input v-model="dataBase.name" size="small"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="onSubmit" size="small">查询</el-button>
                </el-form-item>
              </el-form>
            </div>
          </div>
          <div class="pull-right">
            <el-button
              type="primary"
              icon="icon iconfont icon-add"
              @click="add()"
              v-if="btn.add">新增
            </el-button>
            <el-button
            type="primary"
            icon="icon iconfont iconpiliangxiugai"
            @click="updateForm()" :disabled="updateBatchBtnDisabled"
            v-if="btn.update">修改
          </el-button>
            <el-button type="primary" icon="icon iconfont iconshanchu" @click="del()" :disabled="deleteBatchBtnDisabled" v-if="btn.del">删除</el-button>
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
            @selection-change="handleSelectionChange"
            @row-dblclick="doubleClickTableRow">
            <el-table-column align="center" type="selection" width="40"></el-table-column>
            <el-table-column fixed label="序号" align="center" type="index" width="50"></el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="jsmc"
              label="角色名称"
              align="center"
              min-width="100">
              <template slot-scope="scope">{{ scope.row.jsmc }}</template>
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="cjr"
              label="创建人"
              align="center"
              min-width="100">
              <template slot-scope="scope">{{ scope.row.cjr }}</template>
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="cjsj"
              label="创建日期"
              align="center"
              min-width="100">
              <template slot-scope="scope">{{ scope.row.cjsj }}</template>
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="xgr"
              label="修改人"
              align="center"
              min-width="100">
              <template slot-scope="scope">{{ scope.row.xgr }}</template>
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="xgsj"
              label="修改日期"
              align="center"
              min-width="100">
              <template slot-scope="scope">{{ scope.row.xgsj }}</template>
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="jszt"
              label="状态"
              align="center"
              min-width="100">
              <template slot-scope="scope">
                <span v-if="scope.row.jszt == 1">可用</span>
                <span v-if="scope.row.jszt != 1">不可用</span>
              </template>
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="jsfw"
              label="角色范围"
              align="center"
              min-width="100">
              <template slot-scope="scope">{{ scope.row.jsfw }}</template>
            </el-table-column>
          </el-table>
        </div>
        <!-- 新增角色dialog -->
        <el-dialog
          ref='dia'
          class="edit-dialog"
          width="80%"
          append-to-body
          :title="title"
          :visible.sync="editDialogVisible">
          <el-form
            status-icon
            label-width="80px"
            :model="editForm"
            class="form-clear-bottom"
            :rules="editFormRules"
            ref="addEditForm">
            <el-row>
              <el-col :span="12">
                <el-form-item label="角色名称" prop="jsmc">
                  <el-input
                    clearable
                    v-model="editForm.jsmc"
                    :autofocus="true"
                    placeholder="请输入角色名称"
                  ></el-input>
                </el-form-item>
                <el-form-item label="角色状态" prop="jszt">
                  <el-select v-model="editForm.jszt" placeholder="请选择" class="sel">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="角色范围" prop="jsfw">
                  <el-input 
                    clearable 
                    placeholder="请输入角色范围" 
                    v-model="editForm.jsfw">
                  </el-input>
                </el-form-item>
                <el-form-item label="角色等级" prop="jsdj">
                  <el-input
                    clearable
                    v-model="editForm.jsdj"
                    :autofocus="true"
                    placeholder="请输入角色等级（1）"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
             <el-col :span="12">
              <el-input
                placeholder="输入关键字进行过滤"
                v-model="filterText0">
              </el-input>
              <el-tree
                :filter-node-method="filterNode1"
                :default-checked-keys = "checkedUserArr"
                :default-expanded-keys = "checkedUserArr"
                ref="tree1"
                class='elTree'
                :data="treeData1"
                show-checkbox
                node-key="id">
              </el-tree>
             </el-col>
             <el-col :span="12">
              <el-input
                placeholder="输入关键字进行过滤"
                v-model="filterText">
              </el-input>
              <el-tree
                :default-expanded-keys="checkedMenuArr"
                :filter-node-method="filterNode"
                ref="tree2"
                class='elTree'
                :data="treeData2"
                show-checkbox
                node-key="id"
                :default-checked-keys = "checkedMenuArr">
              </el-tree>
             </el-col>
            </el-row>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button
              ref="btnEditFormSave"
              type="primary"
              size="medium"
              class="app-dialog-btn app-confirm" @click="saveInfo(type)">确认</el-button>
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
  import treeTransfer from 'el-tree-transfer'
  export default {
    components:{
      treeTransfer
    },
    mixins: [table],
    name:"RoleManagement",
    computed: {
      USER_INFO() {
        return this.$store.getters.USER_INFO
      }
    },
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
          name:'',
        },
        tableData:[],
        editDialogVisible:false,
        editForm:{
        },
        editFormRules:{},
        options:[
          {value:'1',label:'可用'},
          {value:'2',label:'不可用'}
        ],
        title:'',
        type:'',
        treeData1:[],
        treeData2:[],
        filterText: '',
        filterText0:'',
        userIds:'',
        menuRouters:'',
        checkedUserArr:[],
        checkedMenuArr:[],
        btn:{}
      }
    },
    methods:{
      onSubmit(){},
      add(){
        this.type = "insert"
        this.title = "新增角色"
        this.editDialogVisible = true
        this.editForm = {}
        this.checkedUserArr = []
        this.checkedMenuArr = []
        this.getTreeData1()
        this.getTreeData2()
      },
      updateForm(){
        this.type = "update"
        this.title = "修改角色"
        this.editDialogVisible = true
        this.editForm = this.multipleSelection[0]
        this.getTreeData1()
        this.getTreeData2()
        this.$post('/jsdj/getSingle.action',{
          data:{
            dto:{
              jsId:this.multipleSelection[0].jsId
            }
          }
        }).then(data=>{
          if(data.succsess == 1){
            this.checkedUserArr = data.users.split(',')
            this.checkedMenuArr = data.menus.split(',')
          }
        })
      },
      //  保存角色
      saveInfo(type){
        this.handelTreeData()
        this.$post('/jsdj/' + type + '.action',{
          loadingEl:this.$refs.dia,
          data:{
            dto:this.editForm,
            yhInfo : this.userIds,
            qxInfo : this.menuRouters
          }
        }).then(data=>{
          if(data.succsess == 1){
            this.editDialogVisible = false
            this.getList()
          }else{
            this.$message({
              message: data.msg,
              type: "error"
            });
            return
          }
        })
      },
      // 处理树已选参数
      handelTreeData(){
        let userArr = this.$refs.tree1.getCheckedNodes()
        let menuArr = this.$refs.tree2.getCheckedNodes()
        let userIdArr = userArr.map(d => d.id)
        let menuRoutersArr = menuArr.map(d => d.id)
        this.userIds = userIdArr.join()
        this.menuRouters = menuRoutersArr.join()
      },
      filterNode(value, data) {
        if (!value) return true;
        return data.label.indexOf(value) !== -1;
      },
      filterNode1(value, data) {
        if (!value) return true;
        return data.label.indexOf(value) !== -1;
      },
      getList(){
        this.$post('/jsdj/getList.action',{
          loadingEl:this.$refs.tableElement,
          data:{
            dto:{}
          }
        }).then(data=>{
          this.tableData = data.dtoList
        })
      },
      del(){
        this.$confirm("是否确认删除?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(()=>{
            let ids = this.multipleSelection.map(d => d.jsId)
            this.$post('/jsdj/delete.action',{
              data:{
                dto:{
                  jsId:ids.join()
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
      getTreeData1(){
        this.$post('/getTree/getJSTree.action', {
          loadingEl:this.$refs.dia,
          data:{}
        }).then(data=>{
          let da = data
          da.forEach(item=>{
            if(item.children){
              item.children.forEach(val=>{
                val.label = val.label + '(' + val.yhm + ')'
              })
            }
          })
          this.treeData1 = da
        })
      },
      getTreeData2(){
        this.$post('/getMenu/getFullTree.action', {
          loadingEl:this.$refs.dia,
          data:{
            info:this.USER_INFO.userId,
          }
        }).then(data=>{
          this.treeData2 = data
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
      async load(){
        await this.getBtns()
        this.getList()
      }
    },
    mounted(){     
      this.load()
    },
    watch: {
      filterText(val) {
        this.$refs.tree2.filter(val);
      },
      filterText0(val) {
        this.$refs.tree1.filter(val);
      }
    },

  }
</script>
<style>
  .page-RoleManagement{
    text-align: left;
    position: relative;
  }
  /*.page-RoleManagement .lab .el-form-item__label{
    width: 150px;
  }*/
  .page-RoleManagement .sel{
    width: 100%;
  }
  .page-RoleManagement .cascade-select .el-form-item__label{
    width: 150px;
  }
</style>