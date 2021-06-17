<template>
  <!-- 特色专业招生计划 -->
  <div class="page-AdmissionPlan1">
    <div class="page-container">
      <!-- 操作框 -->
      <div class="page-operation-box clearfix">
        <div class="pull-left">
          <!-- 查询条件 -->
          <div class="cascade-select">
            <el-form :inline="true" class="demo-form-inline">
              <el-form-item label="年份:">
                <el-select v-model="year" placeholder="请选择" @change="handlechange">
                  <el-option
                    v-for="item in options"
                    :key="item.rxnf"
                    :label="item.rxnf"
                    :value="item.rxnf">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="省份:">
                <el-input
                  placeholder="请选择省份"
                  v-model="showStr"
                  class="input-with-select topInput"
                  :readonly="true">
                  <el-button slot="append" @click="openDialog()">选择</el-button>
                </el-input>
              </el-form-item>
            </el-form>
          </div>
          <el-button type="primary" v-show="one" @click="scbjb()">生成编辑表</el-button>
          <el-button type="primary" @click="backEdit()" v-show="four">返回</el-button>
          <el-button type="primary" @click="backSelect()" v-show="two">修改所选专业</el-button>
        </div>
        <div class="pull-right">
          <!-- <el-input
            placeholder="请选择省份"
            v-model="checkedCities[0]"
            class="input-with-select"
            :readonly="true">
            <el-button slot="append" @click="openDialog()">选择</el-button>
          </el-input> -->
          <el-button type="primary" @click="generate()" v-show="two">生成计划表</el-button>
          <el-button type="primary" @click="saveInfo()" v-show="four">保存信息</el-button>
        </div>
      </div>
      <!-- 选专业组件 -->
      <div class="app-page-box-table big-height" v-show="one">
        <el-table
          border
          stripe
          tooltip-effect="dark"
          ref="tableElement"
          :data="tableData0"
          height="100%"
          highlight-current-row>
          <el-table-column label="序号" align="center" type="index" width="50"></el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="label"
            label="专业"
            align="center"
            min-width="120">
            <template align="left" slot-scope="scope">{{ scope.row.label }}</template>
          </el-table-column>
          <el-table-column
            v-for="(item,index) in zytype"
            :key="index"
            show-overflow-tooltip
            align="center"
            min-width="200">
            <template slot="header">
              <el-checkbox
              v-model="selectAllValue[item.dmmc]"
              @change="selectAll(item)"
              >{{item.dmmc}}</el-checkbox>
            </template>
            <template slot-scope="scope">
              <el-checkbox  v-model="scope.row.lx[index].ischecked"></el-checkbox>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 编辑计划表列表组件 -->
      <div class="app-page-box-table big-height" v-show="two">
        <el-table
          :cell-class-name="getBg"
          @cell-click="setBg"
          border
          stripe
          tooltip-effect="dark"
          ref="tableElement"
          :data="tableData"  
          height="100%"
          highlight-current-row
          >
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
            fixed
            show-overflow-tooltip
            prop="zs"
            label="总数"
            align="center"
            min-width="100">
            <template slot-scope="scope">
              <el-input v-model="scope.row.zs" placeholder="总数" @blur="isNum(scope.row.zs);calcZS()"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            fixed
            show-overflow-tooltip
            prop="syrs"
            label="剩余人数"
            align="center"
            min-width="100">
            <template slot-scope="scope">{{scope.row.syrs}}</template>
          </el-table-column>
          <el-table-column
            v-for="(item,index) in selectMajorArr"
            :key="index"
            show-overflow-tooltip
            :label="item.label"
            align="center"
            :render-header="renderHeader"
            min-width="200">
            <template slot-scope="scope">
              <el-row>
                <el-row>
                  <el-col :span="24">
                    <el-input size='mini' v-model="scope.row[item.label].zyzs" placeholder="专业人数" @blur="isNum(scope.row[item.label].zyzs);inputCalc()">
                    </el-input>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col style="position: relative;" :span="24">
                    <el-input size='mini' v-model="scope.row[item.label].nszs" @blur="blurNSZS(scope);isNum(scope.row[item.label].nszs)"></el-input>
                    <span class="percentage">(女)</span>
                  </el-col>
                </el-row>
              </el-row> 
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 保存以后最后的表（用来显示） -->
      <div class="app-page-box-table big-height" v-show="four">
        <el-table
          :cell-class-name="getBg"
          @cell-click="setBg"
          border
          stripe
          tooltip-effect="dark"
          ref="tableElement"
          :data="tableData2"
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
            prop="syrs"
            label="剩余人数"
            align="center"
            min-width="100">
            <template slot-scope="scope">{{scope.row.syrs}}</template>
          </el-table-column>
          <el-table-column
            v-for="(item,index) in selectMajorArr"
            :key="index"
            show-overflow-tooltip
            :label="item.label"
            align="center"
            min-width="120"
            :render-header="renderHeader">
            <template slot-scope="scope">
              <span>
                {{scope.row[item.label].zyzs}}
                <br>
                <span v-if="scope.row[item.label].nszb != ''">{{scope.row[item.label].nszs}}(女)</span>
              </span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-dialog
        ref="editDialog"
        class="edit-dialog"
        width="30%"
        append-to-body
        title="选择省市"
        @close="editDialogVisible=false"
        :visible.sync="editDialogVisible">
          <!-- 省份 -->
          <el-form :inline="true" class="demo-form-inline">
            <el-form-item label="省份:">
              <el-select v-model="radioSF" placeholder="请选择" @change="getCity()" style="width: 100%">
                <el-option
                  v-for="item in sfInfo"
                  :key="item.dmbh"
                  :label="item.dmmc"
                  :value="item.dmbh">
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <!-- 城市 -->
          <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange" v-if="citys.length!=0" style="margin-top: 25px">全选</el-checkbox>
          <div style="margin: 15px 0;"></div>
          <el-checkbox-group v-model="checkedCities">
            <el-checkbox v-for="(item,index) in citys" :key=index :label="item.value">{{item.label}}</el-checkbox>
          </el-checkbox-group>

          <span slot="footer" class="dialog-footer">
          <el-button
            ref="btnEditFormSave"
            type="primary"
            size="medium"
            class="app-dialog-btn app-confirm" @click="saveSelectCitys()">确认</el-button>
          <el-button
            size="medium"
            class="app-dialog-btn app-close"
            @click="editDialogVisible=false">关闭</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
  export default {
    name:"AdmissionPlan1",
    data(){
      return {
        tableData:[],
        tableData2:[],
        toRead:false,
        label:'',
        major:[],
        zytype:[],
        citys:[],
        // 下拉框选的专业名组成的数组
        selectMajor:[],
        // 循环匹配表格用的数组对象
        selectMajorArr:[],
        tableData0:[],
        one:true,
        two:false,
        three:false,
        four:false,
        rowdqId:'',
        selectAllValue:{},
        sfInfo:[],
        radioSF:'',
        isIndeterminate: true,
        checkAll: false,
        checkedCities: [],
        options:[],
        year:'',
        zyInfo:[],
        editDialogVisible:false,
        show:[],
        showStr:''
      }
    },
    methods:{
      isNum(num){
        if(num != ''){
          if(parseInt(num) != num){
            // alert('非法输入，请重新填写') 
            this.$message({message: "非法输入，请重新填写", type: "error"});
          }
        }
        
      },
      calcZS(){
        let num = 0
        this.tableData = JSON.parse(JSON.stringify(this.tableData))
        this.tableData.forEach(e => {
          e.zs = isNaN(parseInt(e.zs)) ? 0 : parseInt(e.zs)
          num += e.zs
        })
        if(num - this.tableData[0].zs > this.tableData[0].zs){
          // alert('设定人数条件不符合，请检查并重新填写')
          this.$message({message: "设定人数条件不符合，请检查并重新填写", type: "error"});
        }
      },
      // 获取城市列表
      getCity(){
        this.citys = []
        let str = this.radioSF.slice(0,2)
        this.$post('/STCode/getList.action',{
          data:{
            flag:str
          }
        }).then(data=>{
          if(data.list){
            data.list.map(e=>{
              this.citys.push({label:e.dmmc,value:e.id})
            })
          }
        })
        // this.editDialogVisibleSF = false
      },
      openCityDialog(){
        if(this.citys.length == 0){
          this.$message({message: "请先选择省份", type: "error"});
          return
        }
        // this.editDialogVisibleSQ = true
      },
      handlechange(){
        this.getMajor()
      },
      // 获取专业列表
      async getMajor(){
        await this.$post('/rsBdzyxxnd/getList.action',{
          loadingEl:'all',
          data:{
            // nf:'2019'
            nf:this.year
          }
        }).then(data=>{
          data.list.forEach(item=>{
            this.major.push({label:item.xnzymc,value:item.bdzyxxndId})
          })
        })
        this.setTableData0()
      },
      // 获取专业类型
      async getZYtype(){
        await this.$post('/STCode/getList.action',{
          data:{
            dmbt:'ZSXK',
            sfsyzjd:1
          }
        }).then(data=>{
          if(data.succsess){
            this.zytype = data.list
          }
        })
      },
      // 生成选专业的表格
      setTableData0(){
        this.tableData0 = this.major
        this.tableData0.forEach(item=>{
          item.lx = this.zytype.map(val=>{
            val.ischecked = false
            return val
          })
        })
        this.tableData0 = JSON.parse(JSON.stringify(this.tableData0))
      },
      // 生成编辑表
      scbjb(){
        this.one = false
        this.two = true 
        this.four = false
        this.selectMajorArr=[]
        // 生成带已选专业列
        this.zyInfo = []
        this.tableData0.forEach(zy=>{
          zy.lx.forEach(zylx=>{
            if(zylx.ischecked == true){
              this.selectMajorArr.push({
                id:zy.value + '&' + zylx.id,
                label:zy.label + '&' + zylx.dmmc ,
                major:{label:zy.label,value:zy.value},
                type:zylx,
                zyId:zy.value
              })
              this.zyInfo.push(zy.value)
            }
          })
        })
        this.selectMajorArr.forEach(item=>{
          this.tableData.forEach(v=>{
            v[item.label] = {
              zyzs : v[item.label] && v[item.label].zyzs ? v[item.label].zyzs :'',
              nszs : v[item.label] && v[item.label].nszs ? v[item.label].nszs :'',
              name:item.label,
              zyId:item.zyId,
            }
          })
        })
        let data = JSON.parse(JSON.stringify(this.tableData))
        this.$set(this,'tableData',data)
        console.log(this.tableData);
      },
      // 切换查看模式
      generate(){
        // this.handleInputBlur()
        let sfcg = 0
        this.tableData = JSON.parse(JSON.stringify(this.tableData))
        this.tableData.forEach(e => {
          e.zs = isNaN(parseInt(e.zs)) ? 0 : parseInt(e.zs)
          let num = 0
          for (let key in e) {
            if (typeof e[key] == 'object') {
              if (e[key].zyzs != '') {
                num += parseInt(e[key].zyzs)
                if (e[key].nszs == '') {
                  e[key].nszs = 0
                }
              }
              else{
                e[key].zyzs = 0
                e[key].nszs = 0
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
        this.one = false
        this.two = false
        this.four = true
        this.tableData2 = JSON.parse(JSON.stringify(this.tableData))
      },
      inputCalc(){
        let sfcg = 0
        this.tableData = JSON.parse(JSON.stringify(this.tableData))
        this.tableData.forEach(e => {
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
      // 切换编辑模式
      backEdit(){
        this.one = false
        this.two = true
        this.four = false
        // this.tableData = JSON.parse(JSON.stringify(this.tableData2))
      },
      // 返回重新选专业
      backSelect(){
        this.one = true
        this.two = false
        this.four = false
      },
      async load(){
        // await this.getMajor()
        await this.getZYtype()
        // this.setTableData0()
        this.setSelectAllValue()
        await this.getYears()
      },
      getBg({row,column,rowIndex,columnIndex}){
        if(column.label == this.columnLabel || row.dqId == this.rowdqId){
          return 'currentBg'
        }
      },
      setBg( row, column, cell, event){
        this.rowdqId = row.dqId
        this.columnLabel = column.label
        // if(this.tableData2[0]){
        //   this.tableData2[0].changeColor = !this.tableData2[0].changeColor
        //   this.tableData2 = JSON.parse(JSON.stringify(this.tableData2))
        // }
        ///////////////////////////////////////////////
        if(this.tableData[0]){
          this.tableData[0].changeColor = !this.tableData[0].changeColor
          this.tableData = JSON.parse(JSON.stringify(this.tableData))
        }
      },
      renderHeader(h, { column, $index }) {
        let index = column.label.indexOf('&')
        let before = column.label.slice(0,index)
        let after = column.label.slice(index+1,column.label.length)
        after = '（' + after + '）'
        return h(
          "span",[
            h("span",[before]),
            h("br"),
            h("span", [after])
          ]
        );
      },
      saveInfo(){
        let dataD = []
        let ids = this.zyInfo.join()
        this.tableData2.forEach((item,i)=>{
          item.index = i
          dataD.push(JSON.stringify(item))
        })
        console.log(dataD);
        this.$post('/rpr1/insert.action',{
          data:{
            info:dataD,
            year:this.year,
            type:1,
            info1:ids
          }
        }).then(data=>{
          if(data.succsess){
            this.one = false
            this.two = false
            this.three = false
            this.four = true
            this.$message({message:"保存成功",type:'success'})
          }else{
            this.$message({message:data.jsonMsg,type:'error'})
          }
        })
      },
      // 设置列全选
      selectAll(a){
        this.tableData0.forEach(item=>{
          item.lx.forEach(val=>{
            if(val.dmmc == a.dmmc){
              val.ischecked = this.selectAllValue[val.dmmc]
            }
          })
        })
      },
      // 列全选表头v-model绑定过的值
      setSelectAllValue(){
        this.zytype.forEach(item=>{
          this.selectAllValue[item.dmmc] = false
        }) 
      },
      // 获取省份
      getProvice(){
        this.editDialogVisibleSF=true;
        this.$post('/STCode/getList.action',{
          loadingEl:'all',
          data:{
            flag:0
          }
        }).then(data=>{
          if(data.succsess){
           this.sfInfo = data.list
          }
        })
      },
      handleCheckAllChange(val) {
        let value = this.citys.map(d=>d.value)
        this.checkedCities = val ? value : [];
        this.isIndeterminate = false;
      },
      async saveSelectCitys(){
        this.tableData = []
        let data = []
        this.citys.forEach(item=>{
          this.checkedCities.forEach(val=>{
            if(item.value == val){
              data.push({dq:item.label,dqId:item.value})
              this.show.push(item.label)
            }
          })
        })
        this.showStr = this.show.join()
        let newData =  JSON.parse(JSON.stringify(data))
        this.$set(this,'tableData',newData)
        this.editDialogVisible = false
      },
      blurNSZS(scope){
        let row = scope.row
        for (let key in row) {
          if (typeof row[key] == 'object') {
            if(Number(row[key].nszs) > Number(row[key].zyzs)){
              this.$message({message: "女生人数不得超过专业总数", type: "error"});
              row[key].nszs = 0
              return
            }
          
          }
        }
      },
      // 获取专业的年份
      async getYears(){
        await this.$post('/bdrxnf/getList.action',{
          loadingEl:'all',
          data:{}
        }).then(data=>{
          if(data.succsess){
            this.options = data.list
          }
        })
      },
      openDialog(){
        this.getProvice()
        this.editDialogVisible = true
      },
      exportInfo(){}
    },
    mounted(){
      this.load()
      this.selectMajor = []
    }
  }
</script>
<style>
  .page-AdmissionPlan1{
    position: relative;
    text-align: left;
  }
  .selectMajor{
    margin-right: 20px;
  }
  .percentage{
    display: inline-block;
    height: 32px;
    line-height: 32px;
    position: absolute;
    right: 10px;
  }
  .dbheight table tbody tr{
    height: 50px;
  }
  .currentBg{
    background: #cee4fc !important;
  }
  .radio{
    margin: 5px;
  }
  .page-AdmissionPlan1 .cascade-select .el-form-item__label{
    width: 50px;
  }
  /*.page-AdmissionPlan1  .topInput{
    position: absolute;
    left: 0;
    width: 220px;
  }*/
</style>