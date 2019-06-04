<template>
  <div class="accountmodificate">
    <div class="accountTitle">
      <label>个人账户</label>
    </div>
    <hr/>
    <!--修改密码-->
    <div class="changePassword">
      <img src="../../assets/account.png">
      <div class="content" style="">
        <span class="password">密码</span>
        <span class="setting">已设置</span>
        <p class="explain">用于保护账号信息和登录安全</p>
      </div>

    </div>

  </div>
</template>

<script>
  export default {
    name: 'accountmodificate',
  }
</script>

<style>
  .accountmodificate{
    width:100%;
    height:600px;
    /*background: pink;*/
  }
  .accountTitle{
    margin-bottom: 10px;
  }
  .changePassword{
    margin-top: 10px;
    border-bottom: 1px solid #d2d2d2;
    height:70px;
  }
  .changePassword img{
    width:60px;
    height:60px;
    margin-left: 20px;
    float: left;
  }
  .changePassword .content{
    width: 300px;margin-left: 10px;height: 60px;float: left
  }
  .changePassword .password{
    font-size: 20px;
    font-weight: 500;
    margin-right: 10px;
    /*float: left;*/
  }
  .changePassword .setting{
    font-size:15px;
    margin-top: 5px;
  }
  .changePassword .explain{
    float: left;
    margin-top: 10px;
  }
</style>
