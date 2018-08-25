import Vue from 'vue'
import App from './App.vue'
//导入首页的组件
import Index from './components/01.index.vue'
//导入路由
import VueRouter from 'vue-router'
//引入element 插件
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

//注册路由
Vue.use(VueRouter);
//注册 element 插件
Vue.use(ElementUI);
//定义路由规则
let routes = [
  { path: '/',
  redirect: '/index' },
  { path: '/index',
   component: Index }
]
//创建实例化路由
let router = new VueRouter({
  routes
})
Vue.config.productionTip = false
//挂载
new Vue({
  render: h => h(App),
  router
}).$mount('#app')
