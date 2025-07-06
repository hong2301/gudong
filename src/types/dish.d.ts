export interface tapType {
    _id: string | number,
    text: string,
    imgSrc: string,
    isNew: boolean,
    order: number,
    topValue?: number,
    bottomValue?: number,
    tapTopValue?: number,
    dish?: dishType[]
}

export interface dishType {
    _id: string | number,
    name: string,
    num: number | string,
    imgSrc: string,
    order: number,
    des?: string,
    isSearch?: boolean,
    updateLocation?: string,
    updateTime?: string,
    ways?: wayType[]
}

export interface wayType {
    _id: string | number,
    name: string,
    time: string,
    tests: string,
    isCheck?: boolean
}

export interface cartDishType {
    _id: string | number,
    name: string,
    dishImgSrc: string
    order: number
    text: string,
    num: number | string,
    tapImgSrc: string,
    isCheck: boolean
}

export interface orderType {
    _id: string,
    logId: string,
    time: string,
    dishs: dishType[],
    status: number,
    userName: string,
}