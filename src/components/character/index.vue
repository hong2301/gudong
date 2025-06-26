<template>
  <view
    class="overture"
    :style="{ width: `${size}rpx`, transform: `scale(${imgScale}) ` }"
  >
    <view class="content">
      <u-image
        mode="widthFix"
        width="100%"
        :src="imgSrc"
        :lazy-load="true"
        :show-loading="true"
        :fade="true"
        duration="450"
        class="img"
        @tap="tapImg"
      >
        <template v-slot:loading>
          <up-loading-icon color="red"></up-loading-icon>
        </template>
      </u-image>
    </view>
    <view :style="sayOption" class="text-box">
      {{ say }}
    </view>
  </view>
</template>

<script setup lang="ts">
import { useCmdStore } from "@/stores/cmd";
import { ref, watch } from "vue";

const props = defineProps({
  size: {
    type: Number,
    required: true,
    default: "100",
  },
  fontSize: {
    type: Number,
    required: true,
    default: "45",
  },
  imgSrc: {
    type: String,
    default:
      "https://mp-eb96f56f-cca7-47e5-802c-7542fcfdfdb9.cdn.bspapp.com/蟑螂布.png",
  },
});
const bgm = uni.createInnerAudioContext();

const cmdStore = useCmdStore();
const sayOption = ref({
  top: "0%",
  left: "0%",
  color: "rgb(146,107,77)",
});
const say = ref("");
const imgScale = ref(1);
let setIntervalData: number | undefined = undefined;

/**
 * 点击图片
 */
const tapImg = () => {
  imgScale.value = 1.1;
  setTimeout(() => {
    imgScale.value = 1;
  }, 100);
};

/**
 * 开始讲话
 */
const startSay = (
  text: string,
  options: string[],
  sound: { src: string; volume: number },
  seed: number = 100
) => {
  clearInterval(setIntervalData);
  say.value = "";
  sayOption.value = JSON.parse(
    JSON.stringify({
      top: options[0],
      left: options[1],
      color: options[2],
    })
  );
  bgm.currentTime = 0;
  bgm.autoplay = true;
  bgm.src = sound.src;
  bgm.volume = cmdStore.bgmBtn ? sound.volume : 0;
  bgm.play();
  setIntervalData = setInterval(() => {
    if (say.value.length != text.length) {
      say.value += text[say.value.length];
    } else {
      clearInterval(setIntervalData);
    }
    setTimeout(() => {
      say.value = "";
    }, 3000);
  }, seed);

  watch(
    () => props.imgSrc, // 直接监听 prop
    (newVal, oldVal) => {
      console.log("变化后的值:", newVal);
    }
  );
};

defineExpose({
  tapImg,
  startSay,
});
</script>

<style scoped>
.overture {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  position: relative;
  transition: transform 0.3s ease;
}
.content {
  width: 100%;
  display: block;
}
.text-box {
  position: absolute;
  font-weight: 800;
  white-space: nowrap;
  min-width: 200rpx;
}
.img {
  transition: all 0.3s ease;
}
</style>
