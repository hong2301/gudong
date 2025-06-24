import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { infoType } from '@/types/user'

export const useUserStore = defineStore(
    'user',
    () => {
        // 是否第一次访问
        const isFirst = ref(true)
        // 用户数据库
        const userRows = ref<infoType[]>([{
            id: "1",
            name: "刘慧",
            profile: "/static/shouye.png",
            startText: "是小宝! 是小宝!",
            role: 1,
            eatNum: 5,
            writeNum: 0,
            passWord: '88888888'
        }, {
            id: "1",
            name: "李泽枫",
            profile: "/static/shouye.png",
            startText: "欢迎老大",
            role: 1,
            eatNum: 5,
            writeNum: 0,
            passWord: '88888888'
        }
        ])
        // 用户信息
        const userInfo = ref<infoType>({
            id: "",
            name: "",
            profile: "",
            startText: "",
            role: -1,
            eatNum: 0,
            writeNum: 0,
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
            if (userInfo.value.name === '' || !userInfo.value || userInfo.value.role === -1) {
                return false
            }
            return true
        }

        /**
         * 配对
         * @param name 要配对的名字
         * @returns 1-有密码 2-没有该用户直接跳过 3-无密码直接跳过
         */
        const pair = (name: string) => {
            const userItem = userRows.value.filter(item => item.name === name)
            if (userItem.length !== 0) {
                // 检查是否有密码
                if (userItem[0].passWord && userItem[0].passWord !== "") {
                    return 1
                } else {
                    userInfo.value = userItem[0]
                    return 3
                }

            } else {
                userRows.value.push({
                    id: `${userRows.value.length}`,
                    name: name,
                    profile: "/static/shouye.png",
                    startText: "",
                    role: 1,
                    eatNum: 0,
                    writeNum: 0,
                    passWord: '88888888'
                })
                return 2
            }
        }

        /**
         * 输入密码登陆
         */
        const loginAndPassword = (name: string, password: string): boolean => {
            const result = userRows.value.some(item =>
                item.name === name && item.passWord === password
            );
            if (result) {
                userRows.value.forEach(item => {
                    if (item.name === name) {
                        userInfo.value = item
                    }
                })
            }
            return result
        };

        // 退出登陆
        const out = () => {
            userInfo.value = {
                id: "",
                name: "",
                profile: "",
                startText: "",
                role: -1,
                eatNum: 0,
                writeNum: 0,
            }
        }

        //外部可访问
        return {
            getFirst,
            isFirst,
            userInfo,
            isLogin,
            pair,
            loginAndPassword,
            out
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
