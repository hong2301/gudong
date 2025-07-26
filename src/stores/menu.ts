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

        // 查找目标菜品（提取公共方法）
        const findDish = (id: number | string) => {
            for (const tItem of data.value) {
                const dish = tItem.dish?.find(dItem => dItem._id === id)
                if (dish) return { dish, tap: tItem } // 返回找到的菜品和所属分类
            }
            return null
        }

        // 添加
        const add = (id: number | string) => {
            const target = findDish(id)
            if (target) {
                target.dish.order++
                target.tap.order++
            }
        }

        // 删除
        const del = (id: number | string) => {
            const target = findDish(id)
            if (target) {
                target.dish.order = Math.max(0, target.dish.order - 1)
                target.tap.order = Math.max(0, target.tap.order - 1)
            }
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
                // 右边菜单的格子高度
                item.tapTopValue = index * rpxRPx * 170
                // 如果上一个索引值大于等于0，就说明不是第一个
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
                    item.bottomValue = item.topValue + 14 + 87 * itemNum
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
