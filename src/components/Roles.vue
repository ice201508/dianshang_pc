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
      <el-button>添加角色</el-button>

      <!-- 下面就是动态渲染数据的表格 -->
      <el-table :data="rolesList" style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="scope">
            <!-- 这里面就是点击前面按钮展开以后的内容放的地方，可以放任何内容 -->
            <!-- 注意这里是一个一级分类，就有一行，所有是循环多个el-row， 不是循环的内部元素 -->
            <!-- 每个循环都有索引号，一般是给动态设置类，或者索引使用的，不用可以不加 -->
            <el-row
              class="row-1 vertical-moddle"
              :class="['colr-red']"
              v-for="(item_1, index_1) in scope.row.children"
              :key="item_1.id"
            >
              <el-col :span="5">
                <el-tag>{{ item_1.authName }}</el-tag>
                <i class="el-icon-caret-right"></i>
              </el-col>
              <el-col :span="19">
                <!-- 注意栅格系统的嵌套，这是19列的col，我们把这个19列又当做一行，写一个el-row，里面再写两个列el-col -->
                <el-row
                  class="row-2 vertical-moddle"
                  v-for="(item_2, index_2) in item_1.children"
                  :key="item_2.id"
                >
                  <el-col :span="8">
                    <el-tag type="success">{{ item_2.authName }}</el-tag>
                    <i class="el-icon-caret-right"></i>
                  </el-col>
                  <el-col :span="16">
                    <!-- 因为三级分类下面已经没有四级分类了，到底了，所以就不需要在写el-row在分列了，如果有四级分类这里就还是要写el-row -->
                    <el-tag
                      type="warning"
                      v-for="item_3 in item_2.children"
                      :key="item_3.id"
                      closable
                      @close="deleteTags(scope.row, item_2.id)"
                      >{{ item_3.authName }}</el-tag
                    >
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column type="index"> </el-table-column>
        <el-table-column label="角色名称" prop="roleName"> </el-table-column>
        <el-table-column label="角色描述" prop="roleDesc"> </el-table-column>
        <el-table-column label="操作" width="300">
          <!-- 下面要写其他的组件，必须写插槽，而且是作用域插槽，需要去官网复制或者从其他页面复制过来 -->
          <template slot-scope>
            <el-button size="mini" type="primary" icon="el-icon-edit">编辑</el-button>
            <el-button size="mini" type="danger" icon="el-icon-delete">删除</el-button>
            <el-button size="mini" type="warning" icon="el-icon-setting">分配角色</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Roles',
  data() {
    return {
      rolesList: [],
    };
  },
  created() {
    this.getRolesList();
  },
  methods: {
    async getRolesList() {
      const { data: res } = await this.$http.get('/roles');

      if (res.meta.status !== 200) return this.$message.error('获取角色列表失败');
      this.rolesList = res.data;
      console.log(this.rolesList);
    },
    deleteTags(scope, id) {
      this.$confirm('是否删除当前权限?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(async () => {
          // 如果请求参数没有： 1. 在data里面去找有没有 2. 在props里面找 3. 通过函数传参
          const { data: res } = await this.$http.delete(`roles/${scope.id}/rights/${id}`);

          if (res.meta.status !== 200) this.$message.error('删除失败，请重试');

          // 这里不能调用 this.getRolesList() 会让table收起来，因为是更新的所有数据； 我们为了让他不收起来，只能更新局部的数据
          scope.children = res.data;
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
  },
};
</script>

<style lang="less" scoped>
.el-tag {
  margin: 7px;
}
.el-row.row-1 {
  // border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
}
.el-row.row-1:first-child {
  border-top: 1px solid #eee;
}
.el-row.row-2 {
  // border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
}
.el-row.row-2:first-child {
  border-top: 1px solid #eee;
}
.el-row.row-2:last-child {
  border-bottom: none;
}
.colr-red {
  color: #000;
}
</style>
