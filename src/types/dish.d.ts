export interface tapType {
    tapId: string,
    text: string,
    imgSrc: string,
    isNew: boolean,
    dish: dishType[]
}

export interface dishType {
    dishId: string,
    name: string,
    num: number | string,
    imgSrc: string
    order: number
}

export interface cartDishType {
    dishId: string,
    name: string,
    num: number | string,
    imgSrc: string
    order: number
    text: string,
    imgSrc: string,
}