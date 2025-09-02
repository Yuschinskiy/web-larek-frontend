export interface IBasketItem {
    id: string;
    title: string;
    price: number;
    count?: number;
}

export interface IBasketModel {
    getItems(): IBasketItem[];
    addProduct(product: IProduct): void;
    removeProduct(productId: string): void;
    getTotal(): number;
    clear(): void;
    getProductIds(): string[];
    getItemCount(productId: string): number;
    updateItemCount(productId: string, count: number): void;
}

export type TBasketItem = IBasketItem;