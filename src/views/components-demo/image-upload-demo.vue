<template>
  <div class="app-container">
    <h2>图片上传栗子</h2>
    <image-upload v-model="url1" url-field="data.fileUrl" :http-request="upload" />
    <!-- <image-upload
      v-model="url2"
      url-field="data.fileUrl"
      action="http://campus.hailiangedu.com:8092/simsbff/file/uploadSingle"
    /> -->
  </div>
</template>

<script>
import ImageUpload from '@/components/ImageUpload';
import Axios from 'axios';
export default {
  name: 'ImageUploadDemo',
  components: {
    ImageUpload
  },
  data() {
    return {
      url1: [],
      url2: []
    };
  },
  methods: {
    /**
     * 文件上传方法
     */
    upload(data) {
      const { file, onSuccess, onError, onProgress } = data;
      const formData = new FormData();
      formData.append('file', file);
      Axios.post(
        'http://campus.hailiangedu.com:8092/simsbff/file/uploadSingle',
        formData,
        {
          onUploadProgress: onProgress
        }
      )
        .then(({ data }) => onSuccess(data))
        .catch(onError);
    }
  }
};
</script>
