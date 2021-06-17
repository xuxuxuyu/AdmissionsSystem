<template>
  <!-- 在线咨询 -->
  <div class="page-OnlineConsulting">
    <div class="page-container">
      <!-- 操作框 -->
      <div class="page-operation-box clearfix">
        <div class="pull-left">
          <el-button
            type="primary"
            icon="icon iconfont iconpiliangxiugai"
            :disabled="updateBatchBtnDisabled"
            @click="editDialogVisible = true">回复
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
            prop="XM"
            label="姓名"
            align="center">
            <template slot-scope="scope">{{ scope.row.XM }}</template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            min-width="130"
            prop="LXFS"
            label="联系方式"
            align="center">
            <template slot-scope="scope">{{ scope.row.LXFS }}</template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            min-width="130"
            prop="YX"
            label="邮箱"
            align="center">
            <template slot-scope="scope">{{ scope.row.YX }}</template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            min-width="130"
            prop="DZ"
            label="地址"
            align="center">
            <template slot-scope="scope">{{ scope.row.DZ }}</template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            min-width="130"
            prop="TWSJ"
            label="提问时间"
            align="center">
            <template slot-scope="scope">{{ scope.row.TWSJ }}</template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            min-width="130"
            prop="ISCJ"
            label="是否常见"
            align="center">
            <template slot-scope="scope">{{ scope.row.ISCJ }}</template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            min-width="130"
            prop="TWNR"
            label="问题"
            align="center">
            <template slot-scope="scope">{{ scope.row.TWNR }}</template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            min-width="130"
            prop="HDNR"
            label="回答"
            align="center">
            <template slot-scope="scope">{{ scope.row.HDNR }}</template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 新增/修改弹框 -->
      <el-dialog 
        ref="editDialog"
        title="回复问题"
        :visible.sync="editDialogVisible"
        class="edit-dialog" 
        width="30%" 
        append-to-body>
        <el-form status-icon label-width="90px" :model="editForm" class="form-clear-bottom" :rules="editFormRules" ref="editForm">
          <el-form-item label="姓名" prop="XM">
            <el-input clearable v-model="editForm.XM" :autofocus="true" placeholder="请输入姓名"></el-input>
          </el-form-item>
          <el-form-item label="联系方式" prop="LXFS">
            <el-input clearable v-model="editForm.LXFS" :autofocus="true" placeholder="请输入联系方式"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="YX">
            <el-input clearable v-model="editForm.YX" :autofocus="true" placeholder="请输入邮箱"></el-input>
          </el-form-item>
          <el-form-item label="地址" prop="DZ">
            <el-input clearable v-model="editForm.DZ" :autofocus="true" placeholder="请输入地址"></el-input>
          </el-form-item>
          <el-form-item label="提问时间" prop="TWSJ">
            <el-input clearable v-model="editForm.TWSJ" :autofocus="true" placeholder="请输入提问时间"></el-input>
          </el-form-item>
          <el-form-item label="问题" prop="WTNR">
            <el-input :rows="2" type="textarea" clearable v-model="editForm.WTNR" :autofocus="true" placeholder="请输入问题"></el-input>
          </el-form-item>
          <el-form-item label="回答" prop="HDNR">
            <el-input :rows="3" type="textarea" clearable v-model="editForm.HDNR" :autofocus="true" placeholder="请输入回答"></el-input>
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
  import table from "@/mixin/table.vue"
  export default {
    mixins: [table],
    name:"OnlineConsulting",
    data(){
      return {
        requestSuffix:{
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
        tableData:[{XM:'徐雨'}],
        editForm:{},
        editFormRulesL:{}
      }
    },
    methods:{
      ansewr(){},
      getList(){
        this.$post('/onlineConsultation/getList.action',{
          loadingEl:this.$refs.tableElement,
          data:{}
        }).then(data=>{

        })
      }
    },
    mounted(){
      // this.getList()
    }
  }
</script>
<style>
  .page-OnlineConsulting{
    position: relative;
    }
</style>