<template>
  <div class="app-sidebar" :class="{retract: retract}">
      <span class="bigTitle">{{CURRENT_MENU.name}}</span>
      <el-menu
        class="el-menu-vertical-demo sideMenu"
        @open="handleOpen"
        @close="handleClose"
        router>
        <div v-for="(child1,index1) in CURRENT_MENU_MATE"  :key="index1+'div'">
          <el-submenu  v-if="child1.children.length != 0" :index="'/home/' + CURRENT_MENU.url + '/' + child1.url">
            <template slot="title">
              <span>{{child1.name}}</span>
            </template>
            <el-menu-item :class="$route.path == '/home/' + CURRENT_MENU.url + '/' + child1.url + '/' + child2.url ? 'navbg' : ''" v-for="(child2,index2) in child1.children" :index="'/home/' + CURRENT_MENU.url + '/' + child1.url + '/' + child2.url">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-text"></use>
              </svg>
              <span>{{child2.name}}</span>
            </el-menu-item>
            <!-- 多级菜单的情况 -->
            <!-- <el-submenu v-for="(child2,index2) in child1.children" v-if="child2.children && child2.children.length != 0" :index="'/home/' + CURRENT_MENU.url + '/' + child1.url + '/' + child2.url">
              <template slot="title">
                <span>{{child2.name}}</span>
              </template>
              <el-menu-item v-for="(child3,index3) in child2.children" v-if="child3.children && child3.children.length == 0" :index="'/home/' + CURRENT_MENU.url + '/' + child1.url + '/' + child2.url + '/' + child3.url">
                <span>{{child3.name}}</span>
              </el-menu-item>
            </el-submenu> -->
          </el-submenu>
            <el-menu-item  :class="$route.path == '/home/' + CURRENT_MENU.url + '/' + child1.url ? 'navbg' : ''"  v-if="child1.children.length == 0" :index="'/home/' + CURRENT_MENU.url + '/' + child1.url">
            <span>{{child1.name}}</span>
          </el-menu-item>
        </div>
      </el-menu>
  </div>
</template>
<script>
	import common from "@/mixin/common";
	export default {
    mixins: [common],
    name: "app-sidebar",
    props: ["retract"],
    data() {
      return {
        // 选中tab
        activeTabName: "",
        // 悬停tab
        hoverTabName: "",
        // 二级菜单是否显示
        panelVisible: !this.retract,
        firstName:'',
        secondName:'',
        thirdName:'',
        fourthName:'',
        fifthName:''
      };
    },
    computed: {
      MENU_DATA() {
        return this.$store.getters.MENU_DATA;
      },
      CURRENT_MENU_MATE() {
        return this.$store.getters.CURRENT_MENU_MATE;
      },
      CURRENT_MENU() {
        return this.$store.getters.CURRENT_MENU;
      },
    },
    methods: {
      handleOpen(key, keyPath) {
        // console.log(key);
      },
      handleClose(key, keyPath) {
        // console.log(key, keyPath);
      },
    },
    mounted() {

    }
  };
</script>
<style>
  .app-sidebar{
    position: relative;
    overflow: hidden;
  }
  .bigTitle{
    text-align: left;
    padding-left: 25px;
    z-index: 1;
    color: #2aa1ef;
    width: 200px;
    height: 50px;
    display: block;
    line-height: 50px;
    background: #ecf5ff;
  }
  .app-sidebar .el-menu{
    text-align: left;
    margin: 0 !important;
  }
  .icon {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
    padding-right: 10px;
  }
  .navbg{
    background: #79BBFF !important;
    color: #fff !important;
  }
  .sideMenu{
    margin-left: 3% !important;
  }
  .sideMenu{
      margin-left: 10% !important;
    }
  @media screen and (max-width: 1600px){
    .sideMenu{
      margin-left: 0 !important;
    }
    
  }
</style>