<template>
  <Layout>
    <view class="overture">
      <Head></Head>
      <view
        class="head"
        :style="{
          width: `${eleWidth1 - capsuleRightInterval * 1}px`,
          height: `${capsuleRightInterval * 10}px`,
        }"
      >
        <view class="text-box" @tap="tapTx">
          <view class="text"
            >告诉布布
            <view
              class="dc-box"
              :style="{ transform: `scale(${txScale}) ` }"
              @tap="tapTx"
            >
              <image
                class="dc"
                src="../../static/bianji.png"
                mode="heightFix"
              />
            </view>
          </view>
          <view class="text1">可以加点别的菜哦</view>
          <view
            class="decorate"
            :style="{ transform: `scale(${txScale}) ` }"
          ></view>
        </view>
        <view class="bubu-box">
          <Bubu
            ref="bubuRef"
            :size="120"
            :font-size="40"
            :img-src="bubuImgSrc"
            @tap="tapBubu"
          ></Bubu>
        </view>
      </view>
      <view
        class="menu-box"
        :style="{
          height: `${areaHeight - capsuleRightInterval * 10 - headHeight}px`,
        }"
      >
        <scroll-view
          class="right"
          scroll-y
          :scroll-with-animation="true"
          :scroll-top="tapScrollTop"
        >
          <view
            v-for="(tItem, tIndex) in taps"
            :key="tIndex"
            class="item-box"
            :style="{ background: `${tIndex === activeTap ? 'none' : ''}` }"
            @tap="tapMenuItem(tIndex, tItem.topValue)"
          >
            <view
              class="item-box-content"
              :class="[
                `${tIndex === activeTap ? 'item-box-active' : ''}`,
                `${tIndex === activeTap + 1 ? 'item-box-active-up' : ''}`,
                `${tIndex === activeTap - 1 ? 'item-box-active-bottom' : ''}`,
              ]"
            >
              <image class="item-img" :src="tItem.imgSrc" mode="widthFix" />
              <view class="item-text"> {{ tItem.text }}</view>
            </view>
          </view>
          <view
            :style="{
              height: `${capsuleRightInterval * 40}px`,
            }"
          ></view>
        </scroll-view>
        <view
          class="left"
          :style="{
            paddingInline: `${capsuleRightInterval * 2}px`,
            paddingTop: `${capsuleRightInterval * 2}px`,
          }"
        >
          <scroll-view
            class="left-content"
            scroll-y
            :scroll-with-animation="true"
            :scroll-top="scrollTop"
            @scroll="scroll"
          >
            <view
              v-for="(tItem, tIndex) in taps"
              :key="tIndex"
              class="dish-list"
            >
              <view class="dish-list-item-content" v-if="tItem.dish?.length">
                <view class="text2">{{ tItem.text }}</view>
                <view
                  v-for="(dItem, dIndex) in tItem.dish"
                  :key="dIndex"
                  class="dish-box"
                  :style="{
                    marginBottom: `${capsuleRightInterval * 2}px`,
                  }"
                >
                  <view class="dish-img-box">
                    <image
                      class="dish-img"
                      :src="dItem.imgSrc || '/static/load.jpeg'"
                      mode="heightFix"
                    />
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
        </view>
        <view
          class="transition"
          :style="{
            height: `${tailHeight}px`,
          }"
        ></view>
      </view>
      <Cart class="cart"></Cart>
    </view>
    <DishCard v-model:btn="dishBtn"></DishCard>
  </Layout>
</template>

<script setup lang="ts">
import Layout from "@/components/layouts/index.vue";
import { onHide, onShow, onReady } from "@dcloudio/uni-app";
import { useCmdStore } from "@/stores/cmd";
import { useMenuStore } from "@/stores/menu";
import Head from "@/components/head/index.vue";
import { ref } from "vue";
import Bubu from "@/components/character/index.vue";
import Cart from "@/components/cart/index.vue";
import type { dishType, tapType } from "@/types/dish";
import { useUserStore } from "@/stores/user";
import DishCard from "@/components/dishCard/index.vue";

