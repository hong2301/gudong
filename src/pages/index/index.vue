<template>
  <Layout>
    <view class="overture">
      <view class="introduce">
        <view class="introduce-imgs">
          <image
            src="https://mp-eb96f56f-cca7-47e5-802c-7542fcfdfdb9.cdn.bspapp.com/xbh.png"
            mode="widthFix"
          />
        </view>
        <view class="transition"></view>
      </view>
      <view class="bg"></view>
      <view class="space"></view>
      <view
        class="head"
        :style="{
          width: `${eleWidth1}px`,
          marginBottom: `${capsuleRightInterval * 2}px`,
        }"
      >
        <view
          class="bubu-box"
          :style="{
            marginRight: `${capsuleRightInterval * 2}px`,
          }"
        >
          <Bubu
            ref="bubuRef"
            :size="200"
            :font-size="40"
            :img-src="bubuImgSrc"
            @tap="tapBubu"
          >
          </Bubu>
          <Yier
            class="yier"
            ref="yierRef"
            :size="150"
            :font-size="40"
            :img-src="yierImgSrc"
            @tap="tapYier"
          >
          </Yier>
          <view class="space2" :style="{ opacity: `${yierOpacity}` }">
            <image class="cjs" src="/static/wan.png" mode="widthFix" />
          </view>
        </view>
        <view class="user-box" @tap="tapDl">
          <view
            class="item-img-box1"
            :style="{ transform: `scale(${dlScale}) ` }"
          >
            <up-image
              :height="`${eleWidth1 * 0.5 * 0.4 * 0.4}px`"
              :width="`${eleWidth1 * 0.5 * 0.4 * 0.4}px`"
              :src="`${
                isLogin ? userStore.userInfo.profile : '/static/shouye.png'
              }`"
              shape="circle"
              mode="heightFix"
            />
          </view>
          <view class="item-text" style="font-weight: 400">{{
            isLogin ? userStore.userInfo.name : "登记"
          }}</view>
        </view>
      </view>
      <view
        class="content"
        :style="{
          width: `${eleWidth1}px`,
          marginBottom: `${capsuleRightInterval * 2}px`,
        }"
      >
        <view class="item-box" @tap="tapDc">
          <view
            class="item-img-box"
            :style="{ transform: `scale(${dcScale}) ` }"
          >
            <image
              :style="{
                width: `${eleWidth1 * 0.5 * 0.4 * 0.5}px`,
                height: `${eleWidth1 * 0.5 * 0.4 * 0.5}px`,
              }"
              src="/static/dianpu.png"
              mode="widthFix"
            />
          </view>
          <view class="item-text">烟火集</view>
          <view class="item-text1">看看想吃点什么</view>
        </view>
        <view class="divider"></view>
        <view class="item-box" @tap="tapDd">
          <view
            class="item-img-box"
            :style="{ transform: `scale(${ddScale}) ` }"
          >
            <image
              :style="{
                width: `${eleWidth1 * 0.5 * 0.4 * 0.5}px`,
                height: `${eleWidth1 * 0.5 * 0.4 * 0.5}px`,
              }"
              src="/static/dingdan.png"
              mode="widthFix"
            />
          </view>
          <view class="item-text">食味笺</view>
          <view class="item-text1">记录你的每一餐</view>
        </view>
      </view>
      <view
        class="logs"
        :style="{
          width: `${eleWidth1 - capsuleRightInterval * 4}px`,
          padding: `${capsuleRightInterval * 2}px`,
          marginBottom: `${capsuleRightInterval * 10}px`,
        }"
      >
        <view class="item-text2" @tap="tapBx">
          <view class="item-text2-bg"></view>
          <view
            class="item-text2-content"
            :style="{ transform: `scale(${bxScale}) ` }"
          >
            <view class="item-text2-content-text">日 志</view>
            <image
              class="bianxie-img"
              src="/static/bianxie.png"
              mode="widthFix"
            />
          </view>
        </view>
        <view
          v-for="(fItem, fIndex) in foodRows"
          :key="fIndex"
          class="food-item"
          :style="{
            marginTop: `${fIndex != 0 ? '15' : '0'}rpx`,
            height: `${fIndex != foodRows.length - 1 ? '166' : '150'}rpx`,
          }"
          @tap="lookLog(fItem._id)"
        >
          <view class="food-item-content">
            <up-image
              :height="150 * rpxRPx"
              :width="200 * rpxRPx"
              :radius="15 * rpxRPx"
              :src="fItem.imgSrc || '/static/load.jpeg'"
              mode="aspectFill"
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
                <up-loading-icon color="rgb(239, 156, 82)"></up-loading-icon>
              </template>
            </up-image>
            <view
              class="food-item-text-box"
              :style="{ height: `${150 * rpxRPx}px` }"
            >
              <view class="food-item-text-time">{{
                formatTimestampToDate(fItem.time).str
              }}</view>
              <view class="food-item-text-des">{{ fItem.describe }}</view>
            </view>
          </view>
          <view v-if="fIndex != foodRows.length - 1" class="divider1"></view>
        </view>
        <view v-if="foodRows.length === 0" class="empyt">
          <image
            class="loading"
            src="https://mp-eb96f56f-cca7-47e5-802c-7542fcfdfdb9.cdn.bspapp.com/加载中.png"
            mode="heightFix"
          />
          <view class="loadText">加载中...</view>
        </view>
      </view>
      <view class="transition1" :style="{ height: `${tailHeight}px` }"></view>
    </view>
    <LoginCard v-model:btn="loginCardBtn"></LoginCard>
    <LogCard v-model:btn="logCardBtn" :logId="logCardId"></LogCard>
  </Layout>
</template>

<script setup lang="ts">
import Layout from "@/components/layouts/index.vue";
import Bubu from "@/components/character/index.vue";
import Yier from "@/components/character/index.vue";
import { ref } from "vue";
import { useCmdStore } from "@/stores/cmd";
import { onReady, onShow } from "@dcloudio/uni-app";
import { useUserStore } from "@/stores/user";
import { useLogStore } from "@/stores/log";
import LoginCard from "@/components/loginCard/index.vue";
import LogCard from "@/components/logCard/index.vue";
import type { logType } from "@/types/log";
import { formatTimestampToDate } from "@/utils/time";

// 是否有登陆
const isLogin = ref(false);
// 用户存储
const userStore = useUserStore();
// 操作存储
const cmdStore = useCmdStore();
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
// 元素宽度
const eleWidth1 = ref<number>(areaWidth - 4 * capsuleRightInterval.value);
// 点餐图标的缩放
const dcScale = ref<number>(1);
// 订单图标的缩放
const ddScale = ref<number>(1);
// 登陆图标的缩放
const dlScale = ref<number>(1);
// 编写图标的缩放
const bxScale = ref<number>(1);
// 布布图片
const bubuImgSrc = ref<string>(
  "https://mp-eb96f56f-cca7-47e5-802c-7542fcfdfdb9.cdn.bspapp.com/炒菜.png"
);
// 一二图片
const yierImgSrc = ref<string>(
  cmdStore.bgmBtn
    ? " https://mp-eb96f56f-cca7-47e5-802c-7542fcfdfdb9.cdn.bspapp.com/弹钢琴.png"
    : "https://mp-eb96f56f-cca7-47e5-802c-7542fcfdfdb9.cdn.bspapp.com/揉脸.png"
);
// 布布ref
const bubuRef = ref();
// 一二ref
const yierRef = ref();
// 食物日志
const foodRows = ref<logType[]>([]);
// 登陆卡片
const loginCardBtn = ref(0);
// 日志卡片
const logCardBtn = ref(0);
// 一二地板
const yierOpacity = ref(0);
// 日志Id
const logCardId = ref("");

/**
 * 点击布布
 */
const tapBubu = () => {
  bubuRef?.value?.startSay("欢迎欢迎", ["-10%", "100%", "rgb(146,107,77)"], {
    src: "/static/布布/声音/哒哒哒哒哒.m4a",
    volume: 1,
  });
};

/**
 * 点击一二
 */
const tapYier = () => {
  yierRef?.value?.startSay("你好呀", ["-10%", "80%", "rgb(233, 148, 137)"], {
    src: "/static/一二/声音/ddd.m4a",
    volume: 1,
  });
};

/**
 * 点击登陆
 */
const tapDl = () => {
  dlScale.value = 1.1;
  uni.vibrateShort();
  setTimeout(() => {
    dlScale.value = 1;
    if (isLogin.value) {
      loginCardBtn.value = 1;
    } else {
      loginCardBtn.value = 2;
    }
  }, 100);
};

/**
 * 点击编写
 */
const tapBx = () => {
  bxScale.value = 1.1;
  uni.vibrateShort();
  setTimeout(() => {
    logCardBtn.value = 1;
    bxScale.value = 1;
  }, 100);
};

/**
 * 点击点餐
 */
const tapDc = () => {
  dcScale.value = 1.1;
  uni.vibrateShort();
  setTimeout(() => {
    dcScale.value = 1;
    uni.navigateTo({
      url: "/menu-package/pages/menu/index",
    });
  }, 100);
};

/**
 * 点击订单
 */
const tapDd = () => {
  ddScale.value = 1.1;
  uni.vibrateShort();
  setTimeout(() => {
    ddScale.value = 1;
    uni.navigateTo({
      url: "/order-package/pages/order/index",
    });
  }, 100);
};

/**
 * 点击日志
 */
const tapFoodItem = (id: string | number) => {
  uni.vibrateShort();
  uni.navigateTo({
    url: `/diary-package/pages/diary/index?id=${id}`,
  });
};

// 布布开始
const bubuStart = () => {
  if (isLogin.value) {
    bubuRef?.value?.startSay(
      userStore.userInfo.startText,
      ["-10%", "100%", "rgb(146,107,77)"],
      {
        src: "/static/布布/声音/哒哒哒哒哒.m4a",
        volume: 1,
      }
    );
  } else {
    bubuRef?.value?.startSay("欢迎欢迎", ["-10%", "100%", "rgb(146,107,77)"], {
      src: "/static/布布/声音/哒哒哒哒哒.m4a",
      volume: 1,
    });
  }
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

// 检查是否登陆
const isLoginFn = () => {
  isLogin.value = userStore.isLogin();
};

// 获取日志
const getLogRows = async () => {
  await uniCloud
    .callFunction({
      name: "logGet",
    })
    .then((res) => {
      foodRows.value = res.result.data;
    });
};

// 一二地板
const yierDb = () => {
  yierOpacity.value = 0;
  setTimeout(() => {
    yierOpacity.value = 1;
  }, 100);
};

// 一二不弹
const yierNo = (btn: boolean) => {
  if (btn) {
    yierImgSrc.value =
      " https://mp-eb96f56f-cca7-47e5-802c-7542fcfdfdb9.cdn.bspapp.com/弹钢琴.png";
    yierRef?.value?.startSay("嘻嘻", ["-10%", "80%", "rgb(233, 148, 137)"], {
      src: "/static/一二/声音/ddd.m4a",
      volume: 1,
    });
  } else {
    yierImgSrc.value =
      "https://mp-eb96f56f-cca7-47e5-802c-7542fcfdfdb9.cdn.bspapp.com/哭.png";
    setTimeout(() => {
      if (!cmdStore.bgmBtn) {
        yierImgSrc.value =
          "https://mp-eb96f56f-cca7-47e5-802c-7542fcfdfdb9.cdn.bspapp.com/揉脸.png";
        yierRef?.value?.startSay("哼", ["-10%", "80%", "rgb(233, 148, 137)"], {
          src: "/static/一二/声音/ddd.m4a",
          volume: 1,
        });
      }
    }, 1000);
  }
};

// 看日志
const lookLog = (logId: string) => {
  logCardId.value = logId;
  logCardBtn.value = 3;
};

uni.$on("login", (mode) => {
  isLoginFn();
  if (mode) {
    bubuStart();
  }
});

uni.$on("bgm", (btn) => {
  yierNo(btn);
});

uni.$on("log", () => {
  getLogRows();
});

onShow(() => {
  cmdStore.backBtnShow = false;
  cmdStore.searchBtnShow = false;
  cmdStore.backBtnShowToIndex = false;
  getLogRows();
  isLoginFn();
  yierDb();
});
onReady(() => {
  bubuStart();
});
</script>

<style scoped lang="scss">
@import "../../uni.scss";

.overture {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(
    to top,
    rgba(245, 241, 230, 1) 0%,
    rgba(245, 241, 230, 0.99) 100%
  );
  position: relative;
  overflow: auto;
}
.introduce {
  position: absolute;
  width: 100%;
  height: 35%;
  top: 0;
  background-color: white;
}
.introduce-imgs {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.transition {
  position: absolute;
  width: 100%;
  height: 20%;
  bottom: 0;
  background: linear-gradient(
    to top,
    rgba(245, 241, 230, 0.99) 0%,
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
.bg {
  position: absolute;
  width: 100%;
  height: 65%;
  bottom: 0;
  background: linear-gradient(
    to top,
    rgba(245, 241, 230, 1) 0%,
    rgba(245, 241, 230, 0.99) 100%
  );
}
.transition1 {
  position: fixed;
  width: 100%;
  bottom: 0;
  background: linear-gradient(
    to top,
    rgba(245, 241, 230, 0.99) 0%,
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
.space {
  width: 100%;
  height: 31%;
  flex-shrink: 0;
}
.head {
  display: flex;
  justify-content: space-between;
  height: 250rpx;
  position: relative;
  flex-shrink: 0;
}
.bubu-box {
  height: 100%;
  padding-left: 40rpx;
  background-color: $ele-color;
  border-radius: 15rpx;
  display: flex;
  flex: auto;
  align-items: center;
  position: relative;
  box-shadow: 0 4rpx 15rpx rgba(0, 0, 0, 0.08); /* 添加阴影 */
  border: 1rpx solid rgba(239, 156, 82, 0.5);
}
.yier {
  position: absolute;
  right: 30rpx;
  bottom: 60rpx;
}
.space2 {
  position: absolute;
  right: 30rpx;
  bottom: 40rpx;
  width: 220rpx;
  height: 38rpx;
  border-top: 4rpx solid rgb(75, 37, 31);
  border-radius: 0 0 40rpx 20%;
  transition: all 1s ease;
  opacity: 0;
  background-color: rgb(193, 193, 193);
}
.cjs {
  position: absolute;
  top: -80%;
  left: -5%;
  width: 50rpx;
  aspect-ratio: 1;
}

.user-box {
  width: 30%;
  background-color: $ele-color;
  aspect-ratio: 1;
  border-radius: 15rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  box-shadow: 0 4rpx 15rpx rgba(0, 0, 0, 0.08); /* 添加阴影 */
}
.item-img-box1 {
  width: 50%;
  aspect-ratio: 1;
  background-color: $icon-bg-color;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  transition: transform 0.3s ease;
}
.content {
  border-radius: 15rpx;
  display: flex;
  background-color: $ele-color;
  padding-block: 50rpx;
  position: relative;
  align-items: center;
  box-shadow: 0 4rpx 15rpx rgba(0, 0, 0, 0.08); /* 添加阴影 */
  flex-shrink: 0;
}
.divider {
  position: absolute;
  height: 50%;
  width: 1rpx;
  background-color: rgba(0, 0, 0, 0.1);
  left: 50%;
}
.item-box {
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: auto;
}
.item-img-box {
  width: 40%;
  aspect-ratio: 1;
  background-color: $icon-bg-color;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  transition: transform 0.3s ease;
}
.item-text {
  margin-top: 5%;
  font-size: 33rpx;
  font-weight: 800;
  color: $font-color;
}
.item-text1 {
  margin-top: 1%;
  font-size: 20rpx;
  color: $font-color1;
  font-weight: 300;
}
.item-text2 {
  margin-bottom: 5%;
  margin-right: auto;
  position: relative;
  display: flex;
  justify-content: center;
}
.item-text2-content {
  position: relative;
  display: flex;
  align-items: center;
  transition: transform 0.3s ease;
}
.bianxie-img {
  position: absolute;
  width: 35rpx;
  aspect-ratio: 1;
  right: -70%;
  top: 20%;
}
.item-text2-content-text {
  font-size: 35rpx;
  font-weight: 800;
  color: $font-color;
}
.item-text2-bg {
  border-radius: 15rpx;
  width: 200%;
  height: 55%;
  background-color: $icon-bg-color;
  position: absolute;
  bottom: 0;
  left: -10%;
}
.logs {
  position: relative;
  background-color: $ele-color;
  border-radius: 15rpx;
  box-shadow: 0 4rpx 15rpx rgba(0, 0, 0, 0.08); /* 添加阴影 */
  flex-shrink: 0;
}
.food-item {
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  flex-shrink: 0;
}
.food-item-content {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.divider1 {
  margin-top: 15rpx;
  width: 50%;
  height: 1rpx;
  background-color: rgba(0, 0, 0, 0.1);
}
.empyt {
  width: 100%;
  height: 400rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.loading {
  height: 250rpx;
  width: 250rpx;
}
.loadText {
  color: $font-color1;
  font-size: 28rpx;
}
.food-item-img {
  height: 150rpx;
  border-radius: 15rpx;
}
.food-item-text-box {
  width: 60%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-between;
  position: relative;
}
.food-item-text-time {
  position: absolute;
  top: 0;
  font-size: 30rpx;
  color: $font-color;
  white-space: nowrap;
  font-weight: 400;
}
.food-item-text-des {
  position: absolute;
  bottom: 0;
  font-size: 25rpx;
  color: $font-color1;
  font-weight: 300;
  white-space: nowrap;
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
