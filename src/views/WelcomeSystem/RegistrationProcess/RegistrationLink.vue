<template>
  <!-- 报到环节 -->
  <div class="page-RegistrationLink">
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
            icon="icon iconfont iconpiliangxiugai"
            @click="openEditForm('update');openDialog('update')" 
            :disabled="updateBatchBtnDisabled">修改
          </el-button>
          <el-button 
            type="primary" 
            icon="icon iconfont iconshanchu" 
            @click="deleteConfirm('')" 
            :disabled="deleteBatchBtnDisabled">删除</el-button>
        </div>
      </div>
      <!-- 列表 -->
      <div class="app-page-box-table big-height">
        <el-table 
          border 
          stripe
          highlight-current-row 
          ref="tableElement" 
          :data="tableData" 
          height="100%"
          @sort-change="handleSortChange"
          @selection-change="handleSelectionChange"
          @row-dblclick="doubleClickTableRow">
          <el-table-column align="center" type="selection" width="40"></el-table-column>
          <el-table-column label="序号" align="center" type="index" width="50"></el-table-column>
          <el-table-column prop="mc" label="名称" align="center">
            <template slot-scope="scope">{{ scope.row.mc }}</template>
          </el-table-column>
          <el-table-column prop="nr" label="内容" align="center">
            <template slot-scope="scope">{{ scope.row.nr }}</template>
          </el-table-column>
          <el-table-column prop="zt" label="状态" align="center">
            <template slot-scope="scope">{{ scope.row.zt }}</template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 新增修改dialog -->
      <el-dialog 
        ref="editDialog"
        :title="editDialogDisplayTitle"
        :visible.sync="editDialogVisible"
        class="edit-dialog" 
        width="30%" 
        append-to-body
        @close="resetEditForm">
        <el-form status-icon label-width="90px" :model="editForm" class="form-clear-bottom" :rules="editFormRules" ref="editForm">
          <el-form-item label="名称" prop="mc">
            <el-input clearable v-model="editForm.mc" :autofocus="true" placeholder="请输入名称"></el-input>
          </el-form-item>
          <el-form-item label="内容" prop="nr">
            <el-input clearable v-model="editForm.nr" :autofocus="true" placeholder="请输入名称"></el-input>
          </el-form-item>
          <el-form-item label="状态" prop="zt" class="no-margin-bottom">
            <el-checkbox v-model="editForm.zt"></el-checkbox>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" size="medium" @click="saveForm()">确认</el-button>
          <el-button size="medium" @click="editDialogVisible = false">关闭</el-button>
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
          layout="total, sizes, prev, pager, next, jumper"></el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
  import newtable from "@/mixin/newtable.vue";
  export default {
    mixins: [newtable],
    name:"RegistrationLink",
    data(){
      return {
        requestSuffix:{
          select:'',
          add:'',
          update:'',
          delete:'',
        },
        tableData:[],
        editForm:{},
        editFormRules:{},
        editDialogVisible:false,
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
      openDialog(type){
        if(type == 'add'){
          this.editForm = {}
        }
        if(type=='update'){
          this.editForm.zt = this.editForm.zt == 0 ? false : true
        }
      }
    },
    mounted(){
      // this.load()
    }
  }
</script>
<style>
  .page-RegistrationLink{
    position: relative;
    }
</style>