<template>
  <el-card>
    <!-- 面包屑导航 -->
    <MyBread firstnav="权限管理" lastnav="角色列表"/>
    <!-- 添加按钮 -->
    <el-row class="myrow">
      <el-col :span="24">
        <el-button plain>添加角色</el-button>
      </el-col>
    </el-row>
    <!-- 表格区域 -->
    <el-table :data="rolesList" border style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="scope">
          <!-- 遍历数据源生成一级权限 -->
          <el-row v-for="item1 in scope.row.children" :key="item1.id">
            <el-col :span="5">
              <el-tag
                @close="deleteRoles(scope.row.id, item1.id, scope.row)"
                :closable="true"
              >{{item1.authName}}-{{item1.id}}</el-tag>
              <i class="el-icon-arrow-right"></i>
            </el-col>
            <el-col :span="19">
              <!-- 遍历数据源生成二级权限 -->
              <el-row v-for="item2 in item1.children" :key="item2.id">
                <el-col :span="6">
                  <el-tag
                    @close="deleteRoles(scope.row.id ,item2.id, scope.row)"
                    :closable="true"
                    type="success"
                  >{{item2.authName}}-{{item2.id}}</el-tag>
                  <i class="el-icon-arrow-right"></i>
                </el-col>
                <el-col :span="18">
                  <el-tag
                    @close="deleteRoles(scope.row.id, item3.id, scope.row)"
                    type="warning"
                    :closable="true"
                    v-for="item3 in item2.children"
                    :key="item3.id"
                  >{{item3.authName}}-{{item3.id}}</el-tag>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <!-- 当没有权限数据时的处理 -->
          <span v-if="scope.row.children.length ===0">没有分配权限</span>
        </template>
      </el-table-column>
      <el-table-column type="index"></el-table-column>
      <el-table-column prop="roleName" label="角色名称"></el-table-column>
      <el-table-column prop="roleDesc" label="角色描述"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button plain size="mini" type="primary" icon="el-icon-edit"></el-button>
          <el-button plain size="mini" type="danger" icon="el-icon-delete"></el-button>
          <el-button
            @click="setRole(scope.row.children, scope.row.id)"
            plain
            size="mini"
            type="success"
            icon="el-icon-check"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分配权限面板 -->
    <el-dialog title="分配权限" :visible.sync="roleDialog">
      <el-tree
        ref="mytree"
        :default-expand-all="true"
        :default-checked-keys="defaultCheck"
        :data="rightList"
        node-key="id"
        :props="props"
        show-checkbox
      ></el-tree>
      <div slot="footer" class="dialog-footer">
        <el-button @click="roleDialog = false">取 消</el-button>
        <el-button type="primary" @click="setRights">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      loading: true,
      rolesList: [],
      roleDialog: false,
      props: {
        label: "authName",
        children: "children"
      },
      rightList: [],
      defaultCheck: [],
      roleId: ""
    };
  },
  methods: {
    // 得到所有的角色数据
    async getRolesList() {
      var res = await this.$http.request({
        url: "/roles",
        method: "get",
        headers: {
          Authorization: window.localStorage.getItem("token")
        }
      });
      var { meta, data } = res.data;
      if (meta.status === 200) {
        this.rolesList = data;
      } else {
        this.$message.error(meta.msg);
      }
    },
    // 删除角色对应的权限
    async deleteRoles(roleId, rightId, dataList) {
      var res = await this.$http.request({
        url: `roles/${roleId}/rights/${rightId}`,
        method: "delete",
        headers: {
          Authorization: window.localStorage.getItem("token")
        }
      });
      var { meta, data } = res.data;
      if (meta.status === 200) {
        this.$message({
          message: meta.msg,
          type: "success"
        });
        dataList.children = data;
      } else {
        this.$message.error(meta.msg);
      }
    },
    setRole(rights, id) {
      this.roleId = id;
      this.defaultCheck = [];
      this.roleDialog = true;
      this.getAllRight();
      rights.forEach(item1 => {
        item1.children.forEach(item2 => {
          item2.children.forEach(item3 => {
            this.defaultCheck.push(item3.id);
          });
        });
      });
    },
    // 得到所有的权限数据
    async getAllRight() {
      var res = await this.$http.request({
        url: `/rights/tree`,
        method: "get",
        headers: {
          Authorization: window.localStorage.getItem("token")
        }
      });
      var { meta, data } = res.data;
      if (meta.status === 200) {
        this.rightList = data;
      } else {
        this.$message.error(meta.msg);
      }
    },
    // 设置权限
    async setRights() {
      var allcheck = this.$refs.mytree.getCheckedKeys();
      var halfcheck = this.$refs.mytree.getHalfCheckedKeys();
      var newArr = halfcheck.concat(allcheck);
      var ids = newArr.join(",");
      var res = await this.$http.request({
        url: `roles/${this.roleId}/rights`,
        method: "post",
        data: {
          rids: ids
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
      this.roleDialog = false;
      this.getRolesList();
    }
  },
  mounted() {
    this.getRolesList();
  }
};
</script>

<style>
.myrow {
  margin: 15px 0;
}

.el-tag {
  margin-top: 10px;
  margin-left: 10px;
}
</style>
