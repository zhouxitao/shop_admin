<template>
  <el-container>
    <!-- 头部 -->
    <el-header>
      <el-row>
        <!-- 左侧logo -->
        <el-col :span="8">
          <img src="../../assets/logo.png">
        </el-col>
        <!-- 中间部分 -->
        <el-col :span="8">
          <div class="grid-content bg-purple-light">
            <h1>后台管理系统</h1>
          </div>
        </el-col>
        <!-- 右侧logout -->
        <el-col
          :span="8"
          class='col3'
        >
          <div class="grid-content bg-purple">
            恭喜黑马前端程序猿44期月薪5万
            <a
              @click.prevent='logout'
              href="#"
            >退出</a>
          </div>
        </el-col>
      </el-row>
    </el-header>
    <!-- 内容部分 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside width="200px">
        <el-menu
          :router='true'
          :default-active="openUrlPath()"
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <!-- 用户列表 -->
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item index="/users">用户列表</el-menu-item>
          </el-submenu>
          <!-- 权限管理 -->
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item index="/roles">角色列表</el-menu-item>
            <el-menu-item index="/rights">权限列表</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 内容主体 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>

</template>

<script>
export default {
  data () {
    return {

    }
  },
  methods: {
    // 退出功能
    logout () {
      this.$confirm('此操作将退出系统, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '退出成功!',
          duration: 800
        })
        this.$router.push('/login')
        localStorage.removeItem('token')
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消退出',
          duration: 800
        })
      })
    },
    // 侧边栏
    openUrlPath () {
      // console.log(key, keyPath)
      return this.$route.path
    },
    handleClose (key, keyPath) {
      // console.log(key, keyPath)
    }
  }
}
</script>

<style lang='less'>
.el-header {
  background-color: #b3c1cd;
  padding: 0 !important;

  .el-col {
    height: 60px;
    line-height: 60px;

    h1 {
      font-size: 26px;
      color: #fff;
      text-align: center;
    }
    &.col3 {
      a {
        color: orange;
      }
    }
  }
}
.el-container {
  height: 100%;

  .el-aside {
    background-color: #545c64;
  }

  .el-main {
    background-color: #eaeef1;
  }
}
</style>
