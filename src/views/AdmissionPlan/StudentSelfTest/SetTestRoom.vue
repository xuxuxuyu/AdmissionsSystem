<!-- 考场设置 -->
<template>
	<div class="page-SetTestRoom">
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
                v-if="btn.add"
                @click="addRoom()">新增
              </el-button>
              <el-button 
              	type="primary" 
              	icon="icon iconfont iconshanchu"
                :disabled="deleteBatchBtnDisabled"
                @click="del()"
                v-if="btn.del">删除
              </el-button>
              <el-button
                type="primary"
                icon="icon iconfont icon-add"
                :disabled="deleteBatchBtnDisabled"
                @click="editDialogVisible = true"
                v-if="btn.update">设置教室容纳人数
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
                prop="bjmc"
                label="教室"
                align="center"
                min-width="100">
                <template slot-scope="scope">{{ scope.row.bjmc }}</template>
              </el-table-column>
              <el-table-column
                show-overflow-tooltip
                prop="kcrs"
                label="教室容纳人数"
                align="center"
                min-width="100">
                <template slot-scope="scope">{{ scope.row.kcrs }}</template>
              </el-table-column>
            </el-table>
          </div>
          <!--分页-->
          <div class="page-pagination">
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
      <!-- 设置教室容纳人数dialog -->
      <el-dialog
        ref="editDialog"
        class="edit-dialog page-ClassInfo-dialog"
        width="40%"
        append-to-body
        title="设置教室容纳人数"
        :visible.sync="editDialogVisible">
        <el-row>
          <el-col :span="4" style="margin-top: 1%">教室容纳人数：</el-col>
          <el-col :span="20">
            <el-input v-model="setNum"></el-input>
          </el-col>
        </el-row>    
        <span slot="footer" class="dialog-footer">
          <el-button
            ref="btnEditFormSave"
            type="primary"
            size="medium"
            class="app-dialog-btn app-confirm" @click="setPerNum()">确认</el-button>
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
	import table from "@/mixin/table.vue";
  import appTree from "@/components/app-tree"
	export default {
		name:'SetTestRoom',
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
        editDialogVisible:false,
        setNum:'',
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
          this.getRightData({'bdxqxxId':val.key})
        }else if(val.level == 2){
          this.getRightData({'bdfqxxId':val.key})
        }
      },
      getRightData(data){
         this.$post('/kcdjb/getList.action',{
            loadingEl: this.$refs.tableElement,
            data:{
              dto:data
            }
          }).then(data=>{
            if(data.succsess >= 0){
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
      // 所有选中的节点(获取所选节点的id)
      checkedData(val){
        this.treeIds = []
        val.forEach(item=>{
          this.treeIds.push(item.id)
        })
      },
      // 添加已选教室
      addRoom(){
        let ids = this.treeIds.join()
        this.$post("/kcdjb/insert.action", {
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
      // 设置教室容纳人数
      setPerNum(){
        var info = "" ;
        this.multipleSelection.forEach(item=>{
          // item.kcrs = this.setNum
          let num = this.setNum
          info += item.id + "," + num + ";"
        })
        this.editDialogVisible = false
        this.$post('/kcdjb/update.action',{
          data:{
            dto:{
              info:info
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
      // 获取班级树的数据
      getTreeData(){
        this.$post('/bdjsxx/getJsTree.action',{
          data:{}
        }).then(data=>{
          if(data.succsess){
            this.treeData = data.tree
          }else{
            this.$message({
              message: "data.jsonMsg",
              type: "error"
            });
            return
          }
        })
      },
      // 获取已选班级表格数据
      getList(){
        this.tableData = []
        this.$post('/kcdjb/getList.action',{
          loadingEl:'all',
          data:{
            dto:{}
          }
        }).then(data=>{
          if(data.succsess < 0 ){
            this.$message({
              message: data.msg,
              type: "error"
            });
          }
          this.tableData = data.dtoList
          this.setCheckNodes()
        })
      },
      // 设置默认已选教室checkNodes
      setCheckNodes(){
        this.checkNodes = []
        if(this.tableData){
          this.tableData.forEach(item=>{
            this.checkNodes.push(item.bdbjxxId)
          })
        }
        
      },
      // 删除已添加教室
      del(){
        this.$confirm("是否确认删除?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(()=>{
          let ids = this.multipleSelection.map(item => item.id)
          this.$post("/kcdjb/delete.action",{
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
    },
    beforeMount(){
      
    }
	}
</script>
<style>
  .page-SetTestRoom{
    position: relative;
  }
  .borderRight{
    height: 93.5%;
    width: 300px;
    margin-left: -20px;
    overflow: scroll;
  }
</style>