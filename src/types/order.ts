export interface IOrder {
    payment: string;
    email: string;
    phone: string;
    address: string;
    total: number;
    items: string[];
}

export interface IOrderResult {
    id: string;
    total: number;
}

export interface IOrderData {
    getBasket(): TBasketItem[];
    addProduct(item: TBasketItem): void;
    deleteProduct(idProduct: string): void;
    getTotal(): number;
    setOrderField(field: keyof IOrder, value: string): void;
    validateOrder(): boolean;
    clearBasket(): void;
}