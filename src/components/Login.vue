<template>
  <div class="login-l90-wrap">
    <div class="login-box"></div>
  </div>
</template>

<script>
export default {
  name: 'Login',
};
</script>

<style lang="less" scoped>
.login-l90-wrap {
  height: 100%;
  background-color: #2b4b6b;
  position: relative;
  // display: flex;
  // flex-direction: row;
  // justify-content: center;
  // align-items: center;
}
.login-box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 5px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
