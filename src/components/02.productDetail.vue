<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/goods.html">购物商城</a> &gt;
                <a href="/goods/42/1.html">商品详情</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <div class="left-925">
                        <div class="goods-box clearfix">
                            <div class="pic-box">
                                <!-- 放大镜插件 -->
                                <ProductZoomer v-if="images.normal_size!=0" :base-images=" images " :base-zoomer-options=" zoomerOptions ">
                                </ProductZoomer>
                            </div>
                            <div class="goods-spec">
                                <h1>{{goodsinfo.title}}</h1>
                                <p class="subtitle">{{goodsinfo.sub_title}}</p>
                                <div class="spec-box">
                                    <dl>
                                        <dt>货号</dt>
                                        <dd id="commodityGoodsNo">{{goodsinfo.goods_no}}</dd>
                                    </dl>
                                    <dl>
                                        <dt>市场价</dt>
                                        <dd>
                                            <s id="commodityMarketPrice">¥{{goodsinfo.market_price}}</s>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dt>销售价</dt>
                                        <dd>
                                            <em id="commoditySellPrice" class="price">¥{{goodsinfo.sell_price}}</em>
                                        </dd>
                                    </dl>
                                </div>
                                <div class="spec-box">
                                    <dl>
                                        <dt>购买数量</dt>
                                        <dd>
                                            <div class="stock-box">
                                                <el-input-number v-model="buyCount" @focus="buyCountChange" @change="buyCountChange" size="small" :min="0" :max="goodsinfo.stock_quantity" label="描述文字"></el-input-number>
                                            </div>
                                            <span class="stock-txt">
                                                库存
                                                <em id="commodityStockNum">{{goodsinfo.stock_quantity}}</em>件
                                            </span>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dd>
                                            <div id="buyButton" class="btn-buy">
                                                <button onclick="cartAdd(this,'/',1,'/shopping.html');" class="buy">立即购买</button>
                                                <button @click="artAdd" class="add">加入购物车</button>
                                            </div>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                        <div id="goodsTabs" class="goods-tab bg-wrap">
                            <Affix>
                                <div id="tabHead" class="tab-head" style="position: static; top: 517px; width: 925px;">
                                    <ul>
                                        <li>
                                            <a href="javascript:;" @click="discuss=true" :class="{selected:discuss}">商品介绍</a>
                                        </li>
                                        <li>
                                            <a href="javascript:;" @click="discuss=false" :class="{selected:!discuss}">商品评论</a>
                                        </li>
                                    </ul>
                                </div>
                            </Affix>
                            <div class="tab-content entry" v-show="discuss" v-html="goodsinfo.content">
                            </div>
                            <div class="tab-content" v-show="!discuss">
                                <div class="comment-box">
                                    <div id="commentForm" name="commentForm" class="form-box">
                                        <div class="avatar-box">
                                            <i class="iconfont icon-user-full"></i>
                                        </div>
                                        <div class="conn-box">
                                            <div class="editor">
                                                <textarea v-model.trim="content" id="txtContent" name="txtContent" sucmsg=" " datatype="*10-1000" nullmsg="请填写评论内容！"></textarea>
                                                <span class="Validform_checktip"></span>
                                            </div>
                                            <div class="subcon">
                                                <!-- 点击提交按钮 弹框 -->
                                                <input id="btnSubmit" name="submit" type="submit" value="提交评论" class="submit" @click="submitCommit">
                                                <span class="Validform_checktip"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <ul id="commentList" class="list-box">
                                        <p v-show="message.length==0" style="margin: 5px 0px 15px 69px; line-height: 42px; text-align: center; border: 1px solid rgb(247, 247, 247);">暂无评论，快来抢沙发吧！</p>
                                        <li v-for="item in message" :key="item.id">
                                            <div class="avatar-box">
                                                <i class="iconfont icon-user-full"></i>
                                            </div>
                                            <div class="inner-box">
                                                <div class="info">
                                                    <span>{{item.user_name}}</span>
                                                    <span>{{item.add_time | capitalize}}</span>
                                                </div>
                                                <p>{{item.content}}</p>
                                            </div>
                                        </li>
                                    </ul>
                                    <div class="page-box" style="margin: 5px 0px 0px 62px;">
                                        <div id="pagination" class="digg">
                                            <!-- 分页插件 -->
                                            <Page :total="totalcount" show-elevator show-sizer placement="top" :page-size-opts="[5,10,13,20]" @on-change="pageChange" @on-page-size-change="sizeChange" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="left-220">
                        <div class="bg-wrap nobg">
                            <div class="sidebar-box">
                                <h4>推荐商品</h4>
                                <ul class="side-img-list">
                                    <li v-for="item in hotgoodslist" :key="item.id">
                                        <div class="img-box">
                                            <router-link :to="'/detail/'+item.id">

                                                <img v-lazy="item.img_url">

                                            </router-link>
                                        </div>
                                        <div class="txt-box">
                                            <router-link :to="'/detail/'+item.id">{{item.title}}</router-link>
                                            <span>{{item.add_time | capitalize}}</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 返回顶部 -->
        <BackTop :height="100" :bottom="200">
            <div class="top">返回顶端</div>
        </BackTop>
        <!-- 移动到购物车的小图片 -->
        <img v-lazy="imglist[0].original_path" class="moveImg" style="display: none" v-if="imglist.length" alt="">
    </div>
