import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useCmdStore = defineStore(
    'cmd',
    () => {
        //// 响应式数据
        // 返回按钮显示开关
        const backBtnShow = ref<boolean>(false)
        // 返回按钮显示开关
        const searchBtnShow = ref<boolean>(false)
        // 音乐开关
        const bgmBtn = ref<boolean>(true)


        //外部可访问
        return {
            backBtnShow,
            searchBtnShow,
            bgmBtn
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
