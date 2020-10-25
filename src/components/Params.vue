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
        </el-tab-pane>
        <el-tab-pane label="静态属性" name="only">
          <el-row>
            <el-button type="primary" size="mini" :disabled="parentCateBtn">添加属性</el-button>
          </el-row>
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
      const { data: res } = await this.$http.get(
        `categories/${this.parentCate[this.parentCate.length - 1]}/attributes`,
        {
          params: { sel: this.activeName },
        }
      );
      console.log(res);
    },
    parentCateHandleChange(val) {
      if (val.length !== 3) {
        this.parentCate = [];
        return null;
      }

      this.getParamsList();
    },
    handleClick() {
      this.getParamsList();
    },
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
