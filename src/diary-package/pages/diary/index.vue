<template>
  <Layout>
    <view class="overture">1123</view>
  </Layout>
</template>

<script setup lang="ts">
import Layout from "@/components/layouts/index.vue";
import { onShow, onLoad } from "@dcloudio/uni-app";
import { useCmdStore } from "@/stores/cmd";
import { ref } from "vue";

// 操作存储
const cmdStore = useCmdStore();
// 日志Id
const logId = ref("");

onLoad((options) => {
  logId.value = options.id;
});
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
