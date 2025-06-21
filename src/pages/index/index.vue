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
          <view
            v-for="(lItem, lIndex) in logs"
            :key="lIndex"
            class="logItem"
            :style="{
              display: 'flex',
              flexDirection: `${lIndex % 2 === 0 ? ' row' : 'row-reverse'}`,
            }"
            @tap="tapLogItem(lItem.id)"
          >
            <view
              class="logItemImg"
              :style="{
                borderRadius: `${
                  lIndex % 2 === 0
                    ? '20rpx 0rpx 0rpx 20rpx'
                    : '0rpx 20rpx 20rpx 0rpx'
                }`,
                borderWidth: `${
                  lIndex % 2 === 0
                    ? '0rpx 0rpx 5rpx 5rpx'
                    : '0rpx 5rpx 5rpx 0rpx'
                }`,
              }"
              ><u-image
                height="100%"
                mode="heightFix"
                :src="lItem.imgSrc"
              ></u-image
            ></view>
            <view
              class="logItemTextBox"
              :style="{
                right: `${lIndex % 2 === 0 ? '0' : ''}`,
                left: `${lIndex % 2 === 0 ? '' : '0'}`,
              }"
            >
              <view
                class="logItemTextBoxMask"
                :class="[
                  `${
                    lIndex % 2 === 0
                      ? 'logItemTextBoxRight'
                      : 'logItemTextBoxLeft'
                  }`,
                ]"
              ></view>
              <view
                class="logItemText"
                :style="{
                  alignItems: `${lIndex % 2 === 0 ? 'flex-end' : 'flex-start'}`,
                  right: `${lIndex % 2 === 0 ? '0' : ''}`,
                  left: `${lIndex % 2 === 0 ? '' : '0'}`,
                }"
              >
                <view class="logItemTextTime">{{ lItem.time }}</view>
                <view class="logItemTextDescribe">{{ lItem.describe }}</view>
              </view>
            </view>
          </view>
          <view class="maskUp" :style="{ height: '50rpx' }"></view>
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
  {
    id: "1",
    time: "2025年6月15日",
    score: 5,
    describe: "鸡腿肉太加分了",
    imgSrc: "/static/foodLogs/2.jpeg",
  },
  {
    id: "2",
    time: "2025年6月14日",
    score: 3,
    describe: "牛肉有点腥味",
    imgSrc: "/static/foodLogs/1.jpeg",
  },
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
    uni.navigateTo({
      url: "/menu-package/pages/menu/index",
    });
  }, 100);
};

// 跳转集味簿
const tapJw = () => {
  jwScale.value = 1.1;
  uni.vibrateShort();
  setTimeout(() => {
    jwScale.value = 1;
    uni.navigateTo({
      url: "/order-package/pages/order/index",
    });
  }, 100);
};

// 跳转特定日志
const tapLogItem = (id: string) => {
  console.log("特点日志");
  uni.vibrateShort();
  uni.navigateTo({
    url: `/diary-package/pages/diary/index?id=${id}`,
  });
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
  margin-top: 50rpx;
  flex-shrink: 0;
  position: relative;
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
.logItemImg {
  height: 100%;
  aspect-ratio: 5/3;
  overflow: hidden;
  border-style: solid;
  border-color: rgba(119, 112, 96, 0.8);
}
.logItemTextBox {
  position: absolute;
  width: 47%;
  height: 100%;
}
.logItemTextBoxMask {
  position: absolute;
  width: 100%;
  height: 150%;
}
.logItemText {
  position: absolute;
  width: 130%;
  height: 100%;
  border-bottom: 5rpx dashed rgba(119, 112, 96, 0.8);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.logItemTextTime {
  font-size: 39rpx;
  color: rgb(119, 112, 96);
}
.logItemTextDescribe {
  font-size: 32rpx;
  color: rgb(171, 154, 133);
}
.logItemTextBoxRight {
  right: 18%;
  /* transform: rotate(20deg); */
  background: linear-gradient(
    to left,
    rgba(245, 241, 230, 1) 90%,
    rgba(245, 241, 230, 0.99) 91%,
    rgba(245, 241, 230, 0.96) 92%,
    rgba(245, 241, 230, 0.91) 93%,
    rgba(245, 241, 230, 0.84) 94%,
    rgba(245, 241, 230, 0.75) 95%,
    rgba(245, 241, 230, 0.64) 96%,
    rgba(245, 241, 230, 0.51) 97%,
    rgba(245, 241, 230, 0.36) 98%,
    rgba(245, 241, 230, 0.19) 99%,
    rgba(245, 241, 230, 0) 100%
  );
}
.logItemTextBoxLeft {
  left: 18%;
  /* transform: rotate(-20deg); */
  background: linear-gradient(
    to right,
    rgba(245, 241, 230, 1) 90%,
    rgba(245, 241, 230, 0.99) 91%,
    rgba(245, 241, 230, 0.96) 92%,
    rgba(245, 241, 230, 0.91) 93%,
    rgba(245, 241, 230, 0.84) 94%,
    rgba(245, 241, 230, 0.75) 95%,
    rgba(245, 241, 230, 0.64) 96%,
    rgba(245, 241, 230, 0.51) 97%,
    rgba(245, 241, 230, 0.36) 98%,
    rgba(245, 241, 230, 0.19) 99%,
    rgba(245, 241, 230, 0) 100%
  );
}
</style>
