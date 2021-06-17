<template>
  <!-- 专业信息 -->
  <div class="page-ProfessionInfo">
    <div class="page-container">
      <!-- 操作框 -->
      <div class="page-operation-box clearfix">
        <div class="pull-left">
          <el-button
            type="primary"
            icon="icon iconfont icon-add"
            @click="openEditForm('add');openAddDialog('add')"
            v-if="btn.add">新增
          </el-button>
          <el-button
            type="primary"
            icon="icon iconfont iconpiliangxiugai"
            @click="openEditForm('update');openAddDialog('update')" :disabled="updateBatchBtnDisabled"
            v-if="btn.update">修改
          </el-button>
          <el-button type="primary" icon="icon iconfont iconshanchu" @click="deleteConfirm('bdzyxxId');searchData.lbz = 0" :disabled="deleteBatchBtnDisabled" v-if="btn.del">删除</el-button>
          <el-button ref="exportBtn" type="primary" icon="icon iconfont icondaochu"class="app-whole app-whole-export" v-if="btn.export"@click="toExport();searchData.lbz = 0">导出</el-button>
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
            align="center"
            :render-header="renderHeader"
            min-width="200">
            <template align="left" slot-scope="scope">{{ scope.row.xnzymc }}</template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="zyjc"
            label="专业简称"
            align="center"
            :render-header="renderHeader"
            min-width="200">
            <template align="left" slot-scope="scope">{{ scope.row.zyjc }}</template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="ywmc"
            label="英文名称"
            align="center"
            :render-header="renderHeader"
            min-width="200">
            <template slot-scope="scope">{{ scope.row.ywmc }}</template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="dwmc"
            label="所属单位"
            align="center"
            :render-header="renderHeader"
            min-width="200">
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
            prop="sxxlmc"
            label="所修学历"
            align="center"
            :render-header="renderHeader"
            min-width="150">
            <template slot-scope="scope">{{ scope.row.sxxlmc }}</template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="zylxmc"
            label="专业类型"
            align="center"
            :render-header="renderHeader"
            min-width="150">
            <template slot-scope="scope">{{ scope.row.zylxmc }}</template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="yxxynx"
            label="修业年限"
            align="center"
            :render-header="renderHeader"
            min-width="150">
            <template slot-scope="scope">{{ scope.row.yxxynx }}</template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="xkmlmc"
            label="学科门类"
            align="center"
            :render-header="renderHeader"
            min-width="150">
            <template slot-scope="scope">{{ scope.row.xkmlmc }}</template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="yjxkmc"
            label="一级学科"
            align="center"
            :render-header="renderHeader"
            min-width="150">
            <template slot-scope="scope">{{ scope.row.yjxkmc }}</template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="zydm"
            label="国标专业代码"
            align="center"
            :render-header="renderHeader"
            min-width="130">
            <template slot-scope="scope">{{ scope.row.zydm }}</template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="zymc"
            label="国标专业名称"
            header-align="center"
            :render-header="renderHeader"
            min-width="130">
            <template align="left" slot-scope="scope">{{ scope.row.zymc }}</template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="sfxzy"
            label="新专业"
            align="center"
            :render-header="renderHeader"
            min-width="90">
            <template slot-scope="scope" >
              <el-checkbox :disabled="true" :value="!Boolean(scope.row.sfxzy) ? scope.row.sfxzy : scope.row.sfxzy != 0"></el-checkbox>
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
              <el-checkbox :disabled="true" :value="!Boolean(scope.row.sfsflzy) ? scope.row.sfsflzy : scope.row.sfsflzy != 0"></el-checkbox>
            </template>
          </el-table-column>
          <el-table-column
            prop="jybj"
            label="禁用"
            align="center"
            width="80"
            :render-header="renderHeader">
            <template slot-scope="scope">
              <el-checkbox :disabled="true" :value="!Boolean(scope.row.jybj) ? scope.row.jybj : scope.row.jybj != 0"></el-checkbox>
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
        width="750px"
        append-to-body
        ref="editDialog"
        class="edit-dialog Department-dialog"
        title="新增专业信息"
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
              <el-form-item label="专业编号" prop="xnzybh">
                <el-input clearable v-model="editForm.xnzybh" :autofocus="true" ref="XNZYBH_INPUT" placeholder="请输入校内专业编号"></el-input>
              </el-form-item>
              <el-form-item label="英文名称" prop="ywmc">
                <el-input clearable v-model="editForm.ywmc" placeholder="请输入英文名称"></el-input>
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
              <el-form-item label="所属大类" prop="sslId">
                <el-select style="width: 100%" v-model="editForm.sslId" placeholder="请选择" clearable>
                  <el-option
                    v-for="item in optionsSSDL"
                    :key="item.bdzyxxId"
                    :label="'[' + item.xnzybh + ']' + item.xnzymc"
                    :value="item.bdzyxxId">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="所修学历" prop="sxxl">
                <!-- <el-input clearable v-model="editForm.sxxl" placeholder="请输入所修学历"></el-input> -->
                <el-select style="width: 100%" v-model="editForm.sxxl" placeholder="请选择" clearable>
                  <el-option
                    v-for="item in optionsSSXL"
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
              <el-form-item label="专业设置年份" prop="zysznf">
                <el-input clearable v-model="editForm.zysznf" placeholder="请输入专业设置年份"></el-input>
              </el-form-item>
              <el-form-item label="代码版本" prop="dmbb">
                <el-input clearable v-model="editForm.dmbb" placeholder="请输入代码版本"></el-input>
              </el-form-item>
              <el-form-item label="国标专业代码" prop="zydm">
                <el-input clearable v-model="editForm.zydm" placeholder="请输入国标专业代码"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="专业名称" prop="xnzymc">
                <el-input clearable v-model="editForm.xnzymc" placeholder="请输入专业名称"></el-input>
              </el-form-item>
              <el-form-item label="专业简称" prop="zyjc">
                <el-input clearable v-model="editForm.zyjc" placeholder="请输入专业简称"></el-input>
              </el-form-item>
              <el-form-item label="学制" prop="xz">
                <el-input clearable v-model="editForm.xz" placeholder="请输入学制"></el-input>
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
                <el-input v-model="editForm.yxxynx" placeholder="请输入允许修业年限"></el-input>
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
              <el-form-item label="毕业证专业名称" prop="byzzymc">
                <el-input clearable v-model="editForm.byzzymc" placeholder="请输入毕业证专业名称"></el-input>
              </el-form-item>
              <el-form-item label="国标专业名称" prop="zymc">
                <el-input clearable v-model="editForm.zymc" placeholder="请输入国标专业名称"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="备注" prop="bz">
                <el-input type="textarea" :rows="5" v-model="editForm.bz"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label prop class="no-margin-bottom">
                <el-checkbox label="是否新专业" v-model="editForm.sfxzy"></el-checkbox>
                <el-checkbox label="是否师范类专业" v-model="editForm.sfsflzy"></el-checkbox>
                <el-checkbox label="禁用标记" v-model="editForm.jybj"></el-checkbox>
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
            @click="saveForm()">确认</el-button>
          <el-button
            size="medium"
            class="app-dialog-btn app-close"
            @click="editDialogVisible=false">关闭</el-button>
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
    data() {
      return {
        requestSuffix:{
          select:'/bdzyxx/getList.action',
          add:'/bdzyxx/insert.action',
          update:'/bdzyxx/update.action',
          delete:'/bdzyxx/deletes.action',
          export:'//bdzyxx/export.action'
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
          "bdzyxxId": "",       //主键
          "xnzybh": "",   //校内专业编号 （验证: 非空, 长度: 20）
          "xnzymc": "",   //校内专业名称 （验证: 非空, 长度: 50）
          "ywmc": "",     //英文名称 （验证: 英文, 长度: 200）
          "zyjc": "",     //专业简称 （长度: 20）
          "bddwxxId": "", //单位信息主键 （/api/publicqueryapi/getdepartmentbyquery; 过滤条件: 1.isskdw 上课单位标识, 默认: true） 注：分级显示的下拉框（验证: 非空）
          "xz": "",       //学制 （验证: 非空, 数字, 保留一位小数, [例如: 4.5]）
          "sslId": "",    //大类主键 （描述：获取大类专业数据; 地址：/api/publicqueryapi/getgenericinfo）
          "zylx": "",     //专业类型 （长度: 50）
          "sxxl": "",     //所修学历 （长度: 50）
          "sxxw": "",     //所修学位 （长度: 50）
          "zsxk": "",     //招生学科 （长度: 50）
          "yxxynx": "",    //允许修业年限 （验证: 非空, 数字）
          "xkml": "",     //学科门类 （长度: 50）
          "yjxk": "",     //一级学科 （长度: 50）
          "zysznf": "",   //专业设置年份 （验证: 数字, 长度: 6）
          "yszylx": "",   //优势专业类型 （长度: 20）
          "dmbb": "",     //代码版本 （长度: 4）
          "byzzymc": "",  //毕业证专业名称 （长度: 50）
          "zydm": "",     //国标专业代码 （长度: 20）
          "zymc": "",     //国标专业名称 （长度: 50）
          "bz": "",       //备注 （长度: 300）
          "lbz": 0,   //类标志 （验证: 非空）
          "sfxzy": false,  //是否新专业 （验证: 非空）
          "sfsflzy": false,//是否师范类专业 （验证: 非空）
          "jybj": false,  //禁用标记 （验证: 非空）
          "jj": "",       //简介
        },
        //表单验证
        editFormRules: {
          xnzybh: [{required: true, message: "专业编号必须输入"},{min: 0, max: 20, message: '专业编号长度不能大于20个字符', trigger: 'blur'}],        //校内专业编号
          ywmc: [{validator: this.$validator.validateEng, trigger: 'blur'}, {min: 0, max: 200, message: '英文名称长度不能大于200个字符', trigger: 'blur'}],//英文名称
          bddwxxId: [{required: true, message: "所属单位必须输入"}],             //所属单位
          sxxl: [{required: true, message: "所修学历必须输入"}, {min: 0, max: 50, message: '所修学历长度不能大于50个字符', trigger: 'blur'}],             //所属学历
          zsxk: [{min: 0, max: 50, message: '招生学科长度不能大于50个字符', trigger: 'blur'}],             //招生学科
          xkml: [{min: 0, max: 50, message: '学科门类长度不能大于50个字符', trigger: 'blur'}],//学科门类
          zyjc: [{min: 0, max: 20, message: '专业简称长度不能大于20个字符', trigger: 'blur'}],//专业简称
          zysznf: [{validator: this.$validator.validateNum,trigger: 'blur'}, {min: 0, max: 6, message: '专业设置年份长度不能大于6个字符', trigger: 'blur'}],       //专业设置年级
          xnzymc: [{required: true, message: "专业名称必须输入"},{min: 0, max: 50, message: '专业名称长度不能大于50个字符', trigger: 'blur'}],       //校内专业名称
          xz: [{required: true, message: "学制必须输入"}, {validator: this.$validator.validateOneNum,trigger: 'blur'}],                   //学制
          zylx: [{required: true, message: "专业类型必须输入"}, {min: 0, max: 50, message: '专业类型长度不能大于50个字符', trigger: 'blur'}],             //专业类型
          sxxw: [{min: 0, max: 50, message: '所修学位长度不能大于50个字符', trigger: 'blur'}],             //所属学位
          yxxynx: [{required: true, message: "允许修业年限必须输入"}, {validator: this.$validator.validateNum,trigger: 'blur'}],       //允许修业年限
          yjxk: [{min: 0, max: 50, message: '一级学科长度不能大于50个字符', trigger: 'blur'}], //一级学科
          // yszylx: [{min: 0, max: 20, message: '优势专业类型长度不能大于20个字符', trigger: 'blur'}], //优势专业类型
          dmbb: [{min: 0, max: 4, message: '代码版本长度不能大于4个字符', trigger: 'blur'}], //代码版本
          byzzymc: [{min: 0, max: 50, message: '毕业证专业名称长度不能大于50个字符', trigger: 'blur'}],//毕业证类型
          zydm: [{min: 0, max: 20, message: '国标专业代码长度不能大于20个字符', trigger: 'blur'}],//国标专业代码
          zymc: [{min: 0, max: 50, message: '国标专业名称长度不能大于50个字符', trigger: 'blur'}],//国标专业名称
          bz: [{min: 0, max: 300, message: '备注长度不能大于300个字符', trigger: 'blur'}],//备注
        },
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
      this.searchData.lbz = 0
      await this.setIsPaging(isPaging || true).requestList(callback);
      },
      async load() {
        // 获取列表
        this.getList(true);
      },
      //保存新增信息
      async saveForm(){
        this.editForm.jybj = this.editForm.jybj ? 1 : 0
        this.editForm.sfsflzy = this.editForm.sfsflzy ? 1 : 0
        this.editForm.sfxzy = this.editForm.sfxzy ? 1 : 0
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
      // 获取所属大类信息
      getSSDL(){
        this.$post('/bdzyxx/getList.action',{
          loadingEl:this.$refs.editDialog,
          data:{
            lbz:0
          }
        }).then(data=>{
          if(data.succsess){
            this.optionsSSDL = data.list
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
      openAddDialog(type){
        if(type == 'add'){
          this.editForm = {}
        }
        // 
        if(type=='update'){
          this.editForm.jybj = this.editForm.jybj == 0 ? false : true
          this.editForm.sfsflzy = this.editForm.sfsflzy == 0 ? false : true
          this.editForm.sfxzy = this.editForm.sfxzy == 0 ? false : true
        }
        this.getXY()
        this.getSSDL()
        this.getZYLX()
        this.getSXXW()
        this.getSSXL()
        this.getZSXK()
        this.getXKML()
        this.getYSZYLX()
        this.searchData.lbz = 0
      },
      handleChangeXKML(id){
        this.disYJXK = false
        this.$post('/STCode/getList.action',{
          loadingEl:this.$refs.editDialog,
          data:{
            fid:id,
            dmbt:'YJXK' 
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
  .page-ProfessionInfo{
    position: relative;
  }
</style>