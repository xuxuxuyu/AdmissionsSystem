<template>
  <!-- 年度大类信息 -->
  <div class="page-GenericInfoYear">
    <div class="page-container">
      <!-- 操作框 -->
      <div class="page-operation-box clearfix">
        <div class="pull-left">
          <el-button type="primary" icon="icon iconfont iconjiaoshikebiao" v-if="btn.update" @click="openCopy()">复制</el-button>
          <el-button type="primary" icon="icon iconfont icon-add" @click="openEditForm('add');openAddDialog()" v-if="btn.add">新增</el-button>
          <el-button
            type="primary"
            icon="icon iconfont iconpiliangxiugai"
            @click="modifyConfirm()" 
            :disabled="updateBatchBtnDisabled"
            v-if="btn.update">修改
          </el-button>
          <el-button type="primary" 
            icon="icon iconfont iconshanchu" 
            @click="deleteConfirm('bdzyxxndId');searchData.lbz = 1" 
            :disabled="deleteBatchBtnDisabled" v-if="btn.del">删除</el-button>
          <el-button ref="exportBtn" type="primary" icon="icon iconfont icondaochu"class="app-whole app-whole-export" v-if="btn.export" @click="toExport();searchData.lbz = 1">导出</el-button>
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
            prop="nf"
            label="年级"
            align="center"
            :render-header="renderHeader"
            min-width="80">
            <template slot-scope="scope">{{ scope.row.nf}}</template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="xnzybh"
            label="大类专业编号"
            align="center"
            :render-header="renderHeader"
            min-width="130">
            <template slot-scope="scope">{{ scope.row.xnzybh }}</template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="xnzymc"
            label="大类专业名称"
            align="center"
            :render-header="renderHeader"
            min-width="130">
            <template slot-scope="scope">{{ scope.row.xnzymc }}</template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="zyjc"
            label="大类专业简称"
            align="center"
            :render-header="renderHeader"
            min-width="130">
            <template slot-scope="scope">{{ scope.row.zyjc }}</template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="dwmc"
            label="所属单位"
            align="center"
            :render-header="renderHeader"
            min-width="130">
            <template slot-scope="scope">{{ scope.row.dwmc }}</template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="yxxynx"
            label="允许修业年限"
            align="center"
            width="130"
            :render-header="renderHeader">
            <template slot-scope="scope">{{ scope.row.yxxynx }}</template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="xkmlmc"
            label="学科门类"
            align="center"
            width="130"
            :render-header="renderHeader">
            <template slot-scope="scope">{{ scope.row.xkmlmc }}</template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="yjxkmc"
            label="一级学科"
            align="center"
            min-width="100"
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
              <el-checkbox v-model="scope.row.jybj == 0 ? false : true" :disabled="true"></el-checkbox>
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
      <!-- 新增 dialog -->
      <el-dialog
        class="edit-dialog"
        width="550px"
        append-to-body
        title="新增年度大类信息"
        :visible.sync="editDialogVisible"
        @close="resetEditForm">
        <el-form
          status-icon
          label-width="80px"
          :model="editForm"
          class="form-clear-bottom"
          :rules="editFormRules"
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
              <el-form-item label="所属单位" prop="ssbddwxxId">
                <template>
                  <el-select style="width: 100%" v-model="editForm.ssbddwxxId" placeholder="请选择" @change="changeXY" clearable>
                    <el-option
                      v-for="item in optionsXY"
                      :key="item.bddwxxId"
                      :label="'[' + item.dwbh + ']' + item.dwmc"
                      :value="item.bddwxxId">
                    </el-option>
                  </el-select>
                </template>
              </el-form-item>
              <el-form-item label="所属大类" prop="bdzyxxId">
                <el-select style="width: 100%" v-model="editForm.bdzyxxId" placeholder="请选择" clearable :disabled="disSSDL">
                  <el-option
                    v-for="item in optionsSSDL"
                    :key="item.bdzyxxId"
                    :label="'[' + item.xnzybh + ']' + item.xnzymc"
                    :value="item.bdzyxxId">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="变更单位" prop="bddwxxId">
                <el-select style="width: 100%" v-model="editForm.bddwxxId" placeholder="请选择" clearable>
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
            type="primary"
            size="medium"
            class="app-dialog-btn app-confirm"
            @click="saveForm()">确认</el-button>
          <el-button size="medium" @click="editDialogVisible=false" class="app-dialog-btn app-close">关闭</el-button>
        </span>
      </el-dialog>
      <!-- 复制dialog -->
      <el-dialog 
        ref="editDialog" 
        :close-on-click-modal='false'
        lass="edit-dialog ProfessionInfoYear-classbegins-dialog" 
        status-icon append-to-body width="500px"
        @close="classbeginsDialogVisible=false" 
        title="复制年度大类信息" 
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
                  <el-form-item label="源年级" prop="ynf">
                    <el-select style="width: 100%" v-model="classbeginsForm.ynf" placeholder="请选择">
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
                          :label="item.dwmc"
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
      <!--修改 dialog-->
      <el-dialog
        :close-on-click-modal='false'
        class="modify-dialog" width="750px" 
        append-to-body 
        @close="resetEditForm()"
        :title="modifyDialogDisplayTitle" 
        :visible.sync="modifyDialogVisible">
        <el-form status-icon label-width="110px" :model="editForm" class="form-clear-bottom" :rules="editFormRules" ref="editForm">
          <el-row>
            <el-col :span="12">
              <el-form-item label="大类专业编号" prop="xnzybh">
                <el-input clearable v-model="editForm.xnzybh" :autofocus="true" ref="XNZYBH_INPUT" placeholder="请输入大类专业编号"></el-input>
              </el-form-item>
              <el-form-item label="英文名称" prop="ywmc">
                <el-input clearable v-model="editForm.ywmc" placeholder="请输入英文名称"></el-input>
              </el-form-item>
              <el-form-item label="年级" prop="nf">
                <el-select clearable v-model="editForm.nf" class="width-percent-100" placeholder="请选择">
                  <el-option :label="item.rxnf" :value="item.rxnf" v-for="item in optionsNF" :key="item.value"></el-option>
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
            <el-col :span="12">
              <el-form-item label="大类专业名称" prop="xnzymc">
                <el-input clearable v-model="editForm.xnzymc" placeholder="大类专业名称"></el-input>
              </el-form-item>
              <el-form-item label="大类专业简称" prop="zyjc">
                <el-input clearable v-model="editForm.zyjc" placeholder="大类专业简称"></el-input>
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
              </el-form-item>              <el-form-item label="允许修业年限" prop="yxxynx">
                <el-input clearable v-model="editForm.yxxynx" placeholder="允许修业年限"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="备注" prop="bz">
                <el-input clearable type="textarea" :rows="5" v-model="editForm.bz" placeholder=""></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="" prop="jybj">
                <el-checkbox-group v-model="editForm.jybj">
                  <el-checkbox label="禁用标记"></el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <span slot="footer" class="dialog-footer">
         <el-button type="primary" size="medium" @click="editSave('editForm')" class="app-dialog-btn app-confirm ">确认</el-button>
         <el-button size="medium" @click="modifyDialogVisible = false" class="app-dialog-btn app-close">关闭</el-button>
       </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
  import table from "@/mixin/table.vue";
  export default {
    mixins: [table],
    name:"GenericInfoYear",
    data() {
      return {
         // 简化请求URL书写
        requestSuffix:{
          select:'/bdzyxxnd/getList.action',
          add:'/bdzyxxnd/insert.action',
          update:'/bdzyxxnd/update.action',
          delete:'/bdzyxxnd/deletes.action',
          export:'//bdzyxxnd/export.action'
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
          bdzyxxndId: "", //主键
          bdzyxxId: "", //专业主键 （描述：获取大类信息数据; 地址：/api/publicqueryapi/getgenericinfo）（验证: 非空）
          nf: "", //年份 （描述：获取年份数据; 地址：/api/publicqueryapi/getentranceyear）（验证: 非空）
          bddwxxId: "", //单位信息主键 （/api/publicqueryapi/getdepartmentbyquery; 过滤条件: 1.isskdw 上课单位标识, 默认: true）注：分级显示的下拉框（验证: 非空）\
          ybddwxxId: "",
          lbz: 1, //类标志
        },
        //修改
        modifyForm: {},
        modifyDialogDisplayTitle: "修改年度大类信息",
        modifyDialogVisible: false,
        //修改表单校验
        editFormRules: {
          // 所属大类/专业主键 （描述：获取大类信息数据; 地址：/Api/PublicQueryApi/GetGenericInfo）（验证: 非空）
          bdzyxxId: [{required: true, message: "所属大类必须输入",tigger:"blur" }],
          //单位信息主键 （/Api/PublicQueryApi/GetDepartmentByQuery; 过滤条件: 1.ISSKDW 上课单位标识, 默认: true）注：分级显示的下拉框（验证: 非空）
          bddwxxId: [{required: true, message: "所属单位必须输入",tigger:"blur" }],
          ssbddwxxId: [{required: true, message: "所属单位必须输入",tigger:"blur" }],
          // 年级/年份 （描述：获取年份数据; 地址：/Api/PublicQueryApi/GetEntranceYear）（验证: 非空）
          nf: [{required: true, message: "年份必须输入",tigger:"blur" }],
          //大类专业编号 （验证: 非空, 长度: 20）
          xnzybh: [
            {required: true, message: "大类专业编号必须输入",tigger:"blur" },
            {
              min: 0,
              max: 20,
              message: "大类专业编号长度不能大于20个字符",tigger:"blur"
            }
          ],
          xnzymc: [
            {required: true, message: "大类专业名称必须输入"},
            {
              min: 0,
              max: 50,
              message: "大类专业名称长度不能大于50个字符",tigger:"blur"
            }
          ],
          ywmc: [
            {
              validator: this.$validator.validateEng,
              message: "请输入英文"
            },
            {
              min: 0,
              max: 200,
              message: "英文名称长度不能大于200个字符"
            }
          ],
          zyjc: [
            {min: 0, max: 20, message: "专业简称长度不能大于20个字符"}
          ],
          //学制（验证: 非空, 数字, 保留一位小数, [例如: 4.5]）取“允许修业年限”的值
          xz: [
            {
              required: true,
              validator: this.$validator.validateOneNum,
              message: "学制只能为数字"
            }
          ],
          yxxynx: [
            {required: true, message: "允许修业年限必须输入"},
            {
              validator: this.$validator.validateNum,
              message: "允许修业年限只能为数字"
            }
          ],
          xkml: [
            {min: 0, max: 50, message: "学科门类长度不能大于50个字符"}
          ],
          yjxk: [
            {min: 0, max: 50, message: "一级学科长度不能大于50个字符"}
          ],
          lbz: [{required: true, message: "类标志必须输入"}],
          bz: [
            {min: 0, max: 300, message: "备注长度不能大于300个字符"}
          ],
          jybj: [{required: true, message: "禁用标记必须输入"}]
        },
        optionsNF:[],
        optionsXY:[],
        optionsXKML:[],
        optionsYJXK:[],
        disSSDL:true,
        optionsSSDL:[],
        classbeginsDialogVisible:false,
        classbeginsForm:{},
        disYJXK:true
      }
    },
    methods:{
      // 搜索
      search() {
        this.currentPage = 1;
        this.getList();
      },
      async getList(isPaging, callback) {
      // @特殊处理 是否分页 字段, 要区分 分页 与 不分页的情况
      this.searchData.lbz = 1
        await this.setIsPaging(isPaging || true).requestList(callback);
      },
      async load() {
        // 获取列表
        this.getList(true);
      },
      //保存新增信息
      async saveForm(){
        this.$refs["addEditForm"].validate(async valid => {
          if (!valid) {
            return false;
          }
          if (this.editDialogType === "add") {
            await this.addEditForm(this.editForm);
          }
        })
      },
      //修改
      async modifyConfirm() {
        // 设置表单数据
        this.editForm={}
        this.modifyDialogVisible = true
        this.editForm = this.multipleSelection[0]
        this.editForm.lbz = 1
      },
      //保存修改信息
      editSave() {
        this.$refs["editForm"].validate(async valid => {
          if (!valid) {
            return false;
          }
          if ([null, undefined, ""].includes(this.editForm.bdzyxxId)) {
            this.editForm.bdzyxxId = this.bdzyxxId;
          }
          this.$post(this.requestSuffix.update,
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
      openAddDialog(){
        this.editForm.lbz = 1
        this.getYears()
        this.getXY()
        this.getXKML()
        this.$nextTick(()=>{
          this.$refs["addEditForm"].clearValidate(); 
        });
      },
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
        this.disSSDL = false
        this.editForm.bddwxxId = current
        this.$post('/bdzyxx/getList.action',{
          loadingEl:this.$refs.editDialog,
          data:{
            bddwxxId:current,
            lbz:1
          }
        }).then(data=>{
          if(data.succsess){
            this.optionsSSDL = data.list
          }else{
            this.optionsSSDL = []
          }
        })
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
      openCopy(){
        this.classbeginsDialogVisible = true;
        this.getYears()
        this.getXY()
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
      // 保存复制专业
      saveCloneForm(){
        this.classbeginsForm.lbz = 1
        // this.$post('/bdzyxxnd/copy.action',{
        //   loadingEl:this.$refs.editDialog,
        //   data:this.classbeginsForm
        // }).then(data=>{
        //   if(data.succsess == 1){
        //     this.$message({message: "复制成功",type: "success"});
        //     this.classbeginsDialogVisible = false
        //     this.getList()
        //   }else{
        //     this.$message({message: data.jsonMsg,type: "error"});
        //   }
        // })
      },
      handleChangeXKML(id){
        this.disYJXK = false
        this.$post('/STCode/getList.action',{
          loadingEl:this.$refs.editDialog,
          data:{
            fid:id,
            dmbt:'YJXK' ,
            sfsyzjd:1
          }
        }).then(data=>{
          if(data.succsess){
            this.optionsYJXK = data.list
          }
        })
      }
    },
    mounted(){
      this.load()
    }
  }
</script>
<style>
  .page-GenericInfoYear{
    position: relative;
  }
</style>