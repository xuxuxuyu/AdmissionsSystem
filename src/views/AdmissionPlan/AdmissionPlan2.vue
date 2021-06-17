<template>
  <!-- 专业招生计划2 -->
  <div class="page-AdmissionPlan2">
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
            </el-form>
          </div>
          <el-button
            type="primary"
            @click="back()"
            v-show="!one">返回
          </el-button>
          <el-button
            type="primary"
            v-show="two && !one && !three"
            @click="saveInfo()">保存查看
          </el-button>
          <el-select
            v-show="!two && one && !three"
            class="select"
            v-model="selectProvince"
            multiple
            collapse-tags
            style="margin-left: 20px;"
            placeholder="请选择省份"
            @change="selColumn()">
            <el-option
              v-for="item in provinceBefore"
              :key="item.value"
              :label="item.label"
              :value="item.label"
              >
            </el-option>
          </el-select>
        </div>
        <div class="pull-right">
          <el-button type="primary" v-show="one && !two && !three" @click="toWrite()">生成编辑表</el-button>
        </div>
      </div>
      <!-- 选专业，省份组件 -->
      <div class="app-page-box-table big-height" v-show="one && !two && !three">
        <el-table
          border
          stripe
          tooltip-effect="dark"
          ref="tableElement"
          :data="tableData1"
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
            label="本科"
            show-overflow-tooltip
            align="center"
            min-width="200">
            <template slot-scope="scope">
              <el-checkbox-group v-model="scope.row.BKIscheckedList">
                <el-checkbox 
                  v-for="(item,index) in zytype" 
                  :label="item.dmmc"
                 >
                </el-checkbox>
              </el-checkbox-group>
            </template>
          </el-table-column>
          <el-table-column
            label="专科"
            show-overflow-tooltip
            align="center"
            min-width="200">
            <template slot-scope="scope">
              <el-checkbox-group v-model="scope.row.ZKIscheckedList">
                <el-checkbox 
                  v-for="(item,index) in zytype" 
                  :label="item.dmmc"
                  >
                </el-checkbox>
              </el-checkbox-group>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 编辑计划表列表组件 -->
      <div class="app-page-box-table big-height" v-show="two && !one && !three">
        <div class="title" v-if="year!=''">{{year}}年度招生计划</div>
        <el-table
          :cell-class-name="changeBg"
          border
          stripe
          tooltip-effect="dark"
          ref="tableElement"
          :data="tableData2"
          height="100%"
          highlight-current-row>
          <el-table-column fixed label="序号" align="center" type="index" width="50"></el-table-column>
          <el-table-column
            fixed
            show-overflow-tooltip
            prop="zy"
            align="center"
            min-width="130">
            <template align="left" slot-scope="scope">{{ scope.row.zy }}</template>
          </el-table-column>
          <el-table-column
            fixed
            show-overflow-tooltip
            prop="kl"
            label="科类"
            align="center"
            min-width="80">
            <template align="left" slot-scope="scope">{{ scope.row.kl }}</template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="zylb"
            label="专业类别"
            align="center"
            min-width="80">
            <template align="left" slot-scope="scope">{{ scope.row.zylb }}</template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="xz"
            label="学制"
            align="center"
            min-width="80">
            <template align="left" slot-scope="scope">{{ scope.row.xz }}</template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="hj"
            label="合计"
            align="center"
            min-width="80">
            <template align="left" slot-scope="scope">{{ scope.row.hj }}</template>
          </el-table-column>
          <el-table-column
            v-for="(item,index) in province"
            show-overflow-tooltip
            :label="item.label"
            align="center"
            min-width="140">
            <template slot-scope="scope">
              <el-input @blur="sum(scope)" v-show="!['共计','普通本科专业合计','高职(专科)专业合计'].includes(scope.row.zy)" v-model="scope.row[item.label].zsrs" placeholder="招生人数"></el-input>
              <span v-show="['共计','普通本科专业合计','高职(专科)专业合计'].includes(scope.row.zy)">{{scope.row[item.label].zsrs}}</span>
            </template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="yl"
            label="预留"
            align="center"
            min-width="120">
            <template align="left" slot-scope="scope">{{ scope.row.yl }}</template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 展示计划表列表组件 -->
      <div class="app-page-box-table big-height" v-show="three && !one && !two">
        <el-table
          :cell-class-name="changeBg"
          border
          stripe
          tooltip-effect="dark"
          ref="tableElement"
          :data="tableData2"
          height="100%"
          highlight-current-row>
          <el-table-column fixed label="序号" align="center" type="index" width="50"></el-table-column>
          <el-table-column
            fixed
            show-overflow-tooltip
            prop="zy"
            align="center"
            min-width="130">
            <template align="left" slot-scope="scope">{{ scope.row.zy }}</template>
          </el-table-column>
          <el-table-column
            fixed
            show-overflow-tooltip
            prop="kl"
            label="科类"
            align="center"
            min-width="80">
            <template align="left" slot-scope="scope">{{ scope.row.kl }}</template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="zylb"
            label="专业类别"
            align="center"
            min-width="80">
            <template align="left" slot-scope="scope">{{ scope.row.zylb }}</template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="xz"
            label="学制"
            align="center"
            min-width="80">
            <template align="left" slot-scope="scope">{{ scope.row.xz }}</template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="hj"
            label="合计"
            align="center"
            min-width="80">
            <template align="left" slot-scope="scope">{{ scope.row.hj }}</template>
          </el-table-column>
          <el-table-column
            v-for="(item,index) in province"
            show-overflow-tooltip
            :label="item.label"
            align="center"
            min-width="120">
            <template slot-scope="scope">
              {{scope.row[item.label].zsrs}}
            </template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="yl"
            label="预留"
            align="center"
            min-width="120">
            <template align="left" slot-scope="scope">{{ scope.row.yl }}</template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name:"AdmissionPlan2",
    data(){
      return {
        tableData:[],
        major:[],
        provinceBefore:[],
        province:[],
        selectProvince:[],
        one:true,
        two:false,
        three:false,
        tableData1:[],
        tableData2:[],
        zytype:[],
        BKZYArr:[],
        ZKZYArr:[],
        options:[],
        year:'',

      }
    },
    methods:{
      // 获取地区列表
      getProvince(){
        this.$post('/STCode/getList.action',{
          data:{
            flag:0
          }
        }).then(data=>{
          data.list.map(e=>{
            this.provinceBefore.push({label:e.dmmc,value:e.id})
            this.selectProvince.push(e.dmmc)
            this.province.push({label:e.dmmc,value:e.id})
          })
        })
      },
      // 获取专业列表
      async getMajor(){
        await this.$post('/bdzyxxnd/getList.action',{
          data:{
            nf:this.year
          }
        }).then(data=>{
          data.list.forEach(item=>{
            this.major.push({label:item.xnzymc,value:item.bdzyxxndId})
          })
        })
        this.setTableData1()
      },
      // 获取专业类型
      async getZYtype(){
        await this.$post('/STCode/getList.action',{
          data:{
            dmbt:'ZKFK'
          }
        }).then(data=>{
          this.zytype = data.list
        })
      },
      // 生成选专业的表格
      setTableData1(){
        this.tableData1 = this.major
        this.tableData1.forEach(item=>{
          item.BKIscheckedList = []
          item.ZKIscheckedList = []
        })
        this.tableData1 = JSON.parse(JSON.stringify(this.tableData1))
      },
      // 跳到编辑页
      toWrite(){
        if(this.selectProvince.length == 0){
          this.$message({message:"请选择省份",type:"error"})
        }else{
          this.setTableData2()
          this.one = false
          this.two = true
          this.three = false
        }
      },
      setTableData2(){
        this.BKZYArr = []
        this.ZKZYArr = []
        // 分成两个数组（本科，专科）
        this.tableData1.forEach(item=>{
          if(item.BKIscheckedList.length != 0){
            item.BKIscheckedList.forEach(val=>{
              this.BKZYArr.push({zy:item.label,zyId:item.value,xz:4,kl:val,zylb:"普通类"})
            })
          }
          if(item.ZKIscheckedList.length != 0){
            item.ZKIscheckedList.forEach(val=>{
              this.ZKZYArr.push({zy:item.label,zyId:item.value,xz:3,kl:val,zylb:"普通类"})
            })
          }
        })
        // 数据存入tableData2中
        this.tableData2 = []
        this.tableData2[0] = {zy:'共计'}
        if(this.BKZYArr.length != 0){
          this.tableData2.push({zy:'普通本科专业合计'})
          this.BKZYArr.forEach(item=>{
            this.tableData2.push(item)
          })
        }
        if(this.ZKZYArr.length != 0){
          this.tableData2.push({zy:'高职(专科)专业合计'})
          this.ZKZYArr.forEach(item=>{
            this.tableData2.push(item)
          })
        }
        // 给表格添加行
        this.province.forEach(item=>{
          this.tableData2.forEach(val=>{
            val[item.label] = {
              zsrs: '',
              sfMc:item.label,
              sfId:item.value
            }
          })
        })
        this.tableData2 = JSON.parse(JSON.stringify(this.tableData2))
      },
      selColumn(){
        this.province = []
        this.provinceBefore.forEach(item=>{
          this.selectProvince.forEach(val=>{
            if(val == item.label){
              this.province.push(item)
            }
          })
        })
      },
      // 保存查看
      saveInfo(){
        let dataD = []
        this.tableData2.forEach(item=>{
          this.province.forEach(v=>{
            item[v.label].zsrs = item[v.label].zsrs == '' ? 0 : item[v.label].zsrs
          })
          dataD.push(JSON.stringify(item))
        })
        this.$post('/rpr1/insert.action',{
          data:{
            info:dataD,
            year:2019,
            type:2
          }
        }).then(data=>{
          if(data.succsess){
            this.one = false
            this.two = false
            this.three = true
            this.$message({message:"保存成功",type:'success'})
          }else{
            this.$message({message:data.jsonMsg,type:'error'})
          }
        })
      },
      changeBg({row,column,rowIndex,columnIndex}){
        if(row.zy=='共计' || row.zy=='普通本科专业合计' || row.zy=='高职(专科)专业合计'){
          return 'currentBgg'
        }
      },
      // 计算总计，合计
      async sum(scope){
        // 各专业每一行的合计
        let num = 0
        this.province.forEach(val=>{
          num += Number(scope.row[val.label].zsrs)
        })
        scope.row.hj = num

        // 列的合计（本科专科两行的列）
        this.sumColumn(4,"普通本科专业合计",scope)
        this.sumColumn(3,"高职(专科)专业合计",scope)

        // 共计列的合计（总计）
        let Bsum = 0
        let Zsum = 0
        this.tableData2.forEach(item=>{
          if(item.zy == "普通本科专业合计"){
            Bsum = item.hj
          }
          if(item.zy == "高职(专科)专业合计"){
            Zsum = item.hj
          }
          this.tableData2.forEach(val=>{
            if(val.zy == "共计"){
              val.hj = Bsum + Zsum
            }
          })
        })

        // 共计列的合计（各省份）
        // this.tableData2.forEach(item=>{
        //   this.province.forEach(val=>{
        //     this.tableData2.forEach(v=>{
        //       this.tableData2.forEach(v0=>{
        //         if(v.zy=="普通本科专业合计" && v0.zy == "高职(专科)专业合计" && item.zy=="共计"){
        //           item[val.label].zsrs = Number(v[val.label].zsrs) + Number(v0[val.label].zsrs)
        //         }
        //       })
        //     })
        //   })
        // })
        let gj = this.tableData2.filter(item=> item.zy == '共计' )[0]
        let bk = this.tableData2.filter(item=> item.zy == '普通本科专业合计' )[0]
        let zk = this.tableData2.filter(item=> item.zy == '高职(专科)专业合计' )[0]
        for(let key in gj){
          if( typeof gj[key] == 'object'){
            let bkrs = bk ? Number(bk[key].zsrs) : 0 
            let zkrs = zk ?  Number(zk[key].zsrs) : 0 
            gj[key].zsrs = (bkrs  + zkrs) + '' 
            if(gj[key].zsrs == 0){
              gj[key].zsrs = ''
            }
          }
        }
        this.$set(this.tableData2,'0',gj)
      },
      // 本科专科两行表格里各专业的列的合计
      sumColumn(year,major,scope){
        let sum = 0
        let bigSum = 0
        this.tableData2.forEach(item=>{
          if(item.xz == year){
            sum += Number(item[scope.column.label].zsrs)
          }
        })
        this.tableData2.forEach(item=>{
          if(item.zy == major){
            item[scope.column.label].zsrs = sum
            this.province.forEach(val=>{
              bigSum += Number(item[val.label].zsrs)
              item.hj = bigSum
            })
          }
        })
      },
      back(){
        this.one = true
        this.two = false
        this.three = false
      },
      async load(){
        this.getProvince()
        // await this.getMajor()
        await this.getZYtype()
        // this.setTableData1()
        await this.getYears()
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
      handlechange(){
        this.getMajor()
      },
    },
    mounted(){
      this.load()
    }
  }
</script>
<style>
  .page-AdmissionPlan2{
    position: relative;
    text-align: left;
  }
  .currentBgg{
    background: #b3924c !important;
    color: #fff;
  }
  .select{
    margin-right: 20px;
  }
  .title{
    text-align: center;
    margin-bottom: 5px;
    font-size: 16px;
  }
</style>