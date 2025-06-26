<template>
  <Layout>
    <view class="overture">1123</view>
  </Layout>
</template>

<script setup lang="ts">
import Layout from "@/components/layouts/index.vue";
import { onShow } from "@dcloudio/uni-app";
import { useCmdStore } from "@/stores/cmd";
import { useUserStore } from "@/stores/user";

// 操作存储
const cmdStore = useCmdStore();
// 用户存储
const userStore = useUserStore();

// 获取订单
const getOrder = () => {
  uniCloud
    .callFunction({
      name: "orderGet",
      data: {
        userId: userStore.userInfo?._id,
      },
    })
    .then((res) => {
      console.log(res);
    });
};

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
</style>
