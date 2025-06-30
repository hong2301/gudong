<template>
  <Layout>
    <view class="overture">
      <Head></Head>
      <view
        v-for="(oItem, oIndex) in order"
        :key="oIndex"
        class="item"
        :style="{
          width: `${eleWidth1}px`,
          marginBottom: `${capsuleRightInterval}px`,
        }"
      >
        <view class="head">
          <view class="time">{{ formatTimestampToDate(oItem.time).str }}</view>
          <view class="name">{{ oItem.userName }}</view>
        </view>
        <view
          v-for="(dItem, dIndex) in oItem.dish"
          :key="dIndex"
          class="dish-item"
          :style="{
            marginBottom: `${capsuleRightInterval}px`,
          }"
        >
          <up-image
            :height="150 * rpxRPx"
            :width="200 * rpxRPx"
            :radius="15 * rpxRPx"
            :src="dItem.dishImgSrc || '/static/load.jpeg'"
            mode="aspectFill"
            @click="clickImg(dItem.dishImgSrc)"
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
          <view class="text-box">
            <view class="name">{{ dItem.name }}</view>
            <view class="num">{{ `x ${dItem.order}` }}</view>
          </view>
        </view>
        <view class="btn-box">
          <view class="btn">
            <u-button
              v-if="oItem?.status === 0"
              color="rgb(239, 156, 82)"
              size="mini"
              @tap="orderOk(oItem)"
              >搞定</u-button
            >
            <view v-else>
              <u-button
                v-if="!oItem?.logId"
                color="rgb(239, 156, 82)"
                size="mini"
                @tap="logAdd(oItem)"
                >记录一下</u-button
              >
              <u-button
                v-else
                color="rgb(239, 156, 82)"
                size="mini"
                @tap="lookLog(oItem?.logId)"
                >回味一下</u-button
              >
            </view>
          </view>
        </view>
      </view>
      <view
        v-if="order.length === 0"
        class="item"
        :style="{
          width: `${eleWidth1}px`,
          marginBottom: `${capsuleRightInterval}px`,
        }"
      >
        <view class="dish-item1">尚未品尝</view>
      </view>
      <view class="space"></view>
    </view>
    <LogCard
      v-model:btn="logCardBtn"
      :time="Number(orderData.time)"
      :orderId="orderData._id + ''"
      :logId="logCardId"
      @updated="logUpdated"
    ></LogCard>
  </Layout>
</template>

<script setup lang="ts">
import Layout from "@/components/layouts/index.vue";
import { onShow } from "@dcloudio/uni-app";
import { useCmdStore } from "@/stores/cmd";
import { useUserStore } from "@/stores/user";
import { ref } from "vue";
import Head from "@/components/head/index.vue";
import type { orderType } from "@/types/dish";
import LogCard from "@/components/logCard/index.vue";
import { formatTimestampToDate } from "@/utils/time";

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
const eleWidth1 = ref<number>(areaWidth - 3 * capsuleRightInterval.value);
// 操作存储
const cmdStore = useCmdStore();
// 用户存储
const userStore = useUserStore();
// 订单列表
const order = ref<orderType[]>([]);
// 日志卡片
const logCardBtn = ref(0);
// 订单数据
const orderData = ref<orderType>({});
// 日志Id
const logCardId = ref("");

// 数据更新
const logUpdated = (data: { logId: string }) => {
  const { _id, ...rest } = orderData.value;
  const temp = {
    ...rest,
    logId: data.logId,
  };
  uniCloud
    .callFunction({
      name: "orderUpdate",
      data: {
        id: orderData.value._id,
        updateData: temp,
      },
    })
    .then((res) => {
      getOrder();
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

// 获取订单
const getOrder = () => {
  uniCloud
    .callFunction({
      name: "orderGet",
      data: {
        userId: userStore.userInfo?._id,
        userRole: userStore?.userInfo?.role,
      },
    })
    .then((res) => {
      order.value = res.result;
    });
};
// 订单完成
const orderOk = (item: orderType) => {
  item.status = 1;
  uniCloud
    .callFunction({
      name: "orderOk",
      data: {
        item,
      },
    })
    .then((res) => {
      getOrder();
    });
};
// 写日志
const logAdd = (item: orderType) => {
  logCardBtn.value = 1;
  orderData.value = item;
};
// 看日志
const lookLog = (logId: string) => {
  console.log(logId);
  logCardId.value = logId;
  logCardBtn.value = 3;
};

uni.$on("log", () => {
  getOrder();
});

onShow(() => {
  cmdStore.backBtnShow = true;
  getOrder();
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
.item {
  box-sizing: border-box;
  border-radius: 15rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30rpx;
  background-color: white;
  box-shadow: 0 4rpx 15rpx rgba(0, 0, 0, 0.08); /* 添加阴影 */
}
.dish-item {
  width: 100%;
  height: 150rpx;
  display: flex;
  justify-content: space-between;
}
.dish-item1 {
  width: 100%;
  height: 150rpx;
  margin-bottom: 15rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  color: $font-color1;
}
.dish-img {
  height: 150rpx;
  width: 200rpx;
  border-radius: 15rpx;
}
.text-box {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.name {
  font-size: 32rpx;
}
.num {
  display: flex;
  justify-content: flex-end;
  font-size: 28rpx;
  color: $font-color1;
}
.head {
  width: 100%;
  padding-bottom: 10rpx;
  margin-bottom: 30rpx;
  border-bottom: 1rpx solid rgba(0, 0, 0, 0.08);
  display: flex;
  justify-content: space-between;
}
.time {
  font-size: 30rpx;
  line-height: 30rpx;
}
.name {
  font-size: 25rpx;
  line-height: 30rpx;
}
.btn-box {
  width: 100%;
  display: flex;
  justify-content: flex-end;
}
.btn {
  margin-top: 15rpx;
  width: 120rpx;
}
.space {
  width: 100%;
  height: 400rpx;
  flex-shrink: 0;
}
</style>
