<template>
  <!-- 常见问题 -->
  <div class="page-CommonProblems">
    <div class="page-container">
      <!-- 操作框 -->
      <div class="page-operation-box clearfix">
        <div class="pull-left">
          <el-button type="primary" icon="icon iconfont icon-add" @click="openEditForm('add')">新增</el-button>
          <el-button
            type="primary"
            icon="icon iconfont iconpiliangxiugai"
            :disabled="updateBatchBtnDisabled"
            @click="openEditForm('update')">修改
          </el-button>
          <el-button type="primary" icon="icon iconfont iconshanchu" :disabled="deleteBatchBtnDisabled">删除</el-button>
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
          <el-table-column
            show-overflow-tooltip
            min-width="130"
            prop="wtnr"
            label="常见问题"
            align="center">
            <template slot-scope="scope">{{ scope.row.wtnr }}</template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            min-width="130"
            prop="hdnr"
            label="回答"
            align="center">
            <template slot-scope="scope">{{ scope.row.hdnr }}</template>
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
        append-to-body>
        <el-form status-icon label-width="90px" :model="editForm" class="form-clear-bottom" :rules="editFormRules" ref="editForm">
          <el-form-item label="常见问题" prop="wtnr">
            <el-input :rows="2" type="textarea" clearable v-model="editForm.wtnr" :autofocus="true" placeholder="请输入问题"></el-input>
          </el-form-item>
          <el-form-item label="回答" prop="hdnr">
            <el-input :rows="3" type="textarea" clearable v-model="editForm.hdnr" :autofocus="true" placeholder="请输入回答"></el-input>
          </el-form-item>
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
  import newtable from "@/mixin/newtable.vue"
  export default {
    mixins: [newtable],
    name:"CommonProblems",
    data(){
      return {
        requestSuffix:{
          select:'/onlineConsultation/getList.action',
          add:'/onlineConsultation/addWSOnlineConsultationCJ.action'
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
        editForm:{},
        editFormRules:{},
        editDialogDisplayTitle:'',
        editDialogVisible:false,
        type:''
      }
    },
    methods:{
      // 搜索
      search() {
        this.currentPage = 1;
        // this.getList();
      },
      // openEditForm(val){
      //   if(val == 'add'){
      //     this.editDialogDisplayTitle = "新增常见问题"
      //     this.editDialogVisible = true
      //     this.type = 'add'
      //   }else if(val == 'update'){
      //     this.editDialogDisplayTitle = "修改常见问题"
      //     this.editDialogVisible = true
      //     this.type = "update"
      //   }
        
      // },
      //保存新增信息
      async saveForm(){
        this.editForm.twrid = '1'
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
      async getList(isPaging, callback) {
      // @特殊处理 是否分页 字段, 要区分 分页 与 不分页的情况
       await this.setIsPaging(isPaging || true).requestList(callback);
      },
    },
    mounted(){
      this.getList()
    }
  }
</script>
<style>
  .page-CommonProblems{
    position: relative;
    }
</style>