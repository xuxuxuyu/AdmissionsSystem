<template>
  <!-- 大类信息 -->
  <div class="page-GenericInfo">
    <div class="page-container">
      <!-- 操作框 -->
      <div class="page-operation-box clearfix">
        <div class="pull-left">
          <el-button
            type="primary"
            icon="icon iconfont icon-add" @click="openEditForm('add');openDialog('add')" v-if="btn.add">新增</el-button>
          <el-button
            type="primary"
            icon="icon iconfont iconpiliangxiugai"
            @click="openEditForm('update');openDialog('update')" :disabled="updateBatchBtnDisabled"
            v-if="btn.update">修改
          </el-button>
          <el-button
            type="primary"
            icon="icon iconfont iconshanchu" @click="deleteConfirm('bdzyxxId');searchData.lbz = 1" :disabled="deleteBatchBtnDisabled" v-if="btn.del">删除</el-button>
          <el-button
            ref="exportBtn"
            type="primary"
            icon="icon iconfont icondaochu"class="app-whole app-whole-export" v-if="btn.export" @click="toExport();searchData.lbz = 1">导出</el-button>
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
            prop="xnzybh"
            label="大类专业编号"
            min-width="130"
            align="center"
            :render-header="renderHeader">
            <template slot-scope="scope">{{ scope.row.xnzybh }}</template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            min-width="130"
            prop="xnzymc"
            label="大类专业名称"
            align="center"
            :render-header="renderHeader">
            <template slot-scope="scope">{{ scope.row.xnzymc }}</template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            min-width="130"
            prop="zyjc"
            label="大类专业简称"
            align="center"
            :render-header="renderHeader">
            <template slot-scope="scope">{{ scope.row.zyjc }}</template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            min-width="130"
            prop="ywmc"
            label="英文名称"
            align="center"
            :render-header="renderHeader">
            <template slot-scope="scope">{{ scope.row.ywmc }}</template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            min-width="130"
            prop="dwmc"
            label="所属单位"
            align="center"
            :render-header="renderHeader">
            <template slot-scope="scope">{{ scope.row.dwmc }}</template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            min-width="130"
            prop="yxxynx"
            label="允许修业年限"
            align="center"
            :render-header="renderHeader">
            <template slot-scope="scope">{{ scope.row.yxxynx }}</template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            min-width="100"
            prop="xkmlmc"
            label="学科门类"
            align="center"
            :render-header="renderHeader">
            <template slot-scope="scope">{{ scope.row.xkmlmc }}</template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            min-width="100"
            prop="yjxkmc"
            label="一级学科"
            align="center"
            :render-header="renderHeader">
            <template slot-scope="scope">{{ scope.row.yjxkmc }}</template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="jybj"
            label="禁用"
            align="center"
            :render-header="renderHeader"
            min-width="80">
            <template slot-scope="scope">
              <el-checkbox :value="!Boolean(scope.row.zybz) ? scope.row.zybz : scope.row.zybz != 0" :disabled="true"></el-checkbox>
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
      <!-- 新增 & 编辑 dialog -->
      <el-dialog
        ref="editDialog"
        class="edit-dialog Department-dialog"
        width="750px"
        append-to-body
        title="新增大类信息"
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
              <el-form-item label="大类编号" prop="xnzybh">
                <el-input
                  clearable
                  v-model="editForm.xnzybh"
                  :autofocus="true"
                  ref="xnzybh_input"
                  placeholder="请输入大类专业编号"
                ></el-input>
              </el-form-item>
              <el-form-item label="英文名称" prop="ywmc">
                <el-input clearable v-model="editForm.ywmc" placeholder="请输入英文名称"></el-input>
              </el-form-item>
              <el-form-item label="上课单位" prop="bddwxxId">
                 <el-select style="width: 100%" v-model="editForm.bddwxxId" placeholder="请选择" clearable>
                  <el-option
                    v-for="item in optionsXY"
                    :key="item.bddwxxId"
                    :label="'[' + item.dwbh + ']' + item.dwmc"
                    :value="item.bddwxxId">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="学科门类" prop="xkml">
                <el-select style="width: 100%" v-model="editForm.xkml" placeholder="请选择" @change="handleChangeXKML" clearable>
                  <el-option
                    v-for="item in optionsXKML"
                    :key="item.id"
                    :label="'[' + item.dmbh + ']' + item.dmmc"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="大类名称" prop="xnzymc">
                <el-input clearable v-model="editForm.xnzymc" placeholder="请输入大类专业名称"></el-input>
              </el-form-item>
              <el-form-item label="大类简称" prop="zyjc">
                <el-input clearable v-model="editForm.zyjc" placeholder="请输入大类专业简称"></el-input>
              </el-form-item>
              <el-form-item label="允许修业年限" prop="yxxynx">
                <el-input clearable v-model="editForm.yxxynx" placeholder="请输入允许修业年限"></el-input>
              </el-form-item>
              <el-form-item label="一级学科" pros="yjxk">
                <el-select style="width: 100%" v-model="editForm.yjxk" placeholder="请选择" clearable :disabled="disYJXK">
                  <el-option
                    v-for="item in optionsYJXK"
                    :key="item.id"
                    :label="'[' + item.dmbh + ']' + item.dmmc"
                    :value="item.id">
                  </el-option>
                </el-select>
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
    </div>
  </div>
