<template>
  <view class="overture">
    <Head></Head>
    <view class="body">
      <slot></slot>
    </view>
    <Tail></Tail>
  </view>
</template>

<script setup lang="ts">
import { onLoad, onShow, onHide } from "@dcloudio/uni-app";
import { ref } from "vue";
import Head from "@/components/head/index.vue";
import Tail from "@/components/tail/index.vue";

onLoad(() => {
  console.log("layout Load");
});
onShow(() => {
  console.log("layout Show");
});
onHide(() => {
  console.log("layout Hide");
});
</script>

<style scoped>
.overture {
  width: 100vw;
  height: 100vh;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}
.head {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-end;
}
.capsule-box {
  width: 100%;
}
.body {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}
.tail {
  width: 100%;
}
</style>
