import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useCartStore = defineStore(
    'cart',
    () => {
        const rows = ref([])

        //外部可访问
        return {
            rows
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
