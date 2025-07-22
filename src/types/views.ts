// types/views.ts
import { IProduct, ProductID } from './product';
import { IBasketItem } from './basket';

export interface IProductListView {
    render(products: IProduct[]): void;
    updateProductState(productId: ProductID, inBasket: boolean): void;
}

export interface IBasketView {
    render(items: IBasketItem[], total: number): void;
    show(): void;
    hide(): void;
}

export interface IOrderDeliveryView {
    render(): void;
    show(): void;
    hide(): void;
    enableNextButton(): void;
    disableNextButton(): void;
}

export interface IOrderContactsView {
    render(): void;
    show(): void;
    hide(): void;
    enableSubmitButton(): void;
    disableSubmitButton(): void;
}