import type { dishType } from "./dish.d.ts"

export interface logType {
    logId: string,
    orderId: string,
    time: string,
    imgSrc: string,
    des: strnig
}

export interface orderType {
    orderId: string,
    time: string,
    dishs: dishType[],
    status: number
}
