<template>
    <el-row>
        <el-col :span="6">
            <div>
                <img src="@/assets/images/logo.png">
            </div>
        </el-col>
        <el-col :span="12">
            <div class="e-h-title">
                电商后台管理系统
            </div>
        </el-col>
        <el-col :span="6">
            <div class="e-h-logout">
                <a href="#" @click.prevent="logout">退出</a>
            </div>
        </el-col>
    </el-row>
</template>

<script>
export default {
    methods: {
        logout() {
            this.$confirm('是否退出系统?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                // 清除保存的登录信息 token
                window.localStorage.removeItem('token')
                // 跳转回登录页面
                this.$router.push('/login')
                this.$message({
                    type: 'success',
                    message: '退出成功!'
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消退出'
                });
            });
        }
    }
}
</script>

<style>
/* 头部样式 */

.e-h-title {
    text-align: center;
    font-size: 24px;
    color: #fff;
}

.e-h-logout {
    text-align: right;
    margin-right: 10px;
}

.e-h-logout a {
    color: #fff;
    text-decoration: none;
}
</style>
