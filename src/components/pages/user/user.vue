<template>
  <el-card>
    <!-- 面包屑导航 -->
    <MyBread firstnav="用户管理" lastnav="用户列表" />
    <!-- 搜索框 -->
    <el-row class="search">
      <el-col :span="8">
        <el-input placeholder="请输入内容" v-model="search" class="input-with-select">
          <el-button slot="append" icon="el-icon-search" @click="serachData"></el-button>
        </el-input>
      </el-col>
      <el-col :span="16">&nbsp;&nbsp;
        <el-button type="success" plain @click="addDialog=true">添加用户</el-button>
      </el-col>
    </el-row>
    <!-- 表格区域 -->
    <el-table :data="dataList" border style="width: 100%">
      <el-table-column type="index"></el-table-column>
      <el-table-column prop="username" label="姓名"></el-table-column>
      <el-table-column prop="email" label="邮箱"></el-table-column>
      <el-table-column prop="mobile" label="电话"></el-table-column>
      <el-table-column label="用户状态">
        <template slot-scope="scope">
          {{ scope.row.id }}
          <el-switch
            @change="change(scope.row.id, scope.row.mg_state)"
            v-model="scope.row.mg_state"
          ></el-switch>
          <!-- scope.row: 当前行的数据源对象 -->
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作" width="200">
        <template slot-scope="scope">
          <el-button
            @click="openEidt(scope.row.id)"
            plain
            size="mini"
            type="primary"
            icon="el-icon-edit"
          ></el-button>
          <el-button
            @click="del(scope.row.id)"
            plain
            size="mini"
            type="danger"
            icon="el-icon-delete"
          ></el-button>
          <el-button
            @click="role(scope.row.id)"
            plain
            size="mini"
            type="success"
            icon="el-icon-check"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页组件 -->
    <el-pagination
      @current-change="currentChange"
      @size-change="sizeChange"
      :current-page="pagenum"
      :page-sizes="[5, 10]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
    <!-- 新增的弹框区域 -->
    <el-dialog title="新增用户" :visible.sync="addDialog">
      <el-form ref="myform" :model="addObj" label-position="right">
        <el-form-item label="用户名" label-width="100px">
          <el-input v-model="addObj.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="100px">
          <el-input v-model="addObj.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" label-width="100px">
          <el-input v-model="addObj.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" label-width="100px">
          <el-input v-model="addObj.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancle">取 消</el-button>
        <el-button type="primary" @click="add">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="修改用户" :visible.sync="editDialog">
      <el-form ref="myform" :model="editObj" label-position="right">
        <el-form-item label="用户名" label-width="100px">
          <el-input :disabled="true" v-model="editObj.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" label-width="100px">
          <el-input v-model="editObj.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" label-width="100px">
          <el-input v-model="editObj.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editcancle">取 消</el-button>
        <el-button type="primary" @click="edit">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="分配角色" :visible.sync="roleDialog">
      <el-form ref="myform" :model="roleObj" label-position="right">
        <el-form-item label="用户名" label-width="100px">
          <el-input :disabled="true" v-model="roleObj.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色设置" label-width="100px">
          {{roleObj.rid}}
          <el-select v-model="roleObj.rid" placeholder="请选择">
            <el-option :disabled="true" label="请选择角色" :value="-1"></el-option>
            <el-option
              v-for="item in rolesList"
              :key="item.id"
              :label="item.roleName"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="roleDialog=false">取 消</el-button>
        <el-button type="primary" @click="setRole">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      search: "",
      pagesize: 5,
      pagenum: 1,
      dataList: [],
      total: 0,
      addDialog: false,
      editDialog: false,
      roleDialog: false,
      addObj: {
        username: "",
        password: "",
        email: "",
        mobile: ""
      },
      editObj: {},
      roleObj: {},
      rolesList: []
    };
  },
  methods: {
    async getAllList() {
      var res = await this.$http.get(
        `/users?pagenum=${this.pagenum}&pagesize=${this.pagesize}&query=${
          this.search
        }`,
        {
          headers: {
            Authorization: window.localStorage.getItem("token")
          }
        }
      );
      var { meta, data } = res.data;
      if (meta.status === 200) {
        this.dataList = data.users;
        this.total = data.total;
      }
    },
    sizeChange(size) {
      this.pagesize = size;
      this.getAllList();
    },
    currentChange(num) {
      this.pagenum = num;
      this.getAllList();
    },
    serachData() {
      this.getAllList();
    },
    async add() {
      var res = await this.$http.request({
        url: "/users",
        method: "post",
        data: {
          ...this.addObj
        },
        headers: {
          Authorization: window.localStorage.getItem("token")
        }
      });
      var { meta } = res.data;
      if (meta.status === 201) {
        this.getAllList();
        this.$message({
          message: meta.msg,
          type: "success"
        });
      } else {
        this.$message.error(meta.msg);
      }
      this.addDialog = false;
      this.clearDate(this.addObj);
    },
    clearDate(obj) {
      for (var item in obj) {
        obj[item] = "";
      }
    },
    cancle() {
      this.addDialog = false;
      this.clearDate(this.addObj);
    },
    async change(id, statu) {
      var res = await this.$http.request({
        url: `/users/${id}/state/${statu}`,
        method: "put",
        headers: {
          Authorization: window.localStorage.getItem("token")
        }
      });
      var { meta } = res.data;
      if (meta.status === 200) {
        this.$message({
          message: meta.msg,
          type: "success"
        });
      } else {
        this.$message.error(meta.msg);
      }
    },
    async openEidt(id) {
      this.editDialog = true;
      var res = await this.$http.request({
        url: `/users/${id}`,
        method: "get",
        headers: {
          Authorization: window.localStorage.getItem("token")
        }
      });
      var { meta, data } = res.data;
      if (meta.status === 200) {
        this.editObj = data;
      } else {
        this.$message.error(meta.msg);
      }
    },
    async edit() {
      var res = await this.$http.request({
        url: `/users/${this.editObj.id}`,
        method: "put",
        data: {
          email: this.editObj.email,
          mobile: this.editObj.mobile
        },
        headers: {
          Authorization: window.localStorage.getItem("token")
        }
      });
      var { meta } = res.data;
      if (meta.status === 200) {
        this.$message({
          message: meta.msg,
          type: "success"
        });
      } else {
        this.$message.error(meta.msg);
      }
      this.editDialog = false;
      this.editObj = {};
      this.getAllList();
    },
    editcancle() {
      this.editDialog = false;
      this.editObj = {};
    },
    del(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          var res = await this.$http.request({
            url: `/users/${id}`,
            method: "delete",
            headers: {
              Authorization: window.localStorage.getItem("token")
            }
          });
          var { meta } = res.data;
          if (meta.status === 200) {
            this.$message({
              message: meta.msg,
              type: "success"
            });
            this.getAllList();
          } else {
            this.$message.error(meta.msg);
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    async role(id) {
      this.getRoleList();
      this.roleDialog = true;
      var res = await this.$http.request({
        url: `/users/${id}`,
        method: "get",
        headers: {
          Authorization: window.localStorage.getItem("token")
        }
      });
      var { meta, data } = res.data;
      if (meta.status === 200) {
        this.roleObj = data;
      } else {
        this.$message.error(meta.msg);
      }
    },
    async getRoleList() {
      var res = await this.$http.request({
        url: `/roles`,
        method: "get",
        headers: {
          Authorization: window.localStorage.getItem("token")
        }
      });
      var { meta, data } = res.data;
      if (meta.status === 200) {
        this.rolesList = data;
      } else {
        this.$message.error("数据查询失败");
      }
    },
    async setRole() {
      var res = await this.$http.request({
        url: `users/${this.roleObj.id}/role`,
        method: "put",
        headers: {
          Authorization: window.localStorage.getItem("token")
        },
        data: {
          rid: this.roleObj.rid
        }
      });
      var { meta } = res.data;
      if (meta.status === 200) {
        this.$message({
          message: meta.msg,
          type: "success"
        });
        this.roleDialog = false;
        this.getAllList();
      } else {
        this.$message.error(meta.msg);
      }
    }
  },
  mounted() {
    this.getAllList();
  }
};
</script>

<style>
.search {
  margin: 15px 0;
}
</style>
