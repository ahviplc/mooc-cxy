<template>
  <div class="app-video">

    <div class="nav">
      <p class="style">方向：
        <el-dropdown @command="handleCommand"
                     v-for="(item,index) in classItems"
                     @click.native="getBigCategory(index)" :key="index">
          <span class="el-dropdown-link">{{item.type}}</span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-for="(item2, index2) in item.list"
                              :command="item2" :v-text="item2"  :key="item2"
                              @click.native="getSmallCategory(index,index2)">
              {{item2}}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </p>
    </div>

    <div class="newOrHot">
      <span style="margin-left: 20px;cursor: pointer;padding: 5px;" :class="{toggleActive:isNew}" @click="toggle">最新</span>
      <span style="cursor: pointer;padding: 5px;" :class="{toggleActive:!isNew}" @click="toggle">最热</span>
    </div>

    <div v-show="items.length == 0" class="noneResult">
      <h1 >很抱歉，没有找到相关结果</h1>
    </div>

    <!--视频展示区-->
    <div class="vedioShow">
      <div class="main_1">
        <div class="videoPreview" v-for="(item,index) in items">
          <router-link v-bind:to="'/videoPlay/' + item.id"><img :src=item.first_frame style="width: 230px;height: 120px;border-radius: 10px">
            <div class="box" style="text-align: center">
              {{item.subject}}
            </div>
          </router-link>
          <div style="margin-top: 20px">
            <span>{{item.description}}</span>
            <i class="el-icon-view" style=" float: right;margin-right: 10px">{{item.play_sum}}</i>
          </div>
        </div>
      </div>
    </div>

    <!--分页区域-->
      <div class="block">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-size="8"
          layout="prev, pager, next, jumper"
          :total="totalCount">
        </el-pagination>
      </div>

    <appfooter></appfooter>

  </div>
</template>

