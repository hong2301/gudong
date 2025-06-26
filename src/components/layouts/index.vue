<template>
  <view class="overture">
    <Head class="head">
      <view v-if="backBtnShow" class="back-btn" @tap="back"></view>
      <view v-if="searchBtnShow" class="search-btn" @tap="search">☌</view>
      <view
        class="bgm-btn"
        :style="{
          transform: `rotate(${bgmBtnRotate}deg)`,
        }"
        @tap="bgm"
        >🎵</view
      >
    </Head>
    <view class="body">
      <slot></slot>
    </view>
    <Tail class="tail"></Tail>
  </view>
</template>

<script setup lang="ts">
import { onShow } from "@dcloudio/uni-app";
import Head from "@/components/head/index.vue";
import Tail from "@/components/tail/index.vue";
import { ref } from "vue";
import { useCmdStore } from "@/stores/cmd";

// 操作存储
const cmdStore = useCmdStore();
// 返回按钮
const backBtnShow = ref<boolean>(false);
// 搜索栏
const searchBtnShow = ref<boolean>(false);
// bgm按钮旋转
const bgmBtnRotate = ref(0);
// bgm按钮
const bgmBtn = ref(false);

// 返回上一级路由
const back = () => {
  uni.navigateBack();
  cmdStore.backBtnShow = false;
};
// 前往搜索页面
const search = () => {
  console.log("前往搜索页面");
  uni.navigateTo({
    url: "/menu-package/pages/search/index",
  });
};
// 背景音乐是否开启
const bgm = () => {
  bgmBtn.value = !bgmBtn.value;
  if (!bgmBtn.value) {
    bgmBtnRotate.value = 0;
  }
  cmdStore.bgmBtn = bgmBtn.value;
  uni.$emit("bgm", bgmBtn.value);
};
// 计时器
const time = () => {
  setInterval(() => {
    if (bgmBtn.value) {
      bgmBtnRotate.value += 0.2;
    }
  }, 1);
};
// 判断按钮是否显示
const isBtnShow = () => {
  backBtnShow.value = cmdStore.backBtnShow;
  searchBtnShow.value = cmdStore.searchBtnShow;
  bgmBtn.value = cmdStore.bgmBtn;
};

onShow(() => {
  console.log("layout Show");
  isBtnShow();
  time();
});
</script>

<style scoped lang="scss">
@import "../../uni.scss";

.overture {
  width: 100vw;
  height: 100vh;
  position: relative;
}
.body {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0%;
  left: 0%;
}
.head {
  width: 100%;
  position: absolute;
  top: 0%;
  left: 0%;
  z-index: 999;
}
.tail {
  width: 100%;
  position: absolute;
  left: 0%;
  bottom: 0%;
  z-index: 999;
}
.bg {
  position: absolute;
  width: 100%;
  height: 100%;
}
.back-btn {
  height: 100%;
  aspect-ratio: 1;
  border-radius: 50%;
  // color: $cmd-btn-text;
  // background-color: $cmd-btn-color;
  display: flex;
  justify-content: center;
  align-items: center;
  // border: 1rpx solid $cmd-btn-border;
  background-image: url("../../static/back.png");
  background-size: cover;
  background-size: 55% 55%; /* 设置背景图片的具体宽度和高度 */
  background-repeat: no-repeat; /* 防止背景图片重复 */
  background-position: center; /* 背景图片居中显示 */
}
.search-btn {
  height: 100%;
  aspect-ratio: 1;
  border-radius: 50%;
  color: $cmd-btn-text;
  font-size: 40rpx;
  background-color: $cmd-btn-color;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1rpx solid $cmd-btn-border;
  /* 新增旋转代码 */
  transform: rotate(180deg);
  /* 确保旋转中心在元素中心 */
  transform-origin: center;
  margin-left: auto;
}
.bgm-btn {
  height: 100%;
  aspect-ratio: 1;
  border-radius: 50%;
  font-size: 30rpx;
  background-color: $cmd-btn-color;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1rpx solid $cmd-btn-border;
  transform-origin: center;
  margin-left: auto;
}
.back-btn:active {
  background-color: $cmd-btn-active;
}
</style>
