<template>
  <!-- 共用icon组件 -->
  <div class="app-icon">
    <el-row class="app-svg-item">
      <div class="svg-item-title">{{ listData.title }}</div>
      <el-col :span="8" v-for="(item,index) in listData.items" :key="index">
        <div class="svg-item" @click="handleClick(item, listData)">
          <svg class="icon svg-icon" aria-hidden="true">
            <use :xlink:href="`#icon`+ item.name"></use>
          </svg>
          <span class="svg-item-name">{{ item.title }}</span>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import common from '@/mixin/common';

  export default {
    mixins: [common],
    name: 'app-icon',
    props: {
      listData: [Array, Object]
    },
    data() {
      return {}
    },
    methods: {
      handleClick(item, listData) {
        this.$emit("handleClick", item, listData);
      }
    },
    mounted() {
      // console.log(this.listData)
    }
  }
</script>

<style>
  .app-icon {
    /* margin:30px;
    cursor: pointer; */
  }

  .app-icon .app-svg-item {
    margin-bottom: 15px;
  }

  .app-icon .app-svg-item .svg-item-title {
    font-size: 16px;
    color: #666666;
    font-weight: bold;
    padding: 0 0 10px 3px;
    margin-bottom: 7px;
    border-bottom: 1px solid #eaeaea;
  }

  .app-icon .app-svg-item .svg-item {
    width: 140px;
    height: 100px;
    text-align: center;
    border-radius: 6px;
    margin: 0 auto 20px auto;
    overflow: hidden;
    user-select: none;
    transition: all 0.3s ease;
  }

  .app-icon .app-svg-item .svg-item:hover,
  .app-icon .app-svg-item .svg-item:focus,
  .app-icon .app-svg-item .svg-item:active {
    cursor: pointer;
    box-shadow: 0 5px 6px rgba(204, 204, 204, 0.6);
  }

  .app-icon .app-svg-item .el-col .svg-icon {
    display: block;
    width: 38px;
    height: 38px;
    margin: 18px auto 10px auto;
  }

  .app-icon .app-svg-item .el-col .svg-item-name {
    color: #666;
    font-size: 14px;
  }
</style>
