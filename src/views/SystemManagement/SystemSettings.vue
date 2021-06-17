<template>
	<!-- 系统设置 -->
	<div class="page-SystemSettings">
   <!--  <el-radio-group v-model="radio">
      <el-radio class="radio" v-for="(item,index) in sfInfo" :label="item.dmbh" @change="selectSF">{{item.dmmc}}</el-radio>
  	</el-radio-group> -->
		<el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
	  <div style="margin: 15px 0;"></div>
	  <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
	    <el-checkbox v-for="(item,index) in sfInfo" :label="item.dmbh">{{item.dmmc}}</el-checkbox>
	  </el-checkbox-group>
	</div>
</template>
<script>
	export default {
		name:"SystemSettings",
		data(){
			return {
				sfInfo:[
					{dmbh:'211',dmmc:'湖南',ischecked:''},
					{dmbh:'985',dmmc:'吉林',ischecked:''},
					{dmbh:'000',dmmc:'辽宁',ischecked:''},

				],
				// radio:''
				checkAll: false,
        checkedCities: [],
        isIndeterminate: true
			}
		},
		methods:{
      selectSF(val){
      	console.log(val)
      },
      handleCheckAllChange(val) {
      	console.log(val)
        this.checkedCities = val ? this.sfInfo : [];
        console.log(this.checkedCities)
        this.isIndeterminate = false;
      },
      handleCheckedCitiesChange(value) {
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.cities.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
      }
		},
	}
</script>
<style>
</style>