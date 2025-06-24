<script setup lang="ts">
import { onLaunch, onShow, onHide } from "@dcloudio/uni-app";

onLaunch(() => {
  console.log("App Launch");
});
onShow(() => {
  console.log("App Show");
  // uniCloud
  //   .callFunction({
  //     name: "logAdd",
  //     data: {
  //       name: "123",
  //     },
  //   })
  //   .then((res) => {
  //     console.log(res);
  //   });
});
onHide(() => {
  console.log("App Hide");
});
</script>
<style lang="scss">
@import "uview-plus/index.scss";
</style>
