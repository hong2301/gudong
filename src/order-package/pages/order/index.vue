<template>
  <Layout>
    <view class="overture">
      <Head></Head>
      <view
        v-for="(oItem, oIndex) in order"
        :key="oIndex"
        class="item"
        :style="{
          width: `${eleWidth1}px`,
          marginBottom: `${capsuleRightInterval}px`,
        }"
      >
        <view class="time">{{ oItem.time }}</view>
        <view
          v-for="(dItem, dIndex) in oItem.dish"
          :key="dIndex"
          class="dish-item"
        >
          <image class="dish-img" :src="dItem.dishImgSrc" mode="heightFix" />
          <view class="text-box">
            <view class="name">{{ dItem.name }}</view>
            <view class="num">{{ `x ${dItem.order}` }}</view>
          </view>
        </view>
        <view class="btn-box">
          <view class="btn">
            <u-button color="rgb(239, 156, 82)" size="mini">记录一下</u-button>
          </view>
        </view>
      </view>
    </view>
  </Layout>
</template>

<script setup lang="ts">
import Layout from "@/components/layouts/index.vue";
import { onShow } from "@dcloudio/uni-app";
import { useCmdStore } from "@/stores/cmd";
import { useUserStore } from "@/stores/user";
import { ref } from "vue";
import Head from "@/components/head/index.vue";
import type { orderType } from "@/types/dish";

// 胶囊右间隔
const capsuleRightInterval = ref<number>(
  uni.getWindowInfo().safeArea.right -
    uni.getMenuButtonBoundingClientRect().right
);
// 屏幕宽度
const areaWidth = uni.getWindowInfo().safeArea.width;
// 元素宽度
const eleWidth1 = ref<number>(areaWidth - 3 * capsuleRightInterval.value);
// 操作存储
const cmdStore = useCmdStore();
// 用户存储
const userStore = useUserStore();
// 订单列表
const order = ref<orderType[]>([]);

// 获取订单
const getOrder = () => {
  uniCloud
    .callFunction({
      name: "orderGet",
      data: {
        userId: userStore.userInfo?._id,
      },
    })
    .then((res) => {
      order.value = res.result;
    });
};

onShow(() => {
  cmdStore.backBtnShow = true;
  getOrder();
});
</script>

<style scoped lang="scss">
@import "../../../uni.scss";

.overture {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(
    to top,
    rgba(245, 241, 230, 1) 0%,
    rgba(245, 241, 230, 0.9) 50%,
    rgba(245, 241, 230, 0) 100%
  );
  position: relative;
  overflow: auto;
}
.item {
  box-sizing: border-box;
  border-radius: 15rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30rpx;
  background-color: white;
  box-shadow: 0 4rpx 15rpx rgba(0, 0, 0, 0.08); /* 添加阴影 */
}
.dish-item {
  width: 100%;
  height: 150rpx;
  margin-bottom: 15rpx;
  display: flex;
  justify-content: space-between;
}
.dish-img {
  height: 100%;
  border-radius: 15rpx;
}
.text-box {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.name {
  font-size: 32rpx;
}
.num {
  display: flex;
  justify-content: flex-end;
  font-size: 28rpx;
  color: $font-color1;
}
.time {
  width: 100%;
  font-size: 30rpx;
  line-height: 30rpx;
  padding-bottom: 10rpx;
  margin-bottom: 30rpx;
  border-bottom: 1rpx solid rgba(0, 0, 0, 0.08);
}
.btn-box {
  width: 100%;
  display: flex;
  justify-content: flex-end;
}
.btn {
  margin-top: 15rpx;
  width: 120rpx;
}
</style>
