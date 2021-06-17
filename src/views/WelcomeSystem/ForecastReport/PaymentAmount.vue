<template>
  <!-- 缴费金额 -->
  <div class="page-PaymentAmount">
    <div class="page-container">
      <!-- 操作框 -->
      <div class="page-operation-box clearfix">
        <div class="pull-left">
          <el-button
            type="primary"
            icon="icon iconfont icon-add"
            @click="openEditForm('add');openDialog('add')">新增
          </el-button>
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
          <el-table-column prop="zybh" label="专业编号" align="center">
            <template slot-scope="scope">{{ scope.row.zybh }}</template>
          </el-table-column>
          <el-table-column prop="zymc" label="专业名称" align="center">
            <template slot-scope="scope">{{ scope.row.zymc }}</template>
          </el-table-column>
          <el-table-column prop="xf" label="学费" align="center">
            <template slot-scope="scope">{{ scope.row.xf }}</template>
          </el-table-column>
          <el-table-column prop="xzf" label="学杂费" align="center">
            <template slot-scope="scope">{{ scope.row.xzf }}</template>
          </el-table-column>
          <el-table-column prop="zsf" label="住宿费" align="center">
            <template slot-scope="scope">{{ scope.row.zsf }}</template>
          </el-table-column>
          <el-table-column prop="jxf" label="军训服" align="center">
            <template slot-scope="scope">{{ scope.row.jxf }}</template>
          </el-table-column>
          <el-table-column prop="bz" label="备注" align="center">
            <template slot-scope="scope">{{ scope.row.bz }}</template>
          </el-table-column>
        </el-table>
    </div>
    </div>
  </div>
</template>
<script>
  import newtable from "@/mixin/newtable.vue"
  export default {
    mixins: [newtable],
    name:"PaymentAmount",
    data(){
      return {

      }
    },
    methods:{
      openDialog(type){
        if(type == 'add'){
          this.editForm = {}
        }
        if(type=='update'){
          
        }
      }
    },
    mounted(){

    }
  }
</script>
<style>
  .page-PaymentAmount{
    position: relative;
    }
</style>