export interface tapType {
    text: string,
    imgSrc: string,
    isNew: boolean,
    dish: dishType[]
}

export interface dishType {
    name: string,
    num: number | string,
    imgSrc: string

}