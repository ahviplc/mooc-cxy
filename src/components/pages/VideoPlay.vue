<template>
  <div class="videoPlay">
    <!--视频详细信息 播放量/点赞/收藏/-->
    <div class="vedioInfo">
        <ul>
          <li id="videoname_1"><a>{{videoInformation.description}}</a></li>
          <li id="videoname_2"><a>{{videoInformation.createAt}}</a></li>
            <br><br><br>
          <li id="playcount"><a>播放量<i class="el-icon-view"></i><span>{{videoInformation.play_sum}}</span></a></li>
          <li id="dianzancount"><a>点赞量<i class="el-icon-star-on"></i><span>{{videoInformation.yes_sum}}</span></a></li>
          <li id="collectcount"><a>收藏量<i class=""></i><span>{{videoInformation.collection_sum}}</span></a></li>
          <li id="collect" @click="collect"><a>{{this.isCollect}}</a></li>
          <li id="dianzan" @click="star"><a>{{this.isPraise}}<i v-bind:class="this.praiseIcon"></i></a></li>
        </ul>
    </div>

    <!--视频播放区域-->
    <div class="vedioPlayContainer">
      <div class="videoPlayPart">
      </div>
    </div>

    <div class="comment">
      <div class="commentBigPart">

        <div class="commentHead">
          <p>全部评论</p>
          <hr>
        </div>

        <!--用户对当前视频的评论框-->
        <div class="commentPart">
          <div class="userImage">
            <img :src=currentUserImage style="width: 60px;height: 60px;border-radius: 50%"/>
          </div>
          <div class="commentWritePart">
            <textarea v-model="userVideoComment" clplaceholder="说点什么吧"></textarea>
          </div>
          <button @click="postVideoComment">发表评论</button>
        </div>

        <!--展示所有评论区域-->
        <div class="userComments">
          <div class="comment1" v-for="(videoComment,index) in videoComments" :key="index">

            <div class="userImage">
              <img :src=videoComment.image style="width: 60px; height: 60px;border-radius: 50%"/>
            </div>

            <div class="userInfo" >
              <!--用户对视频的评论（一级评论）-->
              <h6><a>{{videoComment.username}}</a><span>LV4</span>
                <p>{{videoComment.content}}</p>
                <ul>
                  <li>#{{index+1}} - {{videoComment.createAt}} </li>
                  <li v-if="videoComment.isYes == 0"><i :class=initYes @click="dianzan(videoComment.id,videoComment.isYes)" style="cursor: pointer"></i>{{videoComment.yesCount}}</li>
                  <li v-else><i :class=alreadyYes @click="dianzan(videoComment.id,videoComment.isYes)" style="cursor: pointer"></i>{{videoComment.yesCount}}</li>
                  <li type="button" v-bind:data_id=videoComment.id @click="reply" style="cursor: pointer;">回复</li>
                  <li type="button" v-bind:data_id=videoComment.id v-show="videoComment.username == currentUserName"  @click="update" style="cursor: pointer">修改</li>
                  <li type="button" v-show="videoComment.sub_comment.length > 0" style="cursor: pointer" @click="showChildComment" v-bind:data_id=videoComment.id>查看子评论</li>
                </ul>
              </h6>
              <!--一级评论回复框-->
              <div class="replyCommentPart" v-show="commentBoxId==videoComment.id">
                <div class="replyUserImage">
                  <img :src=currentUserImage style="width: 50px;height: 50px;border-radius: 50% ;border-radius: 50%"/>
                </div>
                <div class="replyCommentWritePart">
                  <textarea v-model="userToUserComment1" clplaceholder="说点什么吧"></textarea>
                </div>
                <button @click="postUserToUserComment1(videoComment.id, videoId, userToUserComment1)">发表评论</button>
              </div>

              <!--一级评论修改框-->
              <div  class="updateCommentPart" v-show="commentBoxId_update==videoComment.id">
                <div class="updateUserImage">
                  <img :src=currentUserImage style="width: 50px;height: 50px;border-radius: 50%"/>
                </div>
                <div class="updateCommentWritePart">
                  <textarea v-model="updateComment" clplaceholder="说点什么吧"></textarea>
                </div>
                <button @click="putUpdateComment(videoComment.id,updateComment)">修改评论</button>
              </div>

              <div v-show="isShowChildComments==videoComment.id">
                <!--用户对视频的评论的评论（二级评论）-->
                <div class="smallComment"  v-for="(item,index) in videoComment.sub_comment" :key="index">
                  <h6><img :src=item.image style="width: 50px;height: 50px;border-radius: 50%" ><a>{{item.username}}</a><b>回复</b><a>{{videoComment.username}}</a><span>{{item.content}}</span>
                    <ul>
                      <li id="li1">#{{index+1}} - {{item.createAt}} </li>
                      <li v-if="item.isYes == 0"><i :class=initYes @click="dianzan(item.id,item.isYes)" style="cursor: pointer"></i>{{item.yesCount}}</li>
                      <li v-else><i :class=alreadyYes @click="dianzan(item.id,item.isYes)" style="cursor: pointer"></i>{{item.yesCount}}</li>
                      <li type="button" v-bind:data_id=item.id  @click="reply" style="cursor: pointer;">回复</li>
                      <li type="button" v-bind:data_id=item.id v-show="item.username == currentUserName"  @click="update" style="cursor: pointer">修改</li>
                      <li type="button" v-show="item.sub_comment.length > 0" style="cursor: pointer" @click="showThirdComment" v-bind:data_id=item.id>查看子评论</li>
                    </ul>
                  </h6>

                  <!--二级评论回复框-->
                  <div  class="replyCommentPart2" v-show="commentBoxId==item.id">
                    <div class="replyUserImage">
                      <img :src=currentUserImage style="width: 40px;height: 40px;border-radius: 50%" />
                    </div>
                    <div class="replyCommentWritePart">
                      <textarea v-model="userToUserComment2" clplaceholder="说点什么吧"></textarea>
                    </div>
                    <button @click="postUserToUserComment2(item.id, videoId, userToUserComment2)">发表评论</button>
                  </div>

                  <!--二级评论修改框-->
                  <div class="updateCommentPart2" v-show="commentBoxId_update==item.id">
                    <div class="updateUserImage">
                      <img :src=currentUserImage style="width: 40px;height: 40px;border-radius: 50%" />
                    </div>
                    <div class="updateCommentWritePart">
                      <textarea v-model="updateComment2" clplaceholder="说点什么吧"></textarea>
                    </div>
                    <button @click="putUpdateComment(item.id,updateComment2)">修改评论</button>
                  </div>

                  <!--展示三级评论区域-->
                  <div v-show="isShowThirdComments==item.id">
                    <div class="smallComment2"  v-for="(item2,index) in item.sub_comment" :key="index">
                      <h6><img :src=item2.image style="width: 40px;height: 40px;border-radius: 50%"><a>{{item2.username}}</a><b>回复</b><a>{{item.username}}</a><span>{{item2.content}}</span>
                        <ul>
                          <li id="li11">#{{index+1}} - {{item2.createAt}} </li>
                          <li v-if="item2.isYes == 0"><i :class=initYes @click="dianzan(item2.id,item2.isYes)" style="cursor: pointer"></i>{{item2.yesCount}}</li>
                          <li v-else><i :class=alreadyYes @click="dianzan(item2.id,item2.isYes)" style="cursor: pointer"></i>{{item2.yesCount}}</li>
                          <li v-show="item2.username == currentUserName" type="button" v-bind:data_id=item2.id @click="update" style="cursor: pointer">修改</li>
                        </ul>
                      </h6>

                      <!--三级评论修改框-->
                      <div class="updateCommentPart3" v-show="commentBoxId_update==item2.id">
                        <div class="updateUserImage">
                          <img :src=currentUserImage style="width: 40px;height: 40px;border-radius: 50%" />
                        </div>
                        <div class="updateCommentWritePart">
                          <textarea v-model="updateComment3" clplaceholder="说点什么吧"></textarea>
                        </div>
                        <button @click="putUpdateComment(item2.id,updateComment3)">修改评论</button>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <appfooter></appfooter>

  </div>
