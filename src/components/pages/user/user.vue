<template>
    <el-card>
        <!-- 面包屑导航 -->
        <!-- 
                                                        el-breadcrumb
                                                            separator-class：设置面包屑导航之间的分隔符号
                                                        el-breadcrumb-item：导航
                                                            to: 跳转的路径
                                                     -->
        <el-breadcrumb separator-class="el-icon-more">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 搜索框 -->
        <!-- 
                                                    el-input：
                                                 -->
        <el-row class="search">
            <el-col :span="8">
                <el-input placeholder="请输入内容" v-model="search" class="input-with-select">
                    <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>
            </el-col>
            <el-col :span="16">
                &nbsp;&nbsp;
                <el-button type="success" plain>添加用户</el-button>
            </el-col>
        </el-row>
        <!-- 表格区域 -->
        <!-- 
                                            el-table:
                                                data: 绑定的数据源
                                                border：设置边框
                                            el-table-column：表格中的一列 
                                                prop: 从数据源中得到 date 属性
                                         -->
        <el-table :data="tableData" border style="width: 100%">
            <el-table-column type="index"></el-table-column>
            <el-table-column prop="name" label="姓名">
            </el-table-column>
            <el-table-column prop="date" label="邮箱">
            </el-table-column>
            <el-table-column prop="address" label="电话">
            </el-table-column>
            <el-table-column label="用户状态">
                <template slot-scope="scope">
                    <el-switch v-model="scope.row.isture">
                    </el-switch>
                    <!-- scope.row: 当前行的数据源对象 -->
                </template>
            </el-table-column>
            <el-table-column prop="address" label="操作" width="200">
                <template>
                    <el-button plain size="mini" type="primary" icon="el-icon-edit"></el-button>
                    <el-button plain size="mini" type="danger" icon="el-icon-delete"></el-button>
                    <el-button plain size="mini" type="success" icon="el-icon-check"></el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页组件 -->
        <!-- 
            el-pagination：
                size-change事件：当页容器改变时触发
                current-change事件：当从一页跳转到另一页时触发
                current-page：当前页
                page-sizes：页容器
                page-size: 页容量
                layout：分页组件的布局
                total：数据总条数
         -->
        <el-pagination :current-page="currentPage4" :page-sizes="[100, 200, 300, 400]" :page-size="400" layout="total, sizes, prev, pager, next, jumper" :total="400">
        </el-pagination>
    </el-card>
</template>

<script>
export default {
    data() {
        return {
            search: '',
            tableData: [{
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄',
                isture: true
            }, {
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1517 弄',
                isture: true
            }, {
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1519 弄',
                isture: true
            }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄',
                isture: true
            }]
        }
    }
}
</script>

<style>
.search {
    margin: 15px 0;
}
</style>
