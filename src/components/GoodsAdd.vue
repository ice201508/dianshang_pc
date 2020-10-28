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
      <el-steps :space="200" align-center :active="active - 0" finish-status="success">
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
        <el-tabs
          tab-position="left"
          v-model="active"
          :before-leave="beforeLeaveTabs"
          @tab-click="tabClick"
        >
          <el-tab-pane label="基本信息" name="0">
            <el-form-item label="商品名称" prop="goods_name">
              <el-input v-model="ruleForm.goods_name"></el-input>
            </el-form-item>
            <el-form-item label="商品价格" prop="goods_price">
              <el-input v-model="ruleForm.goods_price" type="number"></el-input>
            </el-form-item>
            <el-form-item label="商品重量" prop="goods_weight">
              <el-input v-model="ruleForm.goods_weight" type="number"></el-input>
            </el-form-item>
            <el-form-item label="商品数量" prop="goods_number">
              <el-input v-model="ruleForm.goods_number" type="number"></el-input>
            </el-form-item>
            <el-form-item label="商品分类" prop="parentCate">
              <el-cascader
                v-model="parentCate"
                :options="parentCateOptions"
                @change="parentCateHandleChange"
                :props="{ label: 'cat_name', value: 'cat_id', children: 'children' }"
                clearable
              >
              </el-cascader>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品参数" name="1">
            <div v-for="item in goodsParams" :key="item.attr_id">
              <p>{{ item.attr_name }}</p>
              <!-- <el-tag v-for="(childItem, index) in item.new_attr_vals" :key="index">{{
                childItem
              }}</el-tag> -->
              <el-checkbox-group v-model="item.new_attr_vals">
                <el-checkbox
                  :label="childItem"
                  v-for="(childItem, index) in item.new_attr_vals"
                  :key="index"
                  border
                ></el-checkbox>
              </el-checkbox-group>
            </div>
          </el-tab-pane>
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
      active: '0',
      parentCate: [],
      parentCateOptions: [],
      goodsParams: [],
      // 这里我们在定义表单绑定的值的时候，要看接口文档，找变量名称
      ruleForm: {
        goods_name: '',
        goods_cat: '',
        goods_price: 0,
        goods_number: 0,
        goods_weight: 0,
        goods_introduce: '',
        pics: null,
        attrs: [],
      },
      rules: {
        goods_name: [{ required: true, message: '请输入商品名称', trigger: 'blur' }],
        goods_price: [{ required: true, message: '请输入商品价格', trigger: 'blur' }],
        goods_cat: [{ required: true, message: '请输入商品属性', trigger: 'blur' }],
        goods_number: [{ required: true, message: '请输入商品数量', trigger: 'blur' }],
        goods_weight: [{ required: true, message: '请输入商品重量', trigger: 'blur' }],
        parentCate: [{ required: true, message: '请输入商品分类', trigger: 'blur' }],
      },
    };
  },
  created() {
    this.getGoodsCate();
  },
  methods: {
    async getGoodsCate() {
      const { data: res } = await this.$http.get('categories', {
        params: { type: 3 },
      });
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg);

      this.parentCateOptions = res.data;
    },
    parentCateHandleChange(val) {
      if (val.length != 3) {
        this.parentCate = [];
      }
    },
    async getParamsList() {
      let id = this.parentCate[2];
      const { data: res } = await this.$http.get(`categories/${id}/attributes`, {
        params: {
          sel: 'many',
        },
      });
      res.data.forEach((item) => {
        let str = item.attr_vals ? item.attr_vals.split(' ') : [];
        this.$set(item, 'new_attr_vals', str);
      });
      this.goodsParams = res.data;
    },
    beforeLeaveTabs(newAc, oldAc) {
      if (oldAc === '0' && this.parentCate.length !== 3) {
        this.$message.error('请先选择分类在切换');
        return false;
      }
    },
    tabClick(val) {
      if (val.name == '1') {
        this.getParamsList();
      }
    },
  },
};
</script>

<style lang="less" scoped>
.el-steps {
  margin: 15px 0;
}
.el-tag {
  margin-right: 15px;
  margin-bottom: 15px;
}
.el-checkbox.is-bordered + .el-checkbox.is-bordered {
  margin-left: 0;
  margin-bottom: 10px;
}
</style>
