<template>
  <view class="overture">
    <view class="content">
      <Yier
        class="yier"
        ref="yierRef"
        :size="120"
        :font-size="40"
        :img-src="yierImgSrc"
        @tap="tapYier"
      ></Yier>
      <view class="btn" @tap="tapSend">吃这些</view>
    </view>
  </view>
</template>

<script setup lang="ts">
import Yier from "@/components/character/index.vue";
import { ref } from "vue";
import { useCartStore } from "@/stores/cart";

// 操作存储
const cartStore = useCartStore();
// 一二图片
const yierImgSrc = ref("/menu-package/static/吃什么.png");
// 一二ref
const yierRef = ref();

// 点击一二
const tapYier = () => {
  console.log("点击一二");
};
// 提交
const tapSend = () => {
  console.log("提交");
  uni.vibrateShort();
};

//获取数据
uni.$on("cart", function (data) {
  console.log("cart", data);
  cartStore.rows.push(data);
});
</script>

<style scoped lang="scss">
@import "../../uni.scss";

.overture {
  width: 100%;
  height: 70rpx;
  display: flex;
  justify-content: center;
}
.yier {
  position: absolute;
  top: -60%;
  left: -2%;
}
.content {
  position: relative;
  width: 93%;
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
