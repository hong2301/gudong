<template>
  <view v-if="mainBtn" class="mask" @tap="tapMask"></view>
  <view
    class="overture"
    :style="{
      transform: `translateY(${mainBtn ? '0' : '100'}%)`,
    }"
  >
    <view
      class="bottom"
      :style="{ opacity: `${mainBtn ? 100 : 0}%` }"
      @tap="tapBottom"
    >
      ⟨
    </view>
    <view class="content" :style="{ marginBottom: `${tailHeight + 10}px` }">
      <view class="img-box">
        <view class="text">图片</view>
        <FileUpload @upload="upload"></FileUpload>
      </view>
      <view class="input-box">
        <view class="text">名字</view>
        <up-input
          placeholder="请输入名字"
          border="surround"
          v-model="dishName"
        ></up-input>
      </view>
      <view class="tap-box">
        <view class="text">标签</view>
        <picker
          mode="selector"
          :range="columns"
          range-key="name"
          @change="Picker"
        >
          <view class="tap">{{ tap }}</view>
        </picker>
      </view>
      <view class="btn-box">
        <up-button
          text="完成"
          type="primary"
          color="rgb(239, 156, 82)"
          style="margin-right: 5%"
          @tap="ok"
        ></up-button>
        <up-button
          type="primary"
          color="rgb(239, 156, 82)"
          :plain="true"
          text="取消"
          @tap="cancel"
        ></up-button>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import FileUpload from "@/components/fileUpload/index.vue";
import { useMenuStore } from "@/stores/menu";

const props = defineProps({
  btn: {
    type: Number,
    default: 0,
  },
});
const menuStore = useMenuStore();
const emit = defineEmits(["update:btn"]);
const imgSrc = ref("");
const dishName = ref("");
const mainBtn = ref(0);
const columns = ref(
  menuStore.data.map((item) => ({
    name: item.text,
    id: item._id,
  }))
);
const tap = ref(columns.value[0].name);
// 尾巴高度
const tailHeight = ref<number>(
  uni.getWindowInfo().screenHeight - uni.getWindowInfo().safeArea.bottom
);

// 点击mask
const tapMask = () => {
  mainBtn.value = 0;
};
// 点击关闭
const tapBottom = () => {
  mainBtn.value = 0;
};
// 上传图片
const upload = (data: { curr: string; all: string[] }) => {
  imgSrc.value = data.curr;
};
// 选择器
const Picker = (event: { detail: { value: string } }) => {
  tap.value = event.detail.value;
};

// ok
const ok = () => {};
const cancel = () => {
  mainBtn.value = 0;
};

watch(
  () => props.btn,
  (value) => {
    mainBtn.value = value;
  }
);
watch(
  () => mainBtn.value,
  (value) => {
    emit("update:btn", value);
  }
);
</script>

<style scoped lang="scss">
@import "../../uni.scss";

.mask {
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.1);
  top: 0;
  left: 0;
  z-index: 998;
}
.overture {
  position: fixed;
  width: 100%;
  background-color: $bg-color2;
  bottom: 0%;
  z-index: 999;
  border-radius: 40rpx 40rpx 0 0;
  transition: transform 0.3s ease;
}
.bottom {
  width: 100%;
  height: 60rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 800;
  font-size: 40rpx;
  line-height: 60rpx;
  transform: rotate(270deg);
  position: absolute;
  top: 0;
  transition: opacity 3s ease;
}
.content {
  margin-top: 60rpx;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.text {
  width: 100%;
  font-weight: 400;
  font-size: 27rpx;
  display: flex;
  justify-content: flex-start;
  color: $font-color;
  margin-bottom: 1%;
}
.img-box {
  width: 90%;
  margin-top: 2%;
}
.input-box {
  width: 90%;
  margin-top: 2%;
}
.tap-box {
  width: 90%;
  margin-top: 3%;
  display: flex;
  flex-direction: column;
}
.tap {
  width: 100rpx;
  border-radius: 15rpx;
  background-color: $main-color;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 70rpx;
  flex-shrink: 0;
  font-size: 30rpx;
}
.btn-box {
  width: 90%;
  margin-top: 5%;
  display: flex;
  justify-content: space-between;
}
</style>
