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
          <view class="text">告诉布布</view>
          <view class="text1">可以加点别的菜哦</view>
          <view
            class="decorate"
            :style="{ transform: `scale(${txScale}) ` }"
          ></view>
          <view
            class="dc-box"
            :style="{ transform: `scale(${txScale}) ` }"
            @tap="tapTx"
          >
            <image class="dc" src="../../static/bianji.png" mode="widthFix" />
          </view>
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
        <view class="right">
          <view
            v-for="(tItem, tIndex) in taps"
            :key="tIndex"
            class="item-box"
            :style="{ background: `${tIndex === activeTap ? 'none' : ''}` }"
            @tap="tapMenuItem(tIndex)"
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
        </view>
      </view>
    </view>
  </Layout>
</template>

<script setup lang="ts">
import Layout from "@/components/layouts/index.vue";
import { onHide, onShow } from "@dcloudio/uni-app";
import { useCmdStore } from "@/stores/cmd";
import Head from "@/components/head/index.vue";
import { ref } from "vue";
import Bubu from "@/components/character/index.vue";
import yier from "@/components/character/index.vue";

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
// 屏幕高度
const areaHeight = uni.getWindowInfo().safeArea.height;
// 元素宽度
const eleWidth1 = ref<number>(areaWidth - 4 * capsuleRightInterval.value);
// 头部高度
const headHeight = ref<number>(
  uni.getMenuButtonBoundingClientRect().bottom + capsuleRightInterval.value
);
// 操作存储
const cmdStore = useCmdStore();
// 布布ref
const bubuRef = ref();
// 布布imgsrc
const bubuImgSrc = "/menu-package/static/招待.png";
// 填写图标的缩放
const txScale = ref<number>(1);
// 菜单标签
const taps = ref([
  {
    text: "招牌",
    imgSrc: "../../static/a3.png",
    isNew: true,
  },
  {
    text: "素菜",
    imgSrc: "../../static/yumi.png",
    isNew: false,
  },
  {
    text: "荤菜",
    imgSrc: "../../static/rou.png",
    isNew: false,
  },
  {
    text: "海鲜",
    imgSrc: "../../static/xia.png",
    isNew: false,
  },
  {
    text: "招牌",
    imgSrc: "../../static/a3.png",
    isNew: true,
  },
  {
    text: "素菜",
    imgSrc: "../../static/yumi.png",
    isNew: false,
  },
  {
    text: "荤菜",
    imgSrc: "../../static/rou.png",
    isNew: false,
  },
  {
    text: "海鲜",
    imgSrc: "../../static/xia.png",
    isNew: false,
  },
  {
    text: "招牌",
    imgSrc: "../../static/a3.png",
    isNew: true,
  },
  {
    text: "素菜",
    imgSrc: "../../static/yumi.png",
    isNew: false,
  },
  {
    text: "荤菜",
    imgSrc: "../../static/rou.png",
    isNew: false,
  },
  {
    text: "海鲜",
    imgSrc: "../../static/xia.png",
    isNew: false,
  },
  {
    text: "",
    imgSrc: "",
    isNew: false,
  },
]);
// 目前激活的菜单
const activeTap = ref(1);

// 点击菜单
const tapMenuItem = (index: number) => {
  if (index != taps.value.length - 1) {
    activeTap.value = index;
  }
};
// 点击布布
const tapBubu = () => {
  console.log("点击布布");
  bubuRef?.value?.startSay("不要客气哟", ["30%", "-150%", "rgb(146,107,77)"], {
    src: "/static/布布/声音/哒哒哒哒哒.m4a",
    volume: 1,
  });
};
/**
 * 点击填写
 */
const tapTx = () => {
  console.log("点击填写");
  txScale.value = 1.1;
  uni.vibrateShort();
  setTimeout(() => {
    txScale.value = 1;
  }, 100);
};

onShow(() => {
  cmdStore.backBtnShow = true;
  cmdStore.searchBtnShow = true;
});
onHide(() => {
  cmdStore.searchBtnShow = false;
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
  overflow: auto;
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
  font-size: 33rpx;
  font-weight: 800;
  color: black;
  margin-bottom: 7%;
}
.text1 {
  margin-top: 1%;
  font-size: 20rpx;
  color: $font-color1;
  font-weight: 300;
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
  position: absolute;
  width: 23%;
  transition: transform 0.3s ease;
  top: 10%;
  right: -10%;
}
.dc {
  width: 100%;
  aspect-ratio: 1;
}
.menu-box {
  width: 100%;
  flex: 1;
}
.right {
  width: 20%;
  height: 100%;
  background-color: $bg-color;
  overflow: auto;
}
.item-box {
  background-color: white;
  transition: all 0.3s ease;
}
.item-box-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-block: 35rpx;
  background-color: $bg-color;
  color: $font-color1;
  font-size: 22rpx;
}
.item-box-active {
  background-color: white;
  border-radius: 30rpx 0 0 30rpx;
  box-shadow: 0 4rpx 15rpx -15rpx rgba(0, 0, 0, 0.08),
    0 -4rpx 15rpx -15rpx transparent; /* 抵消顶部阴影 */
  color: $main-color;
  font-size: 24rpx;
}
.item-box-active-bottom {
  border-radius: 0 0 30rpx 0;
}
.item-box-active-up {
  border-radius: 0 30rpx 0 0;
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
</style>
