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
    parentCateHandleChange(val) {
      console.log(val);
    },
  },
};
</script>

<style lang="less" scoped>
.el-cascader {
  width: 30%;
}
</style>
