<template>
  <Layout>
    <view class="overture">
      <Bubu ref="bubuRef" :size="450" :font-size="45" @tap="tapBubu"></Bubu>
      <view
        class="transition"
        :style="{ height: `${contentHeight / 5}px` }"
      ></view>
      <view class="content">
        <view class="mnue" :style="{ height: `${(contentHeight * 1) / 5}px` }">
          <view class="bigTextBox">
            <view
              class="bigText"
              :style="{ transform: `scale(${yhScale}) ` }"
              @tap="tapYh"
              >烟火集</view
            >
            <view class="divider"></view>
            <view
              class="bigText"
              :style="{ transform: `scale(${jwScale}) ` }"
              @tap="tapJw"
              >集味簿</view
            >
          </view>
          <view class="divider1"></view>
        </view>
        <view
          class="logs"
          :style="{
            height: `${(contentHeight * 4) / 5 - tailHeight}px`,
            paddingBottom: `${tailHeight}px`,
          }"
        >
          <view class="maskUp" :style="{ height: '40rpx' }"></view>
          <view v-for="(lItem, lIndex) in logs" :key="lIndex" class="logItem">{{
            lItem.name
          }}</view>
          <view
            class="maskBottom"
            :style="{ height: `${tailHeight}px` }"
          ></view>
        </view>
      </view>
    </view>
  </Layout>
</template>

<script setup lang="ts">
import { onLoad, onShow, onHide, onReady } from "@dcloudio/uni-app";
import Layout from "@/components/layouts/index.vue";
import Bubu from "@/components/character/index.vue";
import { ref } from "vue";

// 尾巴高度
const tailHeight = ref<number>(
  uni.getWindowInfo().screenHeight - uni.getWindowInfo().safeArea.bottom
);
const bubuRef = ref();
const contentHeight = ref(uni.getWindowInfo().safeArea.height / 2);
const yhScale = ref(1);
const jwScale = ref(1);
const logs = ref([
  { name: "荔枝鸡煲" },
  { name: "菠萝牛肉粒" },
  { name: "咖喱鸡翅" },
  { name: "白灼大虾" },
]);

/**
 * 点击布布
 */
const tapBubu = () => {
  bubuRef?.value?.tapImg();
  bubuRef?.value?.startSay("你好呀", ["50%", "80%", "rgb(146,107,77)"], {
    src: "/static/布布/声音/哒哒哒哒哒.m4a",
    volume: 1,
  });
};

// 跳转烟火集
const tapYh = () => {
  yhScale.value = 1.1;
  uni.vibrateShort();
  setTimeout(() => {
    yhScale.value = 1;
  }, 100);
};

// 跳转集味簿
const tapJw = () => {
  jwScale.value = 1.1;
  uni.vibrateShort();
  setTimeout(() => {
    jwScale.value = 1;
  }, 100);
};

onLoad(() => {
  console.log("index Load");
});
onShow(() => {
  console.log("index Show");
});
onReady(() => {});
onHide(() => {
  console.log("index Hide");
});
</script>

<style scoped>
.overture {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  position: relative;
}
.transition {
  width: 100%;
  background: linear-gradient(
    to top,
    rgba(245, 241, 230, 1) 0%,
    rgba(245, 241, 230, 0.99) 10%,
    rgba(245, 241, 230, 0.96) 20%,
    rgba(245, 241, 230, 0.91) 30%,
    rgba(245, 241, 230, 0.84) 40%,
    rgba(245, 241, 230, 0.75) 50%,
    rgba(245, 241, 230, 0.64) 60%,
    rgba(245, 241, 230, 0.51) 70%,
    rgba(245, 241, 230, 0.36) 80%,
    rgba(245, 241, 230, 0.19) 90%,
    rgba(245, 241, 230, 0) 100%
  );
}
.content {
  width: 100%;
  background-color: rgb(245, 241, 230);
}
.mnue {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: auto;
}
.bigTextBox {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: auto;
}
.bigText {
  font-size: 45rpx;
  color: rgb(119, 112, 96);
  transition: transform 0.3s ease;
}
.divider {
  border: 1rpx solid rgb(119, 112, 96, 0.8);
  border-radius: 100rpx;
  height: 40%;
  margin-inline: 15%;
}
.divider1 {
  border-top: 1rpx solid rgb(119, 112, 96, 0.8);
  border-radius: 200rpx;
  width: 85%;
  height: 0;
}
.logs {
  width: 100%;
  overflow-y: auto; /* 启用垂直滚动 */
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}
.logItem {
  width: 85%;
  height: 200rpx;
  border-radius: 20rpx;
  background-color: aqua;
  margin-top: 40rpx;
  flex-shrink: 0;
}
.maskUp {
  position: fixed; /* 改为 fixed 定位 */
  flex-shrink: 0;
  width: 100%;
  background: linear-gradient(
    to Bottom,
    rgba(245, 241, 230, 1) 0%,
    rgba(245, 241, 230, 0.99) 10%,
    rgba(245, 241, 230, 0.96) 20%,
    rgba(245, 241, 230, 0.91) 30%,
    rgba(245, 241, 230, 0.84) 40%,
    rgba(245, 241, 230, 0.75) 50%,
    rgba(245, 241, 230, 0.64) 60%,
    rgba(245, 241, 230, 0.51) 70%,
    rgba(245, 241, 230, 0.36) 80%,
    rgba(245, 241, 230, 0.19) 90%,
    rgba(245, 241, 230, 0) 100%
  );
}
.maskBottom {
  position: fixed; /* 改为 fixed 定位 */
  bottom: 0;
  flex-shrink: 0;
  width: 100%;
  background: linear-gradient(
    to top,
    rgba(245, 241, 230, 1) 0%,
    rgba(245, 241, 230, 0.99) 10%,
    rgba(245, 241, 230, 0.96) 20%,
    rgba(245, 241, 230, 0.91) 30%,
    rgba(245, 241, 230, 0.84) 40%,
    rgba(245, 241, 230, 0.75) 50%,
    rgba(245, 241, 230, 0.64) 60%,
    rgba(245, 241, 230, 0.51) 70%,
    rgba(245, 241, 230, 0.36) 80%,
    rgba(245, 241, 230, 0.19) 90%,
    rgba(245, 241, 230, 0) 100%
  );
}
</style>
