<template>
  <!-- 专业招生计划2 -->
  <div class="page-AdmissionPlan3">
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
            icon="icon iconfont"
            @click="back()"
            v-show="list || write">返回
          </el-button>
        </div>
        <div class="pull-right">
          <el-button
            type="primary"
            @click="towrite()"
            v-show="list && !write">编辑
          </el-button>
          <el-button
            type="primary"
            @click="saveInfo()"
            v-show="write && !list">保存
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
              <el-button type="primary" @click="getZSList()">{{scope.row.year}}年招生计划</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 展示计划表列表组件 -->
      <div class="app-page-box-table big-height" v-show="list && !write">
        <el-table
          :cell-class-name="changeBg"
          border
          stripe
          tooltip-effect="dark"
          ref="tableElement"
          :data="tableData1"
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
            v-for="(item,index) in provinceName"
            show-overflow-tooltip
            :label="item"
            align="center"
            min-width="120">
            <template slot-scope="scope">
              {{scope.row[item].zsrs}}
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
      <!-- 编辑计划表列表组件 -->
      <div class="app-page-box-table big-height" v-show="write && !list">
        <el-table
          :cell-class-name="changeBg"
          border
          stripe
          tooltip-effect="dark"
          ref="tableElement"
          :data="tableData1"
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
            v-for="(item,index) in  provinceName"
            show-overflow-tooltip
            :label="item"
            align="center"
            min-width="120">
            <template slot-scope="scope">
              <el-input @blur="sum(scope)" v-show="!['共计','普通本科专业合计','高职(专科)专业合计'].includes(scope.row.zy)" v-model="scope.row[item].zsrs" placeholder="招生人数"></el-input>
              <span v-show="['共计','普通本科专业合计','高职(专科)专业合计'].includes(scope.row.zy)">{{scope.row[item].zsrs}}</span>
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
  import table from "@/mixin/table.vue";
  export default {
    mixins: [table],
    name:"AdmissionPlan2",
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
        provinceName:[],
        tableData:[],
        tableData1:[],
        list:false,
        write:false
      }
    },
    methods:{
      getList(){
        this.$post('/rpr1/getYears.action',{
          data:{
            year:2019,
            type:2
          }
        }).then(data=>{
          this.tableData = data.list
        })
      },
      // 计算总计，合计
      async sum(scope){
        console.log(this.tableData12);
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
        this.tableData12.forEach(item=>{
          if(item.zy == "普通本科专业合计"){
            Bsum = item.hj
          }
          if(item.zy == "高职(专科)专业合计"){
            Zsum = item.hj
          }
          this.tableData12.forEach(val=>{
            if(val.zy == "共计"){
              val.hj = Bsum + Zsum
            }
          })
        })

        // 共计列的合计（各省份）
        // this.tableData12.forEach(item=>{
        //   this.province.forEach(val=>{
        //     this.tableData12.forEach(v=>{
        //       this.tableData12.forEach(v0=>{
        //         if(v.zy=="普通本科专业合计" && v0.zy == "高职(专科)专业合计" && item.zy=="共计"){
        //           item[val.label].zsrs = Number(v[val.label].zsrs) + Number(v0[val.label].zsrs)
        //         }
        //       })
        //     })
        //   })
        // })
        let gj = this.tableData12.filter(item=> item.zy == '共计' )[0]
        let bk = this.tableData12.filter(item=> item.zy == '普通本科专业合计' )[0]
        let zk = this.tableData12.filter(item=> item.zy == '高职(专科)专业合计' )[0]
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
        this.$set(this.tableData12,'0',gj)
      },
      // 本科专科两行表格里各专业的列的合计
      sumColumn(year,major,scope){
        let sum = 0
        let bigSum = 0
        this.tableData12.forEach(item=>{
          if(item.xz == year){
            sum += Number(item[scope.column.label].zsrs)
          }
        })
        this.tableData12.forEach(item=>{
          if(item.zy == major){
            item[scope.column.label].zsrs = sum
            this.province.forEach(val=>{
              bigSum += Number(item[val.label].zsrs)
              item.hj = bigSum
            })
          }
        })
      },
      getTableData(){
        this.province = []
        this.$post('/rpr1/getList.action',{
          data:{
            year:2019,
            type:2
          }
        }).then(data=>{
          let value = []
          console.log(data);
          if(data.succsess){
            this.tableData1 = data.list[0].info
            this.tableData1.forEach(item=>{
              value = Object.values(this.tableData1[0]);
            })
            value.forEach(v=>{
              if(typeof v == 'object'){
                this.provinceName.push(v.sfMc)
              }
            })
          }
        })
      },
      towrite(){
        this.list = false
        this.write = true
      },
      changeBg({row,column,rowIndex,columnIndex}){
        if(row.zy=='共计' || row.zy=='普通本科专业合计' || row.zy=='高职(专科)专业合计'){
          return 'currentBgg'
        }
      },
      getZSList(){
        this.list = true
        this.write = false
      },
      saveInfo(){
        let dataD = []
        this.tableData1.forEach(item=>{
          dataD.push(JSON.stringify(item))
        })
        this.$post('/rpr1/update.action',{
          data:{
            info:dataD,
            year:2019,
            ids:2019,
            type:2
          }
        }).then(data=>{
          if(data.succsess){
            this.$message({message:"保存成功",type:'success'})
            this.write = false
            this.list = true
          }else{
            this.$message({message:data.jsonMsg,type:'error'})
          }
        })
      },
      // 计算总计，合计
      async sum(scope){
        console.log(this.tableData1);
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
        this.tableData1.forEach(item=>{
          if(item.zy == "普通本科专业合计"){
            Bsum = item.hj
          }
          if(item.zy == "高职(专科)专业合计"){
            Zsum = item.hj
          }
          this.tableData1.forEach(val=>{
            if(val.zy == "共计"){
              val.hj = Bsum + Zsum
            }
          })
        })

        // 共计列的合计（各省份）
        // this.tableData12.forEach(item=>{
        //   this.province.forEach(val=>{
        //     this.tableData12.forEach(v=>{
        //       this.tableData12.forEach(v0=>{
        //         if(v.zy=="普通本科专业合计" && v0.zy == "高职(专科)专业合计" && item.zy=="共计"){
        //           item[val.label].zsrs = Number(v[val.label].zsrs) + Number(v0[val.label].zsrs)
        //         }
        //       })
        //     })
        //   })
        // })
        let gj = this.tableData1.filter(item=> item.zy == '共计' )[0]
        let bk = this.tableData1.filter(item=> item.zy == '普通本科专业合计' )[0]
        let zk = this.tableData1.filter(item=> item.zy == '高职(专科)专业合计' )[0]
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
        this.$set(this.tableData1,'0',gj)
      },
      // 本科专科两行表格里各专业的列的合计
      sumColumn(year,major,scope){
        let sum = 0
        let bigSum = 0
        this.tableData1.forEach(item=>{
          if(item.xz == year){
            sum += Number(item[scope.column.label].zsrs)
          }
        })
        this.tableData1.forEach(item=>{
          if(item.zy == major){
            item[scope.column.label].zsrs = sum
            this.province.forEach(val=>{
              bigSum += Number(item[val.label].zsrs)
              item.hj = bigSum
            })
          }
        })
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
                type:2
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
      back(){
        this.write = false
        this.list = false
        this.tableData1 = JSON.parse(JSON.stringify(this.tableData1)) 
      },
      async load(){
        this.getList();
        this.getTableData()
      }
    },
    mounted(){
      this.load()
    }
  }
</script>
<style>
  .page-AdmissionPlan3{
    position: relative;
  }
  .currentBgg{
    background: #b3924c !important;
    color: #fff;
  }
  .select{
    margin-right: 20px;
  }
</style>