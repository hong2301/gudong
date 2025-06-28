import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useBgmStore = defineStore(
    'bgm',
    () => {
        //// 响应式数据
        const index = ref(0)
        const curr = ref(0)


        //外部可访问
        return {
            index,
            curr
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
