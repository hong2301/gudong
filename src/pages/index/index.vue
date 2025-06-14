<template>
  <Layout>
    <view class="overture">
      <Head></Head>
      <Bubu></Bubu>
    </view>
  </Layout>
</template>

<script setup lang="ts">
import Layout from "@/components/layouts/index.vue";
import Bubu from "@/components/character/index.vue";
import Head from "@/components/head/index.vue";
</script>

<style scoped>
.overture {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>
