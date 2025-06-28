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
const okFile: { url: any; name: any }[] = [];

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
  okFile.push({ url, name });
  return Promise.resolve({ success: true });
};

const trueUpload = () => {
  return new Promise(async (resolve, reject) => {
    try {
      overFile.value = [];
      const uploadTasks = okFile.map((item) => {
        return new Promise((resolve, reject) => {
          uniCloud.uploadFile({
            filePath: item.url,
            cloudPath: item.name,
            onUploadProgress: (progressEvent) => {
              const percentCompleted = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );
              // console.log(`${item.name} 上传进度: ${percentCompleted}%`);
            },
            success: (res) => {
              setTimeout(() => {
                overFile.value.push(res.fileID);
                resolve(res.fileID);
              }, 1000);
            },
            fail: (err) => reject(err),
          });
        });
      });

      const allFileIDs = await Promise.all(uploadTasks);
      resolve({
        curr: allFileIDs[0],
        all: allFileIDs,
      });
    } catch (err) {
      reject(err);
    }
  });
};

defineExpose({
  trueUpload,
});
</script>
s

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
