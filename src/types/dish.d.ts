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
    dishId: string | number,
    name: string,
    dishImgSrc: string
    order: number
    text: string,
    tapImgSrc: string,
    isCheck: boolean
}