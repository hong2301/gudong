<template>
  <Layout>
    <view class="overture">
      <Head></Head>
      <view
        class="head"
        :style="{
          width: `${eleWidth1 - capsuleRightInterval * 1}px`,
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
      <view class="menu-box">
        <view class="right">
          <view v-for="(tItem, tIndex) in taps" :key="tIndex">
            {{ tItem.text }}
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
// 元素宽度
const eleWidth1 = ref<number>(areaWidth - 4 * capsuleRightInterval.value);
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
    imgSrc: "",
    isNew: true,
  },
  {
    text: "素菜",
    imgSrc: "",
    isNew: false,
  },
  {
    text: "荤菜",
    imgSrc: "",
    isNew: false,
  },
]);

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
  height: 150rpx;
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
  height: auto;
}
.right {
  width: 20%;
  height: 100%;
  background-color: $bg-color;
}
</style>
