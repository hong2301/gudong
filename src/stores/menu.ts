import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { tapType } from '@/types/dish'

export const useMenuStore = defineStore(
    'menu',
    () => {
        const data = ref<tapType[]>([
            {
                tapId: 't1',
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
                tapId: 't2',
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
                tapId: 't3',
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
                tapId: 't4',
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
                tapId: 't5',
                text: "招牌",
                imgSrc: "../../static/a3.png",
                isNew: true,
                order: 0,
            },
            {
                tapId: 't6',
                text: "素菜",
                imgSrc: "../../static/yumi.png",
                isNew: false,
                order: 0,
            },
            {
                tapId: 't7',
                text: "荤菜",
                imgSrc: "../../static/rou.png",
                isNew: false,
                order: 0,
            },
            {
                tapId: 't8',
                text: "海鲜",
                imgSrc: "../../static/xia.png",
                isNew: false,
                order: 0,
            },
            {
                tapId: 't9',
                text: "招牌",
                imgSrc: "../../static/a3.png",
                isNew: true,
                order: 0,
            },
            {
                tapId: 't10',
                text: "素菜",
                imgSrc: "../../static/yumi.png",
                isNew: false,
                order: 0,
            },
            {
                tapId: 't11',
                text: "荤菜",
                imgSrc: "../../static/rou.png",
                isNew: false,
                order: 0,
            },
            {
                tapId: 't12',
                text: "海鲜",
                imgSrc: "../../static/xia.png",
                isNew: false,
                order: 0,
            },
            {
                tapId: 't13',
                text: "",
                imgSrc: "",
                isNew: false,
                order: 0,
            },
        ])

        // 清空选择
        const claer = () => {
            data.value.forEach(tItem => {
                tItem.order = 0
                tItem.dish?.forEach(dItem => {
                    dItem.order = 0
                })
            })
            return data.value
        }
        // 添加
        const add = (id: number | string) => {
            data.value.forEach(tItem => {
                tItem.dish?.forEach(dItem => {
                    if (id === dItem.dishId) {
                        dItem.order++
                        tItem.order++
                    }
                })
            })
        }
        // 删除
        const del = (id: number | string) => {
            data.value.forEach(tItem => {
                tItem.dish?.forEach(dItem => {
                    if (id === dItem.dishId) {
                        if (dItem.order > 0) {
                            dItem.order--
                        } else {
                            dItem.order = 0
                        }
                        if (tItem.order > 0) {
                            tItem.order--
                        } else {
                            tItem.order = 0
                        }
                    }
                })
            })
        }

        //外部可访问
        return {
            data,
            claer,
            add,
            del
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