// 尾巴高度
const tailHeight = ref<number>(
  uni.getWindowInfo().screenHeight - uni.getWindowInfo().safeArea.bottom
);
// 胶囊右间隔
const capsuleRightInterval = ref<number>(
  uni.getWindowInfo().safeArea.right -
    uni.getMenuButtonBoundingClientRect().right
);
// 屏幕宽度
const areaWidth = uni.getWindowInfo().safeArea.width;
// rpx/px
const rpxRPx = areaWidth / 750;
// 屏幕高度
const areaHeight = uni.getWindowInfo().safeArea.height;
// 元素宽度
const eleWidth1 = ref<number>(areaWidth - 4 * capsuleRightInterval.value);
// 头部高度
const headHeight = ref<number>(
  uni.getMenuButtonBoundingClientRect().bottom + capsuleRightInterval.value
);
// 用户存储
const userStore = useUserStore();
// 菜单存储
const menuStore = useMenuStore();
// 操作存储
const cmdStore = useCmdStore();
// 布布ref
const bubuRef = ref();
// 布布imgsrc
const bubuImgSrc =
  "https://mp-eb96f56f-cca7-47e5-802c-7542fcfdfdb9.cdn.bspapp.com/招待.png";
// 填写图标的缩放
const txScale = ref<number>(1);
// 菜单标签
const taps = ref<tapType[]>([]);
// 目前激活的菜单
const activeTap = ref(0);
// 滚动至的Id
const scrollTop = ref();
// 滚动至的标签
const tapScrollTop = ref();
// 菜品卡片开关
const dishBtn = ref(0);

// 滚动
const scroll = (value: any) => {
  const top = value.target.scrollTop;
  taps.value.forEach((item, index) => {
    if (top + 10 > item.topValue) {
      activeTap.value = index;
      tapScrollTop.value = item.tapTopValue - 170 * rpxRPx;
    }
    if (top < 0) {
      activeTap.value = 0;
      tapScrollTop.value = taps.value[0].tapTopValue - 170 * rpxRPx;
    }
  });
};

// 删除菜
const delDish = (tData: tapType, dData: dishType) => {
  uni.vibrateShort();
  uni.$emit("cart", { data: dData._id, mode: 2 });
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
  menuStore.data = taps.value;
};
// 添加菜
const addDish = (tData: tapType, dData: dishType) => {
  uni.vibrateShort();
  dData.order++;
  tData.order++;
  const dish = {
    id: dData._id,
    name: dData.name,
    dishImgSrc: dData.imgSrc,
    order: 1,
    text: tData.text,
    tapImgSrc: tData.imgSrc,
    isCheck: true,
  };
  uni.$emit("cart", { data: dish, mode: 1 });
  menuStore.data = taps.value;

  if (dData.order === 1 && dData.des) {
    bubuRef?.value?.startSay(dData.des, ["30%", "-150%", "rgb(146,107,77)"], {
      src: "/static/布布/声音/哒哒哒哒哒.m4a",
      volume: 1,
    });
  }
};

// 菜单变化
uni.$on("menu", function () {
  taps.value = menuStore.getData();
});

// 点击菜单
const tapMenuItem = (index: number, topValue: number) => {
  activeTap.value = index;
  scrollTop.value = topValue;
};
// 点击布布
const tapBubu = () => {
  bubuRef?.value?.startSay("不要客气哟", ["30%", "-170%", "rgb(146,107,77)"], {
    src: "/static/布布/声音/哒哒哒哒哒.m4a",
    volume: 1,
  });
};
/**
 * 点击填写
 */
const tapTx = () => {
  txScale.value = 1.1;
  uni.vibrateShort();
  setTimeout(() => {
    txScale.value = 1;
    dishBtn.value = 1;
  }, 100);
};

/**
 * 获取菜单
 */
