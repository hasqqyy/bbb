import Vue from 'vue'
import App from './App.vue'
//导入首页的组件
import Index from './components/01.index.vue'
//导入商品详情的组件
import detail from './components/02.productDetail.vue'
//导入购物车的组件
import shopCart from './components/03.shoppingCart.vue'
//导入登录页的组件
import login from './components/04.login.vue'
//导入订单页的组件
import order from './components/05.fillOrder.vue'
 
//导入路由
import VueRouter from 'vue-router';
//导入 axios 包
import axios from "axios";
//设置基地址
axios.defaults.baseURL = 'http://47.106.148.205:8899';
axios.defaults.withCredentials=true;//允许axios带cookie
//设置原型属性
Vue.prototype.$axios=axios;

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
  loading: require('./assets/lazy.gif'),
  attempt: 1
})

//引入moment
import moment from 'moment';
//过滤器全局
Vue.filter('capitalize', function (value) {
  return moment(value).format('YYYY-MM-DD');
})

//引入放大镜
import ProductZoomer from 'vue-product-zoomer';
Vue.use(ProductZoomer);

//引入vuex
import Vuex from 'vuex';
//注册vuex
Vue.use(Vuex);
//实例化
const store = new Vuex.Store({
  state: {
    // count: 998
    // cartDate: JSON.parse(window.localStorage.getItem('goodkey'))||{},
    cartDate: JSON.parse(window.localStorage.getItem('goodKey')) || {},
    isLogin: false,//是否已经登录
    fromPath: '',//登陆成功之后 回到来时的页面
  },
  mutations: {
    // 增加购物车数据获取到 id 以及数量
    // 传入的数据是一个对象 格式{goodId:商品id,goodNum:数量}
    addGoods(state,goodInfo) {
      // console.log(goodInfo);
      // 保存数据[]只有用中括号对象取值 才可以 传入变量 用.语法是固定的属性名
      if(state.cartDate[goodInfo.goodId]==undefined){
        // 传过来的id 不存在 新增这个id作为属性
      // 直接增加这个属性即可
      // state.cartDate[goodInfo.goodId] = goodInfo.goodNum;
      // 为了要让Vue检测到数据的改变同步修改页面显示 需要调用Vue.set方法
      // console.log(state.cartDate[goodInfo.goodId]);
      
        Vue.set(state.cartDate,goodInfo.goodId,goodInfo.goodNum);
        // console.log('我是空的');
      }else {
        // 传过来的id 已经存在 累加
        state.cartDate[goodInfo.goodId]+=goodInfo.goodNum;
        // console.log('我是累加');
        
      } 
    },
    //修改购物车数据
    updateGoods(state,goodInfo){
      //直接赋值即可
      state.cartDate[goodInfo.goodId]=goodInfo.goodNum;
    },
    //删除购物车数据
    deleteGoods(state,id){
      Vue.delete(state.cartDate,id);
    },
    //修改登录状态
    updateLogin(state,isLogin){
      state.isLogin=isLogin;
    },
    //来时的地址
    fromPath(state,fromPath){
      state.fromPath=fromPath;
    }
  },
  // getters vuex的计算属性
  getters: {
    goodsCount: state => {
      // 临时num
      let num=0;
      // 循环数据对象
     for(const key in state.cartDate) {
       // 累加总数
      num+=state.cartDate[key];
     }
      // 返回总数
      return num;
    }
  }
});
//浏览器页面关闭(刷新时)保存到localStorage中
window.onbeforeunload=function(){
  window.localStorage.setItem('goodKey',JSON.stringify(store.state.cartDate))
}


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
   component: detail },
   //购物车规则
   { path: '/cart',
   component: shopCart },
   //登录页规则
   { path: '/login',
   component: login },
   //订单页规则
   { path: '/order/:id',
   component: order }
]
//创建实例化路由
let router = new VueRouter({
  routes
})
Vue.config.productionTip = false

// 增加 导航守卫
router.beforeEach((to, from, next) => {
  // 提交载荷 保存数据
  store.commit('fromPath',from.path);
  //如果是访问的order页面 判断登录
  //!=-1说明包含了/order/
  if(to.path.indexOf('/order/')!=-1){
    //调用接口
    axios.get(`site/account/islogin`).then(response=>{
      // console.log(response);
      
      if(response.data.code!='nologin'){
        next();
      }else {
        next('/login');
      }
    })
    //跳转到订单页
   
  }else{
    next();
  }
  next();
})
//挂载
new Vue({
  render: h => h(App),
  router,//挂载路由
  store,//挂载vuex
  //页面打开时 登录状态判断
  beforeCreate(){
    //请求数据
    this.$axios.get(`site/account/islogin`).then((response)=>{
      // console.log(response);
      //判断是否登录 code: 'logined'
      if(response.data.code=='logined'){
        //已经登录
        //修改vuex的isLogin的值
        this.$store.state.isLogin=true;
      }else{
        //未登录
      }
    })
  }
}).$mount('#app')
