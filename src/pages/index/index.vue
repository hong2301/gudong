<template>
  <Layout>
    <view class="overture">
      <view
        class="head"
        :style="{
          width: `${eleWidth1}px`,
          marginBottom: `${capsuleRightInterval * 2}px`,
        }"
      >
        <view
          class="bubu-box"
          :style="{
            marginRight: `${capsuleRightInterval * 2}px`,
          }"
        ></view>
        <view class="user-box" @tap="tapDl">
          <view
            class="item-img-box1"
            :style="{ transform: `scale(${dlScale}) ` }"
          >
            <image class="item-img" src="/static/shouye.png" mode="widthFix" />
          </view>
          <view class="item-text" style="font-weight: 400">登陆</view>
        </view>
      </view>
      <view class="content" :style="{ width: `${eleWidth1}px` }">
        <view class="item-box" @tap="tapDc">
          <view
            class="item-img-box"
            :style="{ transform: `scale(${dcScale}) ` }"
          >
            <image class="item-img" src="/static/dianpu.png" mode="widthFix" />
          </view>
          <view class="item-text">烟火集</view>
          <view class="item-text1">看看想吃点什么</view>
        </view>
        <view class="divider"></view>
        <view class="item-box" @tap="tapDd">
          <view
            class="item-img-box"
            :style="{ transform: `scale(${ddScale}) ` }"
          >
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
const capsuleRightInterval = ref<number>(
  uni.getWindowInfo().safeArea.right -
    uni.getMenuButtonBoundingClientRect().right
);
// 屏幕宽度
const areaWidth = uni.getWindowInfo().safeArea.width;
// 元素宽度
const eleWidth1 = ref<number>(areaWidth - 4 * capsuleRightInterval.value);
// 点餐图标的缩放
const dcScale = ref<number>(1);
// 订单图标的缩放
const ddScale = ref<number>(1);
// 登陆图标的缩放
const dlScale = ref<number>(1);

/**
 * 点击登陆
 */
const tapDl = () => {
  console.log("点击登陆");
  dlScale.value = 1.1;
  uni.vibrateShort();
  setTimeout(() => {
    dlScale.value = 1;
    // uni.navigateTo({
    //   url: "/login-package/pages/login/index",
    // });
  }, 100);
};

/**
 * 点击点餐
 */
const tapDc = () => {
  console.log("点击点餐");
  dcScale.value = 1.1;
  uni.vibrateShort();
  setTimeout(() => {
    dcScale.value = 1;
    // uni.navigateTo({
    //   url: "/menu-package/pages/menu/index",
    // });
  }, 100);
};

/**
 * 点击订单
 */
const tapDd = () => {
  console.log("点击点餐");
  ddScale.value = 1.1;
  uni.vibrateShort();
  setTimeout(() => {
    ddScale.value = 1;
    // uni.navigateTo({
    //   url: "/order-package/pages/order/index",
    // });
  }, 100);
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
.head {
  display: flex;
  justify-content: space-between;
}
.bubu-box {
  height: 100%;
  background-color: $ele-color;
  border-radius: 15rpx;
  display: flex;
  flex: auto;
}
.user-box {
  width: 30%;
  background-color: $ele-color;
  aspect-ratio: 1;
  border-radius: 15rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.item-img-box1 {
  width: 50%;
  aspect-ratio: 1;
  background-color: $icon-bg-color;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  transition: transform 0.3s ease;
}
.content {
  border-radius: 15rpx;
  display: flex;
  background-color: $ele-color;
  padding-block: 50rpx;
  position: relative;
  align-items: center;
  box-shadow: 0 4rpx 15rpx rgba(0, 0, 0, 0.08); /* 添加阴影 */
}
.divider {
  position: absolute;
  height: 50%;
  width: 1rpx;
  background-color: rgba(0, 0, 0, 0.1);
  left: 50%;
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
  transition: transform 0.3s ease;
}
.item-img {
  width: 50%;
}
.item-text {
  margin-top: 5%;
  font-size: 33rpx;
  font-weight: 800;
  color: $font-color;
}
.item-text1 {
  margin-top: 1%;
  font-size: 20rpx;
  color: $font-color1;
  font-weight: 200;
}
</style>
