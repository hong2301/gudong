import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore(
  'counter',
  () => {
    //响应式数据
    const count = ref<number>(0)

    //定义方法
    function incerment() {
      count.value++
    }
    function decerment() {
      count.value--
    }

    //外部可访问
    return {
      count,
      incerment,
      decerment
    }
  },
  {
    //网页端配置
    //persist: true,
    //小程序端配置
    persist: {
      storage: {
        getItem(key: any) {
          return uni.getStorageSync(key)
        },
        setItem(key: any, value: any) {
          return uni.setStorageSync(key, value)
        }
      }
    }
  }
)
