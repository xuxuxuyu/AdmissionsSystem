<template>
  <!-- 专业调整 -->
  <div class="page-MajorAdjust">
    <div class="page-container">
      <!-- 操作框 -->
      <div class="page-operation-box clearfix">
        <div class="pull-left">
          <el-button
            type="primary"
            icon="icon iconfont icon-add"
            @click="editDialogVisible = true">添加
          </el-button>
          <el-button type="primary" icon="icon iconfont iconshenhe" :disabled="deleteBatchBtnDisabled">审核</el-button>
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
            prop="ZT"
            label="状态"
            align="center">
            <template slot-scope="scope">{{ scope.row.ZT }}</template>
          </el-table-column>
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
            prop="XH"
            label="学号"
            align="center">
            <template slot-scope="scope">{{ scope.row.XH }}</template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            min-width="130"
            prop="YZY"
            label="原专业"
            align="center">
            <template slot-scope="scope">{{ scope.row.YZY }}</template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            min-width="130"
            prop="YBJ"
            label="原班级"
            align="center">
            <template slot-scope="scope">{{ scope.row.YBJ }}</template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            min-width="130"
            prop="XZY"
            label="新专业"
            align="center">
            <template slot-scope="scope">{{ scope.row.XZY }}</template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            min-width="130"
            prop="XBJ"
            label="新班级"
            align="center">
            <template slot-scope="scope">{{ scope.row.XBJ }}</template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            min-width="130"
            prop="CZR"
            label="操作人"
            align="center">
            <template slot-scope="scope">{{ scope.row.CZR }}</template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            min-width="130"
            prop="CZSJ"
            label="操作时间"
            align="center">
            <template slot-scope="scope">{{ scope.row.CZSJ }}</template>
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
          <el-form-item label="姓名\姓名\身份证号" prop="WSXSXXID">
            <el-input clearable v-model="editForm.WSXSXXID" :autofocus="true"></el-input>
          </el-form-item>
          <el-form-item label="学号" prop="XH">
            <el-input clearable v-model="editForm.XH" :autofocus="true" placeholder="请输入学号"></el-input>
          </el-form-item>
          <el-form-item label="姓名" prop="XM">
            <el-input clearable v-model="editForm.XM" :autofocus="true" placeholder="请输入姓名"></el-input>
          </el-form-item>
          <el-form-item label="原专业" prop="YZYID">
            <el-input clearable v-model="editForm.YZYID" :autofocus="true" placeholder="请输入原专业"></el-input>
          </el-form-item>
          <el-form-item label="原班级" prop="YBJID">
            <el-input clearable v-model="editForm.YBJID" :autofocus="true" placeholder="请输入原班级"></el-input>
          </el-form-item>
          <el-form-item label="新专业" prop="XZYID">
            <el-input clearable v-model="editForm.XZYID" :autofocus="true" placeholder="请输入新专业"></el-input>
          </el-form-item>
          <el-form-item label="新班级" prop="XBJID">
            <el-input clearable v-model="editForm.XBJID" :autofocus="true" placeholder="请输入新班级"></el-input>
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
    name:"MajorAdjust",
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
        tableData:[],
        editForm:{},
        editFormRulesL:{}
      }
    },
    methods:{

    },
    mounted(){

    }
  }
</script>
<style>
  .page-MajorAdjust{
    position: relative;
    }
</style>