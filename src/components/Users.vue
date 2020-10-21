<template>
  <div class="user">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>活动管理</el-breadcrumb-item>
      <el-breadcrumb-item>活动列表</el-breadcrumb-item>
      <el-breadcrumb-item>活动详情</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <!-- 表单搜索区域 -->
      <div class="input-box">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-input placeholder="请输入内容">
              <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
          </el-col>
          <el-col :span="4"> <el-button type="primary">添加用户</el-button></el-col>
        </el-row>
      </div>
      <!-- table数据区域 -->

      <el-table :data="userlist" style="width: 100%" stripe border>
        <el-table-column type="index" :index="myselfIndex" label="#"> </el-table-column>
        <el-table-column prop="username" label="姓名"> </el-table-column>
        <el-table-column prop="email" label="邮箱"> </el-table-column>
        <el-table-column prop="mobile" label="电话"> </el-table-column>
        <el-table-column prop="role_name" label="角色"> </el-table-column>
        <el-table-column prop="mg_state" label="状态">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.mg_state"> </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope>
            <el-button type="primary" size="mini" icon="el-icon-edit" circle></el-button>
            <el-button type="danger" size="mini" icon="el-icon-delete" circle></el-button>
            <el-tooltip class="item" effect="dark" content="分配角色" placement="top">
              <el-button type="warning" size="mini" icon="el-icon-setting" circle></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页插件 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pagenum"
        :page-sizes="[5, 10, 30, 50]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Users',
  data() {
    return {
      query: '',
      pagenum: 1,
      pagesize: 10,
      total: 0,
      userlist: [],
    };
  },
  created() {
    this.getUserList();
  },
  methods: {
    myselfIndex(index) {
      return index + 1;
    },
    async getUserList() {
      const { data: res } = await this.$http.get('/users', {
        params: {
          query: this.query,
          pagenum: this.pagenum,
          pagesize: this.pagesize,
        },
      });
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg);

      this.userlist = res.data.users;
      this.total = res.data.total;
    },
    handleSizeChange(val) {
      this.pagesize = val;
      this.getUserList();
    },
    handleCurrentChange(val) {
      this.pagenum = val;
      this.getUserList();
    },
  },
};
</script>

<style lang="less" scoped>
.el-card {
  margin: 15px 0;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15);
}
.input-box {
  margin-bottom: 15px;
}
.el-pagination {
  margin: 15px 0;
}
</style>
