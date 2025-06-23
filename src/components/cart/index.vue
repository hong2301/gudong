<template>
  <view class="overture">
    <view v-if="dishListShow" class="mask" @tap="tapMask"></view>
    <view
      class="dish-list"
      :style="{
        transform: `translateY(${dishListShow ? '0' : '100'}%)`,
      }"
    >
      <view class="dish-list-content">
        <view class="dish-list-head">
          <up-checkbox
            shape="circle"
            usedAlone
            size="16"
            v-model:checked="isAllChecked"
            activeColor="rgb(239, 156, 82)"
            @change="checkboxChange"
          />
          <up-icon class="" size="16" name="trash" @tap="clear"></up-icon>
        </view>
        <view class="dish-list-item">
          <view
            v-for="(rItem, rIndex) in filteredRows"
            :key="rIndex"
            class="dish-list-item-content"
          >
            <view class="item-check" @tap="checkboxChangeItem(rIndex)">
              <up-checkbox
                shape="circle"
                usedAlone
                size="15"
                v-model:checked="rItem.isCheck"
                activeColor="rgb(239, 156, 82)"
              />
            </view>
            <view class="item-img-box">
              <image
                class="item-img"
                :src="rItem.dishImgSrc"
                mode="heightFix"
              />
            </view>
            <view class="item-name">
              {{ rItem.name }}
            </view>
            <view class="item-num-box">
              <view
                v-if="rItem.order !== 0"
                class="del-btn"
                @tap="delDish(rIndex)"
              >
                -
              </view>
              <view class="item-num" v-if="rItem.order !== 0">{{
                rItem.order
              }}</view>
              <view class="add-btn" @tap="addDish(rIndex)"> + </view>
            </view>
          </view>
        </view>
      </view>
      <view
        class="space"
        :style="{
          height: `${(tailHeight - capsuleRightInterval) * 6}px`,
        }"
      ></view>
    </view>
    <view
      class="content"
      :style="{
        bottom: `${tailHeight}px`,
      }"
    >
      <Yier
        class="yier"
        ref="yierRef"
        :size="120"
        :font-size="40"
        :img-src="yierImgSrc"
        @tap="tapYier"
      ></Yier>
      <view class="dish-box" @tap="tapDish">
        <view
          v-for="(sItem, sIndex) in filteredStatus"
          :key="sIndex"
          class="dish-item"
        >
          <view v-if="sItem.order !== 0" class="dish-item-content">
            <image class="img" :src="sItem.imgSrc" mode="heightFix" />
            <viwe class="dish-text">{{ sItem.order }}</viwe>
          </view>
        </view>
      </view>
      <view class="btn" @tap="tapSend">吃这些</view>
    </view>
  </view>
</template>

<script setup lang="ts">
import Yier from "@/components/character/index.vue";
import { ref, computed, watch } from "vue";
import { onShow } from "@dcloudio/uni-app";
import { useCartStore } from "@/stores/cart";
import { useMenuStore } from "@/stores/menu";
import type { cartDishType, tapType } from "@/types/dish";

// 尾巴高度
const tailHeight = ref<number>(
  uni.getWindowInfo().screenHeight - uni.getWindowInfo().safeArea.bottom
);
// 胶囊右间隔
const capsuleRightInterval = ref<number>(
  uni.getWindowInfo().safeArea.right -
    uni.getMenuButtonBoundingClientRect().right
);
// 购物车存储
const cartStore = useCartStore();
// 菜单存储
const menuStore = useMenuStore();
// 一二图片
const yierImgSrc = ref("/menu-package/static/吃什么.png");
// 一二ref
const yierRef = ref();
// 购物车数据
const rows = ref<cartDishType[]>([]);
// 情况
const status = ref<tapType[]>([]);
// 购物车列表显示
const dishListShow = ref(false);
// 全选购物车
const allSel = ref(false);

// 点击一二
const tapYier = () => {
  console.log("点击一二");
};
// 提交
const tapSend = () => {
  if (filteredRows.value.length !== 0) {
    uni.vibrateShort();
    uni.navigateTo({
      url: "/menu-package/pages/over/index",
    });
  }
};
// 获取status
const getStatus = () => {
  status.value = [];
  status.value = menuStore.data.filter(
    (item) => item.order !== 0 && item.order
  );
};
// 点击mask
const tapMask = () => {
  close();
};
// 点击购物车
const tapDish = () => {
  rows.value = cartStore.rows;
  if (rows.value.length !== 0) {
    close();
  }
};
// 关闭
const close = () => {
  dishListShow.value = !dishListShow.value;
};
// 一二状态
const getYierStatus = () => {
  if (rows.value.length !== 0) {
    yierImgSrc.value = "/menu-package/static/开心.png";
  } else {
    yierImgSrc.value = "/menu-package/static/吃什么.png";
  }
};
// 全选按钮
const checkboxChange = () => {
  allSel.value = !allSel.value;
  rows.value.filter((item) => {
    item.isCheck = allSel.value;
  });
  cartStore.rows = rows.value;
};
// 选择项
const checkboxChangeItem = (index: number) => {
  rows.value[index].isCheck = !rows.value[index].isCheck;
  cartStore.rows = rows.value;
};

