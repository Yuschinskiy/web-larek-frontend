export interface IProduct {
    id: string;
    title: string;
    description: string;
    image: string;
    price: number | null;
    inBasket: boolean;
}

export type ProductID = string;

export interface IProductListView {
    render(products: IProduct[]): void;
    updateProductState(productId: ProductID, inBasket: boolean): void;
}