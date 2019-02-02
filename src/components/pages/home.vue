<template>
  <el-container>
    <el-header>
      <Top/>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <SideBar/>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Top from "@/layout/top.vue";
import SideBar from "@/layout/sideBar.vue";

export default {
  components: {
    Top,
    SideBar
  }
};
</script>

<style>
.el-container {
  height: 100%;
}
.el-header {
  padding: 0;
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  background-color: #fff;
  color: #333;
  height: 100%;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  height: 100%;
}
/* 头部开始 */
</style>
