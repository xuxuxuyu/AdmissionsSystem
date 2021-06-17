<template>
  <!-- 入学年份 -->
  <div class="page-EntranceYear">
    <div class="page-container">
      <!-- 操作框 -->
      <div class="page-operation-box clearfix">
        <div class="pull-left">
          <el-button type="primary" icon="icon iconfont icon-add" @click="openEditForm('add');openDialog('add')" v-if="btn.add">新增</el-button>
          <el-button
            type="primary"
            icon="icon iconfont iconpiliangxiugai"
            @click="openEditForm('update');openDialog('update')" :disabled="updateBatchBtnDisabled" v-if="btn.update">修改
          </el-button>
          <el-button type="primary" icon="icon iconfont iconshanchu" @click="deleteConfirm('bdrxnfId')" :disabled="deleteBatchBtnDisabled" v-if="btn.del">删除</el-button>
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
          highlight-current-row 
          ref="tableElement" 
          :data="tableData" 
          height="100%"
          @sort-change="handleSortChange"
          @selection-change="handleSelectionChange"
          @row-dblclick="doubleClickTableRow">
          <el-table-column align="center" type="selection" width="40"></el-table-column>
          <el-table-column label="序号" align="center" type="index" width="50"></el-table-column>
          <el-table-column prop="rxnf" label="入学年份" align="center">
            <template slot-scope="scope">{{ scope.row.rxnf }}</template>
          </el-table-column>
          <el-table-column prop="jybj" label="禁用" align="center" width="110">
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
          layout="total, sizes, prev, pager, next, jumper"></el-pagination>
      </div>
      <!-- 新增/修改弹框 -->
      <el-dialog 
        ref="editDialog"
        :title="editDialogDisplayTitle"
        :visible.sync="editDialogVisible"
        class="edit-dialog" 
        width="30%" 
        append-to-body
        @close="resetEditForm">
        <el-form status-icon label-width="90px" :model="editForm" class="form-clear-bottom" :rules="editFormRules" ref="editForm">
          <el-row>
            <el-col :span="24">
              <el-form-item label="入学年份" prop="rxnf">
                <el-input clearable v-model="editForm.rxnf" :autofocus="true" placeholder="请输入入学年份"></el-input>
              </el-form-item>
              <el-form-item label="备注" prop="bz">
                <el-input type="textarea" :rows="5" v-model="editForm.bz"></el-input>
              </el-form-item>
              <el-form-item label="" prop="jybj" class="no-margin-bottom">
                <el-checkbox label="禁用标记" v-model="editForm.jybj"></el-checkbox>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" size="medium" @click="saveForm()">确认</el-button>
          <el-button size="medium" @click="editDialogVisible = false">关闭</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
  import table from "@/mixin/table.vue";
  export default {
    mixins: [table],
    name:"EntranceYear",
    data() {
      return {
        requestSuffix:{
          select:'/bdrxnf/getList.action',
          add:'/bdrxnf/insert.action',
          update:'/bdrxnf/update.action',
          delete:'/bdrxnf/deletes.action',
          export:'/bdrxnf/export.action'
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
          bdrxnfid: "", //主键
          rxnf: "", //入学年份
          bz: "", //备注
          jybj: "false" //禁用标记
        },
        //表单验证
        editFormRules: {
          // 入学年份 （验证: 非空, 数字, 长度: 4）
          rxnf: [
            {
              required: true,
              message: "入学年份必须输入",
              tigger: "blur"
            },
            {validator: this.$validator.validateNF, trigger: "blur"},
            {
              min: 0,
              max: 4,
              message: "入学年份长度为4个字符",
              trigger: "blur"
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
      openDialog(type){
        if(type == 'add'){
          this.editForm = {}
        }
        // 
        if(type=='update'){
          this.editForm.jybj = this.editForm.jybj == 0 ? false : true
          this.editForm.zybz = this.editForm.zybz == 0 ? false : true
            console.log(this.editForm);
        }
      }
    },
    mounted(){
      this.load()
    }
  }
</script>
<style>
  .page-EntranceYear{
    position: relative;
  }
</style>