<script>
  import Appfooter from "../Footer";
  export default {
    name: 'app-video',
    components: {Appfooter},
    data(){
      return {
        //一级目录的绑定样式
        selectedItem:0,
        //获取视频数组
        items:[],
//        视频总条数
        totalCount:0,
        //当前页数
        currentPage:0,
//        最新最热切换
        isNew:true,
        currentPage:0,
        //分类的数组
        classItems:[
          {
            type:"种植业",
            list:["蔬菜","粮食"]
          },
          {
            type:"畜牧业",
            list:["家禽","家畜"]
          },
          {
            type:"水产业",
            list:["鱼类","虾类","蟹类"]
          }
        ],
        //大分类
        bigCategory:"",
        //小分类
        smallCategory:"",
        //默认是最新排序
        key:0,
        //分页的页数
        page:0,
        //小分类的中文名称
        smallCategoryChinese:"",
        //footer内容
        appfooterItems:["网站首页","企业合作","人才招聘","联系我们","专家招募","常见问题","意见反馈","友情链接"],
        //footer版权声明
        appfooterRight:"Copyright © 2018 cxy.com All Rights Reserved | 苏ICP备 12003892号-11"
      }
    },
    methods: {
//      axios请求封装函数
      //获取一级目录的封装
      getBigVideo:function () {
        this.$axios.post("/video/big/" +this.key+ "?page_num=1&page_size=8&big_category=" +this.bigCategory+ "")
          .then((response) => {
            if (response.status == 200) {
              this.$message.success({
                showClose: true,
                message: response.data.message
              });
              this.items = response.data.res.list;
              for (var i = 0;i<this.items.length;i++ ) {
                if (this.items[i].description.length > 8){
                  this.items[i].description = this.items[i].description.slice(0,8)+'...';
                }
              }
              this.totalCount = (response.data.res.pages)*8;
              this.page = response.data.res.pages;
            } else {
              this.$message.warning({
                showClose: true,
                message: "获取视频错误"
              })
            }
          })
          .catch(function (err) {
            this.$message.error({
              showClose: true,
              message: err
            })
          })
      },

      //获取二级目录的封装
      getSmallVideo:function (bigCategory,smallCategory) {
        this.$axios.post("/video/small/" +this.key+ "?page_num=1&page_size=8&big_category=" +bigCategory+ "&small_category=" +smallCategory+ "")
          .then((response) => {
            if (response.status == 200) {
              this.$message.success({
                showClose: true,
                message: response.data.message
              });
              this.items = response.data.res.list;
              for (var i = 0;i<this.items.length;i++ ) {
                if (this.items[i].description.length > 8){
                  this.items[i].description = this.items[i].description.slice(0,8)+'...';
                }
              }
              this.totalCount = (response.data.res.pages)*8;
              this.page = response.data.res.pages;
            } else {
              this.$message.warning({
                showClose: true,
                message: "获取视频错误"
              })
            }
          })
          .catch(function (err) {
            this.$message.error({
              showClose: true,
              message: err
            })
          })
      },

      //初始化页面获取所有视频
      fetchAll:function () {
        this.$axios.post("/video/all/" +this.key+ "?page_num=1&page_size=8")
          .then((response) => {
            if (response.status == 200) {
              this.$message.success({
                showClose: true,
                message: response.data.message
              });
              this.items = response.data.res.list;
              this.totalCount = (response.data.res.pages)*8;
              this.page = response.data.res.pages;
              for (var i = 0;i<this.items.length;i++ ) {
                if (this.items[i].description.length > 8){
                  this.items[i].description = this.items[i].description.slice(0,8)+'...';
                }
              }
            } else {
              this.$message.warning({
                showClose: true,
                message: "获取视频错误"
              })
            }
          })
          .catch(function (err) {
            this.$message.error({
              showClose: true,
              message: err
            })
          })
      },

      //分页功能
      handleCurrentChange:function () {
        console.log(this.currentPage)
//        ((this.currentPage%(this.page))+1)
        //判断是不是所有视频的分页
        if (this.bigCategory == "") {
          this.$axios.post("/video/all/" +this.key+ "?page_num=" +this.currentPage+ "&page_size=8")
            .then((response) => {
              if (response.status == 200) {
                this.$message.success({
                  showClose:true,
                  message:response.data.message
                });
                this.items = response.data.res.list;
                for (var i = 0;i<this.items.length;i++ ) {
                  if (this.items[i].description.length > 8){
                    this.items[i].description = this.items[i].description.slice(0,8)+'...';
                  }
                }
              } else {
                this.$message.warning({
                  message:"获取视频失败"
                })
              }
            })
            .catch(function (err) {
              console.log(err)
              this.$message.error({
                message:"获取视频失败"
              })
            })
        } else if (this.smallCategory == ""){  //判断是不是小分类的分页
          //小分类为空，说明为大分类的分页
          this.$axios.post("/video/big/" +this.key+ "?page_num=" +this.currentPage+ "&page_size=8&big_category=" +this.bigCategory+ "")
            .then((response) => {
              if (response.status == 200) {
                this.$message.success({
                  showClose: true,
                  message: response.data.message
                });
                this.items = response.data.res.list;
                for (var i = 0;i<this.items.length;i++ ) {
                  if (this.items[i].description.length > 8){
                    this.items[i].description = this.items[i].description.slice(0,8)+'...';
                  }
                }
              } else {
                this.$message.warning({
                  showClose: true,
                  message: "获取视频错误"
                })
              }
            })
            .catch(function (err) {
              this.$message.error({
                showClose: true,
                message: err
              })
            })
        } else {
          //小分类下的分页
          this.$axios.post("/video/small/" +this.key+ "?page_num=" +this.currentPage+ "&page_size=8&big_category=" +this.bigCategory+ "&small_category=" +this.smallCategory+ "")
            .then((response) => {
              if (response.status == 200) {
                this.$message.success({
                  showClose: true,
                  message: response.data.message
                });
                this.items = response.data.res.list;
                for (var i = 0;i<this.items.length;i++ ) {
                  if (this.items[i].description.length > 8){
                    this.items[i].description = this.items[i].description.slice(0,8)+'...';
                  }
                }
              } else {
                this.$message.warning({
                  showClose: true,
                  message: "获取视频错误"
                })
              }
            })
            .catch(function (err) {
              this.$message.error({
                showClose: true,
                message: err
              })
            })
        }
      },

      //获取二级目录的中文名称
      handleCommand:function (command) {
        this.smallCategoryChinese = command;
      },

//      最新最热切换
      toggle:function () {
        this.isNew = !this.isNew;
        if (this.key == 1){
          this.key = 0 ;
        } else {
          this.key = 1;
        };
        //判断是一级分类还是二级分类
        if (this.bigCategory == "") {
          //一级分类
          this.fetchAll();
        } else if(this.smallCategory != "") {
          this.getSmallVideo(this.bigCategory,this.smallCategory);
        } else {
          this.getBigVideo();
        }

      },

      //获取大分类
      getBigCategory:function (index) {
//        console.log(index);
        this.bigCategory = this.classItems[index].type;
        this.getBigVideo();
      },

      //获取小分类
      getSmallCategory:function (index,index2) {
        this.bigCategory = this.classItems[index].type;
        this.smallCategory = this.smallCategoryChinese;
        this.getSmallVideo(this.classItems[index].type,this.smallCategoryChinese);
      }
    },
    created() {
      this.fetchAll()
    },
  }
