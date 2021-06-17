<!-- 排考 -->
<template>
	<div class="page-SetTest">
		<div class="page-container">
			<!-- 操作框 -->
			<div class="page-operation-box clearfix">
        <div class="pull-left">
          <!-- 查询条件 -->
          <div class="cascade-select">
            <el-form :inline="true" class="demo-form-inline">
              <el-form-item label="招生计划:">
                <el-select v-model="examDateId" placeholder="请选择" @change="handlechange">
                  <el-option
                    v-for="item in optionsYear"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-form>
          </div>
        	<el-button type="primary" @click="openRoom()" :disabled="deleteBatchBtnDisabled"
          v-if="btn.update">自动排考场</el-button>
        	<el-button type="primary" @click="teacherDialogVisible = true"
          v-if="btn.update">自动排监考</el-button>
          <el-button type="primary" v-if="btn.update" @click="fabu()">发布</el-button>
          <el-button type="primary" :disabled="deleteBatchBtnDisabled" v-if="btn.update" @click="openScoreTeacher()">指定成绩录入老师</el-button>
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
            prop="ccbh"
            label="场次编号"
            align="center"
            min-width="100">
            <template slot-scope="scope">{{ scope.row.ccbh }}</template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="fbsj"
            label="发布时间"
            align="center"
            min-width="150">
            <template slot-scope="scope">{{ scope.row.fbsj }}</template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="startTime"
            label="开始时间"
            align="center"
            min-width="150">
            <template slot-scope="scope">{{ scope.row.startTime }}</template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="endTime"
            label="结束时间"
            align="center"
            min-width="150">
            <template slot-scope="scope">{{ scope.row.endTime }}</template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="kmmc"
            label="科目"
            align="center"
            min-width="150">
            <template slot-scope="scope">{{ scope.row.kmmc }}</template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="kc"
            label="考场"
            align="center"
            min-width="150">
            <template slot-scope="scope">
              <el-link :underline="false" @click="openchangeKC(scope)">
                {{ scope.row.kc }}
              </el-link>
            </template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="rnrs"
            label="考场可容纳人数"
            align="center"
            min-width="120">
            <template slot-scope="scope">{{ scope.row.rnrs }}</template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="aprs"
            label="安排人数"
            align="center"
            min-width="100">
            <template slot-scope="scope">{{ scope.row.aprs }}</template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="jklsxm1"
            label="监考教师1"
            align="center"
            min-width="100">
            <template slot-scope="scope">
              <el-link :underline="false" @click="openchangeJK(scope)">
                {{ scope.row.jklsxm1 }}
              </el-link>
            </template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="jklsxm2"
            label="监考教师2"
            align="center"
            min-width="100">
            <template slot-scope="scope">
              <el-link :underline="false" @click="openchangeJK(scope)">
                {{ scope.row.jklsxm2 }}
              </el-link>
            </template>
          </el-table-column>
        <!--   <el-table-column
            show-overflow-tooltip
            prop="jklsxm3"
            label="监考教师3"
            align="center"
            min-width="100">
            <template slot-scope="scope">
              <el-link :underline="false" @click="openchangeJK(scope)">
                {{ scope.row.jklsxm3 }}
              </el-link>
            </template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="jklsxm4"
            label="监考教师4"
            align="center"
            min-width="100">
            <template slot-scope="scope">
              <el-link :underline="false" @click="openchangeJK(scope)">
                {{ scope.row.jklsxm4 }}
              </el-link>
            </template>
          </el-table-column> -->
          <el-table-column
            show-overflow-tooltip
            prop="xxlb"
            label="详细列表"
            align="center"
            min-width="100">
            <template slot-scope="scope">
              <el-button type="primary" @click="CKXQ(scope)" :disabled="scope.row.dis">查看</el-button>
            </template>
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
      <!-- 自动排考场dialog -->
      <el-dialog
        ref="editDialog"
        class="edit-dialog"
        width="50%"
        append-to-body
        title="请选择待排考场"
        :visible.sync="roomDialogVisible">
        <span>已选考场可容纳人数:{{selectedRNRS}} </span>
        <tree-transfer
          :title = 'title'  
          :from_data='fromRoomData' 
          :to_data='toRoomData' 
          :defaultProps="{label:'label'}" 
          @addBtn='addRoom' 
          @removeBtn='removeRoom'
          height='540px' 
          filter>
        </tree-transfer>
        <span slot="footer" class="dialog-footer">
          <el-button
            ref="btnEditFormSave"
            type="primary"
            size="medium"
            class="app-dialog-btn app-confirm" @click="paiRoom()">确认</el-button>
          <el-button
            size="medium"
            class="app-dialog-btn app-close"
            @click="roomDialogVisible = false">关闭</el-button>
        </span>
      </el-dialog>
      <!-- 自动排监考dialog -->
      <el-dialog
        ref="editDialog"
        class="edit-dialog page-ClassInfo-dialog"
        width="50%"
        append-to-body
        title="请选择待排监考教师"
        :visible.sync="teacherDialogVisible">
        <tree-transfer
          :title = 'title'  
          :from_data='fromTeacherData' 
          :to_data='toTeacherData' 
          :defaultProps="{label:'label'}" 
          @addBtn='addTeacher' 
          @removeBtn='removeTeacher'
          height='540px' 
          filter>
        </tree-transfer>
        <span slot="footer" class="dialog-footer">
          <el-button
            ref="btnEditFormSave"
            type="primary"
            size="medium"
            class="app-dialog-btn app-confirm" @click="paiTeacher()">确认</el-button>
          <el-button
            size="medium"
            class="app-dialog-btn app-close"
            @click="teacherDialogVisible = false">关闭</el-button>
        </span>
      </el-dialog>
      <!-- 考场详情dialog -->
      <el-dialog
        ref="editDialog"
        class="edit-dialog page-ClassInfo-dialog kmxqDialog"
        width="80%"
        append-to-body
        title="考场详情"
        :visible.sync="kcxqDialogVisible">
        <el-table
          border
          tooltip-effect="dark"
          ref="tableElement"
          :data="tableData2"
          highlight-current-row
          @sort-change="handleSortChange"
          @selection-change="handleSelectionChange"
          @row-dblclick="doubleClickTableRow">
          <el-table-column align="center" type="selection" width="40"></el-table-column>
          <el-table-column label="序号" align="center" type="index" width="50">
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="bmh"
            label="报名号"
            align="center"
            min-width="150">
            <template slot-scope="scope">{{ scope.row.bmh }}</template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="ksh"
            label="考生号"
            align="center"
            min-width="150">
            <template slot-scope="scope">{{ scope.row.ksh }}</template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="ksxm"
            label="姓名"
            align="center"
            min-width="100">
            <template slot-scope="scope">{{ scope.row.ksxm }}</template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="ksxb"
            label="性别"
            align="center"
            min-width="80">
            <template slot-scope="scope">{{ scope.row.ksxb }}</template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="zjhm"
            label="身份证号"
            align="center"
            min-width="180">
            <template slot-scope="scope">{{ scope.row.zjhm }}</template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="bkzy"
            label="报考专业"
            align="center"
            min-width="120">
            <template slot-scope="scope">{{ scope.row.bkzy }}</template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="kslb"
            label="考生类别"
            align="center"
            min-width="120">
            <template slot-scope="scope">{{ scope.row.kslb }}</template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="kskssj"
            label="开始时间"
            align="center"
            min-width="150">
            <template slot-scope="scope">{{ scope.row.kskssj }}</template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="ksjssj"
            label="结束时间"
            align="center"
            min-width="150">
            <template slot-scope="scope">{{ scope.row.ksjssj }}</template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="bjmc"
            label="考试地点"
            align="center"
            min-width="120">
            <template slot-scope="scope">{{ scope.row.bjmc }}</template>
          </el-table-column>
          <!-- <el-table-column
            show-overflow-tooltip
            prop="bmh"
            label="报到序号"
            align="center"
            min-width="180">
            <template slot-scope="scope">{{ scope.row.bmh }}</template>
          </el-table-column> -->
        </el-table>
        <span slot="footer" class="dialog-footer">
          <el-button
            size="medium"
            class="app-dialog-btn app-close"
            @click="kcxqDialogVisible = false">关闭</el-button>
        </span>
      </el-dialog>
      <!-- 成绩录入老师dialog -->
      <el-dialog
        ref="editDialog"
        class="edit-dialog page-ClassInfo-dialog"
        width="80%"
        append-to-body
        title="考场详情"
        :visible.sync="ScoreTeacherDialogVisible">
        <tree-transfer
          :title = 'title'  
          :from_data='teacherTree' 
          :to_data='toTeacherTree' 
          :defaultProps="{label:'label'}" 
          @addBtn='addTeacherTree' 
          @removeBtn='removeTeacherTree'
          height='540px' 
          filter>
        </tree-transfer>
        <span slot="footer" class="dialog-footer">
          <el-button
            ref="btnEditFormSave"
            type="primary"
            size="medium"
            class="app-dialog-btn app-confirm" @click="saveScoreTeacher()">确认
          </el-button>
          <el-button
            size="medium"
            class="app-dialog-btn app-close"
            @click="ScoreTeacherDialogVisible = false">关闭</el-button>
        </span>
      </el-dialog>
      <!-- 修改考场dialog -->
      <el-dialog
        ref="editDialog"
        class="edit-dialog page-ClassInfo-dialog"
        width="30%"
        append-to-body
        title="选择考场"
        :visible.sync="changeKCDialog">
        <el-tree
          ref="tree"
          :data="changeKCTree"
          node-key="id"
          @node-click="handleKCTree">
        </el-tree>
        <span slot="footer" class="dialog-footer">
          <el-button
            ref="btnEditFormSave"
            type="primary"
            size="medium"
            class="app-dialog-btn app-confirm" @click="saveChangeKC()">确认
          </el-button>
          <el-button
            size="medium"
            class="app-dialog-btn app-close"
            @click="changeKCDialog = false">关闭</el-button>
        </span>
      </el-dialog>
      <!-- 修改监考dialog -->
      <el-dialog
        ref="editDialog"
        class="edit-dialog page-ClassInfo-dialog"
        width="30%"
        append-to-body
        title="选择监考"
        :visible.sync="changeJKDialog">
        <el-tree
          ref="tree"
          :data="changeJKTree"
          node-key="id"
          @node-click="handleJKTree">
        </el-tree>
        <span slot="footer" class="dialog-footer">
          <el-button
            ref="btnEditFormSave"
            type="primary"
            size="medium"
            class="app-dialog-btn app-confirm" @click="saveChangeJK()">确认
          </el-button>
          <el-button
            size="medium"
            class="app-dialog-btn app-close"
            @click="changeJKDialog = false">关闭</el-button>
        </span>
      </el-dialog>
  	</div>
	</div>
