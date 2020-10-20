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
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>导航一</span>
            </template>
            <el-menu-item index="1-1-1">
              <i class="el-icon-location"></i>
              <span>子导航</span>
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
  methods: {
    loginOut() {
      window.sessionStorage.clear();
      this.$router.push('/login');
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
