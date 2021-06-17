<template>
  <!-- 电话号码 -->
  <div class="page-PhoneNumber">
    <div class="page-container">
      <!-- 操作框 -->
      <div class="page-operation-box clearfix">
        <div class="pull-left">
          <el-button
            type="primary"
            icon="icon iconfont icon-add"
            @click="openEditForm('add');openDialog('add')">新增
          </el-button>
          <el-button
            type="primary"
            icon="icon iconfont icon-add"
            @click="openEditForm('update');openDialog('update')" :disabled="updateBatchBtnDisabled">修改
          </el-button>
          <el-button 
            type="primary" 
            icon="icon iconfont iconshanchu" 
            @click="deleteConfirm('')" 
            :disabled="deleteBatchBtnDisabled" >删除
          </el-button>

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
            prop="gs"
            label="公司"
            align="center"
            min-width="100">
            <template slot-scope="scope">{{ scope.row.gs }}</template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="tcjs"
            label="套餐解释"
            align="center"
            min-width="100">
            <template slot-scope="scope">{{ scope.row.tcjs }}</template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="fj"
            label="附件"
            align="center"
            min-width="100">
            <template slot-scope="scope">{{ scope.row.fj }}</template>
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
      <!-- 新增修改dialog -->
       <el-dialog
        ref="editDialog"
        class="edit-dialog page-ClassInfo-dialog"
        width="30%"
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
          <el-form-item label="公司" prop="gs">
            <el-input clearable v-model="editForm.gs" :autofocus="true" placeholder="请输入公司名称"></el-input>
          </el-form-item>
          <el-form-item label="套餐解释" prop="tcjs">
            <el-input :rows="5" type="textarea" clearable v-model="editForm.tcjs" :autofocus="true" placeholder="请输入套餐解释"></el-input>
          </el-form-item>
          <el-form-item label="附件" prop="fj">
            <el-input type="file" clearable v-model="editForm.fj" :autofocus="true"></el-input>
          </el-form-item>
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
  import newtable from "@/mixin/newtable.vue";
  export default {
    mixins: [newtable],
    name:"PhoneNumber",
    data(){
      return {
        requestSuffix:{
          select:'',
          add:'',
          update:'',
          delete:''
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
        editForm:{},
        editFormRules:{}
      }
    },
    methods:{ 
      openDialog(){},
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
    },
    mounted(){

    }
  }
</script>
<style>
  .page-PhoneNumber{
    position: relative;
    }
</style>