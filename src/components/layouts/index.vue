<template>
  <view class="overture">
    <Head class="head">
      <view v-if="backBtnShow" class="back-btn" @tap="back"></view>
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

// 返回上一级路由
const back = () => {
  uni.navigateBack();
  cmdStore.backBtnShow = false;
};
// 判断返回按钮是否显示
const isBackBtnShow = () => {
  backBtnShow.value = cmdStore.backBtnShow;
};

onShow(() => {
  console.log("layout Show");
  isBackBtnShow();
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
  color: $cmd-btn-text;
  background-color: $cmd-btn-color;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1rpx solid $cmd-btn-border;
  background-image: url("../../static/back.png");
  background-size: cover;
  background-size: 55% 55%; /* 设置背景图片的具体宽度和高度 */
  background-repeat: no-repeat; /* 防止背景图片重复 */
  background-position: center; /* 背景图片居中显示 */
}
.back-btn:active {
  background-color: $cmd-btn-active;
}
</style>
