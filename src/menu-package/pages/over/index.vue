<template>
  <Layout>
    <view class="overture">
      <Bubu
        ref="bubuRef"
        :size="200"
        :font-size="40"
        :img-src="bubuImgSrc"
        @tap="tapBubu"
      ></Bubu>
      <view class="content">
        <view v-for="(rItem, rIndex) in rows" :key="rIndex" class="item">
          <view class="dish-img-box">
            <up-image
              :height="150 * rpxRPx"
              :width="200 * rpxRPx"
              :radius="15 * rpxRPx"
              :src="rItem.dishImgSrc"
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
          </view>
          <view class="text-box">
            <view class="name">{{ rItem.name }}</view>
            <view class="num">{{ `x ${rItem.order}` }}</view>
          </view>
        </view>
      </view>
      <view v-if="!isOk" class="btn-box">
        <up-button
          text="确 定"
          type="primary"
          color="rgb(239, 156, 82)"
          style="margin-right: 5%"
          @tap="ok"
        ></up-button>
      </view>
      <view v-else class="btn-box">
        <up-button
          text="返回首页"
          type="primary"
          color="rgb(239, 156, 82)"
          style="margin-right: 5%"
          @tap="back"
        ></up-button>
      </view>
    </view>
  </Layout>
</template>

<script setup lang="ts">
import Layout from "@/components/layouts/index.vue";
import { onHide, onReady, onShow } from "@dcloudio/uni-app";
import { ref } from "vue";
import { useCmdStore } from "@/stores/cmd";
import { useMenuStore } from "@/stores/menu";
import type { cartDishType } from "@/types/dish";
import Bubu from "@/components/character/index.vue";
import { useUserStore } from "@/stores/user";
import { useCartStore } from "@/stores/cart";

// 购物车存储
const cartStore = useCartStore();
// 屏幕宽度
const areaWidth = uni.getWindowInfo().safeArea.width;
// rpx/px
const rpxRPx = areaWidth / 750;
// 用户存储
const userStore = useUserStore();
// 操作存储
const cmdStore = useCmdStore();
// 购物车数据
const rows = ref<cartDishType[]>([]);
// 菜单存储
const menuStore = useMenuStore();
// 布布ref
const bubuRef = ref();
// 布布图片
const bubuImgSrc = ref(
  "https://mp-eb96f56f-cca7-47e5-802c-7542fcfdfdb9.cdn.bspapp.com/招待.png"
);
// 是否确定
const isOk = ref(false);

// 点击布布
const tapBubu = () => {
  bubuRef?.value?.startSay("准备开饭", ["30%", "100%", "rgb(146,107,77)"], {
    src: "/static/布布/声音/哒哒哒哒哒.m4a",
    volume: 1,
  });
};
// 确认购物车
const getGwc = () => {
  // rows.value = [];
  // menuStore.data.forEach((tItem) => {
  //   if (tItem.order !== 0) {
  //     tItem.dish?.forEach((dItem) => {
  //       if (dItem.order !== 0) {
  //         rows.value.push({
  //           _id: dItem._id,
  //           name: dItem.name,
  //           dishImgSrc: dItem.imgSrc,
  //           order: dItem.order,
  //           text: tItem.text,
  //           tapImgSrc: tItem.imgSrc,
  //           isCheck: true,
  //         });
  //       }
  //     });
  //   }
  // });
  rows.value = cartStore.overRows;
};

// 返回首页
const back = () => {
  uni.navigateTo({
    url: "/pages/index/index",
  });
  cmdStore.backBtnShowToIndex = false;
};

// ok
const ok = () => {
  uniCloud
    .callFunction({
      name: "orderAdd",
      data: {
        time: Date.now(),
        dish: rows.value,
        userId: userStore.userInfo?._id,
        userName: userStore.userInfo?.name,
      },
    })
    .then((res) => {
      bubuRef?.value?.startSay("开整!", ["30%", "100%", "rgb(146,107,77)"], {
        src: "/static/布布/声音/哒哒哒哒哒.m4a",
        volume: 0,
      });
      bubuImgSrc.value =
        "https://mp-eb96f56f-cca7-47e5-802c-7542fcfdfdb9.cdn.bspapp.com/炒菜.png";
      isOk.value = true;
      // 返回按钮换为返回首页的
      cmdStore.backBtnShow = false;
      cmdStore.backBtnShowToIndex = true;
      uni.$emit("cmd");
      // 清空菜单
      menuStore.claer();
    });
};

onShow(() => {
  cmdStore.backBtnShow = true;
  cmdStore.searchBtnShow = false;
  getGwc();
});
onHide(() => {
  cmdStore.backBtnShow = false;
});
onReady(() => {
  bubuRef?.value?.startSay(
    "都选好了吗，可返回修改哦",
    ["-20%", "-20%", "rgb(146,107,77)"],
    {
      src: "/static/布布/声音/哒哒哒哒哒.m4a",
      volume: 0,
    }
  );
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
  justify-content: center;
}
.content {
  width: 100%;
  max-height: 750rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: auto;
}
.item {
  width: 80%;
  height: 150rpx;
  background-color: white;
  border-radius: 15rpx;
  padding: 30rpx;
  box-shadow: 0 4rpx 15rpx rgba(0, 0, 0, 0.08); /* 添加阴影 */
  display: flex;
  justify-content: space-between;
  margin-top: 30rpx;
}
.dish-img-box {
  height: 100%;
  width: 200rpx;
}
.dish-img {
  width: 100%;
  height: 100%;
  border-radius: 15rpx;
}
.text-box {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.name {
  font-size: 35rpx;
}
.num {
  display: flex;
  justify-content: flex-end;
  font-size: 28rpx;
  color: $font-color1;
}
.btn-box {
  width: 660rpx;
  margin-top: 30rpx;
}
</style>
