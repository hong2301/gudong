import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { logType } from '@/types/log'

export const useLogStore = defineStore(
    'log',
    () => {
        //// 响应式数据
        const rows = ref<logType[]>([
            {
                id: "1",
                orderId: "1",
                time: "2025年6月15日",
                describe: "鸡腿肉太加分了",
                imgSrc: "/static/foods/荔枝鸡煲.jpeg",
            },
            {
                id: "2",
                orderId: "2",
                time: "2025年6月14日",
                describe: "牛肉有点腥味",
                imgSrc: "/static/foods/菠萝牛肉粒.jpeg",
            },
            {
                id: "3",
                orderId: "3",
                time: "2025年6月13日",
                describe: "咖喱咖喱",
                imgSrc: "/static/foods/咖喱鸡翅.jpeg",
            },
            {
                id: "4",
                orderId: "4",
                time: "2025年6月12日",
                describe: "挑虾线是一件很恐怖的事情",
                imgSrc: "/static/foods/白灼大虾.jpeg",
            },
        ])


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