</template>
<script>
	import table from "@/mixin/table.vue";
  import treeTransfer from 'el-tree-transfer'
	export default {
    components:{
      treeTransfer
    },
    computed: {
      USER_INFO() {
        return this.$store.getters.USER_INFO
      }
    },
		name:'SetTest',
		mixins: [table],
		data(){
			return {
				tableData:[],
        weipai:[],
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
        fromRoomData:[],
        toRoomData:[],//目标数据
        title:['待选','已选'],
        roomDialogVisible:false,
        fromTeacherData:[],
        toTeacherData:[],//目标数据
        teacherDialogVisible:false,
        selectedRoom:[],
        selectedTeacher:[],
        selectedRNRS:0,
        kcxqDialogVisible:false,
        tableData2:[],
        ScoreTeacherDialogVisible:false,
        teacherTree:[],
        toTeacherTree:[],
        selectedDialogTeacher:[],
        btn:{},
        optionsYear:[],
        examDateId:'',
        changeKCDialog:false,
        changeJKDialog:false,
        scopeKC:{},
        scopeJK:{},
        changeKCTree:[],
        changeJKTree:[],
        KCInfo:{},
        JKInfo:{}
			}
		},
		methods:{
			// 搜索
      search() {
        this.currentPage = 1;
      },
      // 监听穿梭框教室组件添加
      addRoom(fromData,toData,obj){
        obj.nodes.forEach(item=>{
          if(!item.children){
            this.selectedRoom.push(item)
            this.selectedRNRS += Number(item.cnt)
          }
        })
      },
      // 监听穿梭框教室组件移除
      removeRoom(fromData,toData,obj){
        obj.nodes.forEach(item=>{
          if(!item.children){
            this.selectedRoom.forEach((val,index)=>{
              if(val.id == item.id){
                this.selectedRoom.splice(index,1)
                this.selectedRNRS -= Number(item.cnt)
              }
            })
          }
        })
      },
      // 监听穿梭框教师组件添加
      addTeacher(fromData,toData,obj){
        obj.nodes.forEach(item=>{
          if(!item.children){
            this.selectedTeacher.push(item)
          }
        })
      },
      // 监听穿梭框教师组件移除
      removeTeacher(fromData,toData,obj){
        obj.nodes.forEach(item=>{
          if(!item.children){
            this.selectedTeacher.forEach((val,index)=>{
              if(val.id == item.id){
                this.selectedTeacher.splice(index,1)
              }
            })
          }
        })
      },
      // 监听穿梭框成绩录入教师组件添加
      addTeacherTree(fromData,toData,obj){
        obj.nodes.forEach(item=>{
          if(!item.children){
            this.selectedDialogTeacher.push(item)
          }
        })
      },
      // 监听穿梭框成绩录入教师组件移除
      removeTeacherTree(){
        obj.nodes.forEach(item=>{
          if(!item.children){
            this.selectedDialogTeacher.forEach((val,index)=>{
              if(val.id == item.id){
                this.selectedDialogTeacher.splice(index,1)
              }
            })
          }
        })
      },
      // 获取表格信息
      async getList(){
        this.tableData = []
        await this.$post('/ccsz/getList.action',{
          loadingEl:this.$refs.tableElement,
          data:{
            dto:{
              // year:this.year
              examDateId:this.examDateId
            }
          }
        }).then(data=>{
          if(data.succsess < 0){
            this.$message({
              message: data.msg,
              type: "error"
            });
          }
          let a = 1
          data.dtoList.forEach(item=>{
            if(item.cnt != 0){
              a = 1
              item.dis = true
              item.rnrs = item.cnt + '人待排'
            }else{
              a = 0
            }
          })
          if(a == 1){
            this.tableData = data.dtoList
          }else{
            this.tableData = []
          }
          

        })
      },
      // 获取考场树
      getClassTree(){
        this.fromRoomData = []
        this.$post('/administration/getClassTree.action',{
          data:{
            dto:{}
          }
        }).then(data=>{
          if(data.succsess != 1){
            this.$message({
              message: data.msg,
              type: "error"
            });
          }
          this.fromRoomData = data.array
        })
      },
      // 获取监考树
      getTeacherTree(){
        this.fromTeacherData = []
        this.$post('/administration/getTeacherTree.action',{
          data:{
            dto:{}
          }
        }).then(data=>{
          if(data.succsess != 1){
            this.$message({
              message: data.msg,
              type: "error"
            });
          }
          this.fromTeacherData = data.array
        })
      },
      openRoom(){
        if (this.multipleSelection.length > 1) {
          this.$message({
            showClose: true,
            message: "请选择数据，有且只能选择一条",
            type: "warning"
          });
          return;
        }
        this.roomDialogVisible = true
      },
      // 自动排考场
      paiRoom(){
        let param = {}
        let id = []
        this.selectedRoom.forEach(item=>{
          id.push(item.id)
        })
        param.classIds = id.join()
        param.cjId = this.multipleSelection[0].id
        param.cjfl = this.multipleSelection[0].ksxs
        this.$post('/administration/insert.action',{
          data:param
        }).then(data=>{
          if(data.succsess == 0){
            this.$message({message: data.msg,type: "error"});
            return
          }
          this.roomDialogVisible = false
          this.getPaiList()
        })
      },
      // 自动排监考
      paiTeacher(){
        let id = this.selectedTeacher.map(item=>item.id)
        this.$post('/administration/updateJk.action',{
          data:{
            teacherIds:id.join()
          }
        }).then(data=>{
          if(data.succsess == 0){
            this.$message({message: data.msg,type: "error"});
            return
          }
          this.teacherDialogVisible = false
          this.getPaiList()
        })
      },
      // 更新tableData
      getPaiList(){
        this.$post('/kcapdj/getList.action',{
          loadingEl:this.$refs.tableElement,
          data:{
            dto:{
              // year:this.year
              examDateId:this.examDateId
            }
          }
        }).then(async data=>{
          if(!data.list){
            this.getList()
            // this.getStuSum()
          }else{
            await this.getList()
            // await this.getStuSum()
            data.list.forEach(item=>{
              item.dis = false
              this.tableData.push(item)
            })
          }
        })
      },
      // 查看详情
      CKXQ(scope){
        this.kcxqDialogVisible = true
        let kcId = scope.row.kcId
        console.log(scope.row);
        this.$post("/administration/getList.action", {
          loadingEl:this.$refs.editDialog,
          data:{
            dto:{
              bdbjxxId:kcId
            } 
          }
        }).then(data=>{
          if(data.succsess != 1){
            this.$message({
              message: data.msg,
              type: "error"
            });
            return
          }
          console.log(data);
          this.tableData2 = data.list
        })
      },
      // 设置成绩录入老师
      openScoreTeacher(){
        this.ScoreTeacherDialogVisible = true
      },
      // 保存设置成绩录入老师
      saveScoreTeacher(){
        console.log(this.selectedDialogTeacher);
      },
      // 成绩录入老师树
      getDialogTreeData(){
        this.$post('/teacherInfo/getTTree.action',{
          loadingEl: this.$refs.appTreeRef,
          data:{
            dto:{}
          }
        }).then(data=>{
          if(data.succsess){
            this.teacherTree = data.tree
          }else{
            this.$message({
              message: data.jsonMsg,
              type: "error"
            });
            return
          }
        })
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
      fabu(){
        this.$post('/administration/fb.action',{
          loadingEl:this.$refs.tableElement,
          data:{
            dto:{}
          }
        }).then(data=>{
          if(data.succsess == 1){
            this.$message({message: "发布成功", type: "success"});
            this.getPaiList()
          }else{
            this.$message({message: data.msg, type: "error"});
          }
        })
      },
      getYears(){
        this.$post('/examDate/getList.action',{
          loadingEl: this.$refs.tableElement,
          data:{
            dto:{}
          }
        }).then(data=>{
          if(data.succsess == 1){
            this.optionsYear = []
            data.list.forEach(item=>{
              if(item.dqbj == 1){
                this.examDateId = item.id
                // this.getList()
                this.getPaiList()
                // this.getStuSum()
              }
              this.optionsYear.push(item)
            })
          }else{
            this.$message({message: data.msg, type: "error"});
          }
        })
      },
      handlechange(){
        this.getPaiList()
      },
      openchangeKC(scope){
        this.changeKCDialog = true
        this.getChangeKCTree()
        this.scopeKC = scope
      },
      openchangeJK(scope){
        this.changeJKDialog = true
        this.getChangeJKTree()
        this.scopeJK = scope
      },
      // 获取修改考场树
      getChangeKCTree(){
        this.$post('/administration/getClassForUpdate.action',{
          loadingEl:this.$refs.editDialog,
          data:{
            dto:{}
          }
        }).then(data=>{
          if(data.succsess != 1){
            this.$message({
              message: data.msg,
              type: "error"
            });
          }
          this.changeKCTree = data.array
        })
      },
      // 获取修改监考树
       getChangeJKTree(){
        this.$post('/administration/getTeacherForUpdate.action',{
          loadingEl:this.$refs.editDialog,
          data:{
            dto:{}
          }
        }).then(data=>{
          if(data.succsess != 1){
            this.$message({
              message: data.msg,
              type: "error"
            });
          }
          this.changeJKTree = data.array
        })
      },
      // 考场树点击存储
      handleKCTree(val){
        this.KCInfo = val
      },
      // 监考树点击存储
      handleJKTree(val){
        this.JKInfo = val
      },
      // 保存修改的考场
      saveChangeKC(){
        if(this.KCInfo.children){
          this.$message({message: "请选择一个考场", type: "error"});
          return
        }
        let row = this.scopeKC.row
        let kc = this.KCInfo
        this.$post('/kcapdj/update.action',{
          loadingEl:this.$refs.editDialog,
          data:{
            dto:{
              id:row.id,
              kc:kc.label,
              kcId:kc.id
            }
          }
        }).then(data=>{
          if(data.succsess == 1){
            this.$message({message: "修改成功", type: "success"});
            this.changeKCDialog = false
            this.getPaiList()
          }else{
            this.$message({message: "修改失败", type: "error"});
          }
        })
      },
      // 保存修改的监考
      saveChangeJK(){
        if(this.JKInfo.children){
          this.$message({message: "请选择一个监考", type: "error"});
          return
        }
        let row = this.scopeJK.row
        let jk = this.JKInfo
        let dto = {}
        dto[this.scopeJK.column.property] = jk.label
        dto.id = row.id
        // 拼监考id
        let str = this.scopeJK.column.property
        let start = str.slice(0,4)
        let end = str.slice(str.length-1)
        let newStr = start + end
        dto[newStr] = jk.id

        this.$post('/kcapdj/update.action',{
          loadingEl:this.$refs.editDialog,
          data:{
            dto:dto
          }
        }).then(data=>{
          if(data.succsess == 1){
            this.$message({message: "修改成功", type: "success"});
            this.changeJKDialog = false
            this.getPaiList()
          }else{
            this.$message({message: "修改失败", type: "error"});
          }
        })
      },
      // getStuSum(){
      //   this.$post('/studentsRegister/getStudentCnt.action',{
      //     data:{
      //       dto:{
      //         examDateId:this.examDateId
      //       }
      //     }
      //   }).then(data=>{
          
      //   })
      // },
      load(){
        this.getClassTree()
        this.getTeacherTree()
        this.getYears()
      }
		},
		mounted(){
      this.load()
      this.getBtns()
    }
	}
</script>
<style>
  .page-SetTest{
    position: relative;
  }
  .page-SetTest .kmxqDialog {
    height: 80% !important;
    background: pink;
    width: 90%;
  }
  .page-SetTest .elSel{
    width: 20%;
    margin: 0 10px 0 0;
  }
  .page-SetTest .el-link {
    color: #898989;
  }
  .page-SetTest .el-dialog .kmxqDialog{
    overflow: hidden;
  }
  .page-SetTest .kmxqDialog .el-table__body-wrapper{
    height: 94%;
    overflow:scroll;
  }
</style>