<template>
  <div class="userupload">
    <div class="uploadHead" >
      <label @click="dialogFormVisible = false">我的上传</label>
      <span @click="dialogFormVisible = true">上传视频</span>
    </div>
      <hr/>

    <!--上传视频展示区域-->
    <div>
      <div class="uploadVideos" v-if="!dialogFormVisible">
        <div v-show="videoItems.length == 0" class="noneResult">
          <h1>您还没有上传过视频噢！</h1>
        </div>
        <!--视频展示小框-->
        <div class="uploadVideoInfo" v-for="(item,index) in videoItems" :key="index">
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
          <el-button style="margin-top: 75px;margin-left: 10px" type="plain" size="small" @click="deleteUpload(item.id)">取消上传</el-button>
        </div>
      </div>

      <!--上传文件form表单-->
      <div class="videoForm" v-else>
        <el-form :model="form">
          <el-form-item label="视频名称">
            <el-input v-model="form.video_name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="一级分类">
            <el-select v-model="form.big_category" placeholder="请选择一级分类" style="width: 100%;">
              <el-option label="种植业" value="种植业"></el-option>
              <el-option label="畜牧业" value="畜牧业"></el-option>
              <el-option label="水产业" value="水产业"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="二级分类">
            <el-input v-model="form.small_category" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="视频类别">
            <el-input v-model="form.subject" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="视频描述">
            <el-input v-model="form.description" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>

        <el-upload
          class="upload-demo"
          :action=url
          :name=name
          :headers="headers"
          :data="form"
          :before-upload="beforeUpload"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :on-success="handleSuccess"
          :before-remove="beforeRemove"
          :limit="1">
          <el-button size="small" type="primary">上传视频</el-button>
          <div slot="tip" class="el-upload__tip"></div>
        </el-upload>

      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'userupload',
    data(){
      return {
        url: 'http://ip:port/video/upload',
        //视频数组
        videoItems:[],
        dialogFormVisible:false,
//        上传视频的表单
        form:{
          video_name:'',
          big_category:'',
          small_category:'',
          subject:'',
          description:'',
        },
        headers: {
          Authorization: 'Bearer ' + sessionStorage.getItem('userToken')
        },
        name:"request",
      }
    },
    methods:{
      getAllUpload:function () {
        this.$axios.post("/video/myupload?page_num=1&page_size=5")
          .then(response => {
            if (response.data.code == 1){
              this.videoItems = response.data.res.list;
            }
          })
          .catch(function (err) {
            console.log(err);
          })
      },
      //上传视频用的
      handleRemove(file) {
        console.log(file);
      },
      handlePreview(file) {
        console.log(file);
      },
      beforeRemove(file, fileList) {
      },
      handleSuccess(response){
//        console.log(response);
        if (response.code == 1){
          this.$message.success({
            message:response.message,
            showClose:true
          });
          //切换回视频上传列表页
          this.dialogFormVisible = !this.dialogFormVisible;
          this.getAllUpload();
        } else{
          console.log(response.message)
        }
      },
      beforeUpload(file){
        //上传之前判断用户是否填了所有信息
        if (this.form.video_name == "" || this.form.big_category == "") {
          this.$message.error({
            message:"请完善视频信息!",
            showClose:true
          })
        } else{
          this.url = this.url  + '&video_name=' +this.form.video_name+ '&big_category=' +this.form.big_category+ '&small_category=' +this.form.small_category+ '&subject=' +this.form.subject+ '&description=' +this.form.description+ "";
        }
      },
      //取消上传视频
      deleteUpload:function (id) {
//        console.log(id)
        this.$axios.delete("/video/upload/" + id)
          .then(response => {
            console.log(response)
          })
          .catch(function (err) {
            console.log(err);
          })
      }
    },
    created(){
      //获取上传的所有视频
      this.getAllUpload();
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
  .userupload{
    width:100%;
    height:800px;
    /*background: red;*/
  }
  .uploadHead{
    width:100%;
    height:20px;
    margin-bottom: 10px;
    /*background: pink;*/
  }
  .uploadHead label{
    cursor: pointer;
  }
  .uploadHead span{
    float: right;
    cursor: pointer;
  }
  .uploadHead span:hover{
    color: lightskyblue;
  }

  /*视频展示区域*/
  .uploadVideoInfo{
    width:45%;
    height:130px;
    margin-left: 5%;
    margin-top: 20px;
    float: left;
    /*background: pink;*/
  }
  .videoInfo{
    width:160px;
    height:130px;
    /*background: yellow;*/
    float: left;
  }
  .videoImage{
    width:160px;
    height:90px;
    margin-top: 20px;
    float: left;
    /*background: yellow;*/
  }
  .videoSubject{
    margin-left: 10px;
    font-weight: 600;
    font-size: 20px;
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

  /*上传视频按钮*/
  .list {top: 15px;width: 140px;height: 40px; border:1px solid #0082E6; display:inline-block;border-radius: 10px;position: relative; line-height: 40px;margin-left: 400px;}
  #file{position: absolute;opacity: 0;color:white;width: 100%;height: 100%;z-index: 100;cursor: pointer}
  .list span{
    display: inline-block;
    text-align: center;
    width: 100%;
    line-height: 40px;
    position: absolute;
    color: #0082E6;
  }
</style>


