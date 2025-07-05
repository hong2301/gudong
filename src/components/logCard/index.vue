<template>
  <view v-if="mainBtn || mainBtn === 3" class="mask" @tap="tapMask"></view>
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
    <view class="content" :style="{ marginBottom: `${tailHeight + 30}px` }">
      <view v-if="mainBtn !== 3" class="img-box">
        <FileUpload ref="upRef"></FileUpload>
      </view>
      <view v-else class="img-box1">
        <image
          class="img"
          :src="imgSrc || '/static/load.jpeg'"
          mode="heightFix"
          @click="clickImg(imgSrc)"
        />
      </view>
      <view class="time-box">
        <picker v-if="mainBtn !== 3" class="date" mode="date" @change="Picker"
          >{{ today.year }} 年 - {{ today.month }} 月 - {{ today.day }}
        </picker>
        <picker v-else mode="date" @change="Picker"
          >{{ today.year }} 年 - {{ today.month }} 月 - {{ today.day }}
        </picker>
      </view>
      <view class="input-box">
        <up-textarea
          v-if="mainBtn !== 3"
          v-model="logText"
          placeholder="请输入日志内容"
          count
          autoHeight
          :maxlength="50"
        ></up-textarea>
        <view v-else class="input-box1">
          {{ logText }}
        </view>
      </view>

      <view v-if="mainBtn !== 3" class="btn-box">
        <up-button
          text="完成"
          type="primary"
          color="rgb(239, 156, 82)"
          style="margin-right: 5%"
          :loading="loading"
          :disabled="loading"
          size="small"
          @tap="ok"
        ></up-button>
        <up-button
          type="primary"
          color="rgb(239, 156, 82)"
          :plain="true"
          text="取消"
          size="small"
          :loading="loading"
          :disabled="loading"
          @tap="cancel"
        ></up-button>
      </view>
      <view v-else class="btn-box">
        <up-button
          v-if="userId === userStore.userInfo._id"
          type="warning"
          :plain="true"
          size="small"
          text="删除"
          style="margin-right: 5%"
          @tap="delLog"
        ></up-button>
        <up-button size="small" text="关 闭" @tap="cancel"></up-button>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import FileUpload from "@/components/fileUpload/index.vue";
import { useUserStore } from "@/stores/user";
import { formatTimestampToDate } from "@/utils/time";

const props = defineProps({
  btn: {
    type: Number,
    default: 0,
  },
  time: {
    type: Number,
    default: 0,
  },
  orderId: {
    type: String,
    default: "",
  },
  logId: {
    type: String,
    default: "",
  },
});

const userStore = useUserStore();
const emit = defineEmits(["update:btn", "updated"]);

// 上传组件
const upRef = ref();
// 加载
const loading = ref(false);
// 尾巴高度
const tailHeight = ref<number>(
  uni.getWindowInfo().screenHeight - uni.getWindowInfo().safeArea.bottom
);
const mainBtn = ref(0);
const logText = ref("");
const today = ref<{
  year: number;
  month: number;
  day: number;
}>({
  year: new Date().getFullYear(),
  month: new Date().getMonth() + 1, // 月份是 0-11，所以要 +1
  day: new Date().getDate(),
});
// 点击上传的时间戳
let timestamp = Date.now();
// 图片
const imgSrc = ref("");
// 用户id
const userId = ref("");

// 预览图片
const clickImg = (src: string) => {
  uni.previewImage({
    current: 0, // 当前显示的图片
    urls: [src],
    fail: (err) => {
      console.error("预览失败:", err);
    },
  });
};

// 点击mask
const tapMask = () => {
  mainBtn.value = 0;
};
// 点击关闭
const tapBottom = () => {
  mainBtn.value = 0;
};

// 时间选择器
const Picker = (event: { detail: { value: string } }) => {
  let temp = event.detail.value;
  today.value.year = Number(temp.split("-")[0]);
  today.value.month = Number(temp.split("-")[1]);
  today.value.day = Number(temp.split("-")[2]);
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  // 3. 组合成完整日期对象
  const fullDate = new Date(
    today.value.year,
    today.value.month - 1,
    today.value.day,
    hours,
    minutes,
    seconds
  );

  // 4. 计算时间戳（毫秒）
  timestamp = fullDate.getTime();
};

// ok
const ok = async () => {
  loading.value = true;
  const { curr } = await upRef.value.trueUpload();
  uniCloud
    .callFunction({
      name: "logAdd",
      data: {
        time: props.orderId !== "" ? props.time : timestamp,
        imgSrc: curr,
        describe: logText.value,
        userName: userStore.userInfo.name,
        userId: userStore.userInfo._id,
        orderId: props.orderId,
      },
    })
    .then((res) => {
      loading.value = true;
      uni.showToast({
        title: "搞定", // 提示内容
        icon: "success", // 图标（success/loading/none）
        duration: 2000, // 显示时长（ms），默认1500
        mask: false, // 是否显示透明蒙层，防止触摸穿透
      });
      mainBtn.value = 0;
      uni.$emit("log");
      emit("updated", { logId: res.result.id });
    });
};

// 删除日志
const delLog = () => {
  uniCloud
    .callFunction({
      name: "logDel",
      data: {
        logId: props.logId,
      },
    })
    .then((res) => {
      cancel();
      uni.$emit("log");
      emit("updated", { logId: "" });
    });
};

// 取消
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
  () => props.time,
  (value) => {
    if (props.logId === "") {
      const { year, month, day } = formatTimestampToDate(value);
      today.value.year = year;
      today.value.month = month;
      today.value.day = day;
    }
  }
);
watch(
  () => mainBtn.value,
  (value) => {
    emit("update:btn", value);
  }
);
watch(
  () => props.logId,
  (value) => {
    uniCloud
      .callFunction({
        name: "logGetById",
        data: {
          logId: value,
        },
      })
      .then((res) => {
        userId.value = res.result[0].userId;
        logText.value = res.result[0].describe;
        imgSrc.value = res.result[0].imgSrc;
        const { year, month, day } = formatTimestampToDate(res.result[0].time);
        today.value.year = year;
        today.value.month = month;
        today.value.day = day;
      });
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
  margin-top: 70rpx;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.img-box {
  width: 90%;
  margin-top: 5%;
  height: 150rpx;
}
.img-box1 {
  width: 90%;
  margin-top: 5%;
  height: 300rpx;
}
.img {
  height: 100%;
}
.time-box {
  width: 90%;
  margin-top: 5%;
  padding-left: 1%;
  display: flex;
}
.date {
  border-bottom: 5rpx dashed $main-color;
}
.input-box {
  width: 90%;
  margin-top: 5%;
}
.input-box1 {
  width: 90%;
  font-size: 25rpx;
}
.btn-box {
  width: 90%;
  margin-top: 5%;
  display: flex;
  justify-content: space-between;
}
</style>
