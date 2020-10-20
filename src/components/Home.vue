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
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <div class="toggle-button" @click="toggleMenu">|||</div>
        <el-menu
          :default-active="activePath"
          unique-opened
          :collapse="isCollapse"
          :collapse-transition="false"
          :router="true"
          class="el-menu-vertical-demo"
          background-color="#333744"
          text-color="#fff"
          active-text-color="#409EFF"
        >
          <el-submenu :index="item.id + ''" v-for="item in menuList" :key="item.id">
            <template slot="title">
              <i :class="iconList[item.id]"></i>
              <span>{{ item.authName }}</span>
            </template>
            <el-menu-item
              :index="'/' + childItem.path"
              v-for="childItem in item.children"
              :key="childItem.id"
              @click="getActivePath('/' + childItem.path)"
            >
              <i class="el-icon-menu"></i>
              <span>{{ childItem.authName }}</span>
            </el-menu-item>
            <!-- <el-submenu index="1-4">
              <template slot="title">选项4</template>
              <el-menu-item index="1-4-1">选项1</el-menu-item>
            </el-submenu> -->
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      menuList: [],
      isCollapse: false,
      activePath: '',
      iconList: {
        '125': 'iconfont icon-user',
        '103': 'iconfont icon-tijikongjian',
        '101': 'iconfont icon-shangpin',
        '102': 'iconfont icon-danju',
        '145': 'iconfont icon-baobiao',
      },
    };
  },
  created() {
    this.getMenuList();
    this.activePath = window.sessionStorage.getItem('activePath');
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
    toggleMenu() {
      this.isCollapse = !this.isCollapse;
    },
    getActivePath(param) {
      this.activePath = param;
      window.sessionStorage.setItem('activePath', param);
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
  .toggle-button {
    font-size: 10px;
    color: #fff;
    padding: 5px 0;
    text-align: center;
    background-color: #4a5064;
    letter-spacing: 0.2em;
    cursor: pointer;
  }
  .el-menu {
    border-right: none;
  }
}
</style>
