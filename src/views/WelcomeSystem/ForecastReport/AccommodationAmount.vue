<template>
  <!-- 住宿费金额 -->
  <div class="page-AccommodationAmount">
    <div class="page-container">
      住宿费金额
    </div>
  </div>
</template>
<script>
	import newtable from "@/mixin/newtable.vue"
  export default {
    mixins: [newtable],
    name:"AccommodationAmount",
    data(){
      return {

      }
    },
    methods:{
      openDialog(type){
        if(type == 'add'){
          this.editForm = {}
        }
        if(type=='update'){
          
        }
      }
    },
    mounted(){

    }
  }
</script>
<style>
  .page-AccommodationAmount{
    position: relative;
    }
</style>