</template>

<script>
  import Appfooter from "../Footer";
  export default {
    name: 'videoPlay',
    components: {Appfooter},
    data() {
      return {
        //视频id
        videoId: '',
        //视频信息
        videoInformation: {},
        //是否收藏
        isCollect: "收藏",
        //是否点赞
        isPraise: "点赞",
        //控制点赞的亮/灭
        praiseIcon: "el-icon-star-off",
        // 用户对用户的评论回复框的显示与隐藏情况
        isShow: false,
        // 用户对视频的一级评论
        userVideoComment: "",
        // 获取视频的一级评论的数组
        videoComments: [],
        //获取二级评论的数组
        item:[],
        // 二级评论
        userToUserComment1:"",
        // 三级评论
        userToUserComment2:"",
        // 修改的评论
        updateComment:"",
        // 修改的二级评论
        updateComment2:"",
        // 修改的三级评论
        updateComment3:"",

        currentUserImage:sessionStorage.getItem("userImage"),
        //评论框展示
        commentBoxId:-1,
        //修改评论框展示
        commentBoxId_update:-1,
        //二级评论展示
        isShowChildComments:-1,
        //三级评论展示
        isShowThirdComments:-1,
        //初始化未点赞
        initYes:"el-icon-star-off",
        //初始化已点赞
        alreadyYes:"el-icon-star-on",
        //获取当前的用户名
        currentUserName: sessionStorage.getItem("userName"),
      }
    },
    methods: {
      // 视频播放量统计
      addPlaySum: function () {
        this.$axios.get('/video/play/' + this.videoId)
          .then(response => {
            console.log(response)
          })
          .catch(function (err) {
            console.log(err)
          })
      },

      //点赞
      star: function () {
        //判断是  未点赞还是已点赞
        if (this.videoInformation.isYes == 0) { //没有点赞
          this.$axios.post('/video/yes/' + this.videoId)
            .then(response => {
              if (response.data.code == 1) {
                // console.log(response);
                this.$message.success({
                  showClose: true,
                  message: response.data.message
                });
                //成功点赞后设置为  已点赞状态
                this.videoInformation.isYes = 1;
                this.isPraise = "已点赞";
                this.praiseIcon = "el-icon-star-on";
                //点赞量+1
                this.videoInformation.yes_sum += 1;
              } else {
                this.$message.error({
                  showClose: true,
                  message: "点赞出错！"
                })
              }
            }).catch(function (err) {
            console.log(err)
          })
        } else { //原本是点赞状态，再次点击取消点赞
          // console.log("in dianzan " + sessionStorage.getItem('userToken'));
          this.$axios.delete("/video/yes/" + this.videoId).then(response => {
            if (response.data.code == 1) {
              this.$message.success({
                showClose: true,
                message: response.data.message
              });
              //成功取消点赞后设置为  未点赞状态
              this.videoInformation.isYes = 0;
              this.isPraise = "点赞";
              this.praiseIcon = "el-icon-star-off";
              //点赞量-1
              this.videoInformation.yes_sum -= 1;
            } else {
              this.$message.error({
                showClose: true,
                message: "点赞出错！"
              })
            }
          }).catch(function (err) {
            console.log(err)
          })
        }
      },

      // 收藏
      collect: function () {
        //判断是  未收藏还是已收藏
        if (this.videoInformation.isCollection == 0) { //没有收藏
          this.$axios.post('/video/collection/' + this.videoId).then((response) => {
            if (response.data.code == 1) {
              // console.log(response);
              this.$message.success({
                showClose: true,
                message: response.data.message
              });
              //成功收藏后设置为  已收藏状态
              this.videoInformation.isCollection = 1;
              this.isCollect = "已收藏";
              // this.praiseIcon = "el-icon-star-on";
              //收藏量+1
              this.videoInformation.collection_sum += 1;
            } else {
              this.$message.error({
                showClose: true,
                message: "收藏出错！"
              })
            }
          }).catch(function (err) {
            console.log(err)
          })
        } else { //原本是收藏状态，再次点击取消收藏
          // console.log("in collection " + sessionStorage.getItem('userToken'));
          this.$axios.delete("/video/collection/" + this.videoId).then(response => {
            if (response.data.code == 1) {
              this.$message.success({
                showClose: true,
                message: response.data.message
              });
              //成功取消收藏后设置为  未收藏状态
              this.videoInformation.isCollection = 0;
              this.isCollect = "收藏";
              // this.praiseIcon = "el-icon-star-off";
              //收藏量-1
              this.videoInformation.collection_sum -= 1;
            } else {
              this.$message.error({
                showClose: true,
                message: "收藏出错！"
              })
            }
          }).catch(function (err) {
            console.log(err)
          })
        }
      },

      //通过id获取视频详细信息
      getAllInfo: function () {
        var that = this;
        this.$axios.get('/video/comment/' + this.videoId)
          .then(function (response) {
            if (response.data.code == 1) {
              that.videoInformation = response.data.res;
//              console.log("in videoPlay " + that.videoInformation);

//                视频播放
//              console.log(that.videoInformation.url);
//              console.log(that.videoInformation.collection_sum);
//              console.log(that.videoInformation.play_sum);
              that.videoComments = response.data.res.comments;

              var vd = "<video" + " src='"+that.videoInformation.url+"'"+
                " height='600'"+
                " style='width:100%;'"+
                " id='myPlayer' poster='"+that.videoInformation.first_frame+"' controls playsInline webkit-playsinline autoplay>"+
                " <source src='"+ that.videoInformation.url +"'" +
                " type='application/x-mpegURL'/>"+
                " </video>";
              $('.videoPlayPart').append(vd)
              var player = new EZUIPlayer('myPlayer');

              //判断该视频是否已点赞
              if (that.videoInformation.isCollection == 0) { //在本帐号上未点赞过
                that.isCollect = "收藏"
              } else { //在本帐号上已经点赞过
                that.isCollect = "已收藏"
              }
              //判断视频是否已点赞
              if (that.videoInformation.isYes == 0) { //没有点赞过
                that.isPraise = "点赞"
                that.praiseIcon = "e" +
                  "l-icon-star-off"
              } else {
                that.isPraise = "已点赞";
                that.praiseIcon = "el-icon-star-on"
              }
            }
          })
      },

      // 评论回复框的显示与隐藏方法
      reply: function (event) {
        var target = event.target|| window.event.srcElement;
        this.commentBoxId = target.getAttribute('data_id');
        if (this.commentBoxId == sessionStorage.getItem("boxId")){
          sessionStorage.setItem("boxId",-2);
          return this.commentBoxId = -1;
        }
        sessionStorage.setItem('boxId', this.commentBoxId);
      },

      //评论修改框的显示与隐藏方法
      update:function(event) {
        var target_update = event.target|| window.event.srcElement;
        this.commentBoxId_update = target_update.getAttribute('data_id');
        if (this.commentBoxId_update == sessionStorage.getItem("boxId_update")){
          sessionStorage.setItem("boxId_update",-2);
          return this.commentBoxId_update = -1;
        }
        sessionStorage.setItem('boxId_update', this.commentBoxId_update);
      },

      //给视频添加评论（一级）
      postVideoComment: function () {
        //判断评论的内容是否为空
        if (this.userVideoComment == ""){
          alert("请输入评论！！！")
        } else{
          this.$axios.post('/comment/insert/' + this.videoId + '?content= ' + this.userVideoComment)
            .then(response => {
              if (response.data.code == 1) {
                // console.log(response)
                //成功评论之后更新评论列表
                this.getVideoComments();
                this.userVideoComment = "";
              } else {
                this.$message.error({
                  showClose: true,
                  message: "评论出错！"
                })
              }
            }).catch(function (err) {
            console.log(err)
          })
        }
      },

      // 给视频的评论增加评论（二级）
      postUserToUserComment1: function(comment_id,video_id, content ){
        if (this.userToUserComment1 == "") {
          alert("请输入评论！！！")
        }else {
          this.$axios.post('/comment/comment/' + comment_id
            + '?video_id=' + video_id + '&content=' + content)
            .then(response => {
              if (response.data.code == 1) {
                this.getVideoComments();
                this.commentBoxId = -1;
                this.userToUserComment1 = "";
              } else {
                this.$message.error({
                  showClose: true,
                  message: "评论出错！"
                })
              }
            }).catch(function (err) {
            console.log(err)
          })
        }
      },

      // 给视频的评论增加评论(三级评论)
      postUserToUserComment2: function(comment_id, video_id, content ){
        if (this.userToUserComment2 == "") {
          alert("请输入评论！！！")
        }else {
          this.$axios.post('/comment/comment/' + comment_id
            + '?video_id=' + video_id + '&content=' + content)
            .then(response => {
              if (response.data.code == 1) {
                this.getVideoComments();
                this.commentBoxId = -1;
                this.userToUserComment2 = "";
              } else {
                this.$message.error({
                  showClose: true,
                  message: "评论出错！"
                })
              }
            }).catch(function (err) {
            console.log(err)
          })
        }
      },

      // 根据视频id获取所有评论（一级）
      getVideoComments: function () {
        this.$axios.get('/video/comment/' + this.videoId)
          .then(response => {
            if (response.data.code == 1) {
              this.videoComments = response.data.res.comments;
            } else {
              this.$message.error({
                showClose: true,
                message: "获取评论出错！"
              })
            }
          }).catch(function (err) {
          console.log(err);
        })
      },
      // 修改评论
      putUpdateComment:function (id,content) {
        if (content == "") {
          alert("请输入评论！！！")
        }else {
          this.$axios.put('/comment/update/' + id ,{
            "content":content
          })
            .then(response => {
              if (response.data.code == 1) {
                this.getVideoComments();
                content = "";
                this.commentBoxId_update = -2;
              }else {
                this.$message.error({
                  showClose: true,
                  message: "评论出错！"
                });
              }
            }).catch(function (err) {
            console.log(err)
          })
        }
      },
      //如果二级评论存在，点击查看二级评论
      showChildComment:function (event) {
        var target = event.target|| window.event.srcElement;
        this.isShowChildComments = target.getAttribute('data_id');
        if (this.isShowChildComments == sessionStorage.getItem("commentId")){
          sessionStorage.setItem("commentId",-2);
          return this.isShowChildComments = -1;
        }
        sessionStorage.setItem('commentId', this.isShowChildComments);
      },
      //如果三级评论存在，点击查看三级评论
      showThirdComment:function (event) {
        var target = event.target|| window.event.srcElement;
        this.isShowThirdComments = target.getAttribute('data_id');
        if (this.isShowThirdComments == sessionStorage.getItem("thirdCommentId")){
          sessionStorage.setItem("thirdCommentId",-2);
          return this.isShowThirdComments = -1;
        }
        sessionStorage.setItem("thirdCommentId",this.isShowThirdComments);
      },
      //给评论点赞
      dianzan:function (id,isYes) {
        //判断是 已点赞还是未点赞
        if(isYes == 0){ //未点赞
          this.$axios.get("/comment/yes/" + id)
            .then(response => {
              if (response.data.code == 1){
                this.$message.success({
                  message:response.data.message,
                  showClose:true
                });
                this.getVideoComments();
              } else{
                this.$message.success({
                  message:"点赞出错",
                  showClose:true
                })
              }
            })
            .catch(function (err) {
              console.log(err);
            })
        } else { //已点赞，再次点击取消点赞
          this.$axios.delete("/comment/yes/" + id)
            .then(response => {
              if (response.data.code == 1){
                this.$message.success({
                  message:response.data.message,
                  showClose:true
                });
                this.getVideoComments();
              } else{
                this.$message.success({
                  message:"点赞出错",
                  showClose:true
                })
              }
            })
            .catch(function (err) {
              console.log(err);
            })
        }
      }
    },
    created: function () {
      //获取当前视频的id
      this.videoId = this.$route.params.id;
//      console.log("in videoPlay id is " + this.videoId);
      this.addPlaySum();
      //播放量增加的函数
      this.addPlaySum();
      //获取视频的详细信息
      this.getAllInfo();
    }
  }

