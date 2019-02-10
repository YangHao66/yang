<template>
    <el-card>
        <!-- 面包屑导航 -->
        <MyBread firstnav="商品管理" lastnav="商品列表" />
        <!-- 消息提示 -->
        <el-alert class="myalert" title="添加商品信息" type="info" center show-icon>
        </el-alert>
        <!-- 步骤条 -->
        <!-- 
                                    active：当前步骤条进度
                                 -->
        <el-steps class="mystep" :active="active" align-center finish-status="success">
            <el-step title="基本信息"></el-step>
            <el-step title="商品参数"></el-step>
            <el-step title="商品属性"></el-step>
            <el-step title="商品图片"></el-step>
            <el-step title="商品内容"></el-step>
        </el-steps>
        <!-- tab 栏 -->
        <!-- 
                                tab-position：tab 栏标题的位置
                                tab-click事件：
                             -->
        <el-tabs @tab-click="tabclick" tab-position="left">
            <el-tab-pane label="基本信息">
                <el-form label-position="top" :model="addObj" status-icon class="demo-ruleForm">
                    <el-form-item label="商品名称">
                        <el-input type="text" v-model="addObj.pass" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="商品价格">
                        <el-input type="text" v-model="addObj.checkPass" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="商品重量">
                        <el-input v-model="addObj.age"></el-input>
                    </el-form-item>
                    <el-form-item label="商品数量">
                        <el-input v-model="addObj.age"></el-input>
                    </el-form-item>
                    <el-form-item label="商品分类">
                        {{ cascaderValue }}
                        <!-- 
                                    expand-trigger：设置扩展子元素的方式
                                    options：设置数据源
                                    v-model：绑定选中的值（数组）
                                 -->
                        <el-cascader :props="props" expand-trigger="hover" :options="cateList" v-model="cascaderValue">
                        </el-cascader>
                    </el-form-item>
                </el-form>
            </el-tab-pane>
            <el-tab-pane label="商品参数">
                <div v-for="item in manyParams" :key="item.attr_id">
                    <p>{{item.attr_name}}</p>
                    <div>
                        <el-checkbox v-model="check" v-for="(item1,index) in item.attr_vals.split(',')" :key="index" :label="item1" border></el-checkbox>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="商品属性">商品属性</el-tab-pane>
            <el-tab-pane label="商品图片">商品图片</el-tab-pane>
            <el-tab-pane label="商品内容">商品内容</el-tab-pane>
        </el-tabs>
    </el-card>
</template>

<script>
export default {
    data() {
        return {
            check: true,
            // 步骤条默认的状态
            active: 0,
            // 要添加元素的信息
            addObj: {
            },
            // 级联框中选中值的 value 的集合
            cascaderValue: [],
            // 分类参数的数据源
            cateList: [],
            // 设置级联框中的选项
            props: {
                label: 'cat_name',
                value: 'cat_id'
            },
            // 保存动态参数（商品参数）
            manyParams: []
        }
    },
    methods: {
        tabclick(ev) {
            // ev.index 被点击 tab 的索引
            this.active = Number(ev.index)
            if (ev.index === '1') {
                this.getManyData()
            }
        },
        // 得到所有的分类数据
        async getAllCate() {
            var res = await this.$http.get('/categories?type=3')
            var { meta, data } = res.data
            if (meta.status === 200) {
                this.cateList = data
            } else {
                this.$message.error(meta.msg)
            }
        },
        // 得到分类的动态参数（商品参数）
        async getManyData() {
            if (this.cascaderValue.length != 0) {
                var id = this.cascaderValue[this.cascaderValue.length - 1]
                var res = await this.$http.get(`/categories/${id}/attributes?sel=many`)
                var { meta, data } = res.data
                if (meta.status === 200) {
                    this.manyParams = data
                } else {
                    this.$message.error(meta.msg)
                }
            } else {
                this.$message.error('参数不能为空')
            }
        }
    },
    mounted() {
        this.getAllCate()
    }
}
</script>

<style>
.myalert {
    margin-top: 15px;
    margin-bottom: 15px;
}

.el-step__title {
    font-size: 12px;
}
</style>
