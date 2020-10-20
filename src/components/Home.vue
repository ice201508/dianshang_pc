<template>
  <el-container class="">
    <el-header>
      <div class="con-logo">
        <img src="../assets/heima.png" />
        <span>电商后台管理系统</span>
      </div>
      <el-button type="info" @click="loginOut">退出</el-button>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          background-color="#333744"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-submenu :index="item.id + ''" v-for="item in menuList" :key="item.id">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{ item.authName }}</span>
            </template>
            <el-menu-item
              :index="item.id + '-' + childItem.id"
              v-for="childItem in item.children"
              :key="childItem.id"
            >
              <i class="el-icon-location"></i>
              <span>{{ childItem.authName }}</span>
            </el-menu-item>
            <!-- <el-submenu index="1-4">
              <template slot="title">选项4</template>
              <el-menu-item index="1-4-1">选项1</el-menu-item>
            </el-submenu> -->
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      menuList: [],
    };
  },
  created() {
    this.getMenuList();
  },
  methods: {
    loginOut() {
      window.sessionStorage.clear();
      this.$router.push('/login');
    },
    async getMenuList() {
      const { data: res } = await this.$http('/menus');
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg);

      this.menuList = res.data;
    },
  },
};
</script>

<style lang="less" scoped>
.el-container {
  height: 100%;
}
.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .con-logo {
    margin-left: -20px;
    display: flex;
    align-items: center;
    img {
      height: 60px;
    }
    span {
      margin-left: 20px;
      // vertical-align: middle;
      // text-align: middle;
      font-size: 22px;
      color: #fff;
    }
  }
}
.el-aside {
  background-color: #333744;
}
</style>
