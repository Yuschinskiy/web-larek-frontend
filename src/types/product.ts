export type ProductID = string;

export interface IProduct {
    id: string;
    title: string;
    price: number;
    image: string;
    category?: string;
    description?: string;
    inBasket?: boolean;
}

export type TBasketItem = {
    id: string;
    title: string;
    price: number;
    count?: number;
};

export interface IProductListView {
    render(products: IProduct[]): void;
    updateProductState(productId: string, inBasket: boolean): void;
}