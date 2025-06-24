import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { logType } from '@/types/log'

export const useLogStore = defineStore(
    'log',
    () => {
        //// 响应式数据
        const rows = ref<logType[]>()


        //外部可访问
        return {
            rows,
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
