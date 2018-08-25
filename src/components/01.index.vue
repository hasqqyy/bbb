<template>
  <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="#/" class="router-link-active">首页</a> &gt;
                <a href="#/site/goodslist" class="router-link-exact-active router-link-active">购物商城</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper">
                <div class="wrap-box">
                    <div class="left-220" style="margin: 0px;">
                        <div class="banner-nav">
                            <ul>
                                <li v-for="items in catelist" :key="items.id">
                                    <h3>
                                        <i class="iconfont icon-arrow-right"></i>
                                        <span>{{items.title}}</span>
                                        <p>
                                            <span v-for="itemson in items.subcates" :key="itemson.id">
                                                {{itemson.title}}&nbsp;
                                            </span>
                                        </p>
                                    </h3>
                                    <div class="item-box">
                                        <dl>
                                            <dt>
                                                <a href="/goods/40.html">{{items.title}}</a>
                                            </dt>
                                            <dd>
                                                <a href="/goods/43.html" v-for="itemson in items.subcates" :key="itemson.id">{{itemson.title}}</a>
                                            </dd>
                                        </dl>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!--幻灯片-->
                    <div class="left-705">
                        
                               <el-carousel height="341px">
                                    <el-carousel-item v-for="items in sliderlist" :key="items.id">
                                        <!-- <img :src="items.img_url" :alt="items.title"> -->
                                        <!-- 懒加载 -->
                                        <img v-lazy="items.img_url" :alt="items.title">
                                    </el-carousel-item>
                                </el-carousel>
                            
                    </div>
                    <!--/幻灯片-->
                    <div class="left-220">
                        <ul class="side-img-list">
                            <li v-for="(items,index) in toplist" :key="items.id">
                                <div class="img-box">
                                    <label>{{index+1}}</label>
                                    <!-- <img :src="items.img_url"> -->
                                    <!-- 懒加载 -->
                                    <img v-lazy="items.img_url">
                                </div>
                                <div class="txt-box">
                                    <a href="/goods/show-98.html">{{items.title}}</a>
                                    <span>{{items.add_time | capitalize}}</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="section" v-for="pro in message" :key="pro.level1cateid">
            <div class="main-tit">
                <h2>{{pro.catetitle}}</h2>
                <p>
                    <a href="/goods/43.html" v-for="product in pro.level2catelist" :key="product.subcateid">{{product.subcatetitle}}</a>
                    <a href="/goods/40.html">更多
                        <i>+</i>
                    </a>
                </p>
            </div>
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <ul class="img-list">
                        <li v-for="proson in pro.datas" :key="proson.artID">
                            <!-- <a href="#/site/goodsinfo/87" class=""> -->
                            <router-link :to="'/detail/'+proson.artID">
                            <div class="img-box">
                                    <!-- <img :src="proson.img_url"> -->
                                    <!-- 懒加载 -->
                                    <img v-lazy="proson.img_url">
                                </div>
                                <div class="info">
                                    <h3>{{proson.artTitle}}</h3>
                                    <p class="price">
                                        <b>{{proson.sell_price}}</b>元</p>
                                    <p>
                                        <strong>库存 {{proson.stock_quantity}}</strong>
                                        <span>市场价：
                                            <s>{{proson.market_price}}</s>
                                        </span>
                                    </p>
                                </div>
                            </router-link>  
                            <!-- </a> -->
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
//导入axios 请求数据
import axios from 'axios';
//导入momonet 设置日期格式
import moment from 'moment';
export default {
  name: 'index',
  data(){
    return {
      // info: ' 一只小蜜蜂',
      catelist: [],//菜单列表
      sliderlist: [],//轮播图
      toplist: [],//热卖排行
      message: [],//商品分类
    }
  },
  //创建前
  beforeCreate() {
    // console.log(this.info);
    
  },
  //创建完毕
  created() {
    // console.log(this.info);
    //1.获取商品列表数据
    axios.get(`http://47.106.148.205:8899/site/goods/gettopdata/goods`)
    .then((response)=>{
      // console.log(response);  
      this.catelist=response.data.message.catelist;
      this.sliderlist=response.data.message.sliderlist;
      this.toplist=response.data.message.toplist;
    });

    //2.获取商品分类列表数据
    axios.get(`http://47.106.148.205:8899/site/goods/getgoodsgroup`)
    .then((response)=>{
        // console.log(response);
        this.message=response.data.message;
    })
  },
  //过滤器
  filters: {
  capitalize: function (value) {
    
    return moment(value).format("YYYY-MM-DD");
  }
}
}
</script>

<style>
/* 轮播样式 */
  .el-carousel__item img {
    width: 100%;
    height: 100%;
  }
  
</style>
