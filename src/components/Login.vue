<template>
  <div class="login-l90-wrap">
    <div class="login-box">
      <!-- 显示图片区域 -->
      <div class="touxiang-box">
        <img src="../assets/logo.png" alt="登录" />
      </div>
      <!-- 显示表单区域 -->
    </div>
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

  .touxiang-box {
    width: 130px;
    height: 130px;
    background-color: #fff;
    border: 1px solid #ccc;
    overflow: hidden;
    border-radius: 50%;
    padding: 10px;
    position: absolute;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    box-shadow: 0 0 8px #ccc;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eee;
    }
  }
}
</style>
