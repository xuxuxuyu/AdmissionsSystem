<template>
  <div class="page-Admin">
    <!-- 头部 -->
    <app-header class="header"></app-header>
    <!-- 容器 -->
    <div class="admin-container">
      <!-- 侧边菜单 -->
      <i v-if="!isTrue" class="icon iconfont scaling" style="color: #fff" @click="hideSideBar()">&#xe63e</i>
      <div :class="isTrue ? 'admin-block-main' : 'admin-block-main-hidden'" id="sideBar" @mouseover="isShow=true" @mouseout="isShow = isTrue ? true : false">
        <i v-if="isTrue" class="icon iconfont scalingSmall" style="color: #2196f3" @click="hideSideBar()">&#xe63e</i>
        <el-row v-show="isShow">
          <el-col :span="24">
            <appSidebar></appSidebar>
          </el-col>
        </el-row>
      </div>
      <!-- 右边内容 -->
      <el-main :class="isTrue ? 'admin-content' : 'admin-content-big'" id="mainPart">
        <breadcrumb></breadcrumb>
        <router-view class="compont"></router-view>
      </el-main>
    </div>
  </div>
</template>
<script>
import appHeader from "../components/app-header.vue";
import breadcrumb from "../components/breadcrumb.vue";
import appSidebar from "../components/app-sidebar.vue";
import common from "@/mixin/common";
export default {
  mixins: [common],
  name:'Home',
  components: {
    appHeader,
    breadcrumb,
    appSidebar,
  },
  computed: {
    MENU_DATA() {
      return this.$store.getters.MENU_DATA
    }
  },
  data() {
    return {
      menuData:[],
      isTrue:true,
      isShow:true,

    }
  },
  methods: {
    handleClick(item, listData) {
      let currentMenuMate = {
        firstName: listData.name,
        secondName: item.name,
        thirdName: item.items[0].name,
        fourthName: item.items[0].items[0].name
      };
      this.$store.commit("CURRENT_MENU_MATE", currentMenuMate);
      this.$router.push({
        path: `/main/${currentMenuMate.firstName}/${currentMenuMate.secondName}`
      })
    },
    hideSideBar(){
      this.isTrue = !this.isTrue
      this.isShow = true
    },

  },
  mounted(){
  }

};
</script>
<style>
.el-container {
  height: 100%;
}
.el-main {
  display: block;
  position: absolute;
  top: 40px;
  left: 200px;
}
#nav {
  padding: 0;
}
.header {
  height: 40px;
  line-height: 40px;
}
.page-Admin{
  width: 100%;
  height: 100%;
}
/* 内容区 */
.page-Admin .admin-container{
  position: relative;
  width: 100%;
  height: calc(100% - 40px);
}
/*侧边栏*/
.page-Admin .admin-block-main {
  width: 200px;
  height: 100%;
  border-left: 5px solid #2196f3;
  overflow-y: auto;
  border-right: 1px solid #ccc;
  transition: all .7s;
  position: relative;
}
.page-Admin .admin-block-main-hidden {
  width: 10px;
  height: 100%;
  border-left: 10px solid #2196f3;
  border-right: 0;
  transition: all .7s;
  z-index: 10;
  position: absolute;
}
.page-Admin .admin-block-main-hidden:hover{
  width: 200px;
  height: 100%;
  padding: 20px 0 0 0;
  border-left: 10px solid #2196f3;
  overflow-y: auto;
  z-index: 1000;
  cursor: pointer;
  position: absolute;
  background: #fff;
  border-right: 1px solid #ccc;
} 
/*中间内容*/
.page-Admin .admin-content{
  position: absolute;
  top: 0;
  height: 100%;
  width: calc(100% - 200px);
  transition: all .7s;
  margin: 10px 0 0 10px;
  padding:0;
}
.page-Admin .admin-content-big{
  margin: 10px 0 0 10px;
  padding:0;
  position: absolute;
  top: 0;
  height:105%;
  width: 100%;
  left: 15px;
  transition: all .7s;
}
.scaling{
  background: #2196f3;
  width: 15px !important;
  height: 30px !important;
  position: absolute;
  left: 7px;
  top: 0;
  line-height: 30px;
  border-radius: 30%;
  z-index: 5;
}
.scaling:hover{
  cursor: pointer;
}
.scalingSmall{
  position: absolute;
  right: 15px;
  top: 15px;
  z-index: 10;
}
.scalingSmall:hover{
  cursor: pointer;
}
.compont{
  height: calc(100% - 30px);
}
</style>