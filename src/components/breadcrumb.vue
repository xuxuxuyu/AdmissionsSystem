<template>
  <div class="breadcrumb">
    <ul class="breadcrumb-list clearfix">
      <!-- 当前位置 -->
      <li class="breadcrumb-current-position">
        <i class="icon iconfont" style="color: #666">&#xe639</i>当前位置
        <span class="colon">：</span>
      </li>
      <!-- 路由 -->
      <transition-group name="breadcrumb">
        <li
          v-for="(item, index) in list"
          :key="index+'breadcrumb'"
          class="breadcrumb-item"
          v-show="item.meta.title">
          <div v-if="index !== list.length - 1" class="router-link-active" @click="change(item)">
            <span>{{item.meta.title}}</span>
            <i class="el-icon-arrow-right"></i>
          </div>
          <span v-else class="last-text">{{item.meta.title}}</span>
        </li>
      </transition-group>
    </ul>
  </div>
</template>
<script>
export default {
  name: "breadcrumb",
  watch: {
    // 如果路由有变化，会再次执行该方法
    $route: "load"
  },
  data() {
    return {
      list: []
    };
  },
  methods: {
    load() {
      this.list = []; // 清空
      let name = this.$route.name;
      let matched = this.$router.currentRoute.matched;
      for (let item of matched) {
        this.list.push(item);
        if (item.name === "home") {
          this.list.splice(0,1)
        }
      }
    },
    change(item) {
      this.$router.push({path:item.path})
    }
  },
  mounted() {
    this.load();
  }
};
</script>

<style>
.breadcrumb {
  position: relative;
  height: 20px;
}

.breadcrumb .breadcrumb-current-position {
  float: left;
  font-size: 13px;
  color: #666666;
}

.breadcrumb .breadcrumb-current-position .icon-weizhi {
  font-size: 14px;
  padding-right: 3px;
}

.breadcrumb .breadcrumb-list .breadcrumb-item {
  float: left;
  color: #666666;
  font-size: 12px;
}

.breadcrumb .breadcrumb-list .breadcrumb-item .router-link-active {
  margin: 0;
  display: block;
  text-decoration: none;
  cursor: pointer;
  font-size: 13px;
}
.breadcrumb .breadcrumb-list .breadcrumb-item .router-link-active:hover span {
  color: #0b84f2;
}

.breadcrumb .breadcrumb-list .breadcrumb-item span {
  margin-left: 10px;
  margin-right: 10px;
  position: relative;
  top: 2px;
  color: #3d9df4;
}
.breadcrumb .breadcrumb-list .breadcrumb-item span:first-child {
  margin-left: 2px;
  position: relative;
  top: 2px;
  color: #3d9df4;
}
.breadcrumb .breadcrumb-list .breadcrumb-item i {
  color: darkgrey;
  position: relative;
  top: 2px;
}

.breadcrumb .breadcrumb-list .breadcrumb-item .last-text {
  margin-left: 10px;
  font-size: 13px;
  position: relative;
  top: 2px;
  color: #666;
}

.breadcrumb .breadcrumb-list .breadcrumb-item .last-text:hover {
  color: #666;
}

/* breadcrumb transition */
.breadcrumb .breadcrumb-enter-active,
.breadcrumb .breadcrumb-leave-active {
  transition: all 0.5s;
}

.breadcrumb .breadcrumb-enter,
.breadcrumb .breadcrumb-leave-active {
  opacity: 0;
  transform: translateX(20px);
}

.breadcrumb .breadcrumb-move {
  transition: all 0.5s;
}

.breadcrumb .breadcrumb-leave-active {
  position: absolute;
}
</style>
