<template>
	<!-- 学生基本信息 -->
  <div class="page-StudentBasicInfo">
    <div class="page-container">
      <!-- 操作框 -->
      <div class="page-operation-box">
      	<div class="pull-left">
      		<el-button
      		size="small"
      		type="primary"
      		icon="icon iconfont icon-add"
      		>新增</el-button>
      		<el-button
      		size="small"
      		type="primary"
      		icon="icon iconfont iconpiliangxiugai"
      		>修改</el-button>
      		<el-button
      		type="primary"
      		size="small"
      		icon="icon iconfont iconshanchu"
      		>删除</el-button>
      		<el-button
      		type="primary"
      		size="small"
      		icon="icon iconfont icondaochu"
      		class="app-whole app-whole-export"
      		>导出</el-button>
      	</div>
      </div>
      <template>
  <div>
    <b-table striped hover :items="items"></b-table>
  </div>
</template>


      <!-- <appTree></appTree> -->
			<!-- 列表 -->
			<!-- <div class="app-page-box-table">
        <el-table
          border
          stripe
          height="100px"
          tooltip-effect="dark"
          ref="tableElement"
          :data="tableData"
          highlight-current-row>
          <el-table-column align="center" type="selection" width="40"></el-table-column>
          <el-table-column fixed label="序号" align="center" type="index" width="50"></el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop=""
            label="单位编号"
            align="center"
            min-width="80">
            <template slot-scope="scope">{{  }}</template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop=""
            label="单位名称"
            align="center"
            min-width="80">
            <template slot-scope="scope">{{  }}</template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop=""
            label="英文名称"
            align="center"
            min-width="80">
            <template slot-scope="scope">{{  }}</template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop=""
            label="单位简称"
            align="center"
            min-width="80">
            <template slot-scope="scope">{{  }}</template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop=""
            label="单位类别"
            align="center"
            min-width="80">
            <template slot-scope="scope">{{  }}</template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop=""
            label="教研室"
            align="center"
            min-width="80">
            <template slot-scope="scope">{{  }}</template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop=""
            label="开课单位"
            align="center"
            min-width="80">
            <template slot-scope="scope">{{  }}</template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop=""
            label="上课单位"
            align="center"
            min-width="80">
            <template slot-scope="scope">{{  }}</template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop=""
            label="禁用"
            align="center"
            min-width="80">
            <template slot-scope="scope">{{  }}</template>
          </el-table-column>
        </el-table>
   		</div> -->
			<!-- <div id="myChart" style="height: 300px"></div> -->

      <!-- bootstrap表格 -->
      <!-- <table class="table">
        <thead class="thead-light">
          <tr>
            <th scope="col">#</th>
            <th scope="col">来源省份</th>
            <th scope="col">姓名</th>
            <th scope="col">性别</th>
            <th scope="col">国籍</th>
          </tr>
        </thead>
        <tbody id="tby">
        </tbody>
      </table> -->
    </div>
  </div>
</template>
<script>
  import appTree from "../../components/app-tree"
	export default {
    components:{
      appTree
    },
		name:"test",
		data(){
			return {
				tableData: [],
				option : {
					series: [
					{
						name:'111',
						type: 'liquidFill',
						radius: '50%',
						data: [
						{
							value: 0.8,
							direction: 'left',
							itemStyle:{
								color:"rgba(69,141,231,1)",
							}
						},
						{
							value: 0.7,
							direction: 'left',
							itemStyle:{
								color:"rgba(18,100,212,1)"
							}
						},
						],
						label: {
							normal: {
								color: '#fff',
								insideColor: 'transparent',
								textStyle: {
									fontSize: 16,
									fontWeight: 'bold',
									fontFamily: 'Microsoft YaHei'
								}
							}
						},
						outline: {
							show: false,
						},
						backgroundStyle: {
							color: '#fff',
						}
					}]
				},
        data5: [
          {
            id: 1,
            label: '一级 1',
            icon:'el-icon-success',
            children: [
              {
                id: 4,
                label: '二级 1-1',
                children: [
                  {
                      id: 9,
                      label: '三级 1-1-1',
                      icon: 'icon iconfont icon-add'
                  }, 
                  {
                      id: 10,
                      label: '三级 1-1-2'
                  }
                  ],
              }
            ]
          },
          {
            id: 2,
            label: '一级 2',
            children: [
              {
                  id: 5,
                  label: '二级 2-1',
              },
              {
                  id: 6,
                  label: '二级 2-2'
              }
            ]
          }, 
          {
              id: 3,
              label: '一级 3',
              children: [
                {
                  id: 7,
                  label: '二级 3-1'
                },
                {
                  id: 8,
                  label: '二级 3-2'
                }
              ]
          }
        ]
			}
		},
		methods:{
      ddddd(data){
        console.log(data);
      }
    },
		mounted(){
			// this.$post("/smxsjbxx/getList",{}).then(res=>{
			// 	console.log(res);
			// })
			let myChart = this.echarts.init(document.getElementById('myChart'))
			myChart.setOption(this.option);
		}
	}
</script>
<style>
	.page-StudentBasicInfo {
	  position: relative;
	  /*height: 100%;*/
	}
	.StudentBasicInfo-export-dialog .cascade-select .el-select .el-input__inner {
	  cursor: pointer;
	  padding-right: 100px;
	}
</style>