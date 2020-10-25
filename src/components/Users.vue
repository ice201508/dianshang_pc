<template>
  <div class="user">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>活动管理</el-breadcrumb-item>
      <el-breadcrumb-item>活动列表</el-breadcrumb-item>
      <el-breadcrumb-item>活动详情</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <!-- 表单搜索区域 -->
      <div class="input-box">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-input placeholder="请输入内容" v-model="query" clearable @clear="getUserList">
              <el-button slot="append" icon="el-icon-search" @click="getUserList"></el-button>
            </el-input>
          </el-col>
          <el-col :span="4">
            <el-button type="primary" @click="addUser">添加用户</el-button></el-col
          >
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
            <el-switch v-model="scope.row.mg_state" @change="toogleStatus(scope.row)"> </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="mini"
              icon="el-icon-edit"
              circle
              @click="showEditDialog(scope.row.id)"
            ></el-button>
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
    <!-- 这个是新增用户的弹出框 -->
    <el-dialog title="新增" :visible.sync="addUserDialog" width="50%" @close="resetForm">
      <el-form :model="addForm" :rules="addFormRules" ref="addForm" label-width="100px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addForm.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="addForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addUserDialog = false">取 消</el-button>
        <el-button type="primary" @click="addUserSubmit">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 这个是编辑用户的弹出框 -->
    <el-dialog title="编辑" :visible.sync="editUserDialog" width="50%" @close="resetForm">
      <el-form :model="editForm" :rules="addFormRules" ref="editForm" label-width="100px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="editForm.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="editForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editUserReset">取 消</el-button>
        <el-button type="primary" @click="editUserSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'Users',
  data() {
    const emailValidate = (rule, value, callback) => {
      const emailPattern = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;

      if (emailPattern.test(value)) {
        return callback();
      }
      callback(new Error('邮箱格式错误，请重新输入'));
    };
    const mobileValidate = (rule, value, callback) => {
      const mobilePattern = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;

      if (mobilePattern.test(value)) {
        return callback();
      }
      callback(new Error('手机格式错误，请重新输入'));
    };
    return {
      query: '',
      pagenum: 1,
      pagesize: 10,
      total: 0,
      userlist: [],
      addUserDialog: false,
      editUserDialog: false,
      editForm: {},
      addForm: {
        username: '',
        password: '',
        email: '',
        mobile: '',
      },
      addFormRules: {
        username: [
          { required: true, message: '请输入用户名称', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' },
        ],
        email: [{ validator: emailValidate, trigger: 'blur' }],
        mobile: [{ validator: mobileValidate, trigger: 'blur' }],
      },
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
    async toogleStatus(val) {
      // console.log(val);
      try {
        const { data: res } = await this.$http.put(`/users/${val.id}/state/${val.mg_state}`);
        if (!res.meta || res.meta.status !== 200) {
          val.mg_state = !val.mg_state;
          return this.$message.error('状态更新失败');
        }

        this.$message.success(res.meta.msg);
      } catch (err) {
        val.mg_state = !val.mg_state;
        this.$message.error('操作失败，请重试');
      }
    },
    addUser() {
      this.addUserDialog = true;
    },
    resetForm() {
      this.$refs['addForm'].resetFields();
    },
    addUserSubmit() {
      // this.addUserDialog = true
      this.$refs['addForm'].validate(async (valide) => {
        if (!valide) return this.$message.error('校验失败，请重新输入');
        const { data: res } = await this.$http.post('/users', this.addForm);
        if (!res.meta || res.meta.status !== 201) return this.$message.error('添加用户失败');
        this.addUserDialog = false;
        this.getUserList();
      });
    },
    async showEditDialog(id) {
      const { data: res } = await this.$http.get('users/' + id);
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg);

      this.editForm = res.data;
      this.editUserDialog = true;
    },
    editUserReset() {
      this.$refs['editForm'].resetFields();
      this.editUserDialog = false;
    },
    editUserSubmit() {
      this.$refs.editForm.validate(async (validator) => {
        if (!validator) return this.$message.error('表单数据格式有误，请修改数据');

        const { data: res } = await this.$http.put('/users/' + this.editForm.id, {
          id: this.editForm.id,
          email: this.editForm.email,
          mobile: this.editForm.mobile,
        });
        if (!validator) return this.$message.error(res.meta.msg);
        this.editUserDialog = false;
        this.getUserList();
      });
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
