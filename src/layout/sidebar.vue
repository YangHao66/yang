<template>
    <!-- 
                                                    el-mens:
                                                        default-active: 设置默认选中的选项
                                                        open: 事件：将来展开子菜单时会触发
                                                        close: 事件： 将来关闭子菜单时会触发
                                                        unique-opened： 只保持一个子菜单展开
                                                        router: 开启 vue-router 模式，会将 index 中的路径作为它的跳转路径
                                                    el-submenu：子菜单
                                                        index：子菜单的标识
                                                        <template></template>: 子菜单中的内容模板
                                                    el-menu-item-group：子菜单的分组
                                                    el-menu-item：子选项
                                                    -->
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
