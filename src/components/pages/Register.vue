<template>
    <div class="register">
      <!--mooc-logo-->
      <div class="moocLogo">
        <h1>欢迎注册产学研平台！</h1>
      </div>

      <!--注册表单-->
      <div class="registerMain">
        <el-form :model="regesterForm" status-icon label-width="100px" ref="regesterForm"
                 class="demo-ruleForm" style="margin-left:20%;">
          <el-form-item label="账号" style="width: 60%">
            <el-input clearable  v-model="regesterForm.username" auto-complete="off"   ></el-input>
          </el-form-item>
          <el-form-item label="密码" style="width: 60%">
            <el-input  type="password" v-model="regesterForm.password" auto-complete="off" ></el-input>
          </el-form-item>
          <el-form-item label="确认密码" style="width: 60%">
            <el-input  type="password" v-model="regesterForm.surePassword" auto-complete="off" ></el-input>
          </el-form-item>
          <el-form-item  style="width: 60%">
            <el-button type="success" round @click="register" style="width: 100%;">注册</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
</template>

<script>
    export default {
      name: 'register',
      data() {
        return {
          // 注册表单
          regesterForm:{
            username:"",
            password:"",
            surePassword:"",
            role:"ROLE_USER"
          },
        }
      },
      methods:{
        register:function () {
          var vm = this;//使用全局变量Vue.prototype来调$message()可以,或者重新定义this也是可以的，如下： var vm = this;
          if (this.regesterForm.password == this.regesterForm.surePassword){
            this.$axios.post("/auth/register", {
              "username": this.regesterForm.username,
              "password": this.regesterForm.password,
              "role": "ROLE_USER",
            })
              .then((response) => {
              console.log(response)
                if (response.data.code == 0) {
                  vm.$message.error({
                    message: "该用户名已存在",
                    showClose: true
                  });
                  // console.log(response.data.message)
                  // console.log(response.data.loginStatus)
                  // console.log(this.regesterForm.username)
                  // console.log(response.data.res)
                } else {
                  vm.$message.success({
                    message:"注册成功",
                    showClose:true
                  })
                  vm.backToLogin();
                }
              })
              .catch(function (err) {
                console.log(err);
                vm.$message.error({
                  message: '注册error:'+err,
                  showClose: true
                })
              })
          } else{
            vm.$message.error({
              message:"请检查密码",
              showClose:true
            })
          }
        },
        backToLogin:function () {
          this.$router.push({path:'/login'})
        }
      }
    }
</script>

<style scoped>
  .register{
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
 .registerMain{
   width:100%;
   margin-top: 20px;
  }
</style>
