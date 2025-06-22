export interface tapType {
    tapId: string | number,
    text: string,
    imgSrc: string,
    isNew: boolean,
    order: number
    dish?: dishType[]
}

export interface dishType {
    dishId: string | number,
    name: string,
    num: number | string,
    imgSrc: string
    order: number
}

export interface cartDishType {
    cartDishId: string | number,
    name: string,
    num: number | string,
    imgSrc: string
    order: number
    text: string,
    imgSrc: string,
}