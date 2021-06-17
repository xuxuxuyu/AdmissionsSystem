<template>
  <!-- 单位信息 -->
  <div class="page-Department">
    <div class="page-container">
      <!-- 操作框 -->
      <div class="page-operation-box clearfix">
        <div class="pull-left">
          <el-button type="primary" icon="icon iconfont icon-add" @click="openEditForm('add');openDialog('add')" v-if="btn.add">新增</el-button>
          <el-button
            type="primary"
            icon="icon iconfont iconpiliangxiugai"
            @click="openEditForm('update');openDialog('update')" 
            :disabled="updateBatchBtnDisabled"
            v-if="btn.update">修改
          </el-button>
          <el-button type="primary"
            icon="icon iconfont iconshanchu" 
            @click="deleteConfirm('bddwxxId')" 
            :disabled="deleteBatchBtnDisabled" v-if="btn.del">删除</el-button>
          <el-button ref="exportBtn" type="primary" icon="icon iconfont icondaochu" class="app-whole app-whole-export" v-if="btn.export" @click="toExport()">导出</el-button>
          <el-button type="primary" icon="icon iconfont iconmorenpaixu" v-if="btn.sort">默认排序</el-button>
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
            prop="dwbh"
            label="单位编号"
            align="center"
            :render-header="renderHeader"
            min-width="100">
            <template slot-scope="scope">{{ scope.row.dwbh }}</template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="dwmc"
            label="单位名称"
            align="center"
            min-width="260"
            :render-header="renderHeader">
            <template align="left" slot-scope="scope">{{ scope.row.dwmc }}</template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="dwjc"
            label="单位简称"
            align="center"
            min-width="180"
            :render-header="renderHeader">
            <template slot-scope="scope">{{ scope.row.dwjc }}</template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="pyszm"
            label="英文名称"
            align="center"
            min-width="180"
            :render-header="renderHeader">
            <template slot-scope="scope">{{ scope.row.pyszm }}</template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="dwlbmc"
            label="单位类别"
            align="center"
            min-width="100"
            :render-header="renderHeader">
            <template slot-scope="scope">{{ scope.row.dwlbmc }}</template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="pidMc"
            label="隶属单位"
            align="center"
            min-width="260"
            :render-header="renderHeader">
            <template slot-scope="scope">{{ scope.row.pidMc }}</template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltipf
            prop="isjys"
            label="教研室"
            align="center"
            min-width="90"
            :render-header="renderHeader">
            <template slot-scope="scope">
              <el-checkbox :disabled="true" :value="!Boolean(scope.row.isjys) ? scope.row.iskkdw : scope.row.isjys != 0"></el-checkbox>
            </template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="iskkdw"
            label="开课单位"
            align="center"
            min-width="100"
            :render-header="renderHeader">
            <template slot-scope="scope">
              <el-checkbox :disabled="true" :value="!Boolean(scope.row.iskkdw) ? scope.row.iskkdw : scope.row.iskkdw != 0"></el-checkbox>
            </template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="isskdw"
            label="上课单位"
            align="center"
            min-width="100"
            :render-header="renderHeader">
            <template slot-scope="scope">
              <el-checkbox :disabled="true" :value="!Boolean(scope.row.isskdw) ? scope.row.isskdw : scope.row.isskdw != 0"></el-checkbox>
            </template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="jybj"
            label="禁用"
            align="center"
            :render-header="renderHeader"
            min-width="80">
            <template slot-scope="scope">
              <el-checkbox :value="!Boolean(scope.row.jybj) ? scope.row.jybj : scope.row.jybj != 0" :disabled="true"></el-checkbox>
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
      <!-- 新增 & 修改 dialog -->
      <el-dialog
        ref="editDialog"
        class="edit-dialog Department-unit-dialog"
        width="60%"
        append-to-body
        title="新增单位信息"
        :visible.sync="editDialogVisible"
        @close="resetEditForm">
        <el-form
          status-icon
          label-width="105px"
          :model="editForm"
          class="form-clear-bottom"
          :rules="editFormRules"
          ref="editForm">
          <el-row>
            <el-col :span="12">
              <el-form-item label="单位编号" prop="dwbh">
                <el-input
                  clearable
                  v-model="editForm.dwbh"
                  :autofocus="true"
                  ref="dwbh_input"
                  placeholder="请输入单位编号"
                ></el-input>
              </el-form-item>
              <el-form-item label="英文名称" prop="pyszm">
                <el-input clearable v-model="editForm.pyszm" placeholder="请输入英文名称"></el-input>
              </el-form-item>
              <el-form-item label="单位简称" prop>
                <el-input clearable v-model="editForm.dwjc" placeholder="请输入单位简称"></el-input>
              </el-form-item>
              <el-form-item label="行政负责人" prop="xzfzeId">
                <el-input
                  placeholder="请选择"
                  name="dwfzr"
                  v-model="editForm.xzfzeId"
                  class="input-with-select"
                  disabled
                  v-if="false">
                  <el-button slot="append" @click="openPeopleDialog('dwfzeId')">选择</el-button>
                </el-input>
                <el-input
                  placeholder="请选择"
                  name="dwfzr"
                  v-model="editForm.xzfzeMc"
                  class="input-with-select"
                  disabled>
                  <el-button slot="append" @click="openPeopleDialog('xzfzeId')">选择</el-button>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="单位名称" prop="dwmc">
                <el-input clearable v-model="editForm.dwmc" placeholder="请输入单位名称"></el-input>
              </el-form-item>
              <el-form-item label="单位类别" prop="bddwlbId">
                <el-select style="width: 100%" v-model="editForm.bddwlbId" placeholder="请选择" @change="changeDWLB" clearable>
                  <el-option
                    v-for="item in optionsDWLB"
                    :key="item.bddwlbId"
                    :label="'[' + item.dwlbbh + ']' + item.dwlbmc"
                    :value="item.bddwlbId">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="隶属单位" prop="pid">
                <el-select style="width: 100%" v-model="editForm.pid" placeholder="请选择" :disabled="disLSDW" clearable> 
                  <el-option
                    v-for="item in optionLSDW"
                    :key="item.pid"
                    :label="'[' + item.dwbh + ']' + item.dwmc"
                    :value="item.pid">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="党委负责人" prop="dwfzeId">
                <el-input
                  placeholder="请选择"
                  name="dwfzr"
                  v-model="editForm.dwfzeId"
                  class="input-with-select"
                  disabled
                  v-if="false">
                  <el-button slot="append" @click="openPeopleDialog('dwfzeId')">选择</el-button>
                </el-input>
                <el-input
                  placeholder="请选择"
                  name="dwfzr"
                  v-model="editForm.dwfzeMc"
                  class="input-with-select"
                  disabled>
                  <el-button slot="append" @click="openPeopleDialog('dwfzeId')">选择</el-button>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="备注" prop="bz">
                <el-input type="textarea" :rows="5" v-model="editForm.bz"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label prop class="no-margin-bottom">
                <div class="app-checkbox-group app-checkbox-every">
                  <el-checkbox label="教研室标记" v-model="editForm.isjys"></el-checkbox>
                  <el-checkbox label="开课单位标识" v-model="editForm.iskkdw" ></el-checkbox>
                  <el-checkbox label="上课单位标识" v-model="editForm.isskdw"></el-checkbox>
                  <el-checkbox label="实体标记" v-model="editForm.isstbj"></el-checkbox>
                  <el-checkbox label="实验室标记" v-model="editForm.issys"></el-checkbox>
                  <el-checkbox label="管理部门标记" v-model="editForm.isglbm"></el-checkbox>
                  <el-checkbox label="禁用标记" v-model="editForm.jybj"></el-checkbox>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button
            ref="btnEditFormSave"
            type="primary"
            size="medium"
            class="app-dialog-btn app-confirm"
            @click="saveForm()"
          >确认</el-button>
          <el-button
            size="medium"
            class="app-dialog-btn app-close"
            @click="editDialogVisible = false"
          >关闭</el-button>
        </span>
      </el-dialog>
      <!-- 行政负责人，党委负责人 -->
      <el-dialog
        ref="editDialog"
        class="edit-dialog Department-unit-dialog"
        width="40%"
        append-to-body
        :title="fzrTitle"
        :visible.sync="editDialogVisiblePeople">
        <el-input
          placeholder="输入关键字进行过滤"
          v-model="filterText0">
        </el-input>
        <el-tree
          :filter-node-method="filterNode1"
          ref="tree1"
          class='elTree'
          :data="treeData"
          node-key="id"
          @node-click="handleNodeClick">
        </el-tree>
        <span slot="footer" class="dialog-footer">
          <el-button
            ref="btnEditFormSave"
            type="primary"
            size="medium"
            class="app-dialog-btn app-confirm"
            @click="savePeople()"
          >确认</el-button>
          <el-button
            size="medium"
            class="app-dialog-btn app-close"
            @click="editDialogVisiblePeople = false"
          >关闭</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
  import table from "@/mixin/table.vue";
  import appTree from "../../components/app-tree"
  export default {
    components:{
      appTree
    },
    computed:{
      ShowTree(){
        return this.$store.getters.SHOW_TREE
      }
    },
    mixins: [table],
    name:"Department",
    data() {
      return {
        editDialogVisiblePeople:false,
        getAppTreeData:null,
        requestSuffix:{
          select:'/bddwxx/getList.action',
          add:'/bddwxx/insert.action',
          update:'/bddwxx/update.action',
          delete:'/bddwxx/deletes.action',
          export:'/bddwxx/export.action'
        },
        tableData:[],
        checkedUserArr:[],
        selectConfig: {
          // 表格的通用请求
          table: {
            order: [{ Field: "dwbh", IsDesc: false }],
            fuzzy: [

            ],
            where: [
            ]
          }
        },
        editDialogVisible:false,
        editForm: {
          bddwxxId: "", //单位主键
          dwbh: "", //单位编号
          dwmc: "", //单位名称
          ywmc: "", //英文名称
          pyszm: "", //拼音首字母
          dwjc: "", //单位简称
          dwjcpyszm: "", //简称拼音首字母
          pid: "", //隶属单位主键 （描述：获取单位信息数据; 
          bddwlbId: "", //单位类别主键 （描述：获取单位类别信息数据; 
          dwdz: "", //单位地址
          xzfzeId: "", //行政负责人主键 （描述：获取教师基本信息数据; 
          dwfzeId: "", //党委负责人主键 （描述：获取教师基本信息数据;
          isjys: false, //教研室标记
          iskkdw: false, //开课单位标识
          isskdw: false, //上课单位标识
          isstbj: false, //实体标记
          issys: false, //实验室标记
          isglbm: false, //管理部门标记
          bz: "", //备注
          jybj: false //禁用标记
        },
        //表单验证
        editFormRules: {
          // 单位编号 （验证: 非空, 长度: 20）
          dwbh: [
            {
              required: true,
              message: "单位编号必须输入",
              trigger: "blur"
            },
            {
              min: 0,
              max: 20,
              message: "单位编号长度不能大于20个字符",
              trigger: "blur"
            }
          ],
          // 单位名称 （验证: 非空, 长度: 50）
          dwmc: [
            {
              required: true,
              message: "单位名称必须输入",
              trigger: "blur"
            },
            {
              min: 0,
              max: 50,
              message: "单位名称长度不能大于50个字符",
              trigger: "blur"
            }
          ],
          // 英文名称 （验证: 英文, 长度: 200）
          ywmc: [
            {
              validator: this.$validator.validateEng,
              trigger: "blur"
            },
            {
              min: 0,
              max: 200,
              message: "英文名称长度不能大于200个字符",
              trigger: "blur"
            }
          ],
          // 单位简称 （长度: 50）
          dwjc: [
            {
              min: 0,
              max: 50,
              message: "单位简称长度不能大于50个字符",
              trigger: "blur"
            }
          ],
          // 单位类别主键 （验证: 非空）
          bddwlbId: [
            {
              required: true,
              message: "单位类别必须输入",
              trigger: "change"
            }
          ],
          // 单位地址 （长度: 200）
          dwdz: [
            {
              min: 0,
              max: 200,
              message: "单位地址长度不能大于200个字符",
              trigger: "blur"
            }
          ],
          // 备注 （长度: 200）
          bz: [
            {
              min: 0,
              max: 200,
              message: "备注长度不能大于200个字符",
              trigger: "blur"
            }
          ]
        },
        treeData:[],
        optionsDWLB:[],
        optionLSDW:[],
        disLSDW:true,
        fzrTitle:'',
        filterText0:'',
        currentNode:{}
      }
    },
    methods:{
      // clickItem(val){
      //   this.treeRequestList(val.data.id)
      // },
      // 搜索
      filterNode1(value, data) {
        if (!value) return true;
        return data.label.indexOf(value) !== -1;
      },
      search() {
        this.currentPage = 1;
        this.getList();
      },
      async load(){
        // 获取列表
        this.getList(true)
        this.getTreeData()
      },
      async getList(isPaging, callback) {
      // @特殊处理 是否分页 字段, 要区分 分页 与 不分页的情况
        await this.setIsPaging(isPaging || true).requestList(callback);
      },
      //保存新增信息
      async saveForm(){
        console.log(this.editForm);
        this.editForm.jybj = this.editForm.jybj ? 1 : 0
        this.editForm.isjys = this.editForm.isjys ? 1 : 0
        this.editForm.iskkdw = this.editForm.iskkdw ? 1 : 0
        this.editForm.isskdw = this.editForm.isskdw ? 1 : 0
        this.$refs["editForm"].validate(async valid => {
          if (!valid) {
            return false;
          }
          if (this.editDialogType === "add") {
            await this.addEditForm(
              this.editForm
              );
          } else if (this.editDialogType === "update") {
            await this.updateEditForm(
              this.editForm
              );
          }
        })
      },
      changeDWLB(id){
        this.disLSDW = false
        this.$post('/bddwxx/getList.action',{
          data:{
            bddwlbId:id
          }
        }).then(data=>{
          this.optionLSDW = data.list
        })

      },
      openPeopleDialog(people){
        if(people == 'xzfzeId'){
          this.fzrTitle = '选择行政负责人'
        }else if(people == 'dwfzeId'){
          this.fzrTitle = '选择党委负责人'
        }
        this.editDialogVisiblePeople = true
      },
      savePeople(){
        if(this.currentNode.children){
          if(this.fzrTitle == '选择行政负责人'){
            this.$message({message:"请选择行政负责人", type: "error"});
          }else{
            this.$message({message:"请选择负党委责人", type: "error"});
          }
          return
        }
        if(this.fzrTitle == '选择行政负责人'){
          this.editForm.xzfzeId = this.currentNode.id
          this.editForm.xzfzeMc = this.currentNode.label
          this.editDialogVisiblePeople = false
        }else if(this.fzrTitle == '选择党委负责人'){
          this.editForm.dwfzeId = this.currentNode.id
          this.editForm.dwfzeMc = this.currentNode.label
          this.editDialogVisiblePeople = false
        }
      },
      getTreeData(){
        this.$post('/teacherInfo/getTTree.action',{
          loadingEl: this.$refs.appTreeRef,
          data:{
            dto:{}
          }
        }).then(data=>{
          if(data.succsess){
            this.treeData = data.tree
          }
        })
      },
      handleNodeClick(obj,node,compont){
        this.currentNode = obj
      },
      getDWLB(){
        this.$post('/bddwlb/getList.action',{
          data:{
            dto:{}
          }
        }).then(data=>{
          this.optionsDWLB = data.list
        })
      },
      openDialog(type){
        if(type == 'add'){
          this.editForm = {}
        }
        // 
        if(type=='update'){
          this.editForm.isjys = this.editForm.isjys == 0 ? false : true
          this.editForm.jybj = this.editForm.jybj == 0 ? false : true
          this.editForm.iskkdw = this.editForm.iskkdw == 0 ? false : true
          this.editForm.isskdw = this.editForm.isskdw == 0 ? false : true
        }
        this.getDWLB()
      }
    },
    mounted(){
      this.load()
      // this.getAppTreeData = this.$refs.appTreeRef.getTreeData
    }
  }
</script>
<style>
  .page-Department{
    position: relative;
  }
  .borderRight{
    height: 93.5%;
    width: 300px;
    margin-left: -20px;
  }
</style>