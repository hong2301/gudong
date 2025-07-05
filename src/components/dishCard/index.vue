<template>
  <view v-if="mainBtn" class="mask" @tap="tapMask"></view>
  <view
    class="overture"
    :style="{
      transform: `translateY(${mainBtn ? '0' : '100'}%)`,
      zIndex: `${mainBtn ? '999' : '9'}`,
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
        <FileUpload ref="upRef"></FileUpload>
      </view>
      <view class="input-box">
        <view class="text">名字</view>
        <up-input
          placeholder="请输入名字"
          border="surround"
          v-model="dishName"
        ></up-input>
      </view>
      <view class="input-box">
        <view class="text">描述</view>
        <up-input
          placeholder="请输入描述"
          border="surround"
          v-model="des"
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
          :loading="loading"
          :disabled="loading"
          @tap="ok"
        ></up-button>
        <up-button
          type="primary"
          color="rgb(239, 156, 82)"
          :plain="true"
          :loading="loading"
          :disabled="loading"
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
import type { dishType, tapType } from "@/types/dish";

const props = defineProps({
  btn: {
    type: Number,
    default: 0,
  },
});
const menuStore = useMenuStore();
const emit = defineEmits(["update:btn"]);
const dishName = ref("");
const mainBtn = ref(0);
const columns = ref(
  menuStore.data.map((item) => ({
    name: item.text,
    id: item._id,
  }))
);
const tapId = ref(columns.value[0].id);
const tap = ref(columns.value[0].name);
// 尾巴高度
const tailHeight = ref<number>(
  uni.getWindowInfo().screenHeight - uni.getWindowInfo().safeArea.bottom
);
// 描述
const des = ref("");
// 加载
const loading = ref(false);
// 上传组件
const upRef = ref();

// 点击mask
const tapMask = () => {
  mainBtn.value = 0;
};
// 点击关闭
const tapBottom = () => {
  mainBtn.value = 0;
};
// 选择器
const Picker = (event: { detail: { value: string } }) => {
  tapId.value = columns.value[Number(event.detail.value)].id;
  tap.value = columns.value[Number(event.detail.value)].name;
};

// ok
const ok = async () => {
  loading.value = true;
  const { curr } = await upRef.value.trueUpload();
  uniCloud
    .callFunction({
      name: "dishAdd",
      data: {
        name: dishName.value,
        imgSrc: curr,
        num: 0,
        order: 0,
        des: des.value,
        tapId: tapId.value,
      },
    })
    .then((res) => {
      loading.value = false;
      uni.showToast({
        title: "搞定", // 提示内容
        icon: "success", // 图标（success/loading/none）
        duration: 2000, // 显示时长（ms），默认1500
        mask: false, // 是否显示透明蒙层，防止触摸穿透
      });
      getMenu();
      mainBtn.value = 0;
    });
};

/**
 * 获取菜单
 */
const getMenu = () => {
  uni.$emit("menu", true);
};
const cancel = () => {
  mainBtn.value = 0;
};

watch(
  () => props.btn,
  (value) => {
    mainBtn.value = value;
    if (mainBtn.value) {
      dishName.value = "";
      des.value = "";
      tapId.value = columns.value[0].id;
      tap.value = columns.value[0].name;
    }
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
  border-radius: 40rpx 40rpx 0 0;
  transform: translateY(100%);
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
