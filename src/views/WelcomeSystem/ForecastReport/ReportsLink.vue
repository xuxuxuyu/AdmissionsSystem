<template>
  <!-- 报道环节 -->
  <div class="page-ReportsLink">
    <div class="page-container">
      <!-- 操作框 -->
      <div class="page-operation-box clearfix">
        <div class="pull-left">
          <el-button type="primary" icon="icon iconfont icon-add" @click="openEditForm('add');openDialog('add')">新增</el-button>
          <el-button
            type="primary"
            icon="icon iconfont iconpiliangxiugai"
            @click="openEditForm('update');openDialog('update')" 
            :disabled="updateBatchBtnDisabled"StudentInfo>修改
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
          highlight-current-row>
          <el-table-column align="center" type="selection" width="40"></el-table-column>
          <el-table-column fixed label="序号" align="center" type="index" width="50"></el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="mc"
            label="名称"
            align="center"
            :render-header="renderHeader"
            min-width="100">
            <template slot-scope="scope">{{ scope.row.mc }}</template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="nr"
            label="内容"
            align="center"
            :render-header="renderHeader"
            min-width="100">
            <template slot-scope="scope">{{ scope.row.nr }}</template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="zt"
            label="状态"
            align="center"
            :render-header="renderHeader"
            min-width="100">
            <template slot-scope="scope">
              <el-check v-model="scope.row.zt"></el-check>
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
    </div>
  </div>
</template>
<script>
  import newtable from "@/mixin/newtable.vue";
  export default {
    mixins: [newtable],
    name:"ReportsLink",
    data(){
      return {
        tableData:[],
        requestSuffix:{},
        selectConfig: {
          // 表格的通用请求
          table: {
            order: [{ Field: "dwbh", IsDesc: false }],
            fuzzy: [

            ],
            where: [
            ]
          }
        },
      }
    },
    methods:{

    },
    mounted(){

    }
  }
</script>
<style>
  .page-ReportsLink{
    position: relative;
    }
</style>