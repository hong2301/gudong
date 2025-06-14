<template>
  <view class="overture">
    <view class="head" :style="{ height: `${headHeight}px` }">
      <view
        class="capsule-box"
        :style="{
          width: `${capsuleBoxWitdh}px`,
          height: `${capsuleBoxHeight}px`,
          marginBottom: `${capsuleRightInterval}px`,
        }"
      ></view>
    </view>
    <view class="body">
      <slot></slot>
    </view>
    <view class="tail" :style="{ height: `${tailHeight}px` }"></view>
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
// 身体高度
const bodyHeight = ref<number>(
  uni.getWindowInfo().safeArea.bottom - headHeight.value
);
// 尾巴高度
const tailHeight = ref<number>(
  uni.getWindowInfo().screenHeight - uni.getWindowInfo().safeArea.bottom
);

onLoad(() => {
  console.log("layout Load");
});
onShow(() => {
  console.log("layout Show");
});
onHide(() => {
  console.log("layout Hide");
});
</script>

<style>
.overture {
  width: 100vw;
  height: 100vh;
  position: relative;
}
.head {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-end;
}
.capsule-box {
  width: 100%;
}
.body {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}
.tail {
  width: 100%;
}
</style>
