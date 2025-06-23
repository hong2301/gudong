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
                dish: [
                    {
                        dishId: 9,
                        name: "可乐鸡翅",
                        num: "5",
                        imgSrc: "../../static/foods/荔枝鸡煲.jpeg",
                        order: 0,
                    },
                    {
                        dishId: 10,
                        name: "荔枝鸡煲",
                        num: "1",
                        imgSrc: "../../static/foods/荔枝鸡煲.jpeg",
                        order: 0,
                    },
                ],
            },
            {
                tapId: 't6',
                text: "素菜",
                imgSrc: "../../static/yumi.png",
                isNew: false,
                order: 0,
                dish: [
                    {
                        dishId: 11,
                        name: "可乐鸡翅",
                        num: "5",
                        imgSrc: "../../static/foods/荔枝鸡煲.jpeg",
                        order: 0,
                    },
                    {
                        dishId: 12,
                        name: "荔枝鸡煲",
                        num: "1",
                        imgSrc: "../../static/foods/荔枝鸡煲.jpeg",
                        order: 0,
                    },
                ],
            },
            {
                tapId: 't7',
                text: "荤菜",
                imgSrc: "../../static/rou.png",
                isNew: false,
                order: 0,
                dish: [
                    {
                        dishId: 13,
                        name: "可乐鸡翅",
                        num: "5",
                        imgSrc: "../../static/foods/荔枝鸡煲.jpeg",
                        order: 0,
                    },
                    {
                        dishId: 14,
                        name: "荔枝鸡煲",
                        num: "1",
                        imgSrc: "../../static/foods/荔枝鸡煲.jpeg",
                        order: 0,
                    },
                ],
            },
            {
                tapId: 't8',
                text: "海鲜",
                imgSrc: "../../static/xia.png",
                isNew: false,
                order: 0,
                dish: [
                    {
                        dishId: 15,
                        name: "可乐鸡翅",
                        num: "5",
                        imgSrc: "../../static/foods/荔枝鸡煲.jpeg",
                        order: 0,
                    },
                    {
                        dishId: 16,
                        name: "荔枝鸡煲",
                        num: "1",
                        imgSrc: "../../static/foods/荔枝鸡煲.jpeg",
                        order: 0,
                    },
                ],
            },
            {
                tapId: 't9',
                text: "招牌",
                imgSrc: "../../static/a3.png",
                isNew: true,
                order: 0,
                dish: [
                    {
                        dishId: 17,
                        name: "可乐鸡翅",
                        num: "5",
                        imgSrc: "../../static/foods/荔枝鸡煲.jpeg",
                        order: 0,
                    },
                    {
                        dishId: 18,
                        name: "荔枝鸡煲",
                        num: "1",
                        imgSrc: "../../static/foods/荔枝鸡煲.jpeg",
                        order: 0,
                    },
                ],
            },
            {
                tapId: 't10',
                text: "素菜",
                imgSrc: "../../static/yumi.png",
                isNew: false,
                order: 0,
                dish: [
                    {
                        dishId: 19,
                        name: "可乐鸡翅",
                        num: "5",
                        imgSrc: "../../static/foods/荔枝鸡煲.jpeg",
                        order: 0,
                    },
                    {
                        dishId: 20,
                        name: "荔枝鸡煲",
                        num: "1",
                        imgSrc: "../../static/foods/荔枝鸡煲.jpeg",
                        order: 0,
                    },
                ],
            },
            {
                tapId: 't11',
                text: "荤菜",
                imgSrc: "../../static/rou.png",
                isNew: false,
                order: 0,
                dish: [
                    {
                        dishId: 21,
                        name: "可乐鸡翅",
                        num: "5",
                        imgSrc: "../../static/foods/荔枝鸡煲.jpeg",
                        order: 0,
                    },
                    {
                        dishId: 22,
                        name: "荔枝鸡煲",
                        num: "1",
                        imgSrc: "../../static/foods/荔枝鸡煲.jpeg",
                        order: 0,
                    },
                ],
            },
            {
                tapId: 't12',
                text: "海鲜",
                imgSrc: "../../static/xia.png",
                isNew: false,
                order: 0,
                dish: [
                    {
                        dishId: 23,
                        name: "可乐鸡翅",
                        num: "5",
                        imgSrc: "../../static/foods/荔枝鸡煲.jpeg",
                        order: 0,
                    },
                    {
                        dishId: 24,
                        name: "荔枝鸡煲",
                        num: "1",
                        imgSrc: "../../static/foods/荔枝鸡煲.jpeg",
                        order: 0,
                    },
                ],
            },
            {
                tapId: 't13',
                text: "",
                imgSrc: "",
                isNew: false,
                order: 0,
                dish: [
                    {
                        dishId: 25,
                        name: "可乐鸡翅",
                        num: "5",
                        imgSrc: "../../static/foods/荔枝鸡煲.jpeg",
                        order: 0,
                    },
                    {
                        dishId: 26,
                        name: "荔枝鸡煲",
                        num: "1",
                        imgSrc: "../../static/foods/荔枝鸡煲.jpeg",
                        order: 0,
                    },
                ],
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
        // 获取数据
        const getData = () => {
            // 胶囊右间隔
            const capsuleRightInterval = uni.getWindowInfo().safeArea.right - uni.getMenuButtonBoundingClientRect().right
            // 屏幕宽度
            const areaWidth = uni.getWindowInfo().safeArea.width;
            // rpx/px
            const rpxRPx = areaWidth / 750
            data.value.forEach((item, index) => {
                const targetIndex = index - 1
                item.tapTopValue = index * rpxRPx * 170
                if (targetIndex >= 0) {
                    const targetItem = data.value[targetIndex]
                    const itemNum = targetItem?.dish?.length ?? 0
                    item.topValue = 24 * rpxRPx + (150 + capsuleRightInterval * 2 + 6) * rpxRPx * itemNum + targetItem.topValue
                } else {
                    item.topValue = 0
                }
            })
            return data.value
        }

        //外部可访问
        return {
            data,
            claer,
            add,
            del,
            getData
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
