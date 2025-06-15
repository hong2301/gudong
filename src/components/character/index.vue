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
        :show-loading="true"
        class="img"
        @tap="tapImg"
      ></u-image>
    </view>
    <view :style="sayOption" class="text-box">
      {{ say }}
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { onLoad, onShow, onHide, onUnload } from "@dcloudio/uni-app";

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
    default: "/static/布布/蟑螂布.png",
  },
});
const bgm = uni.createInnerAudioContext();

const sayOption = ref({
  top: "0%",
  left: "0%",
  color: "rgb(146,107,77)",
});
const say = ref("");
const imgScale = ref(1);

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
  bgm.volume = sound.volume;
  bgm.play();
  const setIntervalData = setInterval(() => {
    if (say.value.length != text.length) {
      say.value += text[say.value.length];
    } else {
      clearInterval(setIntervalData);
    }
  }, seed);
};

defineExpose({
  tapImg,
  startSay,
});

onLoad(() => {
  console.log("character Load");
});
onShow(() => {
  console.log("character Show");
});
onHide(() => {
  console.log("character Hide");
});
onUnload(() => {
  console.log("character Hide");
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
.img {
}
.text-box {
  position: absolute;
  width: 100%;
  font-weight: 800;
}
</style>
