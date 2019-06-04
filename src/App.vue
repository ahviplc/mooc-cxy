<template>
  <div id="app">
    <!--导航栏-->
    <header>
      <!--logo-->
      <div class="logo">
        <router-link to="/">
          <img src="./assets/logo.png">
        </router-link>
      </div>

      <!--标题栏-->
      <div class="nar_bar">
        <ul>
          <li><router-link to="/video">在线教学</router-link></li>
          <li><router-link to="">在线测试</router-link></li>
          <li><router-link to="">课程资料</router-link></li>
          <li><router-link to="">任务广场</router-link></li>
        </ul>
      </div>

      <!--搜索框-->
      <div class="search">
        <el-input @keyup.enter.native="searchVideo(searchKey)" v-model="searchKey" placeholder="请输入内容" style="margin-top: 15px">
        </el-input>
      </div>

      <!--登录注册及用户头像切换区域-->
      <div class="loginUser">
        <div class="loginAndRegister" v-show="!isLogin">
          <router-link to="/login">登录</router-link>&nbsp;&nbsp;
          <router-link to="/register">注册</router-link>
        </div>
        <div class="userHome" v-show="isLogin">
          <router-link  to="/login" class="loginOut">[退出]</router-link>
          <router-link v-bind:to="'/home/' + currentUser + '/basic'">
            <div v-if="userImage != 'null' ">
              <img :src="userImage">
            </div>
            <div v-else>
              <img :src="defaultImageUrl">
            </div>
          </router-link>
        </div>
      </div>
    </header>

    <!--路由展示区域-->
    <div class="container">
      <router-view></router-view>
    </div>

  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      defaultImageUrl:"../../../../static/document/defaultImage.jpg",
      //搜索内容
      searchKey:'',
      //当前用户
    }
  },
  methods:{
    //根据关键字实现搜索功能
    searchVideo:function (key) {
      this.$router.push({path:"/search",query:{words:key}});
      this.searchKey = "";
    }
  },
  computed:{
    currentUser(){
      return this.$store.getters.currentUser
    },
    isLogin(){
      console.log("in app name" + sessionStorage.getItem("userName"));
//      console.log("in app name" + sessionStorage.getItem("userName"));
      console.log("in app name" + sessionStorage.getItem("userName"));
      this.currentUserName = this.currentUser;

      //通过sessionstorage获取vuex里islogin的状态
      if (sessionStorage.getItem("userName") && sessionStorage.getItem("userToken")){
        this.$store.commit("userStatus",sessionStorage.getItem("userName"));
      } else {
        this.$store.commit("userStatus",null);
      }
      return this.$store.getters.isLogin;
    },
    userImage(){
      console.log(sessionStorage.getItem("userImage"));
      if(sessionStorage.getItem("userImage") == null){
        this.$store.commit("userImageGet",null);
      } else if (sessionStorage.getItem("userImage")){
        this.$store.commit("userImageGet",sessionStorage.getItem("userImage"));
      }
      return this.$store.getters.userImage;
    }
  },
}
</script>

<style scoped>
  /*导航栏*/
  header{
    width:100%;
    height:70px;
    background: #0f253e;
  }
  .logo{
    width:15%;
    float: left;
    height:70px;
  }
  .logo img{
    cursor: pointer;
    margin-top: 10px;
  }
  .nar_bar{
    width:45%;
    height:70px;
    float: left;
  }
  .nar_bar ul{
    list-style: none;
  }
  .nar_bar ul li{
    float: left;
    text-align: center;
    margin-top: 20px;
    padding-left: 7%;
  }
  .nar_bar ul li a{
    color: #cccccc;
    font-size: 18px;
    cursor: pointer;
    text-decoration: none;
  }
  .search{
    width:25%;
    height:70px;
    float: left;
  }
  .loginUser{
    width:15%;
    height:70px;
    float: right;
  }
  .loginAndRegister{
    margin-left: 40%;
  }
  .loginUser .loginAndRegister a{
    color: #cccccc;
    font-size: 18px;
    cursor: pointer;
    text-decoration: none;
    line-height: 70px;
  }
  .userHome img{
    border-radius:50px;
    height: 50px;
    width: 50px;
    float: right;
    margin-top: 10px;
    margin-right: 10%;
}
  .userHome a{
    color: #cccccc;
    font-size: 18px;
    cursor: pointer;
    text-decoration: none;
    line-height: 70px;
    float: right;
}
  .loginOut{
    margin-right: 20px;
  }

  /*页面内容区域*/
  .container{
    width:100%;
    height:300px;
  }

</style>
