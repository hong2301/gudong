<template>
  <view class="overture" :style="{ height: `${headHeight}px` }">
    <view
      class="capsule-box"
      :style="{
        width: `${capsuleBoxWitdh}px`,
        height: `${capsuleBoxHeight}px`,
        marginBottom: `${capsuleRightInterval}px`,
      }"
    ></view>
  </view>
</template>

<script setup lang="ts">
import { onLoad, onShow, onHide } from "@dcloudio/uni-app";
import { ref } from "vue";

// 胶囊右间隔
const capsuleRightInterval = ref<number>(
  uni.getWindowInfo().safeArea.right -
    uni.getMenuButtonBoundingClientRect().right
);
// 胶囊盒子高度
const capsuleBoxHeight = ref<number>(
  uni.getMenuButtonBoundingClientRect().height
);
// 胶囊盒子宽度
const capsuleBoxWitdh = ref<number>(
  uni.getWindowInfo().safeArea.width - 2 * capsuleRightInterval.value
);
// 头部高度
const headHeight = ref<number>(
  uni.getMenuButtonBoundingClientRect().bottom + capsuleRightInterval.value
);

onLoad(() => {
  console.log("head Load");
});
onShow(() => {
  console.log("head Show");
});
onHide(() => {
  console.log("head Hide");
});
</script>

<style scoped>
.overture {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-end;
}
.capsule-box {
  width: 100%;
}
</style>
