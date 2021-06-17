<!-- 监考老师设置 -->
<template>
	<div class="page-SetTestTeacher">
		<div class="page-container">
      <el-row style="height: 100%">
        <el-col class="borderRight" :span="4" style="text-align: left;">
          <el-checkbox v-model="showAll" @change="showAllRight" style="margin-left: 25px;color: #606266">显示所有</el-checkbox>
          <appTree ref="appTreeRef" @clickItem="clickItem" :treeData='treeData' :showLine="true" @checkedData="checkedData" :checkNodes='checkNodes'></appTree>
        </el-col>
        <el-col :class="ShowTree ? 'moveLeft' : 'moveRight'" style="height: 93%">
      		<!-- 操作框 -->
    			<div class="page-operation-box clearfix">
    				<div class="pull-left">
    	        <el-button
                type="primary"
                icon="icon iconfont icon-add"
                @click="addTeacher()"
                v-if="btn.add">新增
              </el-button>
              <el-button 
              	type="primary" 
              	icon="icon iconfont iconshanchu"
                :disabled="deleteBatchBtnDisabled"
                @click='del()'
                v-if="btn.del">删除
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
                prop="xm"
                label="姓名"
                align="center"
                min-width="100">
                <template slot-scope="scope">{{ scope.row.xm }}</template>
              </el-table-column>
              <el-table-column
                show-overflow-tooltip
                prop="xb"
                label="性别"
                align="center"
                min-width="100">
                <template slot-scope="scope">{{ scope.row.xb }}</template>
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
	</div>
</template>
<script>
	import table from "@/mixin/table.vue";
  import appTree from "@/components/app-tree"
	export default {
		name:'SetTestTeacher',
		mixins: [table],
		components:{
      appTree
    },
    computed:{
      ShowTree(){
        return this.$store.getters.SHOW_TREE
      },
      USER_INFO() {
        return this.$store.getters.USER_INFO
      }
    },
		data(){
			return {
				tableData:[],
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
        treeData:[],
        treeIds:[],
        checkNodes:[],
        btn:{},
        showAll:true
			}
		},
		methods:{
			// 搜索
      search() {
        this.currentPage = 1;
      },
      // 当前点击节点
      clickItem(val){
        this.showAll = false
        if(val.level == 1){
          // 右边跟着变ssbm
          this.$post('/teacherInfo/getList.action',{
            loadingEl: this.$refs.tableElement,
            data:{
              dto:{ssbm:val.key}
            }
          }).then(data=>{
            if(data.succsess >= 0 ){
              this.tableData = data.dtoList
              this.setCheckNodes()
            }else{
              this.$message({
                message: data.msg,
                type: "error"
              });
            }
          })
        }
      },
      // 所有选中的节点(获取所选节点的id)
      checkedData(val){
        this.treeIds = []
        val.forEach(item=>{
          this.treeIds.push(item.id)
        })
      },
      // 添加已选教师
			addTeacher(){
        let ids = this.treeIds.join()
        this.$post("/teacherInfo/insert.action", {
          data: {
            dto:{
              id:ids
            }
          }
        }).then(data=>{
          if(data.succsess != 1){
            this.$message({
              message: data.msg,
              type: "error"
            });
          }
          this.getList()
        })
      },
      // 设置默认已选教师checkNodes
      setCheckNodes(){
        this.checkNodes = []
        this.tableData.forEach(item=>{
          this.checkNodes.push(item.id)
        })
        // console.log(this.checkNodes)
      },
      // 获取班级树的数据
      getTreeData(){
        this.$post('/teacherInfo/getTTree.action',{
          loadingEl: this.$refs.appTreeRef,
          data:{
            dto:{}
          }
        }).then(data=>{
          if(data.succsess){
            this.treeData = data.tree
          }else{
            this.$message({
              message: data.jsonMsg,
              type: "error"
            });
            return
          }
        })
      },
      // 获取已选教师表格数据
      getList(){
        this.tableData = []
        this.$post('/teacherInfo/getList.action',{
          loadingEl: this.$refs.tableElement,
          data:{
            dto:{}
          }
        }).then(data=>{
          if(data.succsess == 1){
            this.tableData = data.dtoList
            this.setCheckNodes()
          }else{
            this.$message({
              message: data.msg,
              type: "error"
            });
          }
        })
      },
      // 删除已添加教师
      del(){
        this.$confirm("是否确认删除?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(()=>{
          let ids = this.multipleSelection.map(item => item.id)
          this.$post("/teacherInfo/delete.action",{
            data:{
              dto:{
                id:ids.join()
              }
            }
          }).then(data=>{
            if(data.succsess==1){
              this.$message({
                message: "删除成功",
                type: "success"
              });
              this.getList()
            }else{
              this.$message({
                showClose: true,
                message: '删除失败',
                type: "error"
              });
            }
          })
        })
        .catch(() => {
            this.$message({type: "info", message: "已取消删除"});
          });
      },
      async getBtns(){
        await this.$post('/qxdj/getBtns.action',{
          loadingEl:'all',
          data:{
            dto:{
              jsId:this.USER_INFO.userId,
              mljd:this.$route.name
            }
          }
        }).then(data=>{
          if(data.dtoList != null){
            data.dtoList.forEach(item=>{
            this.$set(this.btn,[item.gnjd],true)
          })
          }
        })
      },
      showAllRight(){
        if(this.showAll == true){
          this.getList()
        }else{
          this.tableData = []
        }
      },
      async load(){
        this.getTreeData()
        this.getList()
      }
		},
		mounted(){
      this.getBtns()
      this.load()
    }
	}
</script>
<style>
	.page-SetTestTeacher{
    position: relative;
  }
  .borderRight{
    height: 93.5%;
    width: 300px;
    margin-left: -20px;
    overflow: scroll;
  }
</style>