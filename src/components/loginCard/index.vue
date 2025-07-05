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
    <view v-if="mainBtn === 2" class="content">
      <view v-if="!passwordBtn" class="title"
        >取一个喜欢的昵称，让我们认识!</view
      >
      <view v-else class="title">就差最后一步啦!</view>
      <view class="input-box">
        <u-input
          class="input"
          placeholder="请输入昵称"
          clearable
          maxlength="10"
          border="surround"
          v-model="name"
        >
        </u-input>
      </view>
      <view v-if="passwordBtn" class="input-box1">
        <u-input
          class="input"
          type="password"
          placeholder="请输入密码"
          clearable
          :color="passwordColor"
          maxlength="10"
          border="surround"
          v-model="password"
        >
        </u-input>
      </view>
      <view v-if="passwordBtn" class="btn-box">
        <up-button
          text="确定"
          type="primary"
          color="rgb(239, 156, 82)"
          style="margin-right: 5%"
          :loading="loading"
          :disabled="loading"
          @tap="deter"
        ></up-button>
        <up-button
          type="primary"
          color="rgb(239, 156, 82)"
          :plain="true"
          text="返回"
          @tap="back"
        ></up-button>
      </view>
      <view v-else class="btn-box">
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
          @tap="canel"
        ></up-button>
      </view>
    </view>
    <view
      v-if="mainBtn === 1"
      class="content1"
      :style="{ marginBottom: `${tailHeight + 10}px` }"
    >
      <view class="btn-box1">
        <up-button text="退出" @tap="out"></up-button>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useUserStore } from "@/stores/user";

const props = defineProps({
  btn: {
    type: Number,
    default: 0,
  },
});
const emit = defineEmits(["update:btn"]);
// 尾巴高度
const tailHeight = ref<number>(
  uni.getWindowInfo().screenHeight - uni.getWindowInfo().safeArea.bottom
);
const mainBtn = ref(0);
const name = ref("");
const password = ref("");
const passwordBtn = ref(false);
// 用户存储
const userStore = useUserStore();
// 密码颜色
const passwordColor = ref("");
// 加载中
const loading = ref(false);

// 确认密码
const deter = () => {
  loading.value = true;
  uniCloud
    .callFunction({
      name: "userLogin",
      data: {
        name: name.value,
        passWord: password.value,
      },
    })
    .then((res) => {
      loading.value = false;
      if (res.result.status === 3) {
        mainBtn.value = 0;
        passwordBtn.value = false;
        userStore.userInfo = res.result.data;
        uni.showToast({
          title: "搞定", // 提示内容
          icon: "success", // 图标（success/loading/none）
          duration: 2000, // 显示时长（ms），默认1500
          mask: false, // 是否显示透明蒙层，防止触摸穿透
        });
        uni.$emit("login", true);
      } else {
        passwordColor.value = "red";
        setTimeout(() => {
          passwordColor.value = "";
          password.value = "";
        }, 500);
      }
    });
};
// 返回
const back = () => {
  passwordBtn.value = false;
};
// ok
const ok = () => {
  loading.value = true;
  uniCloud
    .callFunction({
      name: "userLogin",
      data: {
        name: name.value,
      },
    })
    .then((res) => {
      loading.value = false;
      if (res.result.status === 1) {
        passwordBtn.value = true;
      } else if (res.result.status === 2 || res.result.status === 3) {
        mainBtn.value = 0;
        userStore.userInfo = res.result.data;
        uni.showToast({
          title: "搞定", // 提示内容
          icon: "success", // 图标（success/loading/none）
          duration: 2000, // 显示时长（ms），默认1500
          mask: false, // 是否显示透明蒙层，防止触摸穿透
        });
        mainBtn.value = 0;
        uni.$emit("login", true);
      }
    });
};
// 取消
const canel = () => {
  name.value = "";
  tapBottom();
};
// 点击mask
const tapMask = () => {
  mainBtn.value = 0;
};
// 点击关闭
const tapBottom = () => {
  mainBtn.value = 0;
};
// 退出
const out = () => {
  userStore.out();
  uni.$emit("login", false);
  mainBtn.value = 2;
  passwordBtn.value = false;
  password.value = "";
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
  margin-top: 120rpx;
  margin-bottom: 300rpx;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.content1 {
  margin-top: 120rpx;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.title {
  width: 100%;
  display: flex;
  justify-content: center;
  font-size: 35rpx;
  font-weight: 600;
}
.input-box {
  width: 70%;
  margin-top: 10%;
}
.input-box1 {
  width: 70%;
  margin-top: 5%;
}
.btn-box {
  width: 70%;
  margin-top: 5%;
  display: flex;
  justify-content: space-between;
}
.btn-box1 {
  width: 90%;
  margin-top: 5%;
  display: flex;
  justify-content: space-between;
}
</style>
