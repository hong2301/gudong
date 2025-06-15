<template>
  <Layout>
    <view class="overture">
      <Head></Head>
      <Bubu ref="bubuRef" :size="450" :font-size="45" @tap="tapBubu"></Bubu>
      <view class="mnue"> </view>
    </view>
  </Layout>
</template>

<script setup lang="ts">
import { onLoad, onShow, onHide, onReady } from "@dcloudio/uni-app";
import Layout from "@/components/layouts/index.vue";
import Bubu from "@/components/character/index.vue";
import Head from "@/components/head/index.vue";
import { ref } from "vue";

const bubuRef = ref();

const tapBubu = () => {
  bubuRef?.value?.tapImg();
  bubuRef?.value?.startSay("你好呀", ["50%", "80%", "rgb(146,107,77)"], {
    src: "/static/布布/声音/哒哒哒哒哒.m4a",
    volume: 1,
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
  background-image: url("../../static/logo.png");
}
.mnue {
  width: 100%;
  height: 200px;
  background-color: rgb(245, 241, 230);
}
</style>
