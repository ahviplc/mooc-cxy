<template>
    <div class="usercollect">

      <div class="collectHead" >
        <label>我的收藏</label>
      </div>
      <hr/>
      <div v-show="videoItems.length == 0" class="noneResult">
        <h1 >啊偶，收藏夹空空的。。。</h1>
      </div>

      <div>
        <div class="collectVideos">
          <!--视频展示小框-->
          <div class="collectVideoInfo" v-for="(item,index) in videoItems" :key="index">
            <!--图片区域-->
            <div class="videoImage">
              <router-link :to="'/videoPlay/' + item.id">
                <img :src=item.first_frame style="width: 160px;height: 90px;border-radius: 5px">
              </router-link>
            </div>
            <div class="videoInfo">
              <p class="videoSubject">{{item.video_name}}</p>
              <label class="videoType">类别：{{item.subject}}</label>
              <p class="videoDescription">描述：{{item.description}}</p>
            </div>
            <el-button type="primary" plain style="margin-top: 75px" @click="cancelCollect(index,item.id)" size="small">取消</el-button>
          </div>
        </div>

      </div>

    </div>
</template>

<script>
    export default {
      name: 'usercollect',
      data(){
        return {
          //视频数组
          videoItems:[],
        }
      },
      methods:{
        getAllCollectVideos:function () {
          this.$axios.get("/video/collection/list/?page_num=1&page_size=10")
            .then(response =>{
              console.log(response.data.res.list)
              if (response.data.code == 1) {
                this.videoItems = response.data.res.list;
              }
            })
            .catch(function (err) {
              console.log(err)
            })
        },
        cancelCollect:function (index,key) {
          this.$axios.delete("/video/collection/" + key)
            .then(response => {
              if (response.data.code == 1){
                this.$message.success({
                  message:response.data.message,
                  showClose:true
                });
                this.getAllCollectVideos();
              } else {
                this.$message.success({
                  message:"取消收藏失败!",
                  showClose:true
                });
              }
            })
            .catch(function (err) {
              console.log(err);
            })
        }
      },
      created(){
        this.getAllCollectVideos();
      }
    }
</script>

<style scoped>
  .noneResult{
    margin: 100px 40% 0 30%;
  }
  .noneResult h1{
    color: grey;
  }
.usercollect{
  width:100%;
  height:800px;
}
.collectHead{
  width:100%;
  height:20px;
  margin-bottom: 10px;
}
  .collectVideoInfo{
    width:40%;
    height:130px;
    margin-left: 5%;
    margin-top: 20px;
    float: left;
  }
  .videoInfo{
    width:145px;
    height:130px;
    float: left;
  }
  .videoImage{
    width:160px;
    height:90px;
    margin-top: 20px;
    float: left;
  }
.videoSubject{
  margin-left: 10px;
  font-weight: 600;
  font-size: 18px;
  margin-top: 20px;
  margin-bottom: 10px;
}
  .videoType{
    margin-top: 10px;
    margin-left: 10px;
    font-size:15px;
  }
  .videoDescription{
    margin-top: 10px;
    margin-left:10px;
    font-size:15px;
  }
</style>
