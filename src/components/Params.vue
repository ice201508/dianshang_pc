<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片区域 -->
    <el-card>
      <el-alert title="注意：只允许为第三级分类设置相关参数！" type="warning" show-icon> </el-alert>
      <div>
        <span>选择商品分类：</span>
        <el-cascader
          v-model="parentCate"
          :options="parentCateOptions"
          @change="parentCateHandleChange"
          :props="{ label: 'cat_name', value: 'cat_id', children: 'children' }"
          clearable
        >
        </el-cascader>
      </div>
      <!-- 标签页的选择 -->
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="动态参数" name="many">
          <el-row>
            <el-button
              type="primary"
              size="mini"
              :disabled="parentCateBtn"
              @click="addParamDialogVisible = true"
              >添加参数</el-button
            >
          </el-row>
          <el-table :data="manyParamsData" border stripe style="width: 100%">
            <el-table-column type="expand" width="50">
              <template slot-scope="scope">
                <div>
                  <el-tag
                    :key="tag"
                    v-for="tag in scope.row.new_attr_vals"
                    closable
                    :disable-transitions="false"
                    @close="handleClose(tag)"
                  >
                    {{ tag }}
                  </el-tag>
                  <el-input
                    class="input-new-tag"
                    v-if="scope.row.inputVisible"
                    v-model.trim="scope.row.inputValue"
                    ref="saveTagInput"
                    size="small"
                    @keyup.enter.native="handleInputConfirm(scope.row)"
                    @blur="handleInputConfirm(scope.row)"
                  />
                  <el-button
                    v-else
                    class="button-new-tag"
                    size="small"
                    @click="showInput(scope.row)"
                    >+ New Tag</el-button
                  >
                </div>
              </template>
            </el-table-column>
            <el-table-column label="#" type="index" width="50"> </el-table-column>
            <el-table-column prop="attr_name" label="参数名称"> </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="primary"
                  icon="el-icon-edit"
                  @click="manyHandleEdit(scope.row)"
                  >编辑</el-button
                >
                <el-button
                  size="mini"
                  type="danger"
                  icon="el-icon-delete"
                  @click="manyHandleDelete(scope.row)"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="静态属性" name="only">
          <el-row>
            <el-button
              type="primary"
              size="mini"
              :disabled="parentCateBtn"
              @click="addParamDialogVisible = true"
              >添加属性</el-button
            >
          </el-row>
          <el-table :data="onlyParamsData" border stripe style="width: 100%">
            <el-table-column type="expand" width="50">
              <template>
                <div>
                  123
                </div>
              </template>
            </el-table-column>
            <el-table-column label="#" type="index" width="50"> </el-table-column>
            <el-table-column prop="attr_name" label="参数名称"> </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="primary"
                  icon="el-icon-edit"
                  @click="onlyHandleEdit(scope.row)"
                  >编辑</el-button
                >
                <el-button
                  size="mini"
                  type="danger"
                  icon="el-icon-delete"
                  @click="manyHandleDelete(scope.row)"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </el-card>

    <!-- 渲染添加属性和动态参数的对话框，共用一个 -->
    <el-dialog
      :title="'添加' + dynTitle"
      :visible.sync="addParamDialogVisible"
      width="50%"
      @close="paramDialogClose"
    >
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item :label="dynTitle" prop="attr_name">
          <el-input v-model="ruleForm.attr_name"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="addParamDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addDynParmas">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 渲染编辑 添加属性和动态参数的对话框，共用一个 -->
    <el-dialog
      :title="'编辑' + dynTitle"
      :visible.sync="editParamDialogVisible"
      width="50%"
      @close="editParamDialogClose"
    >
      <el-form
        :model="editRuleForm"
        :rules="rules"
        ref="editRuleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item :label="dynTitle" prop="attr_name">
          <el-input v-model="editRuleForm.attr_name"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="editParamDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editDynParmas">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'Params',
  data() {
    return {
      parentCate: [],
      parentCateOptions: [],
      activeName: 'many',
      manyParamsData: [],
      onlyParamsData: [],
      addParamDialogVisible: false,
      editParamDialogVisible: false,
      ruleForm: {
        attr_name: '',
      },
      editRuleForm: {
        attr_name: '',
      },
      rules: {
        attr_name: [{ required: true, message: '请输入活动名称', trigger: 'blur' }],
      },
    };
  },
  created() {
    this.getCateList();
  },
  methods: {
    async getCateList() {
      const { data: res } = await this.$http.get('categories');
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg);
      this.parentCateOptions = res.data;
    },
    async getParamsList() {
      if (this.parentCate.length !== 3) {
        this.parentCate = [];
        return null;
      }
      let id = this.parentCate[this.parentCate.length - 1];
      const { data: res } = await this.$http.get(`categories/${id}/attributes`, {
        params: { sel: this.activeName },
      });

      if (res.meta.status !== 200) return this.$message.error(res.meta.msg);
      res.data.forEach((item) => {
        let tmp = item.attr_vals ? item.attr_vals.split(' ') : [];
        this.$set(item, 'new_attr_vals', tmp);
        this.$set(item, 'inputVisible', false);
        this.$set(item, 'inputValue', '');
      });

      if (this.activeName === 'many') {
        this.manyParamsData = res.data;
      } else {
        this.onlyParamsData = res.data;
      }
    },
    // 这个是级联选择框的数据变化
    parentCateHandleChange(val) {
      this.getParamsList();
    },
    // 这个函数是点击切换tab按钮发生的变化
    handleClick() {
      this.getParamsList();
    },
    addDynParmas() {
      this.$refs.ruleForm.validate(async (isok) => {
        if (!isok) return this.$message.error('输入数据有误，请重新输入');

        let id = this.parentCate[this.parentCate.length - 1];
        const { data: res } = await this.$http.post(`categories/${id}/attributes`, {
          attr_name: this.ruleForm.attr_name,
          attr_sel: this.activeName,
        });
        if (res.meta.status !== 201) return this.$message.error('输入数据有误，请重新输入');

        this.getParamsList();
        this.addParamDialogVisible = false;
      });
    },
    editDynParmas() {
      this.$refs.editRuleForm.validate(async (isok) => {
        if (!isok) return this.$message.error('输入数据有误，请重新输入');

        let id = this.parentCate[this.parentCate.length - 1];
        const { data: res } = await this.$http.put(
          `categories/${id}/attributes/${this.editRuleForm.attr_id}`,
          {
            attr_name: this.editRuleForm.attr_name,
            attr_sel: this.activeName,
          }
        );
        if (res.meta.status !== 200) return this.$message.error('输入数据有误，请重新输入');

        this.getParamsList();
        this.editParamDialogVisible = false;
      });
    },
    paramDialogClose() {
      this.$refs.ruleForm.resetFields();
    },
    editParamDialogClose() {
      this.$refs.editRuleForm.resetFields();
    },
    manyHandleEdit(val) {
      this.editRuleForm = val;
      console.log(this.editRuleForm);
      this.editParamDialogVisible = true;
    },
    manyHandleDelete(val) {
      let id = this.parentCate[this.parentCate.length - 1];
      this.$confirm('是否确定删除当前参数?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(async () => {
          const { data: res } = await this.$http.delete(
            `categories/${id}/attributes/${val.attr_id}`
          );

          if (res.meta.status != 200) {
            return this.$message({
              type: 'error',
              message: '删除失败',
            });
          }

          this.getParamsList();
          this.$message({
            type: 'success',
            message: '删除成功!',
          });
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          });
        });
    },
    onlyHandleEdit(val) {
      this.editRuleForm = val;
      this.editParamDialogVisible = true;
    },
    handleClose(val) {
      console.log(val);
    },
    showInput(scope) {
      scope.inputVisible = true;
      this.$nextTick(() => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
      // setTimeout(()=>{
      //   this.$refs.saveTagInput.$refs.input.focus();
      // })
    },
    handleInputConfirm(scope) {
      if (scope.inputValue) {
        scope.new_attr_vals.push(scope.inputValue);
      }
      scope.inputVisible = false;
      scope.inputValue = '';
    },
  },
  computed: {
    parentCateBtn() {
      return this.parentCate.length !== 3 ? true : false;
    },
    dynTitle() {
      return this.activeName === 'many' ? '动态参数' : '静态属性';
    },
  },
};
</script>

<style lang="less" scoped>
.el-cascader {
  width: 30%;
}
.el-row {
  margin: 0 0 15px 0;
}
.el-tag {
  margin: 0 10px;
}
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
