<template>
    <div class="userBasic">
      <!--更换头像-->
      <div class="changeImage">
        <span>更换头像</span>
      </div>
      <hr/>

      <el-upload
        class="avatar-uploader"
        action="http://210.28.188.99:8088/user/image"
        :headers="headers"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload">
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        <div slot="tip" class="el-upload__tip"></div>
      </el-upload>

      <!--昵称-->
      <div class="userNameDiv">
        <span>用户名</span>
      </div>
      <hr/>
    </div>
</template>

<script>
    export default {
      name: 'userBasic',
      data(){
        return {
          imageUrl: '',
          headers: {
            Authorization: 'Bearer ' + sessionStorage.getItem('userToken')
          }
        }
      },
      methods:{
        handleAvatarSuccess(res, file) {
          this.imageUrl = URL.createObjectURL(file.raw);
          //新的图片放入sessionStorage
          sessionStorage.setItem("userImage",res.image);
          this.$store.commit("userImageGet",res.image);
        },
        beforeAvatarUpload(file) {
          const isJPG = file.type === 'image/jpeg';
          const isLt2M = file.size / 1024 / 1024 < 2;

          if (!isJPG) {
            this.$message.error('上传头像图片只能是 JPG 格式!');
          }
          if (!isLt2M) {
            this.$message.error('上传头像图片大小不能超过 2MB!');
          }
          return isJPG && isLt2M;
        },
      },
      computed:{
      }
    }
</script>

<style>
.userBasic {
  width: 100%;
  height: 600px;
}
.userBasic .changeImage{
  margin-bottom: 10px;
}
.userBasic .userNameDiv{
  margin-top: 10px;
  margin-bottom: 10px;
}
/*上传头像*/
.avatar-uploader .el-upload {
  margin-top: 10px;
  border: 1px dashed #d9d9d9;
  border-radius: 50%;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 150px;
  height: 150px;
  line-height: 150px;
  text-align: center;
}
.avatar {
  width: 150px;
  height: 150px;
  display: block;
}
</style>
