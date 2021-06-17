<template>
  <!-- 班级信息 -->
  <div class="page-ClassInfo">
    <div class="page-container">
      <!-- 操作框 -->
      <div class="page-operation-box clearfix">
        <div class="pull-left">
          <el-button
            type="primary"
            icon="icon iconfont icon-add"
            @click="openEditForm('add');openDialog('add')"
            v-if="btn.add">新增
          </el-button>
          <el-button
            type="primary"
            icon="icon iconfont iconpiliangxiugai"
            @click="openEditForm('update');openDialog('update')" :disabled="updateBatchBtnDisabled"
            v-if="btn.update">修改
          </el-button>
          <el-button type="primary" icon="icon iconfont iconshanchu" @click="deleteConfirm('bdbjxxId')" :disabled="deleteBatchBtnDisabled" v-if="btn.del">删除</el-button>
          <el-button type="primary" icon="icon iconfont icontongburenshu" v-if="btn.update">同步人数</el-button>
          <el-button ref="exportBtn" type="primary" icon="icon iconfont icondaochu"class="app-whole app-whole-export" v-if="btn.export">导出</el-button>
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
            prop="bjbh"
            label="班级编号"
            align="center"
            :render-header="renderHeader"
            min-width="100">
            <template slot-scope="scope">{{ scope.row.bjbh }}</template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="bjmc"
            label="班级名称"
            align="center"
            :render-header="renderHeader"
            min-width="120">
            <template align="left" slot-scope="scope">{{ scope.row.bjmc }}</template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="bjjc"
            label="班级简称"
            align="center"
            :render-header="renderHeader"
            min-width="100">
            <template slot-scope="scope">{{ scope.row.bjjc }}</template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="ywmc"
            label="英文名称"
            align="center"
            :render-header="renderHeader"
            min-width="150">
            <template slot-scope="scope">{{scope.row.ywmc}}</template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="bjrs"
            label="班级人数"
            align="center"
            :render-header="renderHeader"
            min-width="100">
            <template slot-scope="scope">{{ scope.row.bjrs }}</template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="bdxqxx"
            label="所属校区"
            align="center"
            :render-header="renderHeader"
            min-width="100">
            <template slot-scope="scope">{{scope.row.bdxqxx}}</template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="bdjsxxId"
            label="固定教室"
            align="center"
            :render-header="renderHeader"
            min-width="100">
            <template slot-scope="scope">{{scope.row.bdjsxxId}}</template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="bjlb" 
            label="班级类别"
            align="center"
            :render-header="renderHeader"
            min-width="100">
            <template slot-scope="scope">{{ scope.row.bjlb }}</template>
          </el-table-column>
          <el-table-column
            prop="jybj"
            label="禁用"
            align="center"
            width="80"
            :render-header="renderHeader">
            <template slot-scope="scope">
              <el-checkbox :disabled="true" v-model="scope.row.jybj == 0 ? false:true"></el-checkbox>
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
        class="edit-dialog page-ClassInfo-dialog"
        width="60%"
        append-to-body
        :title="editDialogDisplayTitle"
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
              <el-form-item label="班级编号" prop="bjbh">
                <el-input clearable v-model="editForm.bjbh" :autofocus="true" ref="bjbh_input" placeholder="请输入班级编号"></el-input>
              </el-form-item>
              <el-form-item label="英文名称" prop="ywmc">
                <el-input clearable v-model="editForm.ywmc" placeholder="请输入英文名称"></el-input>
              </el-form-item>
              <el-form-item label="所属专业年度" prop="nf">
                    <el-select style="width: 100%" v-model="editForm.nf" placeholder="请选择">
                      <el-option
                        v-for="item in optionsNF"
                        :key="item.rxnf"
                        :label="item.rxnf"
                        :value="item.rxnf">
                      </el-option>
                    </el-select>
                  </el-form-item>
              <el-form-item label="所属校区" prop="bdxqxxId">
                <el-select style="width: 100%" v-model="editForm.bdxqxxId" placeholder="请选择" clearable>
                  <el-option
                    v-for="item in optionsXQ"
                    :key="item.bdxqxxId"
                    :label="'['+ item.xqbh +']'+item.xqmc"
                    :value="item.bdxqxxId">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="班主任" prop="bzrId">
                <el-input placeholder="请选择" v-model="editForm.bzrId" class="input-with-select" name="aaaaaaaaaaaa" :disabled="true">
                  <el-button slot="append">选择</el-button>
                </el-input>
              </el-form-item>
              <el-form-item label="班长" prop="bzId">
                <el-input placeholder="请选择" v-model="editForm.bzId" class="input-with-select" name="aaaaaaaaaaaa" :disabled="true">
                  <el-button slot="append">选择</el-button>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="班级名称" prop="bjmc">
                <el-input clearable v-model="editForm.bjmc" placeholder="请输入班级名称"></el-input>
              </el-form-item>
              <el-form-item label="班级人数" prop="bjrs">
                <el-input clearable v-model="editForm.bjrs" placeholder="请输入班级人数"></el-input>
              </el-form-item>
              <el-form-item label="班级简称" prop="bjjc">
                <el-input clearable v-model="editForm.bjjc" placeholder="请输入班级简称"></el-input>
              </el-form-item>
              <el-form-item label="固定教室" prop="bdjsxxId">
                <el-input placeholder="请选择" v-model="editForm.bdjsxxId" class="input-with-select" name="aaaaaaaaaaaa" :disabled="true">
                  <el-button slot="append">选择</el-button>
                </el-input>
              </el-form-item>
              <el-form-item label="辅导员" prop="fdyiId">
                <el-input placeholder="请选择" v-model="editForm.fdyId" class="input-with-select" name="aaaaaaaaaaaa" :disabled="true">
                  <el-button slot="append">选择</el-button>
                </el-input>
              </el-form-item>
              <el-form-item label="班级类别" prop="bjlb">
                <el-select style="width: 100%" v-model="editForm.bjlb" placeholder="请选择">
                  <el-option
                    v-for="item in optionsBJLB"
                    :key="item.bdxqxxId"
                    :label="item.xqmc"
                    :value="item.bdxqxxId">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="备注" prop="bz">
                <el-input clearable type="textarea" :rows="5" v-model="editForm.bz"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label class="no-margin-bottom" prop="jybj">
                <div class="app-checkbox-group app-checkbox-every">
                  <!-- <el-checkbox label="禁用标记" @change="e=>{editForm.jybj = e? 1 : 0}" :value="!!editForm.jybj"></el-checkbox> -->
                  <el-checkbox label="禁用标记" v-model="editForm.jybj" ></el-checkbox>
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
            class="app-dialog-btn app-confirm" @click="saveForm()">确认</el-button>
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
    name:"ClassInfo",
    data() {
      return {
        requestSuffix:{
          select:'/bdbjxx/getList.action',
          add:'/bdbjxx/insert.action',
          update:'/bdbjxx/update.action',
          delete:'/bdbjxx/deletes.action'
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
        optionsNF:[],
        tableData:[],
        editDialogVisible:false,
        // 表单集
        editForm: {
          "bdbjxxId":"",      //班级主键     非空；唯一
          "bjbh":"",          //班级编号     非空；唯一
          "bjmc":"",          //班级名称     非空；唯一
          "ywmc":"",          //英文名称 
          "pyszm":"",         //拼音首字母  非空；
          "bjrs":"",          //班级人数 非空；
          "bdzyxxndId":"",    //所属专业年度 非空；
          "bjjc":"",          //班级简称 
          "bdxqxxId":"",      //所属校区     非空；
          "bdjsxxId":"",      //固定教室
          "bzrId":"",         //班主任
          "fdyId":"",         //辅导员
          "bzId":"",          //班长
          "bjlb":"",          //班级类别
          "jj" :"",           //简介
          "bz" :"",           //备注 
          "jybj":"",          //禁用标记    非空；默认0,0:未禁用,1 已禁用
          "cjr":"",           //创建人
          "cjsj":"",          //创建时间
        }, 
        //表单验证
        editFormRules: {
          // 班级编号 （验证: 非空, 长度: 20）
          bjbh: [
            {required: true, message: "班级编号不能为空", trigger: 'blur'},
            {min: 0, max: 20, message: '班级编号长度不能大于20个字符', trigger: 'blur'}
          ],
          // 班级名称 （验证: 非空, 长度: 50）
          bjmc: [
            {required: true,message: "班级名称不能为空", trigger: 'blur'},
            {min: 0, max: 50, message: '班级名称长度不能大于50个字符', trigger: 'blur'}
          ],
          // 英文名称 （验证: 英文, 长度: 200）
          ywmc: [
            {validator: this.$validator.validateEng, trigger: 'blur'},
            {required: true,min: 0, max: 200, message: '英文名称长度不能大于200个字符', trigger: 'blur'}
          ],
          // 班级人数 （验证: 非空, 数字）
          bjrs: [{required: true,message: "班级人数不能为空"},{validator: this.$validator.validateNum,}],
          // 所属专业年度 （描述：获取专业年度信息数据; 地址：/api/publicqueryapi/getprofessioninfoyear） （验证: 非空）
          bdzyxxndId: [{ required: true,message: '所属专业年度不能为空',min:0,max: 40, trigger: 'change'}],
          // 班级简称 （长度: 20）
          bjjc: [{min: 0, max: 20, message: '班级简称长度不能大于20个字符', trigger: 'blur'}],
          // 所属校区 （描述：获取校区信息数据; 地址：/api/publicqueryapi/getschoolinfo） （验证: 非空）
          bdxqxxId: [{required: true,min:0,max:40, message: '所属校区不能为空', trigger: 'change'}],
          // 固定教室（长度：40）
          bdjsxxId:[{min: 0, max: 40, message: '固定教室长度不能大于50个字符', trigger: 'blur'}],
          // 班主任(长度：40)
          bzrId:[{min: 0, max: 40, message: '班主任长度不能大于50个字符', trigger: 'blur'}],
          // 辅导员（长度：40）
          fdyId:[{min: 0, max: 40, message: '辅导员长度不能大于50个字符', trigger: 'blur'}],
          // 班长（长度：40）
          bzId:[{min: 0, max: 40, message: '班长长度不能大于50个字符', trigger: 'blur'}],
          // 班级类别 （长度: 50）
          bjlb: [{min: 0, max: 50, message: '班级类别长度不能大于50个字符', trigger: 'blur'}],
          // 备注 （长度: 300）
          bz: [{min: 0, max: 300, message: '备注长度不能大于300个字符', trigger: 'blur'}],
        },
        optionsXQ:[],
        optionsBJLB:[]
      }
    },
    methods:{
      // 搜索
      search() {
        this.currentPage = 1;
        // this.getList();
      },
      async getList(isPaging, callback) {
      // @特殊处理 是否分页 字段, 要区分 分页 与 不分页的情况
      await this.setIsPaging(isPaging || true).requestList(callback);
      },
      async load() {
        // 获取列表
        this.getList(true);
      },
      //保存新增信息
      async saveForm(){
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
      // 获取校区
      getXQ(){
        this.$post('/bdxqxx/getList.action',{
          loadingEl:this.$refs.editDialog,
          data:{
            dto:{}
          },
        }).then(data =>{
          if(data.succsess){
            this.optionsXQ = data.list
          }
        })
      },
      // 获取班级类别
      getBJLB(){
        this.$post('/STCode/getList.action',{
          loadingEl:this.$refs.editDialog,
          data:{
            dmbt:'BJLB',
            sfsyzjd:1
          }
        }).then(data=>{
          if(data.succsess){
            this.optionsBJLB = data.list
          }
        })
      },
      openDialog(type){
        this.getYears()
        this.getXQ()
        this.getBJLB()
      }
    },
    mounted(){
      this.load()
    }
  }
</script>
<style>
  .page-ClassInfo{
    position: relative;
  }
</style>