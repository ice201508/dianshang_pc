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
      <!-- 搜索框 -->
      <!-- 当我们写一行html结构的时候， 推荐采用element-ui里面的24列栅格来布局 -->
      <!-- 行就是row  列就是col -->
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input
            v-model="queryInfo.query"
            clearable
            @clear="getGoodsList"
            placeholder="请输入搜索关键词"
          >
            <el-button slot="append" icon="el-icon-search" @click="getGoodsList"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <!-- 跳转路由有两种，一种叫声明式 <router-link :to="xxxx" /> -->
          <!-- 编程式就是使用js里面的，路由对象  this.$router.push(xxx) -->
          <el-button type="primary" @click="addGoods">添加商品</el-button>
        </el-col>
      </el-row>

      <!-- 商品列表表格 -->
      <el-table border stripe :data="goodsList" style="width: 100%">
        <el-table-column type="index" label="#"> </el-table-column>
        <el-table-column prop="goods_name" label="商品名称"> </el-table-column>
        <el-table-column label="商品价格(元)" width="160">
          <template slot-scope="scope">
            <span>{{ scope.row.goods_price | moneyFilter }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="goods_weight" label="商品重量" width="160"> </el-table-column>
        <el-table-column label="创建时间" width="220">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.add_time | timeFilter }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" content="编辑操作" placement="top">
              <el-button
                size="mini"
                type="primary"
                icon="el-icon-edit"
                circle
                @click="handleEdit(scope.row)"
              ></el-button>
            </el-tooltip>

            <el-tooltip class="item" effect="dark" content="删除" placement="top">
              <el-button
                size="mini"
                type="danger"
                icon="el-icon-goblet-full"
                circle
                @click="handleDelete(scope.row)"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页插件 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[5, 10, 20, 40]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Goods',
  data() {
    return {
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 5,
      },
      goodsList: [],
      total: 0,
    };
  },
  created() {
    this.getGoodsList();
  },
  methods: {
    getGoodsList() {
      this.$http
        .get('goods', {
          params: this.queryInfo,
        })
        .then((res) => {
          this.goodsList = res.data.data.goods;
          this.total = res.data.data.total;
        });
    },
    handleSizeChange(val) {
      this.queryInfo.pagesize = val;
      this.getGoodsList();
    },
    handleCurrentChange(val) {
      this.queryInfo.pagenum = val;
      this.getGoodsList();
    },
    // 这两个方法 是表格里面的 删除和编辑
    // 常见的几个elementui的单词 primary success  info warning danger
    handleDelete(scope) {
      this.$confirm('<i class="el-icon-delete"></i>此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'danger',
        dangerouslyUseHTMLString: true,
      })
        .then(async () => {
          const { data: res } = await this.$http.delete('goods/' + scope.goods_id);
          if (res.meta.status !== 200) return this.$message.error(res.meta.msg);
          this.$message({
            type: 'success',
            message: '删除成功!',
          });
          this.getGoodsList();
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          });
        });
    },
    handleEdit() {},
    addGoods() {
      this.$router.push('/goods/add');
    },
  },
};
</script>

<style lang="less" scoped>
.el-row {
  margin-bottom: 15px;
}
.el-pagination {
  margin-top: 15px;
}
</style>