</script>

<style scoped>
  .videoPlay{
    width:100%;
  }
  .vedioInfo{
    width:100%;
    height:100px;
  }

  /*视频详细信息栏*/
  #videoname_1{
    font-size: 20px;
    margin-top: 15px;
    margin-left: 100px;
  }
  #videoname_2{
    font-size: 15px;
    margin-left: 30px;
    margin-top: 20px;
  }
  #playcount{
    margin-left: 100px;
    margin-right: 50px;
  }
  #collectcount{
    margin-right: 50px;
  }
  #dianzancount{
    margin-right: 50px;
  }
  #collect{
    float: right;
    margin-right: 80px;
  }
  #dianzan{
    float: right;
    margin-right: 50px;
  }
  .vedioInfo ul{
    height:100px;
    border: 1px solid antiquewhite;
    background-color: antiquewhite;
  }
  .vedioInfo  li{
    list-style-type: none;
    float: left;
  }
  .vedioInfo span {
    margin-left: 10px;
  }
  #playcount,#dianzancount,#collectcount,#videoname_1,#videoname_2 a{
    width: auto;
    height: 40px;
    line-height: 40px;
    color: burlywood;
    text-align: center;
    text-decoration: none;
  }

  #dianzan a{
    width: auto;
    cursor: pointer;
    height: 40px;
    line-height: 40px;
    color: burlywood;
    text-align: center;
    text-decoration: none;
  }
  #collect a{
    width: auto;
    cursor: pointer;
    height: 40px;
    line-height: 40px;
    color: burlywood;
    text-align: center;
    text-decoration: none;
  }
  #dianzan a:hover{
    color: black;
  }
  #collect a:hover{
  color: black;
  }

  /*视频播放区域*/
  .vedioPlayContainer{
    width:100%;
    background: #fdf2e0;
  }
  .videoPlayPart{
    width:70%;
    margin:0 auto;
  }

  /*用户评论区域的样式*/
  .comment{
    width: 80%;
    margin-top: 20px;
    margin-left: 10%;
    margin-right: 10%;
  }
  .commentHead p{
    width: 70%;
    margin: 0 auto;
    color: blue;
  }
  .commentHead hr{
    width: 70%;
    margin: 0 auto;
    background: blue;
  }
  .commentPart{
    width: 100%;
  }
  .commentPart .userImage{
    height: 100px;
    float: left;
    margin-left: 150px;
    margin-top: 20px;
  }
  .commentWritePart {
    float: left;
  }
  .commentWritePart textarea{
    width: 600px;
    height: 70px;
    background-color: aliceblue;
    border-radius: 10px;
    margin-left: 10px;
    margin-top: 20px;
    margin-bottom: 20px;
    outline:none;
  }
  .commentPart button{
    width: 80px;
    height: 70px;
    background-color: antiquewhite;
    border-radius: 20%;
    margin-top: 20px;
    margin-left: 10px;
    outline: none;
    font-size: 18px;
    font-family: "Axure Handwriting";
  }
  .userComments{
    clear: both;
    position:relative;
    width: 100%;
    height: 40px;
  }
  .comment1{
    width: 100%;
    height:100px;
    clear: both;
  }
  .comment1  .userImage {
    clear: both;
    height: 100px;
    float: left;
    margin-left: 150px;
    margin-top: 20px;
  }
  .comment1 .userInfo{
    width: 695px;
    float: right;
    height: auto;
    margin-right: 166px;
    border-bottom: 0.5px gainsboro solid;
  }
  .comment1 .userInfo h6{
    height: 70px;
    margin-left: 20px;
    margin-top: 20px;
    margin-bottom: 20px;
    color: coral;
    font-size: 10px;
  }
  .comment1 .userInfo h6 span{
    background: coral;
    color: aliceblue;
    font-size: 5px;
    font-family: Cambria;
    margin-left: 10px;
  }
  .comment1 .userInfo p{
    clear: both;
    margin-top: 10px;
    color: black;
    font-family: "Axure Handwriting";
    font-size: 10px;
  }
  .comment .userInfo ul li {
    list-style-type: none;
    float: left;
    margin-top: 10px;
    margin-right: 8px;
    font-size: 5px;
    color: darkgray;
  }
  .replyCommentPart{
    clear: both;
  }
  .replyCommentPart .userImage{
    height: 100px;
    float: left;
    margin-left: 150px;
    margin-top: 20px;
  }
  .replyCommentPart img{
    float: left;
    width: 55px;
    height: 55px;
    margin-top: 20px;
  }
  .replyCommentWritePart {
    float: left;
  }
  .replyCommentWritePart textarea{
    float: left;
    width: 550px;
    height: 50px;
    background-color: aliceblue;
    border-radius: 10px;
    margin-left: 10px;
    margin-top: 20px;
    margin-bottom: 20px;
    outline:none;
  }
  .replyCommentPart button{
    float: left;
    width: 60px;
    height: 50px;
    background-color: antiquewhite;
    border-radius: 20%;
    margin-top: 20px;
    margin-left: 10px;
    outline: none;
  }

  .replyCommentPart2{
    clear: both;
    margin-left: 45px;
  }
  .replyCommentPart2 .userImage{
    height: 100px;
    float: left;
    margin-left: 150px;
    margin-top: 20px;
  }
  .replyCommentPart2 img{
    float: left;
    width: 40px;
    height: 40px;
    margin-top: 20px;
  }
  .replyCommentPart2 .replyCommentWritePart {
    float: left;
  }
  .replyCommentPart2 .replyCommentWritePart textarea{
    float: left;
    width: 500px;
    height: 40px;
    background-color: aliceblue;
    border-radius: 10px;
    margin-left: 10px;
    margin-top: 20px;
    margin-bottom: 20px;
    outline:none;
  }
  .replyCommentPart2 button{
    float: left;
    width: 40px;
    height: 40px;
    background-color: antiquewhite;
    border-radius: 20%;
    margin-top: 20px;
    margin-left: 10px;
    outline: none;
  }

  .comment1 .userInfo .smallComment{
    width: 695px;
    margin-left: 500px;
    float: right;
    height: auto;
    clear: both;
  }
  .comment1 .userInfo .smallComment h6{
    height: 70px;
    margin-left:5px;
    margin-top: 10px;
    margin-bottom: 20px;
    font-size: 10px;
  }
  .comment1 .userInfo .smallComment h6 img {
    width:30px;
    height:30px;
    margin-right: 10px;
  }
  .comment1 .userInfo .smallComment h6 span {
    font-family: "Axure Handwriting";
    font-size: 10px;
    color: black;
    background: white;
  }
  .comment1 .userInfo .smallComment b{
    font-family: "Axure Handwriting";
    color:black;
    margin: 0 10px;
  }
  .comment1 .userInfo .smallComment ul #li1 {
    margin-left: 40px;
  }
  .comment1 .userInfo .smallComment2 {
    margin-left: 40px;
    clear: both;
  }

  .updateCommentPart {
    clear: both;
  }
  .updateCommentPart .userImage{
    height: 100px;
    float: left;
    margin-left: 150px;
    margin-top: 20px;
  }
  .updateCommentPart img{
    float: left;
    width: 55px;
    height: 55px;
    margin-top: 20px;
  }
  .updateCommentWritePart {
    float: left;
  }
  .updateCommentWritePart textarea{
    float: left;
    width: 550px;
    height: 50px;
    background-color: aliceblue;
    border-radius: 10px;
    margin-left: 10px;
    margin-top: 20px;
    margin-bottom: 20px;
    outline:none;
  }
  .updateCommentPart button{
    float: left;
    width: 60px;
    height: 50px;
    background-color: antiquewhite;
    border-radius: 20%;
    margin-top: 20px;
    margin-left: 10px;
    outline: none;
  }

  .updateCommentPart2 {
    clear: both;
    margin-left: 45px;
  }
  .updateCommentPart2 updateUserImage{
    height: 100px;
    float: left;
    margin-left: 150px;
    margin-top: 20px;
  }
  .updateCommentPart2 img{
    float: left;
    width: 40px;
    height: 40px;
    margin-top: 20px;
  }
  .updateCommentPart2 .updateCommentWritePart textarea{
    float: left;
    width: 500px;
    height: 40px;
    background-color: aliceblue;
    border-radius: 10px;
    margin-left: 10px;
    margin-top: 20px;
    margin-bottom: 20px;
    outline:none;
  }
  .updateCommentPart2  button{
    float: left;
    width: 40px;
    height: 40px;
    background-color: antiquewhite;
    border-radius: 20%;
    margin-top: 20px;
    margin-left: 10px;
    outline: none;
  }

  .updateCommentPart3 {
    clear: both;
    margin-left: 10px;
  }
  .updateCommentPart3 updateUserImage{
    height: 100px;
    float: left;
    margin-left: 150px;
    margin-top: 20px;
  }
  .updateCommentPart3 img{
    float: left;
    width: 40px;
    height: 40px;
    margin-top: 20px;
  }
  .updateCommentPart3 .updateCommentWritePart textarea{
    float: left;
    width: 500px;
    height: 40px;
    background-color: aliceblue;
    border-radius: 10px;
    margin-left: 10px;
    margin-top: 20px;
    margin-bottom: 20px;
    outline:none;
  }
  .updateCommentPart3  button{
    float: left;
    width: 40px;
    height: 40px;
    background-color: antiquewhite;
    border-radius: 20%;
    margin-top: 20px;
    margin-left: 10px;
    outline: none;
  }
</style>
