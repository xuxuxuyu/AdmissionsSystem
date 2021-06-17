<template>
	<!-- 生成招生计划 -->
	<div class="page-AdmissionPlanp">
  	<div class="page-container">
			<!-- 操作框 -->
			<div class="page-operation-box clearfix">
				<div class="pull-left">
	        <el-button
	        	type="primary"
	        	icon="icon iconfont iconshanchu"
	        	:disabled="deleteBatchBtnDisabled"
	        	@click="del()">删除
	        </el-button>
	        <el-button
	        	type="primary"
	        	@click="back()"
            v-show="list || write">返回
	        </el-button>
	        <el-button
	        	type="primary"
	        	v-show="list && !write"
	        	@click="toWrite()">编辑
	        </el-button>
	        <el-button
	        	type="primary"
	        	v-show="list && !write">导出
	        </el-button>
	        <el-button
	        	type="primary"
	        	v-show="!list && write"
	        	@click="saveInfo()">保存
	        </el-button>
				</div>
			</div>
			<!-- 列表 -->
			<div class="app-page-box-table big-height" v-show="!list && !write">
				<el-table
	  			border
	  			stripe
	  			tooltip-effect="dark"
	  			ref="tableElement"
	  			:data="tableData"
	  			height="100%"
	  			highlight-current-row
	  			:cell-class-name="getBg"
	  			@cell-click="setBg"
	  			@sort-change="handleSortChange"
	  			@selection-change="handleSelectionChange"
	  			@row-dblclick="doubleClickTableRow">
        	<el-table-column align="center" type="selection" width="40"></el-table-column>
        	<el-table-column label="序号" align="center" type="index" width="50"></el-table-column>
        	<el-table-column
            show-overflow-tooltip
            prop="year"
            label="年份"
            align="center"
            min-width="80">
            <template slot-scope="scope">{{scope.row.year}}</template>
       		</el-table-column>
	        <el-table-column
            show-overflow-tooltip
            prop="title"
            label="招生计划"
            align="center"
            min-width="80">
            <template slot-scope="scope">
            	<el-button type="primary" @click="getZSList(scope.row.year)">{{scope.row.year}}年招生计划</el-button>
            </template>
	        </el-table-column>
        </el-table>
			</div>
	    <!-- 展示招生专业页面 -->
	    <div class="app-page-box-table big-height" v-show="list && !write">
        <el-table
          :cell-class-name="getBg"
          @cell-click="setBg"
          border
          stripe
          tooltip-effect="dark"
          ref="tableElement2"
          :data="tableData2"
          height="100%"
          highlight-current-row
          class="dbheight">
          <el-table-column label="序号" fixed align="center"  type="index" width="50"></el-table-column>
          <el-table-column
            fixed
            show-overflow-tooltip
            prop="dq"
            label="地区"
            align="center"
            min-width="120">
            <template align="left" slot-scope="scope">{{ scope.row.dq }}</template>
          </el-table-column>
          <el-table-column
            fixed
            show-overflow-tooltip
            prop="zs"
            label="总数"
            align="center"
            min-width="100">
            <template slot-scope="scope">{{scope.row.zs}}</template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            fixed
            prop="syrs"
            label="剩余人数"
            align="center"
            min-width="100">
            <template slot-scope="scope">{{scope.row.syrs}}</template>
          </el-table-column>
          <el-table-column
            v-for="(item,index) in selectMajor"
            show-overflow-tooltip
            :label="item"
            align="center"
            min-width="120">
            <template slot-scope="scope">
              <span>
                {{scope.row[item].zyzs}}
                <br>
                <span v-if="scope.row[item].nszb != '' && scope.row[item].nszs !=0">{{scope.row[item].nszs}}(女)</span>
              </span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 编辑招生专业页面 -->
      <div class="app-page-box-table big-height" v-show="write && !list">
        <el-table
          :cell-class-name="getBg"
          @cell-click="setBg"
          border
          stripe
          tooltip-effect="dark"
          ref="tableElement3"
          :data="tableData3"
          height="100%"
          highlight-current-row
          class="dbheight">
          <el-table-column fixed label="序号" align="center" type="index" width="50"></el-table-column>
          <el-table-column
            fixed
            show-overflow-tooltip
            prop="dq"
            label="地区"
            align="center"
            min-width="120">
            <template align="left" slot-scope="scope">{{ scope.row.dq }}</template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            fixed
            prop="zs"
            label="总数"
            align="center"
            min-width="100">
            <template slot-scope="scope">{{scope.row.zs}}</template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="syrs"
            fixed
            label="剩余人数"
            align="center"
            min-width="100">
            <template slot-scope="scope">{{scope.row.syrs}}</template>
          </el-table-column>
          <el-table-column
            v-for="(item,index) in selectMajor"
            show-overflow-tooltip
            :label="item"
            align="center"
            min-width="120">
            <template slot-scope="scope">
              <el-row>
                <el-row>
                  <el-col :span="24">
                    <el-input size='mini' v-model="scope.row[item].zyzs" @blur="isNum(scope.row[item].zyzs);inputCalc()" @change="numChangeZy(scope,item,scope.row[item].zyzs)"></el-input>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col style="position: relative;" :span="24">
                    <!-- v-if="scope.row[item].nszb != ''" -->
                    <el-input size='mini' v-model="scope.row[item].nszs" @blur="blurNSZS(scope);isNum(scope.row[item].nszs)"
                    @change="numChangeNs(scope,item,scope.row[item].nszs)"></el-input>
                    <span class="percentage">(女)</span>
                  </el-col>
                </el-row>
              </el-row> 
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!--分页-->
      <div class="page-pagination">
        <div class="page-show-disable">
          <el-checkbox v-model="showColumnDisable">显示全部数据</el-checkbox>
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
	export default {
    mixins: [table],
		name:"AdmissionPlanp",
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
				columnLabel:'',
        tableData:[],
        editDialogVisible:false,
        editForm:{
        	year:'',
        	title:'',
        },
        editFormRules:{},
        list:false,
        tableData2:[],
        tableData3:[],
        selectMajor:[],
        write:false,
        year:''
			}
		},
		methods:{
      numChangeZy(scope,item,num){
        let current = Number(num)
        scope.row[item].zyzs = current
      },
      numChangeNs(scope,item,num){
        let current = Number(num)
        scope.row[item].nszs = current
      },
      blurNSZS(scope){
        let row = scope.row
        for (let key in row) {
          if (typeof row[key] == 'object') {
            if(Number(row[key].nszs) > Number(row[key].zyzs)){
              this.$message({message: "女生人数不得超过专业总数", type: "error"});
              return
            }
          
          }
        }
      },
      isNum(num){
        if(num != ''){
          if(parseInt(num) != num){
            // alert('非法输入，请重新填写') 
            this.$message({message: "非法输入，请重新填写", type: "error"});
            return
          }
        }
      },
      inputCalc(){
        console.log(1111);
        console.log(this.tableData3);
        let sfcg = 0
        this.tableData3 = JSON.parse(JSON.stringify(this.tableData3))
        this.tableData3.forEach(e => {
          e.zs = isNaN(parseInt(e.zs)) ? 0 : parseInt(e.zs)
          let num = 0
          for (let key in e) {
            if (typeof e[key] == 'object') {
              if (e[key].zyzs != '') {
                num += parseInt(e[key].zyzs)
              }
            }
          }
          e.syrs = e.zs - num
          sfcg = e.syrs < sfcg ? e.syrs : sfcg
        })
        if(sfcg < 0){
          // alert('设定人数条件不符合，请检查并重新填写') 
          this.$message({message: "设定人数条件不符合，请检查并重新填写", type: "error"});
          return
        }
      },
			getList(){
        this.$post('/rpr1/getYears.action',{
          data:{
            // year:2019,
            type:1
          }
        }).then(data=>{
          this.tableData = data.list
          this.$nextTick(()=>{
            this.$refs.tableElement.doLayout()
          })
        })
      },
      //保存新增信息
      async saveForm(){
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
      getBg({row,column,rowIndex,columnIndex}){
		    if(column.label == this.columnLabel){
					return 'currentBg'
		    }
      },
      setBg( row, column, cell, event){
      	this.columnLabel = column.label
      },
      getZSList(year){
        this.list = true
        this.write = false
        this.year = year
        this.getTableData2()
      },
      toWrite(){
        this.tableData3 = JSON.parse(JSON.stringify(this.tableData2))
      	this.write = true
      	this.list = false
        this.$nextTick(()=>{
          this.$refs.tableElement3.doLayout()
          console.log(111);
        })
      },
      saveInfo(){
        let dataD = []
        this.tableData3.forEach(item=>{
          dataD.push(JSON.stringify(item))
        })
        this.$post('/rpr1/update.action',{
          data:{
            info:dataD,
            year:this.year,
            ids:this.year,
            type:1
          }
        }).then(data=>{
          if(data.succsess){
            this.$message({message:"保存成功",type:'success'})
            this.tableData2 = JSON.parse(JSON.stringify(this.tableData3))
            this.$nextTick(()=>{
              this.$refs.tableElement2.doLayout()
              console.log(111);
            })
            this.write = false
      			this.list = true
          }else{
            this.$message({message:data.jsonMsg,type:'error'})
          }
        })
      },
      getTableData2(){
        this.selectMajor = []
        this.$post('/rpr1/getList.action',{
          data:{
            year:this.year,
            type:1
          }
        }).then(data=>{
          if(data.succsess){
            this.tableData2 = data.list[0].info.sort((a,b)=>{
              return parseInt(a.index) - parseInt(b.index)
            })
            let keys = Object.keys(this.tableData2[0]);
            keys.forEach(item=>{
              if(item.includes('&')){
                this.selectMajor.push(item)
              }
            })
            this.$nextTick(()=>{
              this.$refs.tableElement2.doLayout()
            })
          }
        })
      },
      back(){
      	this.write = false
      	this.list = false
      	this.tableData2 = JSON.parse(JSON.stringify(this.tableData2)) 
      },
      del(){
        if (this.multipleSelection.length <= 0) {
          this.$message({
            showClose: true,
            message: "请先选择一条信息",
            type: "warning"
          });
          return;
        }
        this.$confirm("是否确认删除?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(() => {
            // 删除
            let years = this.multipleSelection.map(d => d['year'])
            this.$post('/rpr1/delete.action',{
              data:{
                year:years.join(),
                type:1
              }
            }).then(data=>{
              if(data.succsess){
                this.$message({
                  message: "删除成功",
                  type: "success"
                });
                this.getList();
              }else{
                this.$message({
                  showClose: true,
                  message: data.jsonMsg,
                  type: "error"
                });
              }
            })
          })
        .catch(() => {
            this.$message({type: "info", message: "已取消删除"});
          });
      },
      async load() {
        // 获取列表
        this.getList();
        // this.getTableData2()
      },
		},
		mounted(){
      this.load()
      
    }
	}
</script>
<style>
	.page-AdmissionPlanp{
    position: relative;
  }
  .currentBg{
  	background: #cee4fc !important;
  }
  /*.dbheight table tbody tr{
    height: 50px;
  }*/
  .percentage{
    display: inline-block;
    height: 32px;
    line-height: 32px;
    position: absolute;
    right: 10px;
  }
</style>