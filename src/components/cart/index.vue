<template>
  <view class="overture">
    <view class="content">
      <view class="btn" @tap="tapSend">吃这些</view>
    </view>
  </view>
</template>

<script setup lang="ts">
// 提交
const tapSend = () => {
  console.log("提交");
  uni.vibrateShort();
};
</script>

<style scoped lang="scss">
@import "../../uni.scss";

.overture {
  width: 100%;
  height: 70rpx;
  display: flex;
  justify-content: center;
}
.content {
  width: 90%;
  height: 100%;
  background-color: aqua;
  border-radius: 40rpx;
  box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.1); /* 添加阴影 */
  background-color: rgb(50, 50, 50);
}
.btn {
  width: 25%;
  height: 100%;
  border-radius: 40rpx;
  background-color: $main-color;
  margin-left: auto;
  color: white;
  font-size: 30rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 70rpx;
  font-weight: 800;
}
.btn:active {
  background-color: $main-color-active;
}
</style>
