import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { cartDishType } from '@/types/dish'

export const useCartStore = defineStore(
    'cart',
    () => {
        const rows = ref<cartDishType[]>([])
        const overRows = ref<cartDishType[]>([])

        // 添加
        const add = (data: cartDishType) => {
            if (!Array.isArray(rows.value)) {
                rows.value = []
            }
            const findItem = rows.value.find(item => item.dishId === data.dishId)
            if (findItem) {
                findItem.order++
            } else {
                rows.value.push(data)
            }
        }

        // 删除
        const del = (data: number | string) => {
            if (!Array.isArray(rows.value)) {
                rows.value = [];
            } else {
                const findItem = rows.value.find(item => item.dishId === data)
                if (findItem) {
                    findItem.order--
                }
            }
            rows.value = rows.value.filter(item => item.order !== 0);

        };

        // 清空
        const clear = () => {
            rows.value = []
            overRows.value = []
        }

        //外部可访问
        return {
            rows,
            add,
            del,
            clear,
            overRows
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
