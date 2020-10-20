<template>
  <el-container class="">
    <el-header>header<el-button @click="loginOut">退出</el-button></el-header>
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
  background-color: #2b4b6b;
}
.el-aside {
  background-color: #2b4b6b;
}
</style>
