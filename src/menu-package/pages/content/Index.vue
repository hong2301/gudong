<template>
  <Layout>
    <view class="overture">
      <Head></Head>
      <view
        class="content"
        :style="{
          width: `${eleWidth1}px`,
          marginTop: `${capsuleRightInterval}px`,
        }"
      >
        <up-image
          :height="(3 / 4) * eleWidth1"
          :width="eleWidth1"
          :radius="15 * rpxRPx"
          :src="dishData.imgSrc || '/static/load.jpeg'"
          mode="aspectFill"
        >
          <template #error>
            <up-image
              :height="(3 / 4) * eleWidth1"
              :width="eleWidth1"
              :radius="15 * rpxRPx"
              src="/static/load.jpeg"
              mode="heightFix"
            />
          </template>
          <template v-slot:loading>
            <up-loading-icon color="rgb(239, 156, 82)"></up-loading-icon>
          </template>
        </up-image>
        <view class="title-box">
          <view class="title">{{ dishData.name }}</view>
          <view class="num-box">
            <view v-if="dishData.order !== 0" class="del-btn" @tap="delDish">
              -
            </view>
            <view class="item-num" v-if="dishData.order !== 0">{{
              dishData.order
            }}</view>
            <view class="add-btn" @tap="addDish"> + </view>
          </view>
        </view>
        <view
          v-if="dishData?.updateTime && dishData?.updateLocation"
          class="update-box"
        >
          上一次烹饪于 {{ formatTimestampToDate(dishData?.updateTime).str }}
        </view>
        <view class="tag-box">
          <view class="tag-box-content">
            <up-tag
              v-for="(wItem, wIndex) in dishData1.ways"
              :key="wIndex"
              :text="wItem.name"
              :plain="!wItem?.isCheck"
              class="tag"
              type="warning"
              size="medium"
              @click="tapTag(wIndex)"
            ></up-tag>
            <up-tag
              v-if="!isAddTag && userStore.userInfo.role === 1"
              text="添加"
              plain
              class="tag"
              type="warning"
              size="medium"
              @click="addTag"
            ></up-tag>
          </view>
        </view>
        <view v-if="tagTexts.length !== 0 && !isAddTag" class="tag-card">
          <view class="time">{{ wayTime }}</view>
          <view v-for="(tItem, tIndex) in tagTexts" :key="tIndex">
            {{ tItem }}
          </view>
        </view>
        <view v-if="isAddTag" class="input-box">
          <up-input
            placeholder="请输入标签"
            border="surround"
            v-model="wayTitle"
            clearable
            shape="circle"
            class="input"
          ></up-input>
          <up-input
            v-for="(wcItem, wcIndex) in wayContent"
            :key="wcIndex"
            :placeholder="`${wcIndex}. `"
            border="surround"
            clearable
            v-model="wayContent[wcIndex]"
            class="input"
          ></up-input>
          <up-button
            style="margin-top: 25rpx"
            type="warning"
            plain
            size="small"
            @tap="addContent"
            >添加</up-button
          >
        </view>
        <view v-if="isAddTag" class="btn-box">
          <up-button
            type="warning"
            size="small"
            style="margin-right: 25rpx"
            @tap="addTagOk"
            :loading="loading"
            :disabled="loading"
            >确定</up-button
          >
          <up-button
            type="warning"
            plain
            size="small"
            @tap="addTagCel"
            :loading="loading"
            :disabled="loading"
            >取消</up-button
          >
        </view>
        <view class="space"></view>
      </view>
    </view>
  </Layout>
</template>

<script setup lang="ts">
import Layout from "@/components/layouts/index.vue";
import { onShow, onLoad } from "@dcloudio/uni-app";
import { useCmdStore } from "@/stores/cmd";
import { useMenuStore } from "@/stores/menu";
import Head from "@/components/head/index.vue";
import { ref } from "vue";
import type { dishType } from "@/types/dish";
import { formatTimestampToDate, getNowTimeStr } from "@/utils/time";
import { useUserStore } from "@/stores/user";

// 用户存储
const userStore = useUserStore();
// 操作存储
const cmdStore = useCmdStore();
// 菜单存储
const menuStore = useMenuStore();
// 菜单信息
const dishData = ref<dishType>({});
// 菜单信息
const dishData1 = ref<dishType>({});
// 菜id
const dishId = ref("");
// 屏幕宽度
const areaWidth = uni.getWindowInfo().safeArea.width;
// rpx/px
const rpxRPx = areaWidth / 750;
// 胶囊右间隔
const capsuleRightInterval = ref<number>(
  uni.getWindowInfo().safeArea.right -
    uni.getMenuButtonBoundingClientRect().right
);
// 元素宽度
const eleWidth1 = ref<number>(areaWidth - 4 * capsuleRightInterval.value);
// 菜谱
const tagTexts = ref<string[]>([]);
// 添加菜谱
const isAddTag = ref(false);
// 菜谱详情
const wayContent = ref([""]);
// 菜谱标题
const wayTitle = ref("");
// 加载
const loading = ref(false);
// 菜谱时间
const wayTime = ref("");

// 换行
const addContent = () => {
  wayContent.value.push("");
};

