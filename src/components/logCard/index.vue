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
        <FileUpload @upload="upload"></FileUpload>
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
import FileUpload from "@/components/fileUpload/index.vue";
import { useUserStore } from "@/stores/user";

const props = defineProps({
  btn: {
    type: Number,
    default: 0,
  },
});
const userStore = useUserStore();
const emit = defineEmits(["update:btn"]);
// 尾巴高度
const tailHeight = ref<number>(
  uni.getWindowInfo().screenHeight - uni.getWindowInfo().safeArea.bottom
);
const mainBtn = ref(0);
const logText = ref("");
const imgSrc = ref("");

// 点击mask
const tapMask = () => {
  mainBtn.value = 0;
};
// 点击关闭
const tapBottom = () => {
  mainBtn.value = 0;
};

// 上传图片
const upload = (data: { curr: string; all: string[] }) => {
  imgSrc.value = data.curr;
};

// ok
const ok = () => {
  uniCloud
    .callFunction({
      name: "logAdd",
      data: {
        time: getNowTime(),
        imgSrc: imgSrc.value,
        describe: logText.value,
        userName: userStore.userInfo.name,
      },
    })
    .then((res) => {
      uni.showToast({
        title: "搞定", // 提示内容
        icon: "success", // 图标（success/loading/none）
        duration: 2000, // 显示时长（ms），默认1500
        mask: false, // 是否显示透明蒙层，防止触摸穿透
      });
      mainBtn.value = 0;
      uni.$emit("log");
    });
};

// 获取当前时间
const getNowTime = () => {
  const now = new Date();
  const formatter = new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });
  const formattedDate = formatter.format(now); // 例如："2024/5/1"

  // 替换斜杠为 "年"、"月"、"日"
  const finalDate =
    formattedDate.replace(/\//g, "年").replace("年", "年").replace("年", "月") +
    "日";
  return finalDate;
};

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
