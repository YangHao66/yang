<template>
    <el-menu :router="true" :unique-opened="true" default-active="2" class="el-menu-vertical-demo" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
        <el-submenu index="1">
            <!-- 一级菜单 -->
            <template slot="title">
                <i class="el-icon-location"></i>
                <span>用户管理</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item index="/user">
                <i class="el-icon-star-on"></i>
                用户列表
            </el-menu-item>
        </el-submenu>
        <el-submenu index="2">
            <!-- 一级菜单 -->
            <template slot="title">
                <i class="el-icon-location"></i>
                <span>权限管理</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item index="2-1">
                <i class="el-icon-star-on"></i>角色列表</el-menu-item>
            <el-menu-item index="2-2">
                <i class="el-icon-star-on"></i>权限列表</el-menu-item>
        </el-submenu>
        <el-submenu index="3">
            <!-- 一级菜单 -->
            <template slot="title">
                <i class="el-icon-location"></i>
                <span>商品管理</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item index="3-1">
                <i class="el-icon-star-on"></i>商品列表</el-menu-item>
            <el-menu-item index="3-2">
                <i class="el-icon-star-on"></i>分类参数</el-menu-item>
            <el-menu-item index="3-3">
                <i class="el-icon-star-on"></i>商品分类</el-menu-item>
        </el-submenu>
        <el-submenu index="4">
            <!-- 一级菜单 -->
            <template slot="title">
                <i class="el-icon-location"></i>
                <span>订单管理</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item index="4-1">
                <i class="el-icon-star-on"></i>订单列表</el-menu-item>
        </el-submenu>
        <el-submenu index="5">
            <!-- 一级菜单 -->
            <template slot="title">
                <i class="el-icon-location"></i>
                <span>数据统计</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item index="5-1">
                <i class="el-icon-star-on"></i>数据报表</el-menu-item>
        </el-submenu>
    </el-menu>
</template>

<script>
export default {

}
</script>

<style>
/* 侧边栏样式 */
.el-menu-vertical-demo {
    height: 100%;
}
</style>
