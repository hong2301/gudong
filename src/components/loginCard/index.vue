<template>
  <view v-if="mainBtn" class="mask" @tap="tapMask"></view>
  <view
    class="overture"
    :style="{
      transform: `translateY(${mainBtn ? '0' : '100'}%)`,
    }"
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
  background-color: red;
  bottom: 0%;
  z-index: 999;
  border-radius: 40rpx 40rpx 0 0;
  transition: transform 0.3s ease;
}
</style>
