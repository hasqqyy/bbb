<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/login.html">会员登录</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper">
                <div class="bg-wrap">
                    <div class="nav-tit">
                        <a class="selected" href="javascript:;">账户登录</a>
                        <i>|</i>
                        <a href="/register.html">免费注册</a>
                    </div>

                    <div id="loginform" name="loginform" class="login-box">
                        <!-- 输入框 插件 -->
                        <el-input v-model.trim="name" placeholder="用户名/手机/邮箱"></el-input>
                        <br>
                        <br>
                        <el-input v-model="password" type="password" placeholder="登录密码"></el-input>
                        <br>
                        <br>
                        <div class="btn-box">
                            <input id="btnSubmit" name="btnSubmit" type="submit" @click="checkLogin" value="立即登录">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  name: "login",
  data: function() {
    return {
      name: "", //用户名
      password: "" //密码
    };
  },
  //事件
  methods: {
    //点击登录
    checkLogin() {
      //  设置全局进度条
      this.$Loading.config({
        color: "#5cb85c",
        failedColor: "hotpink",
        height: 5
      });
      //显示进度条
      this.$Loading.start();
      //获取用户名
      //获取密码
      //请求数据 是否和数据库一致
      this.$axios
        .post(`site/account/login`, {
          user_name: this.name,
          password: this.password
        })
        .then(response => {
          // console.log(response);
          //status为0时 表示登录成功
          if (response.data.status == 0) {
            //增加vuex的方法
            this.$store.commit("updateLogin", true);
            //使用编程式导航 跳转即可
            this.$router.push(this.$store.state.fromPath);
          }
          //关闭进度条
          this.$Loading.finish();
        })
        .catch(error => {
          //错误时提示
          //以错误的类型结束进度条
          this.$Loading.error();
        });
    }
  }
};
</script>
<style>
</style>
