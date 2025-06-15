<template>
  <view class="overture">
    <Food
      imgSrc="/static/dangao.png"
      :size="100"
      style="position: absolute; top: 10%; left: 50%"
    ></Food>
    <Food
      imgSrc="/static/Corn.png"
      :size="100"
      style="position: absolute; top: 10%; left: 18%"
    ></Food>
    <Food
      imgSrc="/static/FastFood.png"
      :size="100"
      style="position: absolute; top: 18%; left: 75%"
    ></Food>
    <Food
      imgSrc="/static/jitui.png"
      :size="100"
      style="position: absolute; top: 24%; left: 8%"
    ></Food>
    <Food
      imgSrc="/static/longxia.png"
      :size="100"
      style="position: absolute; top: 33%; left: 80%"
    ></Food>
    <Food
      imgSrc="/static/yu.png"
      :size="100"
      style="position: absolute; top: 38%; left: 9%"
    ></Food>
  </view>
</template>

<script setup lang="ts">
import Food from "@/components/food/index.vue";
</script>

<style scoped>
.overture {
  width: 100%;
  height: 100%;
  position: relative;
}
</style>
