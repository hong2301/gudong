<template>
  <view class="overture" :style="{ height: `${tailHeight}px` }"></view>
</template>

<script setup lang="ts">
import { onLoad, onShow, onHide } from "@dcloudio/uni-app";
import { ref } from "vue";

// 尾巴高度
const tailHeight = ref<number>(
  uni.getWindowInfo().screenHeight - uni.getWindowInfo().safeArea.bottom
);

onLoad(() => {
  console.log("tail Load");
});
onShow(() => {
  console.log("tail Show");
});
onHide(() => {
  console.log("tail Hide");
});
</script>

<style scoped>
.overture {
  width: 100%;
}
</style>
