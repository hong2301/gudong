<template>
  <Layout>
    <view class="overture">
      <Head></Head>
      <view class="search">
        <up-search
          v-model="search"
          placeholder="请输入菜品"
          shape="round"
          :showAction="false"
          :clearabled="true"
          @change="searchChange"
        ></up-search>
      </view>
      <view class="left">
        <scroll-view
          class="left-content"
          scroll-y
          :scroll-with-animation="true"
        >
          <view
            v-for="(tItem, tIndex) in filterTap"
            :key="tIndex"
            class="dish-list"
          >
            <view class="dish-list-item-content" v-if="tItem.dish?.length">
              <view
                v-for="(dItem, dIndex) in tItem.dish"
                :key="dIndex"
                class="dish-box"
              >
                <view class="dish-img-box">
                  <up-image
                    :height="150 * rpxRPx"
                    :width="200 * rpxRPx"
                    :radius="15 * rpxRPx"
                    :src="dItem.imgSrc || '/static/load.jpeg'"
                    mode="aspectFill"
                    @click="clickImg(dItem.imgSrc)"
                  >
                    <template #error>
                      <up-image
                        :height="150 * rpxRPx"
                        :width="200 * rpxRPx"
                        :radius="15 * rpxRPx"
                        src="/static/load.jpeg"
                        mode="heightFix"
                      />
                    </template>
                    <template v-slot:loading>
                      <up-loading-icon
                        color="rgb(239, 156, 82)"
                      ></up-loading-icon>
                    </template>
                  </up-image>
                </view>
                <view class="dish-text-box">
                  <view class="dish-text1">{{ dItem.name }}</view>
                  <view class="dish-text2">
                    <view class="num-img-box">
                      <image
                        class="num-img"
                        src="../../../menu-package/static/guochan.png"
                        mode="widthFix"
                      />
                    </view>
                    {{ dItem.num }}
                  </view>
                  <view class="btn-box">
                    <view
                      v-if="dItem.order !== 0"
                      class="del-btn"
                      @tap="delDish(tItem, dItem)"
                    >
                      -
                    </view>
                    <view class="item-num" v-if="dItem.order !== 0">{{
                      dItem.order
                    }}</view>
                    <view class="add-btn" @tap="addDish(tItem, dItem)">
                      +
                    </view>
                  </view>
                </view>
              </view>
            </view>
          </view>
          <view class="space"></view>
        </scroll-view>
        <view
          class="transition"
          :style="{
            height: `${tailHeight}px`,
          }"
        ></view>
      </view>
      <Cart class="cart"></Cart>
    </view>
  </Layout>
</template>

<script setup lang="ts">
import Layout from "@/components/layouts/index.vue";
import { onShow } from "@dcloudio/uni-app";
import { useCmdStore } from "@/stores/cmd";
import { useMenuStore } from "@/stores/menu";
import Cart from "@/components/cart/index.vue";
import Head from "@/components/head/index.vue";
import type { dishType, tapType } from "@/types/dish";
import { computed, ref } from "vue";

// 尾巴高度
const tailHeight = ref<number>(
  uni.getWindowInfo().screenHeight - uni.getWindowInfo().safeArea.bottom
);
// 操作存储
const cmdStore = useCmdStore();
// 菜单存储
const menuStore = useMenuStore();
// 屏幕宽度
const areaWidth = uni.getWindowInfo().safeArea.width;
// rpx/px
const rpxRPx = areaWidth / 750;
// 菜单标签
const taps = ref<tapType[]>([]);
// 搜索
const search = ref("");

// 搜索
const searchChange = () => {
  const searchText = search.value?.toLowerCase() || "";
  taps.value.forEach((tItem) => {
    tItem.dish?.forEach((dItem) => {
      dItem.isSearch =
        !!dItem.name && dItem.name.toLowerCase().includes(searchText);
    });
  });
};

// 预览图片
const clickImg = (src: string) => {
  uni.previewImage({
    current: 0, // 当前显示的图片
    urls: [src],
    fail: (err) => {
      console.error("预览失败:", err);
    },
  });
};
// 删除菜
const delDish = (tData: tapType, dData: dishType) => {
  uni.vibrateShort();
  if (dData.order > 0) {
    dData.order--;
  } else {
    dData.order = 0;
  }
  if (tData.order > 0) {
    tData.order--;
  } else {
    tData.order = 0;
  }
  taps.value = filterTap.value;
  menuStore.data = taps.value;
  uni.$emit("cart");
};
// 添加菜
const addDish = (tData: tapType, dData: dishType) => {
  uni.vibrateShort();
  dData.order++;
  tData.order++;
  taps.value = filterTap.value;
  menuStore.data = taps.value;
  uni.$emit("cart");
};

onShow(() => {
  cmdStore.backBtnShow = true;
  taps.value = menuStore.data;
});

const filterTap = computed<tapType[]>(() => {
  const tempData: tapType[] = [];
  taps.value.forEach((fItem) => {
    const fItemTemp: tapType = { ...fItem };
    const dishTemp: dishType[] = [];
    fItem.dish?.forEach((dItem) => {
      if (dItem?.isSearch ?? false) {
        dishTemp.push(dItem);
      }
    });
    fItemTemp.dish = dishTemp;
    tempData.push(fItemTemp);
  });
  return tempData;
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
.search {
  width: 94%;
  display: flex;
  margin-bottom: 12px;
}
.left {
  width: 90%;
  height: 100%;
  overflow: auto;
  display: flex;
}
.left-content {
  width: 100%;
}
.dish-list {
  width: 100%;
}
.dish-list-item-content {
  width: 100%;
}
.dish-box {
  width: 100%;
  height: 75px;
  display: flex;
  margin-bottom: 12px;
}
.dish-img-box {
  height: 100%;
  width: 200rpx;
}
.dish-img-box {
  height: 100%;
  width: 200rpx;
}
.num-img-box {
  width: 13%;
  display: flex;
  align-items: center;
}
.dish-text1 {
  font-size: 30rpx;
  font-weight: 400;
  color: black;
}
.dish-text2 {
  font-size: 28rpx;
  color: $main-color;
  font-weight: 400;
  position: relative;
  display: flex;
  align-items: center;
}
.dish-text-box {
  height: 100%;
  flex: 1;
  margin-left: 15rpx;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
}
.num-img {
  width: 50rpx;
  height: 50rpx;
  aspect-ratio: 1;
}
.btn-box {
  position: absolute;
  bottom: 0;
  right: 1%;
  height: 50rpx;
  display: flex;
  justify-content: space-between;
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
.cart {
  position: absolute;
  width: 100%;
  bottom: 0;
}
.space {
  width: 100%;
  height: 750rpx;
  flex-shrink: 0;
}
.transition {
  position: absolute;
  width: 100%;
  height: 20%;
  bottom: 0;
  background: linear-gradient(
    to top,
    rgba(255, 255, 255, 0.99) 0%,
    rgba(255, 255, 255, 0.99) 10%,
    rgba(255, 255, 255, 0.96) 20%,
    rgba(255, 255, 255, 0.91) 30%,
    rgba(255, 255, 255, 0.84) 40%,
    rgba(255, 255, 255, 0.75) 50%,
    rgba(255, 255, 255, 0.64) 60%,
    rgba(255, 255, 255, 0.51) 70%,
    rgba(255, 255, 255, 0.36) 80%,
    rgba(255, 255, 255, 0.19) 90%,
    rgba(255, 255, 255, 0) 100%
  );
}
</style>
