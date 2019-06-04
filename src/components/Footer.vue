<template>
    <div class="appfooter">
      <div class="appfooterContent">
        <div class="appfooterItem" v-for="appfooterItem in appfooterItems">
          {{appfooterItem}}
        </div>
        <div class="appfooterRight">
          {{appfooterRight}}
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "appfooter",
      data(){
          return{
            // //footer内容
            appfooterItems:["网站首页","企业合作","人才招聘","联系我们","专家招募","常见问题","意见反馈","友情链接"],
            //footer版权声明
            appfooterRight:"Copyright © 2018 cxy.com All Rights Reserved | 苏ICP备 12003892号-11"
          }
      }
    }
</script>

<style scoped>
  .appfooter {
    clear: both;
    width: 100%;
    height: 100px;
    background-color: #0f253e;
  }
  .appfooter .appfooterContent{
    margin-left: 115px;
  }
  .appfooter .appfooterItem {
    float: left;
    margin-right: 30px;
    margin-top: 30px;
    margin-bottom: 10px;
    color: gainsboro;
    font-size: 10px;
  }
  .appfooter .appfooterRight {
    clear: both;
    font-size: 10px;
    color: darkgray;
  }
</style>