</script>

<style scoped>
  .noneResult{
    margin: 100px 30% 0 35%;
  }
  .noneResult h1{
    color: grey;
  }
  .app-video{
    width:100%;
  }
  .vedioShow{
    width:80%;
    margin:20px 10% 0 10%;
    height:450px;
  }
  /*最新最热*/
  .newOrHot{
    width:80%;
    border-radius: 10px;
    margin:10px 10% 0 10%;
  }
  .toggleActive{
    background: #229c4c;
    font-size:18px;
    border-radius: 10px;
    color: white;
  }
  /*视频展示小框样式*/
  .main_1{
    width: 100%;
    overflow: auto;
    margin-left: auto;
    margin-right: auto;
  }

  .main_1 img{
    display: block;
    overflow: hidden;
    border-radius: 8px;
    position: relative;
    transition: all .3s ease;
    -webkit-transition: all .3s ease;
    -moz-transition: all .3s ease;
    -ms-transition: all .3s ease;
    -o-transition: all .3s ease;
  }

  .main_1 a:hover img{
    transform:scale(1.04,1.2);
    -ms-transform:scale(1.04,1.2);
    -webkit-transform:scale(1.04,1.2);
  }
  .videoPreview{
    float: left;
    margin-right: 10px;
    margin-bottom: 20px;
    margin-top: 20px;
    margin-left: 20px;
  }

  .box{
    position: absolute;
    padding-left: 5px;
    padding-right: 5px;
    z-index: 2;
    height: 20px;
    background: #caced5;
    margin-top: -20px;
    margin-left: 2px;
    border-radius: 10px;
  }
  .style{
    margin-top: 20px;
  }
  .style1{
    margin-left: 150px;
    font-size: 20px;
    margin-top: 30px;
  }
  .el-dropdown-link {
    cursor: pointer;
    color: black;
    margin-right: 30px;

    font-size: 20px;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
  .active{
    background: #409EFF;
  }

  /*分类区域样式*/
  .nav{
    width:80%;
    margin: 10px 10% 0 10%;
  }
  .style{
    margin-top: 20px;
    font-size: 20px;
    margin-left: 20px;
  }

  .el-dropdown-link {
    cursor: pointer;
    color: black;
    margin-right: 30px;

    font-size: 20px;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }

  /*分页区域*/
  .block{
    margin-left: 37%;
  }

  .appfooter {
    width: 100%;
    height: 100px;
    background-color: black;
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
