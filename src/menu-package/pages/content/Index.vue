<template>
  <Layout>
    <view class="overture">
      <Head></Head>
    </view>
  </Layout>
</template>

<script setup lang="ts">
import Layout from "@/components/layouts/index.vue";
import { onShow, onLoad } from "@dcloudio/uni-app";
import { useCmdStore } from "@/stores/cmd";
import { useMenuStore } from "@/stores/menu";
import Head from "@/components/head/index.vue";
import { ref } from "vue";
import type { dishType } from "@/types/dish";

// 操作存储
const cmdStore = useCmdStore();
// 菜单存储
const muneStore = useMenuStore();
// 菜单信息
const dishData = ref<dishType>({});
// 菜id
const dishId = ref("");

// 获取菜信息
const getDishContent = () => {
  for (const tItem of muneStore.data) {
    const foundDish = tItem.dish?.find((dItem) => dItem._id === dishId.value);
    if (foundDish) {
      dishData.value = foundDish;
      break; // 找到后立即退出循环
    }
  }
  console.log(dishData.value);
};

onLoad((options) => {
  dishId.value = options.id;
});

onShow(() => {
  cmdStore.backBtnShow = true;
  getDishContent();
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
