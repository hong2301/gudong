<template>
  <view v-if="mainBtn" class="mask" @tap="tapMask"></view>
  <view
    class="overture"
    :style="{
      transform: `translateY(${mainBtn ? '0' : '100'}%)`,
    }"
  >
    <view
      class="bottom"
      :style="{ opacity: `${mainBtn ? 100 : 0}%` }"
      @tap="tapBottom"
    >
      ⟨
    </view>
    <view class="content" :style="{ marginBottom: `${tailHeight + 30}px` }">
      <view class="img-box">
        <up-upload
          :fileList="fileList1"
          @afterRead="afterRead"
          @delete="deletePic"
          name="1"
          multiple
          :maxCount="1"
        ></up-upload>
      </view>
      <view class="input-box">
        <up-textarea
          v-model="logText"
          placeholder="请输入日志内容"
          count
          autoHeight
          focus
          :maxlength="50"
        ></up-textarea>
      </view>

      <view class="btn-box">
        <up-button
          text="完成"
          type="primary"
          color="rgb(239, 156, 82)"
          style="margin-right: 5%"
          @tap="ok"
        ></up-button>
        <up-button
          type="primary"
          color="rgb(239, 156, 82)"
          :plain="true"
          text="取消"
          @tap="cancel"
        ></up-button>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

const props = defineProps({
  btn: {
    type: Number,
    default: 0,
  },
});
const emit = defineEmits(["update:btn"]);
// 尾巴高度
const tailHeight = ref<number>(
  uni.getWindowInfo().screenHeight - uni.getWindowInfo().safeArea.bottom
);
const mainBtn = ref(0);
const fileList1 = ref([]);
const logText = ref("");

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
    const result = await uploadFilePromise(lists[i].url);
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

const uploadFilePromise = (url: any) => {
  return new Promise((resolve, reject) => {
    let a = uni.uploadFile({
      url: "http://192.168.2.21:7001/upload", // 仅为示例，非真实的接口地址
      filePath: url,
      name: "file",
      formData: {
        user: "test",
      },
      success: (res) => {
        setTimeout(() => {
          resolve(res.data.data);
        }, 1000);
      },
    });
  });
};

// 点击mask
const tapMask = () => {
  mainBtn.value = 0;
};
// 点击关闭
const tapBottom = () => {
  mainBtn.value = 0;
};

// ok
const ok = () => {};

// 取消
const cancel = () => {
  mainBtn.value = 0;
};
watch(
  () => props.btn,
  (value) => {
    mainBtn.value = value;
  }
);
watch(
  () => mainBtn.value,
  (value) => {
    emit("update:btn", value);
  }
);
</script>

<style scoped lang="scss">
@import "../../uni.scss";

.mask {
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.1);
  top: 0;
  left: 0;
  z-index: 998;
}
.overture {
  position: fixed;
  width: 100%;
  background-color: $bg-color2;
  bottom: 0%;
  z-index: 999;
  border-radius: 40rpx 40rpx 0 0;
  transition: transform 0.3s ease;
}
.bottom {
  width: 100%;
  height: 60rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 800;
  font-size: 40rpx;
  line-height: 60rpx;
  transform: rotate(270deg);
  position: absolute;
  top: 0;
  transition: opacity 3s ease;
}
.content {
  margin-top: 70rpx;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.img-box {
  width: 90%;
  margin-top: 5%;
}
.input-box {
  width: 90%;
  margin-top: 5%;
}
.btn-box {
  width: 90%;
  margin-top: 5%;
  display: flex;
  justify-content: space-between;
}
</style>
