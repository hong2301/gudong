<template>
  <view
    class="overture floating"
    :style="{ width: `${size}rpx`, transform: `scale(${imgScale}) ` }"
  >
    <u-image
      mode="widthFix"
      width="100%"
      :src="imgSrc"
      :show-loading="true"
      class="img"
      @tap="tapImg"
    ></u-image>
  </view>
</template>

<script setup lang="ts">
import { ref } from "vue";

const props = defineProps({
  size: {
    type: Number,
    required: true,
    default: "100",
  },
  imgSrc: {
    type: String,
    default: "/static/Corn.png",
  },
});
const imgScale = ref(1);

/**
 * 点击图片
 */
const tapImg = () => {
  imgScale.value = 1.1;
  setTimeout(() => {
    imgScale.value = 1;
  }, 100);
};
</script>

<style scoped>
.overture {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  position: relative;
  transition: transform 0.3s ease;
}
.content {
  width: 100%;
  display: block;
}
.img {
}
.text-box {
  position: absolute;
  width: 100%;
  font-weight: 800;
}
</style>
