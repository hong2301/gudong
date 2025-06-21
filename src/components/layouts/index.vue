<template>
  <view class="overture">
    <Head class="head"></Head>
    <view class="body">
      <slot></slot>
    </view>
    <Tail class="tail"></Tail>
  </view>
</template>

<script setup lang="ts">
import Head from "@/components/head/index.vue";
import Tail from "@/components/tail/index.vue";
</script>

<style scoped>
.overture {
  width: 100vw;
  height: 100vh;
  position: relative;
}
.body {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0%;
  left: 0%;
}
.head {
  width: 100%;
  position: absolute;
  top: 0%;
  left: 0%;
}
.tail {
  width: 100%;
  position: absolute;
  left: 0%;
  bottom: 0%;
}
</style>
