<template>
  <Layout>
    <view class="overture">
      <view class="content" :style="{ width: `${eleWidth1}px` }">
        <view class="item-box" @tap="tapDc">
          <view class="item-img-box">
            <image class="item-img" src="/static/dianpu.png" mode="widthFix" />
          </view>
          <view class="item-text">烟火集</view>
          <view class="item-text1">看看想吃点什么</view>
        </view>
        <view class="item-box" @tap="tapDd">
          <view class="item-img-box">
            <image class="item-img" src="/static/dingdan.png" mode="widthFix" />
          </view>
          <view class="item-text">食味笺</view>
          <view class="item-text1">记录你的每一餐</view>
        </view>
      </view>
    </view>
  </Layout>
</template>

<script setup lang="ts">
import { onLoad, onShow, onHide, onReady } from "@dcloudio/uni-app";
import Layout from "@/components/layouts/index.vue";
import { ref } from "vue";

// 胶囊右间隔
const capsuleRightInterval =
  uni.getWindowInfo().safeArea.right -
  uni.getMenuButtonBoundingClientRect().right;
// 屏幕宽度
const areaWidth = uni.getWindowInfo().safeArea.width;
// 元素宽度
const eleWidth1 = ref<number>(areaWidth - 4 * capsuleRightInterval);

/**
 * 点击点餐
 */
const tapDc = () => {
  console.log("点击点餐");
};

/**
 * 点击订单
 */
const tapDd = () => {
  console.log("点击点餐");
};

onLoad(() => {
  console.log("index Load");
});
onShow(() => {
  console.log("index Show");
});
onReady(() => {
  console.log("index Ready");
});
onHide(() => {
  console.log("index Hide");
});
</script>

<style scoped lang="scss">
@import "../../uni.scss";

.overture {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: $bg-color;
}
.content {
  border-radius: 15rpx;
  display: flex;
  background-color: $ele-color;
  padding-block: 50rpx;
}
.item-box {
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.item-img-box {
  width: 40%;
  aspect-ratio: 1;
  background-color: $icon-bg-color;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
}
.item-img {
  width: 50%;
}
.item-text {
  margin-top: 5%;
  font-size: 33rpx;
  font-weight: 800;
}
.item-text1 {
  margin-top: 1%;
  font-size: 20rpx;
  color: $font-color1;
  font-weight: 200;
}
</style>
