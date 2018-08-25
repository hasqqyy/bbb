import Vue from 'vue'
import App from './App.vue'
//导入首页的组件
import Index from './components/01.index.vue'
//导入商品详情的组件
import detail from './components/02.productDetail.vue'
//导入路由
import VueRouter from 'vue-router'
//引入element 插件
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

//引入iview 插件
import iView from 'iview';
import 'iview/dist/styles/iview.css';


//引入懒加载
import VueLazyload from 'vue-lazyload';
//注册懒加载啊
Vue.use(VueLazyload, {
  preLoad: 1.3,
  // error: 'dist/error.png',
  loading: require('./assets/logo.png'),
  attempt: 1
})

//引入moment
import moment from 'moment';
//过滤器全局
Vue.filter('capitalize', function (value) {
  return moment(value).format('YYYY-MM-DD');
})

//注册路由
Vue.use(VueRouter);
//注册 element 插件
Vue.use(ElementUI);
//注册 iview 插件
Vue.use(iView);
//定义路由规则
let routes = [
  //默认/跳转到首页
  { path: '/',
  redirect: '/index' },
  //首页规则
  { path: '/index',
   component: Index },
  //商品详情规则
   { path: '/detail/:id',
   component: detail }
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
