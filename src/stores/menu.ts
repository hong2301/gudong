import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { tapType } from '@/types/dish'

export const useMenuStore = defineStore(
    'menu',
    () => {
        const data = ref<tapType[]>([
            {
                tapId: 1,
                text: "招牌",
                imgSrc: "../../static/a3.png",
                isNew: true,
                order: 0,
                dish: [
                    {
                        dishId: 1,
                        name: "可乐鸡翅",
                        num: "5",
                        imgSrc: "../../static/foods/荔枝鸡煲.jpeg",
                        order: 0,
                    },
                    {
                        dishId: 2,
                        name: "荔枝鸡煲",
                        num: "1",
                        imgSrc: "../../static/foods/荔枝鸡煲.jpeg",
                        order: 0,
                    },
                ],
            },
            {
                tapId: 2,
                text: "素菜",
                imgSrc: "../../static/yumi.png",
                isNew: false,
                order: 0,
                dish: [
                    {
                        dishId: 3,
                        name: "可乐鸡翅",
                        num: "5",
                        imgSrc: "../../static/foods/荔枝鸡煲.jpeg",
                        order: 0,
                    },
                    {
                        dishId: 4,
                        name: "荔枝鸡煲",
                        num: "1",
                        imgSrc: "../../static/foods/荔枝鸡煲.jpeg",
                        order: 0,
                    },
                ],
            },
            {
                tapId: 3,
                text: "荤菜",
                imgSrc: "../../static/rou.png",
                isNew: false,
                order: 0,
                dish: [
                    {
                        dishId: 5,
                        name: "可乐鸡翅",
                        num: "5",
                        imgSrc: "../../static/foods/荔枝鸡煲.jpeg",
                        order: 0,
                    },
                    {
                        dishId: 6,
                        name: "荔枝鸡煲",
                        num: "1",
                        imgSrc: "../../static/foods/荔枝鸡煲.jpeg",
                        order: 0,
                    },
                ],
            },
            {
                tapId: 4,
                text: "海鲜",
                imgSrc: "../../static/xia.png",
                isNew: false,
                order: 0,
                dish: [
                    {
                        dishId: 7,
                        name: "可乐鸡翅",
                        num: "5",
                        imgSrc: "../../static/foods/荔枝鸡煲.jpeg",
                        order: 0,
                    },
                    {
                        dishId: 8,
                        name: "荔枝鸡煲",
                        num: "1",
                        imgSrc: "../../static/foods/荔枝鸡煲.jpeg",
                        order: 0,
                    },
                ],
            },
            {
                tapId: 5,
                text: "招牌",
                imgSrc: "../../static/a3.png",
                isNew: true,
                order: 0,
            },
            {
                tapId: 6,
                text: "素菜",
                imgSrc: "../../static/yumi.png",
                isNew: false,
                order: 0,
            },
            {
                tapId: 7,
                text: "荤菜",
                imgSrc: "../../static/rou.png",
                isNew: false,
                order: 0,
            },
            {
                tapId: 8,
                text: "海鲜",
                imgSrc: "../../static/xia.png",
                isNew: false,
                order: 0,
            },
            {
                tapId: 9,
                text: "招牌",
                imgSrc: "../../static/a3.png",
                isNew: true,
                order: 0,
            },
            {
                tapId: 10,
                text: "素菜",
                imgSrc: "../../static/yumi.png",
                isNew: false,
                order: 0,
            },
            {
                tapId: 11,
                text: "荤菜",
                imgSrc: "../../static/rou.png",
                isNew: false,
                order: 0,
            },
            {
                tapId: 12,
                text: "海鲜",
                imgSrc: "../../static/xia.png",
                isNew: false,
                order: 0,
            },
            {
                tapId: 13,
                text: "",
                imgSrc: "",
                isNew: false,
                order: 0,
            },
        ])

        // 清空选择
        const claer = () => {
            data.value.forEach(tItem => {
                tItem.dish?.forEach(dItem => {
                    dItem.order = 0
                })
            })
            return data.value
        }

        //外部可访问
        return {
            data,
            claer
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
