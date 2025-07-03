import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { tapType } from '@/types/dish'

export const useMenuStore = defineStore(
    'menu',
    () => {
        const data = ref<tapType[]>([])

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
        const add = (id: number | string, tapText: string) => {
            data.value.forEach(tItem => {
                if (tapText === tItem.text) {
                    tItem.dish?.forEach(dItem => {
                        if (id === dItem._id) {
                            dItem.order++
                            tItem.order++
                        }
                    })
                }

            })
        }
        // 删除
        const del = (id: number | string, tapText: string) => {
            data.value.forEach(tItem => {
                if (tapText === tItem.text) {
                    tItem.dish?.forEach(dItem => {
                        if (id === dItem._id) {
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
                }

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
                const preIndex = index - 1
                item.tapTopValue = index * rpxRPx * 170
                if (preIndex >= 0) {
                    const targetItem = data.value[index]
                    const preItem = data.value[preIndex]
                    const itemNum = targetItem?.dish?.length ?? 0
                    item.topValue = (preItem?.bottomValue ?? 0)
                    item.bottomValue = item.topValue + 14 + 87 * itemNum
                } else {
                    const targetItem = data.value[index]
                    const itemNum = targetItem?.dish?.length ?? 0
                    item.topValue = 0
                    item.bottomValue = 30 * rpxRPx + (150 * rpxRPx + capsuleRightInterval * 2) * itemNum
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
