<template>
    <!-- 设置管理 -->
    <div class="page-SetManagement">
      <div class="page-container">
        <!-- 操作框 -->
        <div class="page-operation-box clearfix">
          <div class="pull-left">
            <el-button type="primary" @click="saveInfo()">保存</el-button>
          </div>
          <div class="pull-right">
            <el-button type="primary" v-if="show && disab==true" @click="disab=false">权限打破继承</el-button>
            <el-button type="primary" v-if="show && disab==false" @click="quxiao();disab=true">取消打破继承</el-button>
          </div>
        </div>
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
            <!-- 列表 -->
            <div class="app-page-box-table big-height" v-if="showtable">
              <el-table
                border
                tooltip-effect="dark"
                ref="tableElement"
                :data="tableData2"
                height="100%"
                highlight-current-row>
                <el-table-column fixed label="菜单" align="center" type="index" width="150">
                  <template slot-scope="scope">{{ scope.row.name }}</template>
                </el-table-column>
                <el-table-column
                  v-for="(item,index) in columnsHead"
                  show-overflow-tooltip
                  align="center"
                  min-width="120">
                  <template slot="header">
                    <!-- v-model="item.checkAll" -->
                    <el-checkbox
                      v-model="selectAllValue[item.id]"
                      @change="e=>{handleChange(item,e)}"
                    >{{item.label}}</el-checkbox>
                  </template>
                  <template slot-scope="scope">
                    <el-checkbox :disabled="disab" v-if="typeof scope.row[item.id] == 'object'" v-model="scope.row[item.id].checkd"> {{ scope.row[item.id].name }} </el-checkbox>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-col>
        </el-row>
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
  import table from "@/mixin/table.vue";
  import treeTransfer from 'el-tree-transfer'
  export default {
    name:"SetManagement",
    components:{
      treeTransfer
    },
    mixins: [table],
    data(){
      return {
        showtable:true,
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
        editForm:{},
        editFormRules:{},
        treeData:[],
        options:[
          {value:'1',label:'可用'},
          {value:'2',label:'不可用'}
        ],
        title:'',
        type:'',
        selectedTreeNodes:[],
        tableData2:[],
        columnsHead:[],
        btnAll:[],
        lx:'',
        jsId:'',
        param:[],
        disab:false,
        show:true,
        id:'',
        selectAllValue:{}
      }
    },
    methods:{
      // 搜索
      search() {
        this.currentPage = 1;
        this.setYM()
      },
      //  保存角色
      async saveInfo(type){
        await this.handleParam()
        let str = JSON.stringify(this.param)
        str = str.substr(1)
        str = str.substr(0,str.length-1)
        let flag
        if(this.lx == 1){
          flag = ''
        }else if(this.lx == 2){
          flag = "1"
        }
        this.$post('/jsqxzt/save.action',{
          loadingEl:this.$refs.tableElement,
          data:{
            flag:flag,
            dto:{
              qxfl:this.lx,
              jsId:this.id,
              id:this.jsId
            },
            info:str
          }
        }).then(data=>{
          if(data.succsess != 1){
            this.$message({
              message: data.msg,
              type: "error"
            });
            return
          }
          this.$message({message:"设置成功",type:"success"})
        })
      },
      async handleParam(){
        this.param = []
        this.tableData2.forEach(val=>{
          this.columnsHead.forEach(item=>{
            if(typeof val[item.id] == "object"){
              if(val[item.id].checkd == true){
                this.param.push({jsId:this.jsId,mljd:val.url,gnjd:item.id,lx:this.lx})
              }
            }
          })
        })
      },
      // 获取表格列的所有按钮信息
      getHead(){
        this.$post('/getMenu/getBtns.action',{
          loadingEl:this.$refs.tableElement,
          data:{
            dto:{}
          }
        }).then(data=>{
          this.columnsHead = []
          data.forEach(item=>{
            this.columnsHead.push({id:item.id,label:item.label})
            this.selectAllValue[item.id] = false
          })
          this.$nextTick(()=>{
            this.selectAllValue = JSON.parse(JSON.stringify(this.selectAllValue))
           this.$forceUpdate();
          });
        })
      },
      // 所有页面的按钮信息
      getBtns(){
        this.$post('/getMenu/getBtnAll.action',{
          loadingEl:this.$refs.tableElement,
          data:{
            dto:{}
          }
        }).then(data=>{
          this.btnAll = data
        })
      },
      getLeftTree(){
        this.$post('/getTree/getJSFullTree.action',{
          loadingEl:this.$refs.tree,
          data:{}
        }).then(data=>{
          this.treeData = data
        })
      },
      async handleNodeClick(obj,node,compont){
        this.lx = obj.lx
        this.jsId = obj.id
        let id = ''
        let jsId = ''
        if(this.lx == 1){
          this.disab = false
          this.show = false
          id = obj.id
          jsId= obj.id
          this.id = obj.id
        }else{
          this.disab = true
          this.show = true
          id = obj.id
          jsId = node.parent.data.id
          this.id = node.parent.data.id
        }
        await this.$post('/jsqxzt/getSingle.action',{
          loadingEl:this.$refs.tableElement,
          data:{
            dto:{id:obj.id,jsId:jsId}
          }
        }).then(data=>{
          if(data.succsess != 1){
            this.$message({
              message: data.msg,
              type: "error"
            });
            return
          }
          this.setYM(data)
        })
      },
      async setYM(data){
        if(data.dtoList.length != 0){
          this.disab = false
        }
        this.tableData2 = data.menuList
        this.tableData2.forEach(item=>{
          this.btnAll.forEach(val=>{
            if(item.url == val.url){
              item[val.id] = {id:val.id,name:val.name,url:val.url}
              return
            }
            // item[val.id] = {id:'',name:'',url:'',checkd:''}
          })
        })
        if(data.qxdjList.length != 0){
          let checkedArr = []
          data.qxdjList.forEach(item=>{
            checkedArr.push({url:item.mljd,btn:item.gnjd})
          })
          this.tableData2.forEach(item=>{
            checkedArr.forEach(val=>{
              if(item.url == val.url){
                item[val.btn].checkd = true
              }
            })
          })
        }
        this.tableData2 = JSON.parse(JSON.stringify(this.tableData2))
      },
      quxiao(){
        this.$post('/jsqxzt/qxdpjc.action',{
          loadingEl:this.$refs.tableElement,
          data:{
            dto:{
              jsId:this.id,
              yhId:this.jsId
            }
          }
        }).then(data=>{
          if(data.succsess == 1){
            this.$message({
              message: "已取消打破继承",
              type: "success"
            });
            this.$post('/jsqxzt/getSingle.action',{
              loadingEl:this.$refs.tableElement,
              data:{
                dto:{id:this.jsId,jsId:this.id}
              }
            }).then(data=>{
              if(data.succsess != 1){
                this.$message({
                  message: data.msg,
                  type: "error"
                });
                return
              }
              this.setYM(data)
            })
          }
        })
      },
      async load(){
        await this.getHead()
        this.getBtns()
        this.getLeftTree()
      },
      handleChange(val,e) {
        this.tableData2.forEach(item=>{
          if(item[val.id]){
            item[val.id].checkd = e
          }
        })
        this.showtable = false
         this.$nextTick(()=>{
            this.selectAllValue = JSON.parse(JSON.stringify(this.selectAllValue))
            this.showtable = true
          });
         
      },
    },
    mounted(){
      this.load()

    }
  }
</script>
<style>
  .page-SetManagement{
    position: relative;
  }
</style>