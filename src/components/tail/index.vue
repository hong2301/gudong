<template>
  <view class="overture" :style="{ height: `${tailHeight}px` }"></view>
</template>

<script setup lang="ts">
import { ref } from "vue";

// 尾巴高度
const tailHeight = ref<number>(
  uni.getWindowInfo().screenHeight - uni.getWindowInfo().safeArea.bottom
);
</script>

<style scoped>
.overture {
  width: 100%;
}
</style>
