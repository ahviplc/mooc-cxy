<template>
  <div class="app-search">
    <div v-if="items.length == 0" class="noneResult">
      <h1 >很抱歉，没有找到相关结果</h1>
    </div>


    <div class="vedioShow" v-else>
      <h3>为您查找到 {{key}} 的相关结果如下：</h3>
      <div class="main_1">
        <div class="videoPreview" v-for="(item,index) in items">
          <router-link v-bind:to="'/videoPlay/' + item.id">
            <img :src=item.first_frame style="width: 230px;height: 120px;border-radius: 10px">
            <div class="box" style="text-align: center">
              {{item.subject}}
            </div>
          </router-link>
          <div style="margin-top: 20px">
            <span>{{item.description}}</span>
          </div>
        </div>
      </div>

  </div>
  </div>

</template>

<script>
export default {
  data(){
    return{
      searchVideos:[],
      key:"",
      items:[],
    }
  },
  methods:{
    searchVideo:function () {
      this.$axios.post("/search/text?text=" + this.key)
        .then(response => {
        if (response.data.code == 1){
          console.log(response)
          this.items = response.data.res;
          for (var i = 0; i < this.items.length; i++) {
            if (this.items[i].description.length > 8) {
              this.items[i].description = this.items[i].description.slice(0,8)+'...';
            }
          }
        }else {
          this.$message.warning({
            showClose: true,
            message: "获取视频错误"

          })
        }
      })
        .catch(function (err) {
          console.log(err)
        })
    }
  },
  created(){
    this.key = this.$route.query.words;
    this.searchVideo();
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
  .vedioShow{
    width:80%;
    margin:20px 10% 0 10%;
    height:450px;
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
  /*视频展示小区域结束*/

</style>
