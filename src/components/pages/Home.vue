<template>
    <div class="home">
      <!--用户导航栏-->
      <div id="user_header">
        <!--用户头像-->
        <img v-if="userImage === 'null'" class="user_pic"  :src="defaultImageUrl" height="150" width="150" style="cursor:pointer;"/>
        <img v-else class="user_pic" :src="userImage" height="150" width="150" style="cursor:pointer;"/>

        <div id="user_info_right">
          <div id="info_left">
            <p class="user_name">{{currentUser}}</p>
            <p>
              <span class="user_sex">女</span>
              <a class="moreinfo" @click="showMessage">▼更多信息</a>
            </p>

          </div>
          <div id="info_right">
            <div class="study_info" v-for="studyitem in studyItems">
              <p class="num">{{studyitem.number}}</p>
              <span class="info">{{studyitem.detail}}</span>
            </div>
          </div>
          <div class="user_sign" v-show="isShow">
            <p >这个客官很懒，什么都没有留下~</p>
          </div>
        </div>

      </div>

      <!--用户详细内容区-->
      <div id="user_container">
        <!--左侧导航栏-->
        <div id="user_container_left">
          <ul>
            <li  v-for="(picItem,index) in picItems" @click="selected(index)"
                 :class="{active: index == selectedItem}">
              <i><img :src="picItem.img"></i>
              <span>{{picItem.title}}</span>
            </li>
          </ul>
        </div>

        <!--右侧详细内容栏-->
        <div id="user_container_right">
          <router-view></router-view>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: 'home',
        data() {
          return {
            dialogVisible: false,
            //默认图片路径
            defaultImageUrl:"../../../../static/document/defaultImage.jpg",
            isShow:false,
            studyItems:[
              {number:"55h",detail:"学习时长"},
              {number:"1200",detail:"经验"},
              {number:"98",detail:"积分"},
              {number:"3",detail:"关注"},
              {number:"2",detail:"粉丝"},
            ],
            picItems:[
              {img:require("../../assets/dynamic.png"),title:"个人设置"},
              {img:require("../../assets/class.png"),title:"我的收藏"},
              {img:require("../../assets/lujing.png"),title:"我的上传"},
              {img:require("../../assets/shizhan.png"),title:"账户修改"},
            ],
            //控制选中格式样式
            selectedItem:0,
          }
        },
      methods:{
        showMessage:function () {
          this.isShow = !this.isShow;
        },
        selected:function (index) {
          this.selectedItem = index;
          if (index == 0) {
            this.$router.push({path:'/home/'+this.currentUser+'/basic'})
          } else if (index == 1) {
            this.$router.push({path:'/home/'+this.currentUser+'/collect'})
          }  else if (index == 2) {
            this.$router.push({path:'/home/'+this.currentUser+'/upload'})
          }  else if (index == 3) {
            this.$router.push({path:'/home/'+this.currentUser+'/account'})
          }
        },
        //更换用户头像
      },
      computed:{
          //获取当前用户名
          currentUser(){
            return this.$store.getters.currentUser;
          },
        //获取当前用户的头像
        userImage(){
          if(sessionStorage.getItem("userImage") == null){
            this.$store.commit("userImageGet",null);
          } else {
            this.$store.commit("userImageGet",sessionStorage.getItem("userImage"));
          }
          return this.$store.getters.userImage;
        }
      },
      // created(){
          //接收路由参数
        // this.$route.params.currentUser;
      // }
    }
</script>

<style scoped>
.home{
  width:100%;
  overflow: auto;
  position: relative;
  z-index: 0;
}

#user_header{
  background-image: url("../../assets/user_background.png");
  width: 100%;
  height: 150px;
}
.user_pic{
  border-radius: 50%;
  margin-top: 30px;
  margin-left: 95px;
}
#user_info_right{
  width:900px;
  height: 100px;
  /*background: black;*/
  float: right;
  position: relative;
  margin-right: 100px;
  margin-top: 30px;
}
#info_left{
  width:200px;
  height: 100px;
  float: left;
}
#info_left .user_name{
  margin-top: 10px;
  color: white;
  font-size: 25px;
  font-weight:600;
  font-family: "Adobe Hebrew";
}
#info_left .user_sex{
  color: white;
}
#info_left .moreinfo{
  color: white;
  padding-left: 25px;
  margin-left: 30px;
  border-left: 1px white solid;
  text-decoration: none;
  cursor: pointer;
}
#info_right{
  width:600px;
  height:100px;
  float: right;
}
.study_info{
  width:15%;
  float: left;
  margin-top: 2%;
  cursor: pointer;
}
#info_right .info{
  display: block;
  color: #caced5;
  text-align: center;
}
#info_right .num{
  font-size: 20px;
  font-weight: 600;
  color: #caced5;
  text-align: center;
}
#user_setting p{
  margin-top: 7%;
  margin-left: 12%;
  color: #c9cdd3;
}
.user_sign{
  color: white;
  height:50px;
}

/*内容区域*/
#user_container{
  width:100%;
  position: relative;
  overflow: auto;
}
#user_container_left{
  width:15%;
  margin-top: 50px;
  margin-left: 7%;
  height:460px;
  float: left;
}
#user_container_left li{
  list-style-type: none;
  height:40px;
  width:90%;
  border-radius: 10px;
  cursor: pointer;
}
#user_container_left li i{
  margin-left: 10px;
  line-height: 40px;
}
#user_container_left li i img{
  width:20px;
  height:20px;
}
#user_container_left li span{
  font-size: 18px;
  color: darkgrey;
  margin-left: 20px;
  line-height:40px ;
}
#user_container_right{
  width:70%;
  float: right;
  margin-top: 50px;
  margin-right: 5%;
}
/*选中状态的列表*/
.active{
  background: #F14242;
}
  /*上传头像*/
</style>
