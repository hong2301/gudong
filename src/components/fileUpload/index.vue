<template>
  <up-upload
    :fileList="fileList1"
    @afterRead="afterRead"
    @delete="deletePic"
    name="1"
    multiple
    :maxCount="maxCount"
  ></up-upload>
</template>

<script setup lang="ts">
import { ref } from "vue";

const props = defineProps({
  maxCount: {
    type: Number,
    default: 1,
  },
});
const emit = defineEmits(["upload"]);
const fileList1 = ref([]);
const overFile = ref<string[]>([]);

// 删除图片
const deletePic = (event: { index: number }) => {
  fileList1.value.splice(event.index, 1);
};

// 新增图片
const afterRead = async (event: { file: ConcatArray<never> }) => {
  // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
  let lists = [].concat(event.file);
  let fileListLen = fileList1.value.length;
  lists.map((item) => {
    fileList1.value.push({
      ...item,
      status: "uploading",
      message: "上传中",
    });
  });
  for (let i = 0; i < lists.length; i++) {
    const result = await uploadFilePromise(
      lists[i].url,
      lists[i].name,
      lists[i]
    );
    let item = fileList1.value[fileListLen];
    fileList1.value.splice(fileListLen, 1, {
      ...item,
      status: "success",
      message: "",
      url: result,
    });
    fileListLen++;
  }
};

const uploadFilePromise = (url: any, name: any, data) => {
  return new Promise((resolve, reject) => {
    console.log(data);
    uniCloud.uploadFile({
      filePath: url,
      cloudPath: name,
      onUploadProgress: function (progressEvent) {
        console.log(progressEvent);
        var percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
      },
      success: (res) => {
        setTimeout(() => {
          overFile.value.push(res.fileID);
          emit("upload", { curr: res.fileID, all: overFile.value });
          resolve(true);
        }, 1000);
      },
      fail() {},
      complete() {},
    });
  });
};
</script>

<style scoped>
.overture {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  position: relative;
  transition: transform 0.3s ease;
}
</style>
