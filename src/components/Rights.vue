<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>随便写，后面会有优化这个组件的内容</el-breadcrumb-item>
      <el-breadcrumb-item>活动列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片组件 -->
    <el-card>
      <!-- 这是放表格组件的地方，先要有数据，才能写表格 -->
      <el-table :data="rights" style="width: 100%">
        <el-table-column label="#" type="index"> </el-table-column>
        <el-table-column prop="authName" label="权限名称"> </el-table-column>
        <el-table-column prop="path" label="路径"> </el-table-column>
        <el-table-column label="权限等级">
          <template slot-scope="scope">
            <el-tag size="medium" v-if="scope.row.level == '0'">一级</el-tag>
            <el-tag size="medium" v-if="scope.row.level == '1'" type="success">二级</el-tag>
            <el-tag size="medium" v-if="scope.row.level == '2'" type="warning">三级</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Rights',
  data() {
    return {
      rights: [],
    };
  },
  created() {
    this.getRigthList();
  },
  methods: {
    async getRigthList() {
      const { data: res } = await this.$http.get('/rights/list');
      if (res.meta.status !== 200) return this.$message.error('获取列表数据失败');
      this.rights = res.data;
      // 先打印，看看有没有报错，在往下写
      console.log(this.rights);
    },
  },
};
</script>

<style lang="less" scoped>
.el-card {
  margin: 15px 0;
}
</style>
