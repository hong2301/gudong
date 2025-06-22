<template>
  <view class="overture">
    <view v-if="dishListShow" class="mask" @tap="tapMask"></view>
    <view
      class="dish-list"
      :style="{
        height: `${(tailHeight - capsuleRightInterval) * 40}px`,
        transform: `translateY(${dishListShow ? '0' : '100'}%)`,
      }"
    >
      <view
        :style="{
          height: `${(tailHeight - capsuleRightInterval) * 3}px`,
        }"
      ></view>
    </view>
    <view
      class="content"
      :style="{
        bottom: `${tailHeight - capsuleRightInterval}px`,
      }"
    >
      <Yier
        class="yier"
        ref="yierRef"
        :size="120"
        :font-size="40"
        :img-src="yierImgSrc"
        @tap="tapYier"
      ></Yier>
      <view class="dish-box" @tap="tapDish">
        <view
          v-for="(sItem, sIndex) in filteredStatus"
          :key="sIndex"
          class="dish-item"
        >
          <view v-if="sItem.order !== 0" class="dish-item-content">
            <image class="img" :src="sItem.imgSrc" mode="heightFix" />
            <viwe class="dish-text">{{ sItem.order }}</viwe>
          </view>
        </view>
      </view>
      <view class="btn" @tap="tapSend">吃这些</view>
    </view>
  </view>
</template>

<script setup lang="ts">
import Yier from "@/components/character/index.vue";
import { ref, computed } from "vue";
import { onShow } from "@dcloudio/uni-app";
import { useCartStore } from "@/stores/cart";
import { useMenuStore } from "@/stores/menu";
import type { cartDishType, tapType } from "@/types/dish";

// 尾巴高度
const tailHeight = ref<number>(
  uni.getWindowInfo().screenHeight - uni.getWindowInfo().safeArea.bottom
);
// 胶囊右间隔
const capsuleRightInterval = ref<number>(
  uni.getWindowInfo().safeArea.right -
    uni.getMenuButtonBoundingClientRect().right
);
// 购物车存储
const cartStore = useCartStore();
// 菜单存储
const menuStore = useMenuStore();
// 一二图片
const yierImgSrc = ref("/menu-package/static/吃什么.png");
// 一二ref
const yierRef = ref();
// 购物车数据
const rows = ref<cartDishType[]>([]);
// 情况
const status = ref<tapType[]>([]);
// 购物车列表显示
const dishListShow = ref(false);

// 点击一二
const tapYier = () => {
  console.log("点击一二");
};
// 提交
const tapSend = () => {
  console.log("提交");
  uni.vibrateShort();
};
// 获取status
const getStatus = () => {
  status.value = [];
  status.value = menuStore.data.filter(
    (item) => item.order !== 0 && item.order
  );
};
// 点击mask
const tapMask = () => {
  dishListShow.value = !dishListShow.value;
};
// 点击购物车
const tapDish = () => {
  rows.value = cartStore.rows;
  if (rows.value.length !== 0) {
    dishListShow.value = !dishListShow.value;
  }
};
// 一二状态
const getYierStatus = () => {
  rows.value = cartStore.rows;

  if (rows.value.length !== 0) {
    yierImgSrc.value = "/menu-package/static/开心.png";
  } else {
    yierImgSrc.value = "/menu-package/static/吃什么.png";
  }
};

//获取数据
uni.$on(
  "cart",
  function (data: { data: cartDishType | string | number; mode: number }) {
    if (data.mode === 1) {
      cartStore.add(data.data as cartDishType);
    } else {
      cartStore.del(data.data as string | number);
    }
    getYierStatus();
    getStatus();
  }
);

onShow(() => {
  getYierStatus();
  getStatus();
});
const filteredStatus = computed(() =>
  status.value.filter((item) => item.order !== 0)
);
</script>

<style scoped lang="scss">
@import "../../uni.scss";

.overture {
  width: 100%;
  height: 100rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}
.mask {
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.1);
  top: 0;
  left: 0;
}
.dish-list {
  position: absolute;
  width: 100%;
  background-color: white;
  border-radius: 40rpx 40rpx 0 0;
  transition: transform 0.3s ease;
}
.yier {
  position: absolute;
  top: -60%;
  left: -2%;
}
.content {
  position: relative;
  width: 93%;
  height: 70rpx;
  border-radius: 40rpx;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.5); /* 添加阴影 */
  background-color: rgb(50, 50, 50);
  display: flex;
}
.dish-box {
  width: 50%;
  height: 100%;
  margin-left: 20%;
  overflow-x: auto;
  display: flex;
}
.dish-item {
  width: 80rpx;
  height: 100%;
  margin-right: 15rpx;
}
.dish-item-content {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
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
.img {
  height: 90%;
  aspect-ratio: 1;
  display: flex;
  align-items: center;
}
.dish-text {
  font-size: 30rpx;
  color: white;
}
</style>
