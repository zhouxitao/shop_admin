import Vue from 'vue'

// 引入路由
import VueRouter from 'vue-router'

// 引入login
import login from './components/login/login.vue'
// 引入home
import home from './components/home/home.vue'

// 引入用户列表
import users from './components/users/users.vue'
// 引入角色列表
import roles from './components/roles/roles.vue'
// 引入权限列表
Vue.use(VueRouter)
// 实例router+挂载
const router = new VueRouter({
  routes: [
    { path: '/login', component: login },
    {
      path: '/home',
      component: home,
      children: [
        { path: '/users', component: users },
        { path: '/roles', component: roles }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    next()
  } else {
    let token = localStorage.getItem('token')
    token ? next() : next('/login')
  }
})
export default router
