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
      >⟨</view
    >
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
const mainBtn = ref(0);

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
  height: 60%;
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
</style>