</template>
<script>
  import table from "@/mixin/table.vue";
  export default {
    mixins: [table],
    name:"GenericInfo",
    data() {
      return {
         // 简化请求URL书写
        requestSuffix:{
          select:'/bdzyxx/getList.action',
          add:'/bdzyxx/insert.action',
          update:'/bdzyxx/update.action',
          delete:'/bdzyxx/deletes.action',
          export:'/bdzyxx/export.action'
        },
        tableData:[],
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
        editForm: {
          bdzyxxndId: "", //主键
          xnzybh: "", //大类专业编号
          xnzymc: "", //大类专业名称
          ywmc: "", //英文名称
          pyszm: "", //拼音首字母
          zyjc: "", //专业简称
          bddwxxId: "", //单位信息主键 （描述：获取上课单位数据; 地址：/api/publicqueryapi/getdepartmentisskdw）
          xz: "1", //学制
          yxxynx: "", //允许修业年限
          jj: "", //简介
          xkml: "", //学科门类
          yjxk: "", //一级学科
          lbz: 1, //类标志
          bz: "", //备注
          jybj: false, //禁用标记
          unitlist1: [],
        },
        // 表单验证
        editFormRules: {
          // 大类专业编号 （验证: 非空, 长度: 20）
          xnzybh: [
            { required: true, message: "大类专业编号必须输入", tigger: "blur" },
            {
              min: 0,
              max: 20,
              message: "大类专业编号长度不能大于20个字符",
              trigger: "blur"
            }
          ],
          // 大类专业名称 （验证: 非空, 长度: 50）
          xnzymc: [
            { required: true, message: "大类专业名称必须输入", tigger: "blur" },
            {
              min: 0,
              max: 50,
              message: "大类专业名称长度不能大于50个字符",
              trigger: "blur"
            }
          ],
          // 英文名称 （验证: 非空, 长度: 200）
          ywmc: [
            { validator: this.$validator.validateEng, trigger: "blur" },
            {
              min: 0,
              max: 200,
              message: "英文名称长度不能大于200个字符",
              trigger: "blur"
            }
          ],
          // 专业简称 （长度: 20）
          zyjc: [
            {
              min: 0,
              max: 20,
              message: "专业简称长度不能大于20个字符",
              trigger: "blur"
            }
          ],
          // 所属单位/单位信息主键 （验证: 非空）
          bddwxxId: [
            { required: true, message: "所属单位必须输入", tigger: "change" }
          ],
          // 学制 （验证: 非空, 数字, 保留一位小数, [例如: 4.5]）
          xz: [
            { required: true, message: "学制必须输入", tigger: "blur" },
            { validator: this.$validator.validateOneNum, trigger: "blur" }
          ],
          // 允许修业年限 （验证: 非空, 数字）
          yxxynx: [
            { required: true, message: "允许修业年限必须输入" },
            { validator: this.$validator.validateNum, trigger: "blur" }
          ],
          // 学科门类 （长度: 50）
          xkml: [
            {
              min: 0,
              max: 50,
              message: "学科门类长度不能大于50个字符",
              trigger: "change"
            }
          ],
          // 一级学科 （长度: 50）
          yjxk: [
            {
              min: 0,
              max: 50,
              message: "一级学科长度不能大于50个字符",
              trigger: "change"
            }
          ],
          // 备注 （长度: 300）
          bz: [
            {
              min: 0,
              max: 300,
              message: "备注长度不能大于300个字符",
              trigger: "blur"
            }
          ]
        },
        optionsXY:[],
        optionsYJXK:[],
        optionsXKML:[],
        disYJXK:true,
        classbeginsDialogVisible:false,
        classbeginsForm:{}
      }
    },
    methods:{
      // 搜索
      search() {
        this.currentPage = 1;
        this.getList();
      },
      async load(){
        // 获取列表
        this.getList(true)
      },
      async getList(isPaging, callback) {
      // @特殊处理 是否分页 字段, 要区分 分页 与 不分页的情况
       this.searchData.lbz = 1
        await this.setIsPaging(isPaging || true).requestList(callback);
      },
      //保存新增信息
      async saveForm(){
        this.editForm.jybj = this.editForm.jybj ? 1 : 0
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
      // 获取学院信息
      getXY(){
        this.$post('/bddwxx/getCollege.action',{
          loadingEl:this.$refs.editDialog,
          data:{}
        }).then(data=>{
          if(data.succsess){
            this.optionsXY = data.list
          }
        })
      },
      // 获取学科门类
      getXKML(){
        this.$post('/STCode/getList.action',{
          loadingEl:this.$refs.editDialog,
          data:{
            dmbt:'XKML',
            sfsyzjd:1
          }
        }).then(data=>{
          if(data.succsess){
            this.optionsXKML = data.list
          }
        })
      },
      handleChangeXKML(id){
        this.disYJXK = false
        this.$post('/STCode/getList.action',{
          loadingEl:this.$refs.editDialog,
          data:{
            fid:id,
            dmbt:'YJXK' ,
            sfsyzjd:0
          }
        }).then(data=>{
          if(data.succsess){
            this.optionsYJXK = data.list
          }
        })
      },
      openDialog(type){
        if(type == 'add'){
          this.editForm = {}
        }
        // 
        if(type=='update'){
          this.editForm.jybj = this.editForm.jybj == 0 ? false : true
        }
        this.editForm.lbz = 1
        this.getXY()
        this.getXKML()
      }
    },
    mounted(){
      this.load()
    },
    mounted(){
      this.load()
    }
  }
</script>
<style>
  .page-GenericInfo{
    position: relative;
  }
</style>