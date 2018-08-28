<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/cart.html">购物车</a>
            </div>
        </div>

        <div class="section">
            <div class="wrapper">
                <div class="bg-wrap">
                    <!--购物车头部-->
                    <div class="cart-head clearfix">
                        <h2>
                            <i class="iconfont icon-cart"></i>我的购物车</h2>
                        <div class="cart-setp">
                            <ul>
                                <li class="first active">
                                    <div class="progress">
                                        <span>1</span>
                                        放进购物车
                                    </div>
                                </li>
                                <li>
                                    <div class="progress">
                                        <span>2</span>
                                        填写订单信息
                                    </div>
                                </li>
                                <li class="last">
                                    <div class="progress">
                                        <span>3</span>
                                        支付/确认订单
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!--购物车头部-->
                    <!--商品列表-->
                    <div class="cart-box">
                        <input id="jsondata" name="jsondata" type="hidden">
                        <table width="100%" align="center" class="cart-table" border="0" cellspacing="0" cellpadding="8">
                            <tbody>
                                <tr>
                                    <th width="48" align="center">
                                        <a>选择</a>
                                    </th>
                                    <th align="left" colspan="2">商品信息</th>
                                    <th width="84" align="left">单价</th>
                                    <th width="104" align="center">数量</th>
                                    <th width="104" align="left">金额(元)</th>
                                    <th width="54" align="center">操作</th>
                                </tr>
                                <!-- 判断没有商品时显示 -->
                                <tr v-show="!message.length">
                                    <td colspan="10">
                                        <div class="msg-tips">
                                            <div class="icon warning">
                                                <i class="iconfont icon-tip"></i>
                                            </div>
                                            <div class="info">
                                                <strong>购物车没有商品！</strong>
                                                <p>您的购物车为空，
                                                    <router-link to="/index">马上去购物</router-link>
                                                    吧！</p>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <!-- 商品列表 -->
                                <tr v-for="item in message" :key="item.id">
                                    <!-- 开关按钮 插件 -->
                                    <td>
                                        <el-switch v-model="item.selected" active-color="#13ce66" inactive-color="#ff4949">
                                        </el-switch>
                                    </td>
                                    <td><img :src="item.img_url" alt="" style="width: 60px"></td>
                                    <td>{{item.title}}</td>
                                    <td>{{item.sell_price}}</td>
                                    <!-- 计数 插件 -->
                                    <td>
                                        <el-input-number size="mini" v-model="item.buycount" @change="numChange($event,item.id)"
                                            :min="1" label="描述文字"></el-input-number>
                                    </td>
                                    <td>{{item.sell_price}}</td>
                                    <!-- 删除按钮 插件 
                                    点击 删除当前id值的数组-->
                                    <td>
                                        <el-button type="danger" icon="el-icon-delete" circle @click="delCount(item.id)"></el-button>
                                    </td>
                                </tr>
                                <tr>
                                    <th align="right" colspan="8">
                                        已选择商品
                                        <b class="red" id="totalQuantity">{{totalCount}}</b> 件 &nbsp;&nbsp;&nbsp;
                                        商品总金额（不含运费）：
                                        <span class="red">￥</span>
                                        <b class="red" id="totalAmount">{{totalPrice}}</b>元
                                    </th>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <!--/商品列表-->
                    <!--购物车底部-->
                    <div class="cart-foot clearfix">
                        <div class="right-box">
                            <button class="button" onclick="javascript:location.href='/index.html';">继续购物</button>
                            <button class="submit" onclick="formSubmit(this, '/', '/shopping.html');">立即结算</button>
                        </div>
                    </div>
                    <!--购物车底部-->
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: "shoppingCart",
        data: function () {
            return {
                message: [] //购物车数据
            };
        },
        //生命周期
        created() {
            //获取购物车数据 参数 id
            let cartDate = this.$store.state.cartDate;
            // console.log(cartDate);
            let ids = "";
            //遍历拼接数组id
            for (const key in cartDate) {
                ids += key;
                ids += ",";
            }
            // console.log(ids); //87,90,93,94,97,103,
            //截取最后一个逗号
            ids = ids.slice(0, -1);
            // console.log(ids);
            //请求数据
            this.$axios.get(`site/comment/getshopcargoods/${ids}`).then(response => {
                //   console.log(response);
                //遍历数据,赋值最新的购买数量
                response.data.message.forEach(v => {
                    v.buycount = cartDate[v.id];
                    v.selected = true;
                });
                //再赋值给message
                this.message = response.data.message;
            });
        },
        //计算属性
        computed: {
            //商品总件数
            totalCount() {
                //定义总件数
                let totalCount = 0;
                //遍历
                this.message.forEach(v => {
                    //判断被选中的 件数相加
                    if (v.selected == true) {
                        totalCount += v.buycount;
                    }
                })
                return totalCount;
            },
            //商品总金额
            totalPrice() {
                //定义一个总金额
                let totalPrice = 0;
                //遍历message 
                this.message.forEach(v => {
                    if (v.selected == true) {
                        totalPrice += v.sell_price * v.buycount;
                    }
                })
                return totalPrice;
            }
        },
        //事件
        methods: {
            //数量同步到通栏
            numChange(num, id) {
                //调用vuex的修改方法
                this.$store.commit('updateGoods', {
                    goodId: id,
                    goodNum: num
                });
            },
            //删除 当前id值的数组
            delCount(id) {
                //调用vuex的删除方法 只是vuex 删除 页面并没有删除
                this.$store.commit('deleteGoods', id);
                //遍历 删除id值
                this.message.forEach((v, index) => {
                    if (v.id == id) {
                        this.message.splice(index, 1);
                    }
                })
            }
        }
    };
</script>
<style>
</style>