const getMenu = () => {
  uniCloud
    .callFunction({
      name: "tapGet",
    })
    .then((res) => {
      taps.value = menuStore.data;
      res.result.data.forEach((tItem: tapType, tIndex: number) => {
        const tempDish = taps.value[tIndex].dish;
        const tempOrder = taps.value[tIndex].order;
        taps.value[tIndex] = tItem;
        taps.value[tIndex]?.dish.forEach((dItem, dIndex) => {
          tempDish?.forEach((dtItem: dishType) => {
            if (dtItem.name === dItem.name) {
              dItem.order = dtItem.order;
            }
          });
        });
        taps.value[tIndex].order = tempOrder;
      });
      menuStore.data = taps.value;
    });
};

onShow(() => {
  cmdStore.backBtnShow = true;
  cmdStore.searchBtnShow = true;
  getMenu();
});
onReady(() => {
  userStore.getFirst(getCurrentPages());
});
onHide(() => {
  cmdStore.searchBtnShow = false;
  menuStore.data = taps.value;
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
  background-color: white;
  // background: linear-gradient(
  //   to top,
  //   rgba(245, 241, 230, 1) 0%,
  //   rgba(245, 241, 230, 0.9) 50%,
  //   rgba(245, 241, 230, 0) 100%
  // );
  position: relative;
}
.cart {
  position: absolute;
  width: 100%;
  bottom: 0;
}
.head {
  display: flex;
  position: relative;
  align-items: center;
}
.bubu-box {
  margin-left: auto;
}
.text-box {
  position: relative;
}
.text {
  height: 40rpx;
  font-size: 33rpx;
  font-weight: 800;
  color: black;
  margin-bottom: 7%;
  display: flex;
  align-items: center;
}
.text1 {
  margin-top: 1%;
  font-size: 20rpx;
  color: $font-color1;
  font-weight: 300;
}
.text2 {
  font-size: 24rpx;
  line-height: 24rpx;
  color: $font-color1;
  font-weight: 400;
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
.decorate {
  position: absolute;
  width: 40%;
  aspect-ratio: 1;
  border-radius: 50%;
  background-color: $icon-bg-color;
  bottom: -10%;
  left: -10%;
  transition: transform 0.3s ease;
}
.dc-box {
  height: 80%;
  transition: transform 0.3s ease;
}
.dc {
  height: 100%;
  aspect-ratio: 1;
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
.num-img {
  width: 100%;
  aspect-ratio: 1;
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
.btn-box {
  position: absolute;
  bottom: 0;
  right: 1%;
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
.dish-img {
  height: 100%;
  aspect-ratio: 1;
  border-radius: 15rpx;
}
.menu-box {
  width: 100%;
  flex: 1;
  display: flex;
}
.right {
  width: 20%;
  height: 100%;
  background-color: $bg-color;
  overflow: auto;
}
.left {
  flex: 1;
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
.item-box {
  background-color: white;
  transition: all 0.3s ease;
  height: 170rpx;
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
}
.item-box-content {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-block: 35rpx;
  background-color: $bg-color;
  color: $font-color1;
  font-size: 22rpx;
  transition: all 0.3s ease;
}
.item-box-active {
  background-color: white;
  border-radius: 30rpx 0 0 30rpx;
  box-shadow: 0 4rpx 15rpx -15rpx rgba(0, 0, 0, 0.08),
    0 -4rpx 15rpx -15rpx transparent; /* 抵消顶部阴影 */
  color: $main-color;
  font-size: 24rpx;
  transition: all 0.3s ease;
}
.item-box-active-bottom {
  border-radius: 0 0 30rpx 0;
  transition: all 0.3s ease;
}
.item-box-active-up {
  border-radius: 0 30rpx 0 0;
  transition: all 0.3s ease;
}
.item-img {
  width: 50%;
  aspect-ratio: 1;
}
.item-text {
  width: 100%;
  display: flex;
  justify-content: center;
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
.dish-box {
  width: 100%;
  height: 150rpx;
  margin-top: 6rpx;
  display: flex;
}
.space {
  width: 100%;
  height: 31%;
  flex-shrink: 0;
}
</style>
