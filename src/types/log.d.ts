import type { dishType } from "./dish.d.ts"

export interface logType {
    _id: string,
    orderId: string,
    time: string,
    imgSrc: string,
    describe: string,
    userName?: string,
    userId: string
}

