<template>
  <!-- 标签管理 -->
  <div class="page-SignInfo">
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
            @click="openEditForm('update');openDialog('update')" 
            :disabled="updateBatchBtnDisabled"
            v-if="btn.update">修改
          </el-button>
          <el-button type="primary" icon="icon iconfont iconshanchu" @click="deleteConfirm('bdbqxxId')" :disabled="deleteBatchBtnDisabled" v-if="btn.del">删除</el-button>
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
            prop="bqlx"
            label="标签类型"
            align="center"
            min-width="100"
            :render-header="renderHeader">
            <template slot-scope="scope">
              {{ scope.row.bqlx }}
            </template>
          </el-table-column>
          <el-table-column
            prop="bqbh"
            label="标签编号"
            align="center"
            min-width="100"
            :render-header="renderHeader">
            <template slot-scope="scope">
              {{ scope.row.bqbh }}
            </template>
          </el-table-column>
          <el-table-column
            prop="bqmc"
            label="标签名称"
            align="center"
            min-width="200"
            :render-header="renderHeader">
            <template slot-scope="scope">
              {{ scope.row.bqmc }}
            </template>
          </el-table-column>
          <el-table-column
            prop="jybj"
            label="禁用"
            align="center"
            :render-header="renderHeader"
            width="80">
            <template slot-scope="scope">
              <el-checkbox v-model="scope.row.jybj" disabled></el-checkbox>
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
        class="edit-dialog"
        width="350px"
        append-to-body
        title="新增标签管理" 
        :visible.sync="editDialogVisible"
        @close="resetEditForm">
        <el-form status-icon label-width="80px" :model="editForm" class="form-clear-bottom" :rules="editFormRules" ref="editForm">
          <el-row>
            <el-col :span="24">
              <el-form-item label="标签编号" prop="bqbh">
                <el-input clearable v-model="editForm.bqbh" :autofocus="true" ref="BQBH_INPUT" placeholder="请输入标签编号"></el-input>
              </el-form-item>
              <el-form-item label="标签名称" prop="bqmc">
                <el-input clearable v-model="editForm.bqmc" placeholder="请输入标签名称"></el-input>
              </el-form-item>
              <el-form-item label="标签类型" prop="bqlx">
                <el-select style="width: 100%" v-model="editForm.bqlx" placeholder="请选择">
                  <el-option
                    v-for="item in optionsBQLX"
                    :key="item.bdxqxxId"
                    :label="item.xqmc"
                    :value="item.bdxqxxId">
                  </el-option>
                </el-select>
              </el-form-item>
               <el-form-item label="" prop="jybj" class="no-margin-bottom">
                 <el-checkbox label="禁用标记"  v-model="editForm.jybj"></el-checkbox>
               </el-form-item>
             </el-col>
           </el-row>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" size="medium" class="app-dialog-btn app-confirm " @click="saveForm()">确认</el-button>
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
    name:"SignInfo",
    data() {
      return {
        requestSuffix:{
          select:'/bdbqxx/getList.action',
          add:'/bdbqxx/insert.action',
          update:'/bdbqxx/update.action',
          delete:'/bdbqxx/deletes.action'
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
          "bdbqxxId": "",       //主键
          "bqlx": "",     //标签类型
          "bqbh": "",     //标签编号
          "bqmc": "",     //标签名称
          "jybj": false //禁用标记
        },
        editFormRules: {
            //标签类型 （验证: 非空, 长度: 50）
          bqlx: [{required: true, message: "标签类型必须输入"},{ min: 0, max: 50, message: '标签类型长度不能大于50个字符', trigger: 'blur' }],
          //标签编号 （验证: 非空, 长度: 20）
          bqbh: [{required: true, message: "标签编号必须输入"},{ min: 0, max: 20, message: '标签编号长度不能大于20个字符', trigger: 'blur' }],
          //标签名称 （验证: 非空, 长度: 50）
          bqmc: [{required: true, message: "标签名称必须输入"},{ min: 0, max: 50, message: '标签名称长度不能大于50个字符', trigger: 'blur' }],
        },
        optionsBQLX:[]
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
      openDialog(type){

      }
    },
    mounted(){
      this.load()
    }
  }
</script>
<style>
  .page-SignInfo {
    position: relative;
  }
</style>