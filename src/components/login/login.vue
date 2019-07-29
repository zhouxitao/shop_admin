<template>
  <el-row
    type='flex'
    justify='center'
    align='middle'
  >
    <el-form
      :model="loginForm"
      :rules="rules"
      ref="loginForm"
      :span='8'
    >
      <!-- 用户名 -->
      <el-form-item
        label="用户名"
        prop="username"
      >
        <el-input v-model="loginForm.username"></el-input>
      </el-form-item>
      <!-- 登录密码 -->
      <el-form-item
        label="密码"
        prop="password"
      >
        <el-input v-model="loginForm.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="startLogin()"
        >登录</el-button>
        <el-button @click="resetForm('loginForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-row>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入用户密码', trigger: 'blur' },
          { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    startLogin () {
      this.$refs.loginForm.validate((valid) => {
        console.log(valid)
        if (!valid) {
          this.$message({
            message: '登录失败',
            type: 'error',
            duration: 800
          })
        } else {
          axios.post('http://localhost:8888/api/private/v1/login', {
            username: this.loginForm.username,
            password: this.loginForm.password
          }).then(res => {
            console.log(res)
            if (res.data.meta.status === 200) {
              this.$message({
                message: '登录成功',
                type: 'success',
                duration: 800
              })
              localStorage.setItem('token', res.data.data.token)
              this.$router.push('/home')
            } else {
              this.$message({
                message: '登录失败，用户名 或者密码错误',
                type: 'error',
                duration: 800
              })
            }
          })
        }
      })
    },
    resetForm () {
      this.$refs.loginForm.resetFields()
    }
  }
}

</script>

<style scoped>
.el-row {
  height: 100%;
  background-color: #2d434c;
}
.el-form {
  background-color: #fff;
  padding: 10px 20px;
  border-radius: 15px;
}
</style>
