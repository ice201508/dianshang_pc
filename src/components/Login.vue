<template>
  <div class="login-l90-wrap">
    <div class="login-box">
      <!-- 显示图片区域 -->
      <div class="touxiang-box">
        <img src="../assets/logo.png" alt="登录" />
      </div>
      <!-- 显示表单区域 -->
      <el-form ref="loginFormRef" :model="loginForm" :rules="rules" class="login-form">
        <el-form-item prop="username">
          <!-- <el-input prefix-icon="el-icon-user-solid"></el-input> -->
          <el-input v-model="loginForm.username">
            <i slot="prefix" class="el-input__icon iconfont icon-user"></i>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <!-- <el-input prefix-icon="el-icon-lock"></el-input> -->
          <el-input v-model="loginForm.password">
            <i slot="prefix" class="el-input__icon iconfont iconzuopin"></i>
          </el-input>
        </el-form-item>
        <el-form-item class="login-btn">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      loginForm: {
        username: 'admin',
        password: '123456',
      },
      aaa: 444,
      rules: {
        username: [
          { required: true, message: '请输入用户名称名称', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' },
        ],
      },
    };
  },
  methods: {
    login() {
      this.$refs.loginFormRef.validate(async (valid) => {
        if (!valid) return this.$message.error('请输入符合格式要求的用户名和密码');

        const { data: res } = await this.$http.post('/login', this.loginForm);
        if (res.meta.status !== 200) {
          return this.$message.error(res.meta.msg);
        }
        this.$message.success('登录成功');
        window.sessionStorage.setItem('token', res.data.token);

        this.$router.push('/home');
      });
    },
    resetLoginForm() {
      this.$refs.loginFormRef.resetFields();
      console.log(this.$refs.loginFormRef);
    },
  },
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
  .login-form {
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
    .login-btn {
      text-align: right;
    }
  }
}
</style>
