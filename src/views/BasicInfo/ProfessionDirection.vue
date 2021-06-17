<template>
  <!-- 专业方向 -->
  <div class="page-ProfessionDirection">
    <div class="page-container">
      <!-- 操作框 -->
      <div class="page-operation-box clearfix">
        <div class="pull-left">
          <el-button
            type="primary"
            icon="icon iconfont icon-add"
            @click="openEditForm('add');openAddDialog()" 
            v-if="btn.add">新增
          </el-button>
          <el-button
            type="primary"
            icon="icon iconfont iconpiliangxiugai"
            @click="openEditForm('update')" :disabled="updateBatchBtnDisabled"
            v-if="btn.update">修改
          </el-button>
          <el-button 
            type="primary" 
            icon="icon iconfont iconshanchu" 
            @click="deleteConfirm('bdzyfxId')" 
            :disabled="deleteBatchBtnDisabled"
            v-if="btn.del">删除</el-button>
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
            prop="zyfxbh"
            label="专业方向编号"
            align="center"
            :render-header="renderHeader"
            min-width="130">
            <template slot-scope="scope">{{ scope.row.zyfxbh }}</template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="zyfxmc"
            label="专业方向名称"
            align="center"
            :render-header="renderHeader"
            min-width="200">
            <template align="left" slot-scope="scope">{{ scope.row.zyfxmc }}</template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="ywmc"
            label="英文名称"
            align="center"
            :render-header="renderHeader"
            min-width="150">
            <template slot-scope="scope">{{ scope.row.ywmc }}</template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="bdzyxxId"
            label="所属专业"
            align="center"
            :render-header="renderHeader"
            min-width="200">
            <template align="left" slot-scope="scope">{{ scope.row.bdzyxxId }}</template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="jybj"
            label="禁用"
            align="center"
            :render-header="renderHeader"
            min-width="80">
            <template slot-scope="scope">
              <el-checkbox v-model="scope.row.jybj" :disabled="true"></el-checkbox>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 新增 & 修改 dialog -->
      <el-dialog
        width="450px"
        append-to-body
        ref="editDialog"
        class="edit-dialog ProfessionDirection-edit-dialog"
        title="新增专业方向"
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
            <el-col :span="24">
              <el-form-item label="专业方向编号" prop="zyfxbh">
                <el-input clearable v-model="editForm.zyfxbh" :autofocus="true" placeholder="请输入专业方向编号"></el-input>
              </el-form-item>
              <el-form-item label="专业方向名称" prop="zyfxmc">
                <el-input clearable v-model="editForm.zyfxmc" placeholder="请输入专业方向名称"></el-input>
              </el-form-item>
              <el-form-item label="英文名称" prop="ywmc">
                <el-input clearable v-model="editForm.ywmc" placeholder="请输入英文名称"></el-input>
              </el-form-item>
              <el-form-item label="单位" prop="bddwxxId">
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
              <el-form-item label="备注" prop="bz">
                <el-input type="textarea" :rows="5" v-model="editForm.bz"></el-input>
              </el-form-item>
              <el-form-item label prop="jybj" class="no-margin-bottom">
                <el-checkbox label="禁用标记" v-model="editForm.jybj"></el-checkbox>
              </el-form-item>
            </el-col>
          </el-row>   
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button
            type="primary"
            size="medium"
            ref="btnEditorFormSave"
            class="app-dialog-btn app-confirm" @click="saveForm()">确认</el-button>
          <el-button
            size="medium"
            @click="editDialogVisible = false"
            class="app-dialog-btn app-close">关闭</el-button>
        </span>
      </el-dialog>
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
    </div>
  </div>
</template>
<script>
  import table from "@/mixin/table.vue";
  export default {
    mixins: [table],
    name:"ProfessionDirection",
    data() {
      return {
        requestSuffix:{
          select:'/bdzyfx/getList.action',
          add:'/bdzyfx/insert.action',
          update:'/bdzyfx/update.action',
          delete:'/bdzyfx/deletes.action'
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
          "bdzyfxId": "",  //专业方向主键
          "zyfxbh": "",   //专业方向编号 （验证: 非空, 长度: 20）
          "zyfxmc": "",   //专业方向名称 （验证: 非空, 长度: 50）
          "ywmc": "",     //英文名称 （验证: 英文, 长度: 200）
          "bdzyxxId": "", //所属专业主键 （描述：获取专业信息数据; 地址：/api/publicqueryapi/getprofessioninfo） （验证: 非空）
          "bz": "",       //备注 （长度: 300）
          "jybj": false,  //禁用标记 （验证: 非空）
          "jj": "",       //简介
        },
        //编辑表单验证
        editFormRules: {
          zyfxbh: [{ required: true, message: "专业方向编号必须输入" },{ min: 0, max: 20, message: '专业方向长度不能大于20个字符'}],
          zyfxmc: [{ required: true, message: "专业方向名称必须输入" },{ min: 0, max: 50, message: '专业方向长度不能大于50个字符'}],
          ywmc: [{ message: '请输入英文' },{ min: 0, max: 200, message: '英文名称长度不能大于200个字符'}],
          bdzyxxId: [{ required: true, message: "所属专业必须输入" }],
          bz: [{ min: 0, max: 300, message: '备注长度不能大于300个字符'}]
        },
        optionsZY:[],
        optionsXY:[],
        disabledZY:true,
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
      openAddDialog(){
        this.getXY()
        this.$nextTick(()=>{
          this.$refs["addEditForm"].clearValidate(); 
        });      }
    },
    mounted(){
      this.load()
    }
  }
</script>
<style>
  .page-ProfessionDirection {
    position: relative;
  }
  .ProfessionDirection-edit-dialog .cascade-select .el-select .el-input__inner{
    cursor: pointer;
    padding-right: 120px;
  }
</style>