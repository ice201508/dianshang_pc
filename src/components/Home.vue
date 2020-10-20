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
      <el-aside width="200px">Aside</el-aside>
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
