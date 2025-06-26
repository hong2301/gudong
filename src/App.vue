<script setup lang="ts">
import { onLaunch, onShow, onHide, onReady } from "@dcloudio/uni-app";
// 背景音乐
const mainBgm = uni.createInnerAudioContext();

// 背景音乐
const bgmPlay = () => {
  mainBgm.autoplay = true;
  mainBgm.src =
    "https://mp-eb96f56f-cca7-47e5-802c-7542fcfdfdb9.cdn.bspapp.com/末白镇_吉他.m4a";
  mainBgm.loop = true;
  mainBgm.play();
  console.log("播放");
};

onLaunch(() => {
  console.log("App Launch");
});
onShow(() => {
  console.log("App Show");
  bgmPlay();
});

onHide(() => {
  console.log("App Hide");
});
</script>
<style lang="scss">
@import "uview-plus/index.scss";
</style>
