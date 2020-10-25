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
            <el-button type="primary" size="mini" :disabled="parentCateBtn">添加参数</el-button>
          </el-row>
          <el-table :data="manyParamsData" border stripe style="width: 100%">
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
            <el-button type="primary" size="mini" :disabled="parentCateBtn">添加属性</el-button>
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
                  @click="onlyHandleDelete(scope.row)"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </el-card>
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
    manyHandleEdit() {},
    manyHandleDelete() {},
    onlyHandleEdit() {},
    onlyHandleDelete() {},
  },
  computed: {
    parentCateBtn() {
      return this.parentCate.length !== 3 ? true : false;
    },
  },
};
</script>

<style lang="less" scoped>
.el-cascader {
  width: 30%;
}
</style>