// 清除购物车
const clear = () => {
  rows.value = [];
  cartStore.rows = rows.value;
  menuStore.claer();
  status.value = [];
  getYierStatus();
  close();
};

// 删除
const delDish = (index: number) => {
  if (rows.value[index].order > 0) {
    rows.value[index].order--;
    menuStore.del(rows.value[index].dishId);
    uni.$emit("menu");
  } else {
    rows.value[index].order = 0;
  }
  if (filteredRows.value.length === 0) {
    status.value = [];
    rows.value = [];
    close();
    getYierStatus();
  }
  cartStore.rows = rows.value;
};
// 添加
const addDish = (index: number) => {
  rows.value[index].order++;
  cartStore.rows = rows.value;
  menuStore.add(rows.value[index].dishId);
  uni.$emit("menu");
};

//获取数据
uni.$on(
  "cart",
  function (data: { data: cartDishType | string | number; mode: number }) {
    if (data.mode === 1) {
      cartStore.add(data.data as cartDishType);
    } else {
      cartStore.del(data.data as string | number);
    }
    rows.value = cartStore.rows;
    getYierStatus();
    getStatus();
  }
);

onShow(() => {
  rows.value = cartStore.rows;
  getYierStatus();
  getStatus();
});
const filteredStatus = computed(() =>
  status.value.filter((item) => item.order !== 0)
);
const filteredRows = computed(() =>
  rows.value.filter((item) => item.order !== 0)
);
const isAllChecked = computed(() => {
  if (rows.value.length === 0) return false;
  allSel.value = rows.value.every((item) => item.isCheck === true);
  return allSel.value;
});
</script>

<style scoped lang="scss">
@import "../../uni.scss";

.overture {
  width: 100%;
  height: 100rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}
.mask {
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.1);
  top: 0;
  left: 0;
  z-index: 1;
}
.dish-list {
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: white;
  border-radius: 40rpx 40rpx 0 0;
  transition: transform 0.3s ease;
  z-index: 2;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}
.dish-list-content {
  width: 100%;
  border-radius: 30rpx 30rpx 0 0;
}
.dish-list-item {
  width: 100%;
  max-height: 1000rpx;
  display: flex;
  flex-direction: column;
  overflow: auto;
}
.dish-list-item-content {
  width: 100%;
  height: 150rpx;
  margin-bottom: 10rpx;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  position: relative;
}
.item-check {
  width: 15px;
  height: 100%;
  display: flex;
  align-items: center;
  margin-left: 30.5rpx;
  margin-right: 30.5rpx;
}
.item-img-box {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 30.5rpx;
}
.item-name {
  height: 80%;
  display: contents;
  align-items: center;
}
.item-num-box {
  position: absolute;
  height: 80%;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-right: 30.5rpx;
}
.del-btn {
  width: 40rpx;
  height: 40rpx;
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
  font-size: 30rpx;
}
.add-btn {
  width: 40rpx;
  height: 40rpx;
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
.item-img {
  height: 80%;
  border-radius: 15rpx;
}
.dish-list-head {
  height: 80rpx;
  background-color: rgb(243, 242, 242);
  border-radius: 30rpx 30rpx 0 0;
  position: relative;
  display: flex;
  flex: 1;
  align-items: center;
  padding-inline: 30rpx;
  justify-content: space-between;
}
.yier {
  position: absolute;
  top: -60%;
  left: -2%;
}
.space {
  min-height: 400rpx;
}
.content {
  position: relative;
  width: 93%;
  height: 70rpx;
  border-radius: 40rpx;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.5); /* 添加阴影 */
  background-color: rgb(50, 50, 50);
  display: flex;
  z-index: 999;
}
.dish-box {
  width: 50%;
  height: 100%;
  margin-left: 20%;
  overflow-x: auto;
  display: flex;
}
.dish-item {
  width: 80rpx;
  height: 100%;
  margin-right: 15rpx;
}
.dish-item-content {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
}
.btn {
  width: 25%;
  height: 100%;
  border-radius: 40rpx;
  background-color: $main-color;
  margin-left: auto;
  color: white;
  font-size: 30rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 70rpx;
  font-weight: 800;
}
.btn:active {
  background-color: $main-color-active;
}
.img {
  height: 90%;
  aspect-ratio: 1;
  display: flex;
  align-items: center;
}
.dish-text {
  font-size: 30rpx;
  color: white;
}
</style>
