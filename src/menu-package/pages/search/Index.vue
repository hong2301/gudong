<template>
  <Layout>
    <view class="overture">搜索-暂未开发</view>
  </Layout>
</template>

<script setup lang="ts">
import Layout from "@/components/layouts/index.vue";
import { onShow } from "@dcloudio/uni-app";
import { useCmdStore } from "@/stores/cmd";

// 操作存储
const cmdStore = useCmdStore();

onShow(() => {
  cmdStore.backBtnShow = true;
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
  justify-content: center;
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
