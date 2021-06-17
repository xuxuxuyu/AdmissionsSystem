<!-- 报名审批 -->
<template>
	<div class="page-Approval">
		<div class="page-container">
			<!-- 操作框 -->
			<div class="page-operation-box clearfix">
				<div class="pull-left">
          <!-- 查询条件 -->
          <div class="cascade-select">
            <el-form :inline="true" class="demo-form-inline">
              <el-form-item label="招生计划:">
                <el-select v-model="year" placeholder="请选择" @change="handlechange" clearable>
                  <el-option
                    v-for="item in optionsYear"
                    :key="item.year"
                    :label="item.name"
                    :value="item.year">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-form>
          </div>
	        <el-button type="primary" @click="toApproval()">审核通过</el-button>
          <el-button type="primary" @click="changeJFZT()">缴费</el-button>
          <el-button type="primary" @click="toExport()">导出学生信息</el-button>
          <!-- <el-upload
            name="licFile"
            class="el-button upload"
            accept=".xlsx"
            :show-file-list="false"
            ref="upload"
            icon="icon iconfont icondaoru"
            :action='uploadStuInfoUrl'
            :auto-upload="true">
            <el-button slot="trigger"icon="icon" type="primary">导入学生信息</el-button>
          </el-upload> -->
          <!-- <el-upload
            name="licFile"
            class="el-button upload"
            accept=".xlsx"
            :show-file-list="false"
            ref="upload"
            icon="icon iconfont icondaoru"
            :action='uploadJFZTUrl'
            :auto-upload="true">
            <el-button slot="trigger"icon="icon" type="primary">导入缴费状态</el-button>
          </el-upload> -->
          <a href="#" class="file" style="margin-left: 10px">{{stuInfo}}
            <input id="importStu" name="请选择缴费" type="file" @change="importStu()">
          </a>

          <a href="#" class="file">{{jfztInfo}}
            <input id="importJFZT" name="请选择缴费" type="file" @change="importJFZT()">
          </a>
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
          <el-table-column label="序号" align="center" type="index" width="50"></el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="ksh"
            label="考生号"
            align="center"
            :render-header="renderHeader"
            min-width="180">
            <template slot-scope="scope">{{ scope.row.ksh }}</template>
          </el-table-column>  
          <el-table-column
            show-overflow-tooltip
            prop="xm"
            label="姓名"
            align="center"
            :render-header="renderHeader"
            min-width="120">
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
            prop="zjhm"
            label="身份证号码"
            align="center"
            :render-header="renderHeader"
            min-width="180">
            <template slot-scope="scope">{{ scope.row.zjhm }}</template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="approval"
            label="审核状态"
            align="center"
            :render-header="renderHeader"
            min-width="100">
            <template slot-scope="scope">
              <span v-if="scope.row.approval=='0'">未审核</span>
              <span v-if="scope.row.approval=='1'">审核通过</span>
            </template>
          </el-table-column> 
          <el-table-column
            show-overflow-tooltip
            prop="jfzt"
            label="缴费状态"
            align="center"
            :render-header="renderHeader"
            min-width="100">
            <template slot-scope="scope">
              <span v-if="scope.row.jfzt != '1'">未缴费</span>
              <span v-if="scope.row.jfzt == '1'">已缴费</span>
            </template>
          </el-table-column> 
          <el-table-column
            v-for="num in 3"
            :key=num
            show-overflow-tooltip
            :prop="'bkzyzy'+num"
            :label="'报考志愿'+num"
            align="center"
            :render-header="renderHeader"
            min-width="180">
            <template slot-scope="scope">{{ scope.row['bkzyzy' + num] }}</template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="nl"
            label="年龄"
            align="center"
            :render-header="renderHeader"
            min-width="100">
            <template slot-scope="scope">{{ scope.row.nl }}</template>
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
            prop="csrq"
            label="出生日期"
            align="center"
            :render-header="renderHeader"
            min-width="100">
            <template slot-scope="scope">{{ scope.row.csrq }}</template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="lxfs1"
            label="联系方式1"
            align="center"
            :render-header="renderHeader"
            min-width="120">
            <template slot-scope="scope">{{ scope.row.lxfs1 }}</template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="lxfs2"
            label="联系方式2"
            align="center"
            :render-header="renderHeader"
            min-width="100">
            <template slot-scope="scope">{{ scope.row.lxfs2 }}</template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="xxdz"
            label="详细地址"
            align="center"
            :render-header="renderHeader"
            min-width="100">
            <template slot-scope="scope">{{ scope.row.xxdz }}</template>
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
	import table from "@/mixin/table.vue";
	export default {
		name:'Approval',
    computed: {
      USER_INFO() {
        return this.$store.getters.USER_INFO
      }
    },
		mixins: [table],
		data(){
			return {
				tableData:[],
				requestSuffix:{
          // select:'/studentsRegister/getListNoParam.action'
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
        ids:[],
        btn:{},
        optionsYear:[],
        year:'',
        searchData:{
          ksh:'',
          xm:'',
          xb:'',
          zjhm:'',
          approval:'',
          jfzt:'',
          bkzyzy1:'',
          bkzyzy2: '',
          bkzyzy3: '',
          mz:'',
          zzmm:'',
          csrq:'',
        },
        stuInfo:'导入学生信息',
        jfztInfo:'导入缴费信息'
			}
		},
		methods:{
      // 搜索
      search() {
        this.currentPage = 1;
        // this.getList();
      },
      // 审核
      toApproval(){
        this.ids = []
        this.ids = this.multipleSelection.map(d => d['id'])
        this.$post('/studentsRegister/approval.action',{
          data:{
            dto:{
              id:this.ids.join()
            }
          }
        }).then(data=>{
          if(data.succsess == 1){
            this.$message({
              message: "审核成功",
              type: "success"
            });
            this.getList()
          }else{
            this.$message({
              message: data.msg,
              type: "error"
            });
          }
        })
      },
      // 设置缴费
      changeJFZT(){
        let ksh = []
        ksh = this.multipleSelection.map(d => d['ksh'])
        this.$post("/studentsRegister/jf.action", {
          data: {
           dto:{ids:ksh.join()} 
          }
        }).then(data=>{
          if(data.succsess == 1){
            this.$message({
              message: data.msg,
              type: "success"
            });
            this.getList()
          }else{
            this.$message({
              message: data.msg,
              type: "error"
            });
          }  
        })
      },
      getList(){
        this.$post('/studentsRegister/getList.action',{
          loadingEl:this.$refs.tableElement,
          data:{
            dto:{year:this.year}
          }
        }).then(data=>{
          console.log(data.succsess);
          if(data.succsess == 1){
            this.calcNL(data.dtoList)
          }else{
            this.tableData = []
          }
        })
      },
      calcNL(data){
        console.log(1111);
        // data.forEach(item=>{
        //   item.nl = this.year - item.zjhm.slice(6,10)
        // })
        this.tableData = data
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
      // 导出
      toExport(){
        this.$post('/studentsRegister/dataExport.action',{
          loadingEl:this.$refs.tableElement,
          data:{
            dto:{}
          }
        }).then(data=>{
          this.handelFile(data)
        })
      },
      handelFile(str){
        let file = "data:applicationvnd.openxmlformats-officedocument.spreadsheetml.sheet;base64," + str;
        let blob = this.dataURLtoBlob(file);
        let reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onload = e => {
          let a = document.createElement("a");
          if(this.year == ''){
            a.download = "报名信息.xls";
          }else{
            a.download = this.year+"年报名信息.xls";
          }
          a.href = e.target.result;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        };
      },
      dataURLtoBlob(dataurl) {
        var arr = dataurl.split(",")
        let mime = arr[0].match(/:(.*?);/)[1]
        let bstr = atob(arr[1])
        let n = bstr.length
        let u8arr = new Uint8Array(n);
        while (n--) {
          u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], {
          type: mime
         });
      },
      // 导入学生信息
      importStu(){
        const importStu = document.getElementById('importStu')
        this.stuInfo = importStu.files[0].name
        var reader = new FileReader()
        reader.readAsDataURL(importStu.files[0])
        var dataURL = ''
        var that = this
        reader.onload = function(ev) { //文件读取成功完成时触发
          dataURL = ev.target.result; 
          that.importStuData(dataURL)
        }
      },
      importJFZT(){
        const importJFZT = document.getElementById('importJFZT')
        this.jfztInfo = importJFZT.files[0].name
        var reader = new FileReader()
        reader.readAsDataURL(importJFZT.files[0])
        var dataURL = ''
        var that = this
        reader.onload = function(ev) { //文件读取成功完成时触发
          dataURL = ev.target.result; 
          that.importJFZTData(dataURL)
        }
      },
      importStuData(str){
        this.$post('/studentsRegister/dataImport.action',{
          loadingEl:this.$refs.tableElement,
          data:{
            dto:{
              buffer:str
            }
          }
        }).then(data=>{
          this.getList()
        })
      },
      importJFZTData(str){
        this.$post('/studentsRegister/jfImport.action',{
          loadingEl:this.$refs.tableElement,
          data:{
            dto:{
              buffer:str
            }
          }
        }).then(data=>{
          this.getList()
        })
      },
      getYears(){
        this.$post('/examDate/getList.action',{
          loadingEl: this.$refs.tableElement,
          data:{
            dto:{}
          }
        }).then(data=>{
          // if(data.succsess == 1){
          //   this.optionsYear = data.list
          // }else{
          //   this.$message({message: data.msg, type: "error"});
          // }
          if(data.succsess == 1){
            this.optionsYear = []
            data.list.forEach(item=>{
              if(item.dqbj == 1){
                this.year = item.year
                this.getList()
              }
              this.optionsYear.push(item)
            })
          }else{
            this.$message({message: data.msg, type: "error"});
          }
        })
      },
      handlechange(){
        this.getList()
      },
      // 模糊查询
      renderHeader(
        h, {
          column,
          store: {
            states,
            table
          }
        }
        ) {
        return h(
          "span", 
          [
          column.label,
          h("br", {
              }),
          h(
            "input", {
              on: {
                keydown: (e) => this.columnSearch(e, column),
                blur:(e)=> this.handleDto(e,column)
              },
              class: {
                "column-search": true
              },
              style: {
                // width: column.minWidth ? column.minWidth - 30 + 'px' : column.width - 30 + 'px',
                width:"90%",
                height:'18px',
                fontSize:'10px',
                textIndent:'10px',
                color:"#898989"
              }
            }
          )
          ]
          );
      },
      columnSearch(e, column) {
        if (event.keyCode == 13) {
          this.searchData[column.property] = e.target.value
          this.searchData.year = this.year
          this.$post('/studentsRegister/getList.action',{
            loadingEl:this.$refs.tableElement,
            data:{
              dto:this.searchData
            }
          }).then(data=>{
            this.calcNL(data.dtoList)
          })
        }
        
      },
      handleDto(e, column){
        // console.log(column);
        // console.log(this.searchData);
        // console.log(this.searchData[column.property]);
        this.searchData[column.property] = e.target.value
        this.searchData.year = this.year
      }
    },
    mounted(){
      this.getBtns()
      // this.getList()
      this.getYears()
    }
	}
</script>
<style>
  .page-Approval{
    position: relative;
  }
  .page-Approval .upload{
    padding: 0;
    border: none;
    background:#fff !important;
  }
  .page-Approval .file {
    width: 110px;
    height: 32px;
    position: relative;
    top: 12px;
    display: inline-block;
    background: #2aa1ef;
    border: 1px solid #2aa1ef;
    border-radius: 3px;
    padding: 4px 12px;
    overflow: hidden;
    color: #fff;
    text-decoration: none;
    text-indent: 0;
    line-height: 20px;
    font-size: 12px;
    margin-right: 10px;
    white-space: nowrap;
    text-overflow:ellipsis;
  }
  .page-Approval .file input {
    position: absolute;
    right: 0;
    top: 0;
    opacity: 0;
    width: 100%;
    height: 100%;
    line-height: 32px;
    overflow:hidden;
    white-space: nowrap;
    text-overflow:ellipsis;
  }
  .page-Approval .file:hover {
    color: #fff !important;
    /*background: #a0cfff !important;*/
    border-color: #a0cfff !important;
  }
</style>