// 完成菜谱添加
const addTagOk = () => {
  loading.value = true;
  wayContent.value = wayContent.value.map(
    (item, index) => `${index + 1}. ${item}`
  );
  console.log(wayContent.value);
  uniCloud
    .callFunction({
      name: "dishAddWay",
      data: {
        dishId: dishId.value,
        way: {
          name: wayTitle.value,
          tests: wayContent.value,
          time: Date.now(),
        },
      },
    })
    .then((res) => {
      loading.value = false;
      addTagCel();
      getDishContent();
    });
};

// 取消菜谱添加
const addTagCel = () => {
  wayContent.value = [""];
  wayTitle.value = "";
  isAddTag.value = false;
};

// 获取菜信息
const getDishContent = () => {
  // 菜上部分信息
  for (const tItem of menuStore.data) {
    const foundDish = tItem.dish?.find((dItem) => dItem._id === dishId.value);
    if (foundDish) {
      dishData.value = foundDish;
      break; // 找到后立即退出循环
    }
  }

  // 菜下部分信息
  uniCloud
    .callFunction({
      name: "dishGetById",
      data: {
        dishId: dishId.value,
      },
    })
    .then((res) => {
      dishData1.value = res.result[0];
      dishData1.value.ways?.forEach((wItem) => {
        wItem.isCheck = false;
      });
      if (dishData1?.value?.ways && dishData1?.value?.ways.length > 0) {
        dishData1.value.ways[0].isCheck = true;
        tagTexts.value = dishData1.value?.ways[0]?.tests;
        wayTime.value = formatTimestampToDate(dishData1.value.ways[0].time).str;
      }
    });
};

// 点击菜谱标签
const tapTag = (index: number) => {
  dishData1.value.ways?.forEach((wItem) => {
    wItem.isCheck = false;
  });
  dishData1.value.ways[index].isCheck = true;
  tagTexts.value = dishData1.value.ways[index].tests;
  wayTime.value = formatTimestampToDate(dishData1.value.ways[index].time).str;
};

// 添加菜谱
const addTag = () => {
  isAddTag.value = true;
};

// 减
const delDish = () => {
  menuStore.del(dishData.value._id);
};

// 加
const addDish = () => {
  menuStore.add(dishData.value._id);
};

onLoad((options) => {
  dishId.value = options.id;
});

onShow(() => {
  cmdStore.backBtnShow = true;
  getDishContent();
});
</script>

<style scoped lang="scss">
@import "../../../uni.scss";

.overture {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(
    to top,
    rgba(245, 241, 230, 1) 0%,
    rgba(245, 241, 230, 0.9) 50%,
    rgba(245, 241, 230, 0) 100%
  );
  position: relative;
  overflow: auto;
}
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.title-box {
  width: 98%;
  margin-top: 25rpx;
  display: flex;
  justify-content: space-between;
  height: 50rpx;
  align-items: center;
  font-weight: 800;
}
.tag-box {
  margin-top: 50rpx;
  width: 98%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.tag-box-content {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  overflow: auto;
}
.input-box {
  width: 98%;
}
.tag-card {
  width: 98%;
  margin-top: 25rpx;
  min-height: 200rpx;
  border-radius: 15rpx;
  background-color: white;
  box-shadow: 0 4rpx 15rpx rgba(0, 0, 0, 0.08); /* 添加阴影 */
  font-size: 30rpx;
  color: black;
  padding: 25rpx;
  box-sizing: border-box;
}
.time {
  color: $font-color1;
  font-size: 25rpx;
  border-bottom: 1rpx solid rgba(0, 0, 0, 0.1);
  margin-bottom: 12rpx;
}
.btn-box {
  width: 98%;
  margin-top: 25rpx;
  display: flex;
}
.input {
  margin-top: 25rpx;
}
.space {
  height: 500rpx;
  width: 100%;
}
.tag {
  margin-right: 25rpx;
  cursor: pointer;
  flex-shrink: 0;
}
.update-box {
  width: 98%;
  margin-top: 12rpx;
  display: flex;
  justify-content: space-between;
  height: 25rpx;
  align-items: center;
  color: $font-color1;
  font-size: 25rpx;
}
.title {
  font-size: 40rpx;
}
.num-box {
  height: 50rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.del-btn {
  width: 50rpx;
  height: 50rpx;
  aspect-ratio: 1;
  border: 1rpx solid $icon-bg-color;
  border-radius: 50%;
  color: black;
  display: flex;
  font-size: 40rpx;
  font-weight: 800;
  line-height: 50rpx;
  justify-content: center;
  align-items: center;
}
.item-num {
  margin-inline: 30rpx;
}
.add-btn {
  width: 50rpx;
  height: 50rpx;
  aspect-ratio: 1;
  background-color: $main-color;
  border-radius: 50%;
  color: white;
  display: flex;
  font-size: 40rpx;
  font-weight: 800;
  line-height: 50rpx;
  justify-content: center;
  align-items: center;
}
.add-btn:active {
  background-color: $main-color-active;
}
.tag-btn {
  width: 50rpx;
  height: 50rpx;
  aspect-ratio: 1;
  background-color: $main-color;
  border-radius: 50%;
  color: white;
  display: flex;
  font-size: 40rpx;
  font-weight: 800;
  line-height: 50rpx;
  justify-content: center;
  align-items: center;
}
.tag-btn:active {
  background-color: $main-color-active;
}
</style>
