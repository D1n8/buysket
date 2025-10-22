export interface IProduct{
    id: number,
    name: string,
    description: string,
    price: number,
    category_id?: number,
    seller_id?: number,
    images: string[]
}

export interface ICategory{
    id: number,
    name: string,
    parent_id: number
}