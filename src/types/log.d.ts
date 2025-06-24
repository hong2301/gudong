import type { dishType } from "./dish.d.ts"

export interface logType {
    id: string,
    orderId: string,
    time: string,
    imgSrc: string,
    describe: strnig,
    userName?: string,
}

export interface orderType {
    orderId: string,
    time: string,
    dishs: dishType[],
    status: number,
    userName: string,
}
