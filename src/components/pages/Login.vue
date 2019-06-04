<template>
  <div class="login">
    <!--mooc-logo-->
    <div class="moocLogo">
      <h1>欢迎来到产学研平台！</h1>
    </div>

    <!--注册表单-->
    <div class="loginMain">
      <el-form :model="loginForm" status-icon label-width="100px" ref="loginForm" class="demo-ruleForm" style="margin-left:20%;">
        <el-form-item label="账号" style="width: 60%">
          <el-input clearable  v-model="loginForm.username" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" style="width: 60%">
          <el-input  type="password" v-model="loginForm.password" auto-complete="off" ></el-input>
        </el-form-item>
        <el-form-item  style="width: 60%">
          <el-button type="success" round  @click="login" style="width: 100%;">登录</el-button>
        </el-form-item>
        <el-form-item  style="width: 60%">
          <el-button type="success" round @click="toRegister" style="width: 100%;">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'login',
    data() {
      return {
        // 注册表单
        loginForm:{
          username:"",
          password:"",
        },
      }
    },
    beforeRouteEnter:(to,from,next) => {
      //组件内守卫
      //已登录状态回到登录界面，即 登出
      next(vm => {
        vm.$store.dispatch("setUser",null);
      });

    },
    methods:{
      toRegister: function(){
        this.$router.push({path:'/register'});
      },
//  {type: "application/vnd.ms-excel"}
      login:function () {
        console.log("sss");
        this.$axios.get("/auth/download/98508e9c95d94b4b95795c8167996c28")
          .then(response => {
            console.log(response);
//            let blob = new blob[]
            let blob = response.config.url;
            window.open(blob);
//            console.log(blob);/
//
//            var link = document.createElement('a');
//
//            link.href = window.URL.createObjectURL(blob);

//            link.download = "test";

//            link.click();
          })
          .catch(function (err) {
            console.log(err)
          })
//        if (this.loginForm.username == "" || this.loginForm.password == ""){
//          this.$message.warning({
//            message:"请检查账号/密码!",
//            showClose:true
//          })
//        } else {
//          this.$axios.post("/auth",{
//            "username":this.loginForm.username,
//            "password":this.loginForm.password
//          })
//            .then((response) => {
//              if (response.data.code == 1) {
//                this.$message.success({
//                  message:"登录成功",
//                  showClose:true
//                });
//                //将用户名和token放入sessionStorage
//                sessionStorage.setItem("userName",response.data.res.username);
//                sessionStorage.setItem("userToken",response.data.res.token);
//                console.log("in login image is" + response.data.res.image)
//                sessionStorage.setItem("userImage",response.data.res.image);
//                //将用户信息放入vuex
//                this.$store.dispatch("setUser",response.data.res.username);
//                this.$store.dispatch("setToken",response.data.res.token);
//                this.$store.dispatch("setImage",response.data.res.image);
//                //打印login状态
////                console.log(this.$store.state.isLogin);
////                console.log(this.$store.state.userImage);
//                this.$router.push({path:'/'});
//
//              } else {
//                this.$message.error({
//                  message:"啊偶，登录失败",
//                  showClose:true
//                });
//                this.$store.dispatch("setUser",null)
//              }
//            })
//            .catch(function (err) {
//              console.log(err);
//            })
        }
    }
  }
</script>

<style scoped>
  .login{
    width:80%;
    margin:0 auto;
    margin-top: 80px;
  }
  .moocLogo{
    width:100%;
   margin-left: -3%;
    height:100px;
  }
  .moocLogo h1{
    line-height: 100px;
    margin-left: 38%;
  }
  .loginMain{
    width:100%;
    margin-top: 20px;
  }
</style>