</template>
<script>
//引入jquery 包
import $ from "jquery";
export default {
  name: "detail",
  data: function() {
    return {
      productid: undefined, //商品id
      goodsinfo: {}, //用户列表
      hotgoodslist: [], //热卖列表
      imglist: [], //图片列表
      buyCount: 0, //购买数量
      discuss: true, //tab栏切换
      //放大镜设置
      zoomerOptions: {
        zoomFactor: 3,
        pane: "container-round", //container-round 小放大镜
        hoverDelay: 300,
        namespace: "zoomer",
        move_by_click: false,
        scroll_items: 7,
        choosed_thumb_border_color: "#dd2c00"
      },
      //获取数据
      images: {
        normal_size: []
      },
      message: [], //分页评论
      pageIndex: 1, //分页页码
      pageSize: 10, //分页页容量
      totalcount: 0, //分页总数量
      content: "", //评论内容
      contentOk: "" //评论成功
    };
  },
  //事件
  /* eslint-disable */

  methods: {
    //购买数量的变化
    buyCountChange() {
      console.log("改变啦");
    },
    //获取商品分类
    getProduct() {
      this.productid = this.$route.params.id;
      //获取商品列表数据
      this.$axios
        .get(`site/goods/getgoodsinfo/${this.productid}`)
        .then(response => {
          // console.log(response);
          this.goodsinfo = response.data.message.goodsinfo;
          this.hotgoodslist = response.data.message.hotgoodslist;
          this.imglist = response.data.message.imglist;
          //处理放大镜
          let temArr = [];
          this.imglist.forEach((v, i) => {
            temArr.push({
              id: v.id,
              url: v.original_path
            });
          });
          //临时数组
          this.images.normal_size = temArr;
        });
    },
    //获取分页评论
    getcomment() {
      this.$axios
        .get(
          `site/comment/getbypage/goods/${this.productid}?pageIndex=${
            this.pageIndex
          }&pageSize=${this.pageSize}`
        )
        .then(response => {
          //   console.log(response);
          this.message = response.data.message;
          //总数量
          this.totalcount = response.data.totalcount;
        });
    },
    //页码改变后的回调函数
    pageChange(page) {
      //当页码改变时,重新获取数据
      this.pageIndex = page;
      //调用分页评论
      this.getcomment();
      console.log(page);
    },
    //切换每页条数的回调
    sizeChange(pagesize) {
      console.log(pagesize);
      //当分页条数改变时,重新获取
      this.pageSize = pagesize;
      //调用分页评论
      this.getcomment();
    },
    //提交按钮 发表评论
    submitCommit() {
      if (this.content == "") {
        this.$Message.error("This is an error tip");
        return;
      }
      //请求数据
      this.$axios
        .post(`site/validate/comment/post/goods/${this.productid}`, {
          commenttxt: this.content
        })
        .then(response => {
          //   console.log(response);
          this.$Message.success("评论成功");
          this.getcomment();
          //清空输入内容
          this.content = "";
        });
    },
    //小图片加入购物车
    artAdd() {
        //判断 购物车数量为0 弹出错误框
        if(this.buyCount==0){
            this.$Message.error("请选择数量");
            return;
        }
      //获取加入购物车按钮的位置
      let addOffset = $(".add").offset();
      // console.log(addOffset);

      //获取右上角购物车的位置
      let cartOffset = $(".icon-cart").offset();
      // console.log(cartOffset);

      //显示小图 移动位置
      $(".moveImg")
      .stop()
      .show()
      .addClass("move")
      .css(addOffset)
      .animate(cartOffset,1000,function() {
          $(this)
          .hide()
          .removeClass("move");
        });
        //测试 增加数据
        this.$store.commit('addGoods',{
        goodId: this.productid,
        goodNum: this.buyCount
      });
    }
  },

  created() {
    //调用商品数据
    this.getProduct();
    //调用分页评论
    this.getcomment();
  },
  //监听
  watch: {
    $route: function(val, oldVal) {
      // 认为让他 强制生成 v-if 数组长度
      // 数组长度为0 直接销毁
      this.images.normal_size = [];
      this.getProduct();
    }
  }
};
</script>
<style lang="less">
// lang=less 让vue 使用less 来解析 这里的样式
/* 内容样式 */
.tab-content img {
  width: 100%;
  display: block;
}

/* 返回顶部样式 */
.top {
  padding: 10px;
  background: rgba(0, 153, 229, 0.7);
  color: #fff;
  text-align: center;
  border-radius: 2px;
}
/* 放大镜相关样式 */
.pic-box {
  width: 395px;
  .control-box .thumb-list {
    display: flex;
    justify-content: center;
    img {
      width: 80px;
      height: 80px;
      margin: 2px;
    }
  }
  .control {
    /* //   text-align:center; */
    display: flex;
    /* // 主轴 */
    justify-content: center;
    /* // 纵轴 副轴 侧轴 */
    align-items: center;
  }
}

// 移动到购物车的小图片
.moveImg {
  position: absolute;
  width: 50px;
//   display: none;
}
// 小图片的动画效果
.moveImg.move {
  transition: transform 1s, opacity 1s;
  opacity: 0.5;
  transform: scale(0.2) rotate(7200deg);
}
</style>
