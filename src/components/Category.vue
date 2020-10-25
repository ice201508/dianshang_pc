<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>活动管理</el-breadcrumb-item>
      <el-breadcrumb-item>活动列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片组件 -->
    <el-card>
      <el-row>
        <el-button type="primary" @click="addCategoryBtn">添加分类</el-button>
      </el-row>
      <!-- 表格 -->
      <!-- data属性就是放置我 动态数据的地方， 也就是显示的所有行 -->
      <!-- columns这个属性就是设置我们列的地方，也是一个数组，需要自己定义 -->
      <tree-table
        :data="categoryList"
        :columns="column"
        :selection-type="false"
        :expand-type="false"
        show-index
        index-text="#"
        border
        :show-row-hover="false"
      >
        <!--这里的作用域插槽前缀 scope 与 slot-scope -->
        <template slot="abc" slot-scope="scope">
          <div>
            <!-- <pre>{{ scope.row.cat_deleted }}</pre> -->
            <i
              class="el-icon-success"
              style="color: lightgreen; font-size: 18px"
              v-if="scope.row.cat_deleted === false"
            ></i>
            <i class="el-icon-error; font-size: 18px" style="red" v-else></i>
          </div>
        </template>
        <!-- 下面是排序的自定义插槽 -->
        <template slot="order" scope="scope">
          <div>
            <el-tag type="primary" v-if="scope.row.cat_level == 0">一级</el-tag>
            <el-tag type="success" v-else-if="scope.row.cat_level == 1">二级</el-tag>
            <el-tag type="warning" v-else>三级</el-tag>
          </div>
        </template>
        <!-- 下面是操作的自定义插槽 -->
        <template slot="handle">
          <div>
            <el-button size="mini" type="primary" icon="el-icon-edit">编辑</el-button>
            <el-button size="mini" type="danger" icon="el-icon-delete">删除</el-button>
          </div>
        </template>
      </tree-table>

      <!-- 分页-- 可以从官网，也可以从用户列表页面里面复制，团队风格更统一 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[3, 5, 10, 20]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>

      <!-- 下面是一个添加分类的弹出框， 复制过来 -->
      <el-dialog
        title="添加分类"
        :visible.sync="addCategorydialogVisible"
        width="50%"
        @close="closeCateDialog"
      >
        <el-form
          :model="addCategoryModel"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="分类名称" prop="cat_name">
            <el-input v-model.trim="addCategoryModel.cat_name"></el-input>
          </el-form-item>
          <el-form-item label="父级分类">
            <!-- :props="{ label: 'cat_name', value: 'cat_id', expandTrigger: 'click' }" -->
            <el-cascader
              v-model="parentCate"
              :options="parentCateOptions"
              @change="parentCateHandleChange"
              :props="{ checkStrictly: true }"
              clearable
            >
            </el-cascader>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addCategorydialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addCateBtn">确 定</el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Category',
  data() {
    return {
      queryInfo: {
        type: 3, // 这个是传递给后端，所我们要几级分类的数据
        pagenum: 1, //这个是分页必须要用的 当前页码值
        pagesize: 5, // 这个是分页插件 每页显示的数据条数
      },
      parentCate: [],
      parentCateOptions: [],
      categoryList: [], // 所有分类数据
      total: 0, // 总的数据条数
      addCategorydialogVisible: false, // 添加分类的弹出框
      column: [
        {
          label: '分类名称',
          prop: 'cat_name',
        },
        {
          label: '是否有效',
          prop: 'cat_deleted',
          // type表示这列我们采用自定义模板的形式，不用默认的文字显示
          type: 'template',
          // 下面是自己定义的插槽的名称，可以任意的写
          template: 'abc',
        },
        // 只要是写新列，就是和上面一模一样的， 如果有自定义插槽了，prop可以去掉
        {
          label: '排序',
          type: 'template',
          template: 'order', // 模板的名称，尽量和我们的label保持一致
        },
        {
          label: '操作',
          type: 'template',
          template: 'handle',
        },
      ],
      addCategoryModel: {
        cat_name: '',
        cat_pid: 0, // 分类的父id， 如果要添加一级分类，父分类id应该设置为零
        cate_level: 0, //分类层级 0 一级分类  1表示二级分类  2表示三级分类
      },
      rules: {
        cat_name: [{ required: true, message: '请输入分类名称', trigger: 'blur' }],
      },
    };
  },
  created() {
    this.getCategoryList();
  },
  methods: {
    async getCategoryList() {
      // 因为需要三个参数，所以我们定义data上面数据的时候，就直接将数据定义为一个对象，方便我们后面传参
      const { data: res } = await this.$http.get('categories', { params: this.queryInfo });

      if (res.meta.status !== 200) return this.$message.error(res.meta.msg);

      this.categoryList = res.data.result;
      this.total = res.data.total;
    },
    handleSizeChange(val) {
      this.queryInfo.pagenum = 1;
      this.queryInfo.pagesize = val;
      this.getCategoryList();
    },
    handleCurrentChange(val) {
      this.queryInfo.pagenum = val;
      this.getCategoryList();
    },
    async addCategoryBtn() {
      const { data: res } = await this.$http.get('/categories', {
        params: { type: 2 },
      });
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg);
      this.parentCateOptions = res.data;
      this.updateCateList(this.parentCateOptions);
      // this.parentCateOptions.forEach((item) => {
      //   this.$set(item, 'label', item.cat_name);
      //   this.$set(item, 'value', item.cat_id);
      //   item.children.forEach((item2) => {
      //     this.$set(item2, 'label', item2.cat_name);
      //     this.$set(item2, 'value', item2.cat_id);
      //   });
      // });
      this.addCategorydialogVisible = true;
    },
    updateCateList(list) {
      if (!list) {
        return;
      }
      list.forEach((item) => {
        this.$set(item, 'label', item.cat_name);
        this.$set(item, 'value', item.cat_id);
        this.updateCateList(item.children);
      });
    },
    parentCateHandleChange(val) {
      if (val.length >= 0) {
        this.addCategoryModel.cat_pid = val[val.length - 1];
        this.addCategoryModel.cate_level = val.length;
      } else {
        this.addCategoryModel.cat_pid = 0;
        this.addCategoryModel.cate_level = 0;
      }
    },
    addCateBtn() {
      console.log(this.parentCate);
      console.log(this.addCategoryModel);
      this.addCategorydialogVisible = false;
    },
    closeCateDialog() {
      this.parentCate = [];
      this.$refs.ruleForm.resetFields();
      this.addCategoryModel.cat_pid = 0;
      this.addCategoryModel.cate_level = 0;
    },
  },
};
</script>

<style lang="less" scoped>
.zk-table {
  margin: 15px 0;
}
.el-cascader {
  width: 100%;
}
</style>
