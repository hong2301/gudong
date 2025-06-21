<template>
  <view class="overture">
    <Head class="head">
      <view v-if="backBtnShow" class="back-btn" @tap="back">⬅︎</view>
    </Head>
    <view class="body">
      <FoodBg class="bg"></FoodBg>
      <slot></slot>
    </view>
    <Tail class="tail"></Tail>
  </view>
</template>

<script setup lang="ts">
import { onLoad, onShow, onHide, onReady } from "@dcloudio/uni-app";
import Head from "@/components/head/index.vue";
import Tail from "@/components/tail/index.vue";
import { ref } from "vue";

// 返回按钮
const backBtnShow = ref<boolean>(false);

// 返回上一级路由
const back = () => {
  uni.navigateBack();
};
</script>

<style scoped>
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
  color: white;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
}
.back-btn:active {
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
