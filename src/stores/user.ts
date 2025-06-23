import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { infoType } from '@/types/user'

export const useUserStore = defineStore(
    'user',
    () => {
        // 是否第一次访问
        const isFirst = ref(true)
        // 用户信息
        const userInfo = ref<infoType>({
            id: "1",
            name: "刘慧",
            profile: "/static/shouye.png",
            startText: "是小宝! 是小宝!",
            role: 1
        })

        // 检查是否为第一次
        const getFirst = (pages: any, mode: boolean = false) => {
            if (isFirst.value || mode) {
                isFirst.value = false
                uni.redirectTo({
                    url: `/${pages[pages.length - 1].route}`
                })
                return true
            }
            return false
        }

        // 是否有登陆
        const isLogin = () => {
            if (userInfo.value.name === '' || !userInfo.value) {
                return false
            }
            return true
        }

        //外部可访问
        return {
            getFirst,
            isFirst,
            userInfo,
            isLogin
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
