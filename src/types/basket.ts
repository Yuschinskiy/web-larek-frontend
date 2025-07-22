// types/basket.ts
import { IProduct, ProductID } from './product';

export interface IBasket {
    items: IBasketItem[];
    total: number;
}

export interface IBasketItem {
    product: IProduct;
    quantity: number;
}

export interface IBasketModel {
    getItems(): IBasketItem[];
    addProduct(product: IProduct): void;
    removeProduct(productId: ProductID): void;
    getTotal(): number;
    clear(): void;
    getProductIds(): ProductID[];
}