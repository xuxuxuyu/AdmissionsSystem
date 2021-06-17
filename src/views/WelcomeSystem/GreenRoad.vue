<template>
  <!-- 绿色通道 -->
  <div class="page-GreenRoad">
    <el-row style="height: 100%;width:100%">
      <el-col :span="3">
        <el-tree
          ref="tree"
          :data="treeData"
          node-key="id"
          @node-click="handleNodeClick">
        </el-tree>
      </el-col>
      <el-col :span="21" style="height: 100%">
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
              icon="icon iconfont">绿色通道
            </el-button>
            <el-button 
              type="primary"
              icon="icon iconfont">审核通过
            </el-button>
            <el-button 
              type="primary"
              icon="icon iconfont">审核不通过
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
              prop="zt"
              label="状态"
              align="center"
              :render-header="renderHeader"
              min-width="100">
              <template slot-scope="scope">{{ scope.row.zt }}</template>
            </el-table-column>
            <el-table-column
              prop="lstd"
              label="绿色通道"
              align="center"
              width="120"
              :render-header="renderHeader">
              <template slot-scope="scope">
                <el-checkbox :disabled="true" v-model="scope.row.lstd == 0 ? false:true"></el-checkbox>
              </template>
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="xymc"
              label="学院名称"
              align="center"
              :render-header="renderHeader"
              min-width="100">
              <template slot-scope="scope">{{ scope.row.xymc }}</template>
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="xnzy"
              label="校内专业"
              align="center"
              :render-header="renderHeader"
              min-width="100">
              <template slot-scope="scope">{{ scope.row.xnzy }}</template>
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="bjxx"
              label="班级信息"
              align="center"
              :render-header="renderHeader"
              min-width="100">
              <template slot-scope="scope">{{ scope.row.bjxx }}</template>
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="ksh"
              label="考生号"
              align="center"
              :render-header="renderHeader"
              min-width="100">
              <template slot-scope="scope">{{ scope.row.ksh }}</template>
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="xh"
              label="学号"
              align="center"
              :render-header="renderHeader"
              min-width="100">
              <template slot-scope="scope">{{ scope.row.xh }}</template>
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="xm"
              label="姓名"
              align="center"
              :render-header="renderHeader"
              min-width="100">
              <template slot-scope="scope">{{ scope.row.xm }}</template>
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="xb"
              label="性别"
              align="center"
              :render-header="renderHeader"
              min-width="100">
              <template slot-scope="scope">{{ scope.row.xb }}</template>
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="csrq"
              label="出生日期"
              align="center"
              :render-header="renderHeader"
              min-width="100">
              <template slot-scope="scope">{{ scope.row.csrq }}</template>
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="zjhm"
              label="证件号码"
              align="center"
              :render-header="renderHeader"
              min-width="100">
              <template slot-scope="scope">{{ scope.row.zjhm }}</template>
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="mz"
              label="民族"
              align="center"
              :render-header="renderHeader"
              min-width="100">
              <template slot-scope="scope">{{ scope.row.mz }}</template>
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="zzmm"
              label="政治面貌"
              align="center"
              :render-header="renderHeader"
              min-width="100">
              <template slot-scope="scope">{{ scope.row.zzmm }}</template>
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="jkzk"
              label="健康状况"
              align="center"
              :render-header="renderHeader"
              min-width="100">
              <template slot-scope="scope">{{ scope.row.jkzk }}</template>
            </el-table-column>]
            <el-table-column
              show-overflow-tooltip
              prop="wyyz"
              label="外语语种"
              align="center"
              :render-header="renderHeader"
              min-width="100">
              <template slot-scope="scope">{{ scope.row.wyyz }}</template>
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="xz"
              label="学制"
              align="center"
              :render-header="renderHeader"
              min-width="100">
              <template slot-scope="scope">{{ scope.row.xz }}</template>
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="pycc"
              label="培养层次"
              align="center"
              :render-header="renderHeader"
              min-width="100">
              <template slot-scope="scope">{{ scope.row.pycc }}</template>
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="pyfs"
              label="培养方式"
              align="center"
              :render-header="renderHeader"
              min-width="100">
              <template slot-scope="scope">{{ scope.row.pyfs }}</template>
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="lqpc"
              label="录取批次"
              align="center"
              :render-header="renderHeader"
              min-width="100">
              <template slot-scope="scope">{{ scope.row.lqpc }}</template>
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="rxfs"
              label="入学方式"
              align="center"
              :render-header="renderHeader"
              min-width="100">
              <template slot-scope="scope">{{ scope.row.rxfs }}</template>
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="rxrq"
              label="入学日期"
              align="center"
              :render-header="renderHeader"
              min-width="100">
              <template slot-scope="scope">{{ scope.row.rxrq }}</template>
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="bkkl"
              label="报考科类"
              align="center"
              :render-header="renderHeader"
              min-width="100">
              <template slot-scope="scope">{{ scope.row.bkkl }}</template>
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="zydm"
              label="专业代码"
              align="center"
              :render-header="renderHeader"
              min-width="100">
              <template slot-scope="scope">{{ scope.row.zydm }}</template>
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="lqzy"
              label="录取专业"
              align="center"
              :render-header="renderHeader"
              min-width="100">
              <template slot-scope="scope">{{ scope.row.lqzy }}</template>
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="zkzh"
              label="准考证号"
              align="center"
              :render-header="renderHeader"
              min-width="100">
              <template slot-scope="scope">{{ scope.row.zkzh }}</template>
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="rxfs"
              label="入学方式"
              align="center"
              :render-header="renderHeader"
              min-width="100">
              <template slot-scope="scope">{{ scope.row.rxfs }}</template>
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="lysf"
              label="来源省份"
              align="center"
              :render-header="renderHeader"
              min-width="100">
              <template slot-scope="scope">{{ scope.row.lysf }}</template>
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="lydq"
              label="来源地区"
              align="center"
              :render-header="renderHeader"
              min-width="100">
              <template slot-scope="scope">{{ scope.row.lydq }}</template>
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="jtzz"
              label="家庭住址"
              align="center"
              :render-header="renderHeader"
              min-width="100">
              <template slot-scope="scope">{{ scope.row.jtzz }}</template>
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="jtyb"
              label="家庭邮编"
              align="center"
              :render-header="renderHeader"
              min-width="100">
              <template slot-scope="scope">{{ scope.row.jtyb }}</template>
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="jtdh"
              label="家庭电话"
              align="center"
              :render-header="renderHeader"
              min-width="100">
              <template slot-scope="scope">{{ scope.row.jtdh }}</template>
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="byxx"
              label="毕业学校"
              align="center"
              :render-header="renderHeader"
              min-width="100">
              <template slot-scope="scope">{{ scope.row.byxx }}</template>
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="rxnf"
              label="入学年份"
              align="center"
              :render-header="renderHeader"
              min-width="100">
              <template slot-scope="scope">{{ scope.row.rxnf }}</template>
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="sccl"
              label="上传材料"
              align="center"
              :render-header="renderHeader"
              min-width="100">
              <template slot-scope="scope">{{ scope.row.sccl }}</template>
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="fctj"
              label="服从调剂"
              align="center"
              :render-header="renderHeader"
              min-width="100">
              <template slot-scope="scope">{{ scope.row.fctj }}</template>
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="bz"
              label="备注"
              align="center"
              :render-header="renderHeader"
              min-width="100">
              <template slot-scope="scope">{{ scope.row.bz }}</template>
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
      </el-col>
    </el-row>
  </div>
</template>
<script>
  import newtable from "@/mixin/newtable.vue";
  export default {
    name:"GreenRoad",
    mixins: [newtable],
    data(){
      return {
        treeData:[
          {label:'111',id:'111',children:[{label:'11101',id:'11101'}]},
          {label:'222',id:'222'},
        ],
        requestSuffix:{},
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
      }
    },
    methods:{
      handleNodeClick(){},
      openDialog(){},
      // 搜索
      search() {
        this.currentPage = 1;
        // this.getList();
      },
    },
    mounted(){

    }
  }
</script>
<style>
  .page-GreenRoad{
    position: relative;
    }
</style>