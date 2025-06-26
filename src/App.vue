<script setup lang="ts">
import { onLaunch, onShow, onHide, onReady } from "@dcloudio/uni-app";
import { useCmdStore } from "@/stores/cmd";
// bgm存储
const cmdStore = useCmdStore();
// 背景音乐
const mainBgm = uni.createInnerAudioContext();
// 音乐集合
const bgms: { src: string; volume: number }[] = [
  {
    src: "https://mp-eb96f56f-cca7-47e5-802c-7542fcfdfdb9.cdn.bspapp.com/末白镇_吉他.m4a",
    volume: 1,
  },
  {
    src: "https://mp-eb96f56f-cca7-47e5-802c-7542fcfdfdb9.cdn.bspapp.com/末白镇-爵士.m4a",
    volume: 0.5,
  },
];
// 声音开关
let bgmBtn = true;
// 当前声音
let nowIndex = 0;

// 播放背景音乐
const bgmPlay = (index: number = Math.floor(Math.random() * bgms.length)) => {
  nowIndex = index;
  mainBgm.src = bgms[index].src;
  mainBgm.volume = bgms[index].volume;
  mainBgm.currentTime = 0;
  if (bgmBtn) {
    mainBgm.play();
    mainBgm.volume = bgms[nowIndex].volume;
  } else {
    mainBgm.pause();
    mainBgm.volume = 0;
  }

  mainBgm.onEnded(() => {
    mainBgm.stop();
    bgmPlay();
  });
  mainBgm.onError(() => {
    bgmPlay();
  });
};

uni.$on("bgm", (btn: boolean) => {
  bgmBtn = btn;
  if (bgmBtn) {
    mainBgm.play();
    mainBgm.volume = bgms[nowIndex].volume;
  } else {
    mainBgm.pause();
    mainBgm.volume = 0;
  }
});

onLaunch(() => {
  console.log("App Launch");
});
onShow(() => {
  console.log("App Show");
  bgmBtn = cmdStore.bgmBtn;
  bgmPlay();
});

onHide(() => {
  console.log("App Hide");
});
</script>
<style lang="scss">
@import "uview-plus/index.scss";
</style>
