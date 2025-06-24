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
    <view class="content">
      <view class="title">取一个喜欢的昵称，让我们认识</view>
      <view class="input-box">
        <u-input
          class="input"
          placeholder="请输入昵称"
          clearable
          maxlength="10"
          border="surround"
          v-model="name"
        >
        </u-input>
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
          @tap="canel"
        ></up-button>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useUserStore } from "@/stores/user";

const props = defineProps({
  btn: {
    type: Number,
    default: 0,
  },
});
const emit = defineEmits(["update:btn"]);
const mainBtn = ref(0);
const name = ref("");
// 用户存储
const userStore = useUserStore();

// ok
const ok = () => {
  userStore.userInfo.name = name.value;
  // 调用api配对是否有该用户
  // 没有则直接加入并显示用户页
  // 有则检查是否需要密码，需要则弹出密码框
  mainBtn.value = 2;
  uni.$emit("login");
};
// 取消
const canel = () => {
  name.value = "";
  tapBottom();
};
// 点击mask
const tapMask = () => {
  mainBtn.value = 0;
  emit("update:btn", mainBtn.value);
};
// 点击关闭
const tapBottom = () => {
  mainBtn.value = 0;
  emit("update:btn", mainBtn.value);
};

watch(
  () => props.btn,
  (value) => {
    mainBtn.value = value;
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
  margin-top: 120rpx;
  margin-bottom: 300rpx;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.title {
  width: 100%;
  display: flex;
  justify-content: center;
  font-size: 35rpx;
  font-weight: 600;
}
.input-box {
  width: 70%;
  margin-top: 10%;
}
.btn-box {
  width: 70%;
  margin-top: 5%;
  display: flex;
  justify-content: space-between;
}
</style>
