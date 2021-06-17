<template>
  <!-- 年度专业信息 -->
  <div class="page-ProfessionInfoYear">
    <div class="page-container">
      <!-- 操作框 -->
      <div class="page-operation-box clearfix">
        <div class="pull-left">
          <el-button type="primary" icon="icon iconfont iconjiaoshikebiao" @click="openCopy()" v-if="btn.update">复制</el-button>
          <el-button type="primary" icon="icon iconfont icon-add" @click="openEditForm('add');opendialog()" v-if="btn.add">新增</el-button>
          <el-button
            type="primary"
            icon="icon iconfont iconpiliangxiugai"
            @click="modifyConfirm();opendialog()" :disabled="updateBatchBtnDisabled"
            v-if="btn.update">修改
          </el-button>
          <el-button type="primary" 
            icon="icon iconfont iconshanchu" 
            @click="del()" 
            :disabled="deleteBatchBtnDisabled" v-if="btn.del">删除</el-button>
          <el-button ref="exportBtn" type="primary" icon="icon iconfont icondaochu"class="app-whole app-whole-export" @click="toExport()" v-if="btn.export">导出</el-button>
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
          <el-table-column align="center" type="selection" width="50"></el-table-column>
          <el-table-column fixed label="序号" align="center" type="index" width="50"></el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="nf"
            label="年级"
            align="center"
            :render-header="renderHeader"
            min-width="80">
            <template slot-scope="scope">{{ scope.row.nf }}</template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="xnzybh"
            label="校内专业编号"
            align="center"
            :render-header="renderHeader"
            min-width="130">
            <template slot-scope="scope">{{ scope.row.xnzybh }}</template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="xnzymc"
            label="校内专业名称"
            header-align="center"
            :render-header="renderHeader"
            min-width="230">
            <template align="left" slot-scope="scope">{{ scope.row.xnzymc }}</template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="zyjc"
            label="专业简称"
            header-align="center"
            :render-header="renderHeader"
            min-width="230">
            <template align="left" slot-scope="scope">{{ scope.row.zyjc }}</template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="ywmc"
            label="英文名称"
            align="center"
            :render-header="renderHeader"
            min-width="230">
            <template slot-scope="scope">{{ scope.row.ywmc }}</template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="dwmc"
            label="所属单位"
            align="center"
            :render-header="renderHeader"
            min-width="150">
            <template slot-scope="scope">{{ scope.row.dwmc }}</template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="xz"
            label="学制"
            align="center"
            :render-header="renderHeader"
            min-width="120">
            <template slot-scope="scope">{{ scope.row.xz }}</template>
          </el-table-column>
          <el-table-column
          show-overflow-tooltip
          prop="sxxl"
          label="所修学历"
          align="center"
          :render-header="renderHeader"
          min-width="120">
          <template slot-scope="scope">{{ scope.row.sxxl }}</template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="zylx"
            label="专业类型"
            align="center"
            :render-header="renderHeader"
            min-width="120">
            <template slot-scope="scope">{{ scope.row.zylx }}</template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="yxxynx"
            label="修业年限"
            align="center"
            :render-header="renderHeader"
            min-width="120">
            <template slot-scope="scope">{{ scope.row.yxxynx }}</template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="xkml"
            label="学科门类"
            align="center"
            :render-header="renderHeader"
            min-width="120">
            <template slot-scope="scope">{{ scope.row.xkml }}</template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="yjxk"
            label="一级学科"
            align="center"
            :render-header="renderHeader"
            min-width="120">
            <template slot-scope="scope">{{ scope.row.yjxk }}</template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="sfxzy"
            label="新专业"
            align="center"
            :render-header="renderHeader"
            min-width="90">
            <template slot-scope="scope" >
              <el-checkbox :disabled="true" v-model="scope.row.sfxzy == 0 ? false : true"></el-checkbox>
            </template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="sfsflzy"
            label="师范类专业"
            align="center"
            :render-header="renderHeader"
            min-width="120">
            <template slot-scope="scope">
              <el-checkbox :disabled="true" v-model="scope.row.sfsflzy == 0 ? false : true"></el-checkbox>
            </template>
          </el-table-column>
          <el-table-column
            prop="jybj"
            label="禁用"
            align="center"
            width="80"
            :render-header="renderHeader">
            <template slot-scope="scope">
              <el-checkbox :disabled="true" v-model="scope.row.jybj"></el-checkbox>
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
      <!-- 新增dialog -->
      <el-dialog
        ref="editDialog"
        class="edit-dialog"
        width="550px"
        append-to-body
        title="新增专业年度信息"
        @close="resetEditForm"
        :visible.sync="editDialogVisible">
        <el-form
          status-icon
          label-width="80px"
          :model="editForm"
          class="form-clear-bottom"
          :rules="editFormRule"
          ref="addEditForm">
          <el-row>
            <el-col :span="24">
              <el-form-item label="年级" prop="nf">
                <el-select style="width: 100%" v-model="editForm.nf" placeholder="请选择">
                  <el-option
                    v-for="item in optionsNF"
                    :key="item.rxnf"
                    :label="item.rxnf"
                    :value="item.rxnf">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="所属单位" prop="bddwxxId">
                <template>
                  <el-select style="width: 100%" v-model="editForm.bddwxxId" placeholder="请选择" @change="changeXY" clearable>
                    <el-option
                      v-for="item in optionsXY"
                      :key="item.bddwxxId"
                      :label="'[' + item.dwbh + ']' + item.dwmc"
                      :value="item.bddwxxId">
                    </el-option>
                  </el-select>
                </template>
              </el-form-item>
              <el-form-item label="所属专业" prop="bdzyxxId">
                <el-select style="width: 100%" v-model="editForm.bdzyxxId" placeholder="请选择" :disabled="disabledZY">
                  <el-option
                    v-for="item in optionsZY"
                    :key="item.bdzyxxId"
                    :label="'[' + item.xnzybh + ']' + item.xnzymc"
                    :value="item.bdzyxxId">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="变更单位" prop="ybddwxxId">
                <el-select style="width: 100%" v-model="editForm.ybddwxxId" placeholder="请选择" @change="changeXY" clearable>
                  <el-option
                    v-for="item in optionsXY"
                    :key="item.bddwxxId"
                    :label="'[' + item.dwbh + ']' + item.dwmc"
                    :value="item.bddwxxId">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
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
            @click="editDialogVisible=false">关闭</el-button>
        </span>
      </el-dialog>
      <!-- 修改dialog -->
      <el-dialog
        class="modify-dialog"
        width="60%" 
        append-to-body 
        :title="modifyDialogDisplayTitle" 
        :visible.sync="modifyDialogVisible"
        @close="resetEditFormCustom('editForm')">
        <el-form 
          status-icon
          label-width="110px" 
          :model="editForm" 
          class="form-clear-bottom" 
          :rules="editFormRules"
          ref="editForm">
          <el-row>
            <el-col :span="12">
              <el-form-item label="校内专业编号" prop="xnzybh">
                <el-input  clearable v-model="editForm.xnzybh" :autofocus="true" ref="XNZYBH_INPUT" placeholder="请输入校内专业编号"></el-input>
              </el-form-item>
              <el-form-item label="英文名称" prop="ywmc">
                <el-input  clearable  v-model="editForm.ywmc" placeholder="请输入英文名称"></el-input>
              </el-form-item>
              <el-form-item label="年级" prop="nf">
                <el-select style="width: 100%" v-model="editForm.nf" placeholder="请选择">
                  <el-option
                    v-for="item in optionsNF"
                    :key="item.rxnf"
                    :label="item.rxnf"
                    :value="item.rxnf">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="学制" prop="xz">
                <el-input  clearable  v-model="editForm.xz" placeholder="请输入学制"></el-input>
              </el-form-item>
              <el-form-item label="所修学历" prop="sxxl">
                <el-select style="width: 100%" v-model="editForm.sxxl" placeholder="请选择" clearable>
                  <el-option
                    v-for="item in optionsSSXL"
                    :key="item.id"
                    :label="'[' + item.dmbh + ']' + item.dmmc"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="专业类型" prop="zylx">
                <el-select style="width: 100%" v-model="editForm.zylx" placeholder="请选择" clearable>
                  <el-option
                    v-for="item in optionsZYLX"
                    :key="item.id"
                    :label="'[' + item.dmbh + ']' + item.dmmc"
                    :value="item.id">
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
              <el-form-item label="招生学科" prop="zsxk">
                <el-select style="width: 100%" v-model="editForm.zsxk" placeholder="请选择" clearable>
                  <el-option
                    v-for="item in optionsZSXK"
                    :key="item.id"
                    :label="'[' + item.dmbh + ']' + item.dmmc"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="优势专业类型" prop="yszylx">
                <el-select style="width: 100%" v-model="editForm.yszylx" placeholder="请选择" clearable>
                  <el-option
                    v-for="item in optionsYSZYLX"
                    :key="item.id"
                    :label="'[' + item.dmbh + ']' + item.dmmc"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="国标专业代码" prop="zydm">
                <el-input  clearable v-model="editForm.zydm" placeholder="请输入国标专业代码"></el-input>
              </el-form-item>
              <el-form-item label="毕业证专业名称" prop="byzzymc">
                <el-input  clearable v-model="editForm.byzzymc" placeholder="请输入毕业证专业名称"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="校内专业名称" prop="xnzymc">
                <el-input  clearable  v-model="editForm.xnzymc" placeholder="请输入校内专业名称"></el-input>
              </el-form-item>
              <el-form-item label="专业简称" prop="zyjc">
                <el-input  clearable  v-model="editForm.zyjc" placeholder="请输入专业简称"></el-input>
              </el-form-item>
              <el-form-item label="所属单位" prop="bddwxxId">
                <template>
                  <el-select style="width: 100%" v-model="editForm.bddwxxId" placeholder="请选择" clearable>
                    <el-option
                      v-for="item in optionsXY"
                      :key="item.bddwxxId"
                      :label="'[' + item.dwbh + ']' + item.dwmc"
                      :value="item.bddwxxId">
                    </el-option>
                  </el-select>
                </template>
              </el-form-item>
              <el-form-item label="所属大类" prop="ssdlId">
                <el-select style="width: 100%" v-model="editForm.sslId" placeholder="请选择" clearable>
                  <el-option
                    v-for="item in optionsSSDL"
                    :key="item.sslId"
                    :label="'[' + item.dwbh + ']' + item.dwmc"
                    :value="item.sslId">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="所修学位" prop="sxxw">
                <el-select style="width: 100%" v-model="editForm.sxxw" placeholder="请选择" clearable>
                  <el-option
                    v-for="item in optionsSXXW"
                    :key="item.id"
                    :label="'[' + item.dmbh + ']' + item.dmmc"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="允许修业年限" prop="yxxynx">
                <el-input  clearable v-model="editForm.yxxynx" placeholder="请输入允许修业年限"></el-input>
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
              <el-form-item label="专业设置年份" prop="zysznf">
                <el-input  clearable v-model="editForm.zysznf" placeholder="请输入专业设置年份"></el-input>
              </el-form-item>
              <el-form-item label="代码版本" prop="dmbb">
                <el-input  clearable v-model="editForm.dmbb" placeholder="请输入代码版本"></el-input>
              </el-form-item>
              <el-form-item label="国标专业名称" prop="zymc">
                <el-input  clearable v-model="editForm.zymc" placeholder="请输入国标专业名称"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="备注" prop="bz">
                <el-input  clearable type="textarea" :rows="5" v-model="editForm.bz" placeholder=""></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item>
                <el-checkbox label="是否新专业" v-model="editForm.sfxzy"></el-checkbox>
                <el-checkbox label="是否师范类专业" v-model="editForm.sfsflzy"></el-checkbox>
                <el-checkbox label="禁用标记" v-model="editForm.jybj"></el-checkbox>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button 
            type="primary" 
            size="medium" 
            @click="editSave('editForm')"
            class="app-dialog-btn app-confirm ">确认</el-button>
          <el-button 
            size="medium" 
            @click="modifyDialogVisible = false" 
            class="app-dialog-btn app-close">关闭</el-button>
        </span>
      </el-dialog>
      <!-- 复制dialog -->
      <el-dialog 
        ref="editDialog" 
        :close-on-click-modal='false'
        lass="edit-dialog ProfessionInfoYear-classbegins-dialog" 
        status-icon append-to-body width="500px"
        @close="classbeginsDialogVisible=false" 
        title="复制年度专业信息" 
        :visible.sync="classbeginsDialogVisible">
        <el-form status-icon label-width="70px" :model="classbeginsForm" class="form-clear-bottom" ref="classbeginsForm">
          <div class="page-form-box">
            <div class="page-form-box-header">
              <i class="icon iconfont iconxinxi"></i>
              <span class="name">源年度专业</span>
            </div>
            <el-row>
              <el-col>
                <div class="term">
                  <el-form-item label="源年级" prop="nf">
                    <el-select style="width: 100%" v-model="classbeginsForm.nf" placeholder="请选择">
                      <el-option
                        v-for="item in optionsNF"
                        :key="item.rxnf"
                        :label="item.rxnf"
                        :value="item.rxnf">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="所属单位" prop="bddwxxId">
                    <template>
                      <el-select style="width: 100%" v-model="classbeginsForm.bddwxxId" placeholder="请选择" clearable>
                        <el-option
                          v-for="item in optionsXY"
                          :key="item.bddwxxId"
                          :label="'[' + item.dwbh + ']' + item.dwmc"
                          :value="item.bddwxxId">
                        </el-option>
                      </el-select>
                    </template>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
          </div>
          <div class="page-form-box">
            <div class="page-form-box-header">
              <i class="icon iconfont iconxinxi"></i>
              <span class="name">复制到</span>
            </div>
            <el-row>
              <el-col>
                <div class="term">
                  <el-form-item label="年级" prop="nnf">
                    <el-select v-model="classbeginsForm.nnf" class="width-percent-100" clearable placeholder="请选择">
                      <el-option
                        v-for="item in optionsNF"
                        :key="item.rxnf"
                        :label="item.rxnf"
                        :value="item.rxnf">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button ref="btnClassbeginsFormSave" type="primary" size="medium" class="app-dialog-btn app-confirm" @click="saveCloneForm()">确认</el-button>
          <el-button size="medium" class="app-dialog-btn app-close" @click="classbeginsDialogVisible=false">关闭</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
  import table from "@/mixin/table.vue";
  export default {
    mixins: [table],
    name:"ProfessionInfo",
    computed: {
      USER_INFO() {
        return this.$store.getters.USER_INFO
      }
    },
    data() {
      return {
        requestSuffix:{
          // select:'/bdzyxxnd/getList.action',
          // add:'/bdzyxxnd/insert.action',
          // update:'/bdzyxxnd/update.action',
          // delete:'/bdzyxxnd/deletes.action'
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
        tableData:[],
        editDialogVisible:false,
        editForm: {
          // 添加dialog所需表单字段
          bdzyxxndId: "", //主键
          bdzyxxId: "", //专业主键 （描述：获取专业信息数据; 地址：/api/publicqueryapi/getprofessioninfo）
          nf: "", //年份 （描述：获取年份数据; 地址：/api/publicqueryapi/getentranceyear）
          ybddwxxId: "", //原单位信息主键 （描述：获取上课单位数据; 地址：/api/
        },
        // 新增表单验证
        editFormRule: {
          nf: [{required: true, message: "年级必须选择"},],
          bddwxxId: [{required: true, message: "所属单位必须选择"}],
          bdzyxxId: [{required: true, message: "所属专业必须选择"}],
        },
        optionsNF:[],
        optionsZY:[],
        optionsXY:[],
        optionsSSDL:[],
        optionsZYLX:[],
        optionsSSXL:[],
        optionsSXXW:[],
        optionsZSXK:[],
        optionsXKML:[],
        disYJXK:true,
        optionsYJXK:[],
        optionsYSZYLX:[],
        classbeginsDialogVisible:false,
        classbeginsForm:{},
        disabledZY:true,
        searchData:{
          nf:'',
          xnzybh:'',
          xnzymc:'',
          zyjc:'',
          ywmc:'',
          dwmc:'',
          xz:'',
          sxxl:'',
          zylx:'',
          yxxynx:'',
          xkml:'',
          yjxk:'',
          sfxzy:'',
          sfxzy:'',
          sfsflzy:'',
          jybj:''
        },
        btn:{},
        modifyDialogDisplayTitle:'修改年度专业信息',
        modifyDialogVisible:false,
        disYJXK:true,
        showColumnDisable:false
      }
    },
    methods:{
      // 搜索
      search() {
        this.currentPage = 1;
        this.getList();
      },
      async getList() {
      // @特殊处理 是否分页 字段, 要区分 分页 与 不分页的情况
        // await this.setIsPaging(isPaging || true).requestList(callback);
        this.searchData.lbz = 0
        this.searchData.pageNum = this.currentPage
        this.searchData.pageCnt = this.pageSize
        this.searchDatashowColumnDisable = this.showColumnDisable 
        this.$post('/bdzyxxnd/getList.action',{
            loadingEl:this.$refs.tableElement,
            data:this.searchData
          }).then(data=>{
            this.tableData = data.list
            this.total = data.allCnt;
          })
      },
      async load() {
        // 获取列表
        this.getBtns()
        this.getList(true);
      },
      //保存新增信息
      async saveForm(){
        this.editForm.lbz = 0
        this.$refs["addEditForm"].validate(async valid => {
          if (!valid) {
            return false;
          }
          if (this.editDialogType === "add") {
            await this.add()
          }
        })
      },
      add(){
        this.$post('/bdzyxxnd/insert.action', {
          loadingEl: "all",
          data: this.editForm
        })
        .then(data => {
          if(data.succsess){
            this.$message({
              message: "操作成功",
              type: "success"
            });
            this.editDialogVisible = false
            this.getList()
            }else{
              this.$message({message: data.jsonMsg, type: "error"});
            }
        })
      },
      // 修改设置表单数据
      modifyConfirm(){
        this.editForm={}
        this.modifyDialogVisible = true
        this.editForm = this.multipleSelection[0]
      },
      // 保存修改信息
      editSave(){
        this.editForm.lbz = 0
        this.$refs["editForm"].validate(async valid => {
          if (!valid) {
            return false;
          }
          if ([null, undefined, ""].includes(this.editForm.bdzyxxId)) {
            this.editForm.bdzyxxId = this.bdzyxxId;
          }
          this.$post('/bdzyxxnd/update.action',
            {
              loadingEl: "all",
              action: "update",
              data: this.editForm
            }
          )
            .then(data => {
              this.$message({message: "操作成功", type: "success"});
              this.modifyDialogVisible = false;
              this.resetEditForm();
              this.requestList();
            })
            .catch(err => {
              this.$message({message: "操作失败", type: "error"});
            });
        });
      },
      //表单重置
      resetEditFormCustom(val) {
        this.resetEditForm();
        this.editDialogVisible = false
        // 关掉dialog
        this.editDialogVisible = false;
        this.modifyDialogVisible =false
        // 清空新增表单
        this.editForm = {
          // 添加dialog所需表单字段
          bdzyxxndId: "", //主键
          bdzyxxId: "", //专业主键 （描述：获取专业信息数据; 地址：/api/publicqueryapi/getprofessioninfo）
          nf: "", //年份 （描述：获取年份数据; 地址：/api/publicqueryapi/getentranceyear）
          ybddwxxId: "", //原单位信息主键 （描述：获取上课单位数据; 地址：/api/publicqueryapi/getdepartmentisskdw）
          bddwxxId: "", //单位信息主键 （描述：获取上课单位数据; 地址：/api/publicqueryapi/getdepartmentisskdw）
          nflist: [],
          bddwxxidlist: [],
          // 编辑dialog所需表单字段
          xnzybh: "",   //校内专业编号 （验证: 非空, 长度: 20）
          xnzymc: "",   //校内专业名称 （验证: 非空, 长度: 50）
          ywmc: "",     //英文名称 （验证: 英文, 长度: 200）
          zyjc: "",     //专业简称 （长度: 20）
          xz: "",       //学制 （验证: 非空, 数字, 保留一位小数, [例如: 4.5]）
          sslId: "",    //大类主键 （描述：获取大类专业数据; 地址：/api/publicqueryapi/getgenericinfoyear）
          sxxl: "",     //所修学历 （长度: 50）
          sxxw: "",     //所修学位 （长度: 50）
          zylx: "",     //专业类型 （长度: 50）
          yxxynx:"",    //允许修业年限 （验证: 非空, 数字）
          xkml: "",     //学科门类 （长度: 50）
          yjxk: "",     //一级学科 （长度: 50）
          zsxk: "",     //招生学科 （长度: 50）
          zysznf: "",   //专业设置年份 （验证: 数字, 长度: 6）
          yszylx: "",   //优势专业类型 （长度: 20）
          dmbb: "",     //代码版本 （长度: 4）
          zydm: "",     //国标专业代码 （长度: 20）
          zymc: "",     //国标专业名称 （长度: 50）
          byzzymc: "",  //毕业证专业名称 （长度: 50）
          bz: "",       //备注 （长度: 300）
          lbz: 0,   //类标志 （验证: 非空）
          sfxzy: true,  //是否新专业 （验证: 非空）
          sfsflzy: true,//是否师范类专业 （验证: 非空）
          jybj: false,  //禁用标记 （验证: 非空）
          jj: "",       //简介
        }
      },
      // 获取专业的年份
      getYears(){
        this.$post('/bdrxnf/getList.action',{
          loadingEl:this.$refs.editDialog,
          data:{}
        }).then(data=>{
          if(data.succsess){
            this.optionsNF = data.list
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
      // 获取所属大类信息
      getSSDL(){
        this.$post('/bdzyxx/getList',{
          loadingEl:this.$refs.editDialog,
          data:{lbz:1}
        }).then(data=>{
          if(data.succsess){
            this.optionsSSDL = data.list
          }
        })
      },
      // 获取所修学历
      getSSXL(){
        this.$post('/STCode/getList.action',{
          loadingEl:this.$refs.editDialog,
          data:{
            dmbt:'SXXL',
            sfsyzjd:1
          }
        }).then(data=>{
          if(data.succsess){
            this.optionsSSXL = data.list
          }
        })
      },
      // 获取所修学位
      getSXXW(){
        this.$post('/STCode/getList.action',{
          loadingEl:this.$refs.editDialog,
          data:{
            dmbt:'SXXW',
            sfsyzjd:1
          }
        }).then(data=>{
          if(data.succsess){
            this.optionsSXXW = data.list
          }
        })
      },
      // 获取专业类型
      getZYLX(){
        this.$post('/STCode/getList.action',{
          loadingEl:this.$refs.editDialog,
          data:{
            dmbt:'ZYLX',
            sfsyzjd:1
          }
        }).then(data=>{
          if(data.succsess){
            this.optionsZYLX = data.list
          }
        })
      },
      // 获取优势专业类型
      getYSZYLX(){
        this.$post('/STCode/getList.action',{
          loadingEl:this.$refs.editDialog,
          data:{
            dmbt:'YSZYLX',
            sfsyzjd:1
          }
        }).then(data=>{
          if(data.succsess){
            this.optionsYSZYLX= data.list
          }
        })
      },
      // 获取招生学科
      getZSXK(){
        this.$post('/STCode/getList.action',{
          loadingEl:this.$refs.editDialog,
          data:{
            dmbt:'ZSXK',
            sfsyzjd:1
          }
        }).then(data=>{
          if(data.succsess){
            this.optionsZSXK= data.list
          }
        })
      },
      opendialog(){
        this.getSSDL()
        this.getZYLX()
        this.getYears()
        this.getXY()
        this.getXKML()
        this.getYSZYLX()
        this.getSXXW()
        this.getSSXL()
        this.getZSXK()
        this.$nextTick(()=>{
          this.$refs["addEditForm"].clearValidate(); 
        });
        this.searchData.lbz = 0
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
      changeXY(current){
        // console.log(current);
        this.disabledZY = false
        this.$post('/bdzyxx/getList.action',{
          loadingEl:this.$refs.editDialog,
          data:{
            bddwxxId:current,
            lbz:0
          }
        }).then(data=>{
          if(data.succsess){
            this.optionsZY = data.list
          }
        })
      },
      openCopy(){
        this.classbeginsDialogVisible = true;
        this.getYears()
        this.getXY()
      },
      // 保存复制专业
      saveCloneForm(){
        this.classbeginsForm.lbz=0
        this.$post('/bdzyxxnd/copy.action',{
          loadingEl:this.$refs.editDialog,
          data:this.classbeginsForm
        }).then(data=>{
          if(data.succsess == 1){
            this.$message({message: "复制成功",type: "success"});
            this.classbeginsDialogVisible = false
            this.getList()
          }else{
            this.$message({message: data.jsonMsg,type: "error"});
          }
        })
      },
      // 模糊查询
      renderHeader(
        h, {
          column,
          store: {
            states,
            table
          }
        }
        ) {
        const currentOrder =
        this.selectConfig.table.order.find(
          order => order.Field === column.property
          ) || {};
        const index = this.selectConfig.table.order.indexOf(currentOrder);
        return h(
          "span", 
          [
            column.label,
            h(
              "span", {
                class: {
                  "caret-wrapper": true,
                  ascending: currentOrder.IsDesc === false,
                  descending: currentOrder.IsDesc === true
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
          column.label == "禁用" || column.label == "新专业" ||column.label == "师范类专业" ?
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
                keydown: (e) => this.columnSearch(e, column),
                blur:(e)=> this.handleDto(e,column)
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
      handleSortChange({
        property
      }) {
        /*
            名称: 多列排序
            功能: 利用表格排序的 handleSortChange 钩子
                 使用 getParamCommon 函数 拼装多列排序
                 post=>json 后返回数据
            页面加载后，第一次使用多列排序，过程将创建 orders[data],结构为数组
            每一次多列查询均记录在orders内
            */
            if (property === null) {
          //钩子有时会发挥null ，容错
          return;
        }
        // @特殊处理, 兼容业务场景, 当第一次手动排序, 需要清空之前的默认查询条件, 再点击再累加
        if (this._tableFirstOrder === 0) {
          this._tableFirstOrder = 1;
          this.selectConfig.table.order = [];
        }
        // 从data中取出arr
        this.selectConfig.table.order = this.selectConfig.table.order || [];
        const arr = this.selectConfig.table.order;
        // 判断是否已有字段
        const currentOrder = arr.find(order => order.Field === property);
        if (currentOrder) {
          if (currentOrder.IsDesc === true) {
            arr.splice(arr.indexOf(currentOrder), 1);
          } else {
            currentOrder.IsDesc = true;
          }
        } else {
          arr.push({
            Field: property,
            IsDesc: false
          }); // 默认 降序
        }
        // if (arr.length === 0) {
        //   this.resetOrder();
        // } else {
        //   if (this.requestOrderList) {
        //     this.requestOrderList()
        //   } else {
        //     this.requestList();
        //   }

        // }
        let arrParam = []
        arr.forEach(item=>{
          if(item.IsDesc){
            arrParam.push(item.Field + ' ' + 'desc')
          }else{
            arrParam.push(item.Field + ' ' + 'asc')
          }
        })
        // this.searchData
        let str = arrParam.join()
        this.searchData.order = str
        this.getList()
      },
      columnSearch(e, column) {
        if (event.keyCode == 13) {
          this.searchData[column.property] = e.target.value
          this.searchData.pageNum = this.currentPage
          this.searchData.pageCnt = this.pageSize
          this.getList()
        }
      },
      handleDto(e, column){
        this.searchData[column.property] = e.target.value
      },
      // 导出
      toExport(){
        this.$post('/bdzyxxnd/export.action',{
          loadingEl:this.$refs.tableElement,
          data:{
            lbz:0
          }
        }).then(data=>{
          this.handelFile(data)
        })
      },
      handelFile(data){
        let file = "data:applicationvnd.openxmlformats-officedocument.spreadsheetml.sheet;base64," + data.buffer;
        let blob = this.dataURLtoBlob(file);
        let reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onload = e => {
          let a = document.createElement("a");
          a.download = data.fileName + ".xls";
          a.href = e.target.result;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        };
      },
      dataURLtoBlob(dataurl) {
        var arr = dataurl.split(",")
        let mime = arr[0].match(/:(.*?);/)[1]
        console.log(mime);
        let bstr = atob(arr[1])
        let n = bstr.length
        let u8arr = new Uint8Array(n);
        while (n--) {
          u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], {
          type: mime
         });
      },
      del(){
        this.$confirm("是否确认删除?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(() => {
            // 删除
            let ids = this.multipleSelection.map(d => d.bdzyxxndId)
            this.$post('/bdzyxxnd/deletes.action', {
              loadingEl: "all",
              data: {
                ids: ids.join(),
                lbz:0
              }
            })
            .then(data => {
              if (data.succsess) {
                this.$message({
                  message: "删除成功",
                  type: "success"
                });
                this.getList()
              } else {
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
          if(data.dtoList != null){
            data.dtoList.forEach(item=>{
            this.$set(this.btn,[item.gnjd],true)
          })
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
    },
    mounted(){
      this.load()
    }
   
  }
</script>
<style>
  .page-ProfessionInfoYear{
    position: relative;
  }
</style>