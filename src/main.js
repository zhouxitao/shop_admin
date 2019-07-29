import Vue from 'vue'
import App from './App.vue'

// 安装vuerouter
import VueRouter from 'vue-router'

// 引入路由
import router from './router.js'

// 引入element
import elementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 引入公共css
import './assets/common.css'
Vue.use(elementUi)
Vue.use(VueRouter)
Vue.config.productionTip = false
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
