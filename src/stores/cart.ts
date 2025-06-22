import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { cartDishType } from '@/types/dish'

export const useCartStore = defineStore(
    'cart',
    () => {
        const rows = ref<cartDishType[]>([])

        // 添加
        const add = (data: cartDishType) => {
            if (!Array.isArray(rows.value)) {
                rows.value = []
            }
            rows.value.push(data)
            console.log(rows.value)
        }
        // 删除
        const del = (data: cartDishType) => {
            if (!Array.isArray(rows.value)) {
                rows.value = [];
            } else {
                // 过滤掉 dishId 匹配的项
                rows.value = rows.value.filter(item => item.dishId !== data.dishId);
            }
        };
        // 清空
        const clear = () => {
            rows.value = []
        }

        //外部可访问
        return {
            rows,
            add,
            del,
            clear
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
