import Vue from 'vue'
import App from './App.vue'

// 安装vuerouter
import VueRouter from 'vue-router'

// 引入路由
import router from './router.js'

// 引入element
import elementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 引入axios
import axios from 'axios'

// 引入公共css
import './assets/common.css'

// 把axios挂载到原型上，以后都可以使用了
Vue.prototype.$axios = axios

// 问题1----设置全局axios，解决输入默认基准地址
axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'

// 问题2----解决输入请求头token
axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  config.headers.Authorization = localStorage.getItem('token')
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

Vue.use(elementUi)
Vue.use(VueRouter)
Vue.config.productionTip = false
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
