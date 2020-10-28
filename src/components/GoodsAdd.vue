<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>活动管理</el-breadcrumb-item>
      <el-breadcrumb-item>活动列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片 -->
    <el-card>
      <el-alert title="添加商品信息" type="info" show-icon center> </el-alert>

      <!-- 这个是步骤条 -->
      <!-- 步骤条是根据 active 这个数组的索引来控制当前谁高亮 -->
      <el-steps :space="200" align-center :active="active" finish-status="success">
        <el-step title="基本信息"></el-step>
        <el-step title="商品参数"></el-step>
        <el-step title="商品属性"></el-step>
        <el-step title="基本图片"></el-step>
        <el-step title="商品内容"></el-step>
        <el-step title="商品完成"></el-step>
      </el-steps>

      <!-- 这个是tab标签页， 竖形结构 -->
      <!-- el-tabs 和 el-form标签组合使用，那么 el-form要包裹着el-tabs  -->
      <!-- :inline="true" -->
      <!-- label-width 的使用，非常的麻烦 -->
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
        <el-tabs tab-position="left" @tab-click="handleTab">
          <el-tab-pane label="基本信息" name="0">
            <el-form-item label="商品名称" prop="goods_name">
              <el-input v-model="ruleForm.goods_name"></el-input>
            </el-form-item>
            <el-form-item label="商品价格" prop="goods_price">
              <el-input v-model="ruleForm.goods_price"></el-input>
            </el-form-item>
            <el-form-item label="商品重量" prop="goods_weight">
              <el-input v-model="ruleForm.goods_weight"></el-input>
            </el-form-item>
            <el-form-item label="商品数量" prop="goods_number">
              <el-input v-model="ruleForm.goods_number"></el-input>
            </el-form-item>
            <el-form-item label="商品分类">
              <el-input v-model="ruleForm.goods_name"></el-input>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品参数" name="1">商品参数</el-tab-pane>
          <el-tab-pane label="商品属性" name="2">商品属性</el-tab-pane>
          <el-tab-pane label="商品图片" name="3">商品图片</el-tab-pane>
          <el-tab-pane label="商品内容" name="4">商品内容</el-tab-pane>
        </el-tabs>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'GoodsAdd',
  data() {
    return {
      active: 0,
      // 这里我们在定义表单绑定的值的时候，要看接口文档，找变量名称
      ruleForm: {
        goods_name: '',
        goods_cat: '',
        goods_price: '',
        goods_number: 0,
        goods_weight: '',
        goods_introduce: '',
        pics: null,
        attrs: [],
      },
      rules: {
        goods_name: [{ required: true, message: '请输入商品名称', trigger: 'blur' }],
        goods_cat: [{ required: true, message: '请输入商品名称', trigger: 'blur' }],
        goods_price: [{ required: true, message: '请输入商品名称', trigger: 'blur' }],
        goods_number: [{ required: true, message: '请输入商品名称', trigger: 'blur' }],
        goods_weight: [{ required: true, message: '请输入商品名称', trigger: 'blur' }],
      },
    };
  },
  methods: {
    handleTab(tab) {
      console.log(tab);
      this.active = parseInt(tab.name, 10);
    },
  },
};
</script>

<style lang="less" scoped>
.el-steps {
  margin: 15px 0;
}
</style>
