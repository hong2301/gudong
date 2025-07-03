<template>
  <Layout>
    <view class="overture">
      <Head></Head>
      <up-image
        :height="525 * rpxRPx"
        :width="700 * rpxRPx"
        :radius="15 * rpxRPx"
        :src="dishData.imgSrc || '/static/load.jpeg'"
        mode="aspectFill"
      >
        <template #error>
          <up-image
            :height="525 * rpxRPx"
            :width="700 * rpxRPx"
            :radius="15 * rpxRPx"
            src="/static/load.jpeg"
            mode="heightFix"
          />
        </template>
        <template v-slot:loading>
          <up-loading-icon color="rgb(239, 156, 82)"></up-loading-icon>
        </template>
      </up-image>
      <view class="title-box">
        <view class="title">{{ dishData.name }}</view>
        <view class="num-box">
          <view v-if="dishData.order !== 0" class="del-btn" @tap="delDish">
            -
          </view>
          <view class="item-num" v-if="dishData.order !== 0">{{
            dishData.order
          }}</view>
          <view class="add-btn" @tap="addDish"> + </view>
        </view>
      </view>
    </view>
  </Layout>
</template>

<script setup lang="ts">
import Layout from "@/components/layouts/index.vue";
import { onShow, onLoad } from "@dcloudio/uni-app";
import { useCmdStore } from "@/stores/cmd";
import { useMenuStore } from "@/stores/menu";
import Head from "@/components/head/index.vue";
import { ref } from "vue";
import type { dishType } from "@/types/dish";

// 操作存储
const cmdStore = useCmdStore();
// 菜单存储
const menuStore = useMenuStore();
// 菜单信息
const dishData = ref<dishType>({});
// 菜id
const dishId = ref("");
// 屏幕宽度
const areaWidth = uni.getWindowInfo().safeArea.width;
// rpx/px
const rpxRPx = areaWidth / 750;

// 获取菜信息
const getDishContent = () => {
  for (const tItem of menuStore.data) {
    const foundDish = tItem.dish?.find((dItem) => dItem._id === dishId.value);
    if (foundDish) {
      dishData.value = foundDish;
      break; // 找到后立即退出循环
    }
  }
  console.log(dishData.value);
};

// 减
const delDish = () => {
  menuStore.del(dishData.value._id);
};

// 加
const addDish = () => {
  menuStore.add(dishData.value._id);
};

onLoad((options) => {
  dishId.value = options.id;
});

onShow(() => {
  cmdStore.backBtnShow = true;
  getDishContent();
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
.title-box {
  width: 700rpx;
  margin-top: 25rpx;
  display: flex;
  justify-content: space-between;
  height: 50rpx;
  align-items: center;
}
.title {
  font-size: 40rpx;
}
.num-box {
  height: 50rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.del-btn {
  width: 50rpx;
  height: 50rpx;
  aspect-ratio: 1;
  border: 1rpx solid $icon-bg-color;
  border-radius: 50%;
  color: black;
  display: flex;
  font-size: 40rpx;
  font-weight: 800;
  line-height: 50rpx;
  justify-content: center;
  align-items: center;
}
.item-num {
  margin-inline: 30rpx;
}
.add-btn {
  width: 50rpx;
  height: 50rpx;
  aspect-ratio: 1;
  background-color: $main-color;
  border-radius: 50%;
  color: white;
  display: flex;
  font-size: 40rpx;
  font-weight: 800;
  line-height: 50rpx;
  justify-content: center;
  align-items: center;
}
.add-btn:active {
  background-color: $main-color-active;
}
</style>
