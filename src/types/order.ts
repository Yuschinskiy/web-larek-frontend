// types/order.ts
import { IBasketItem } from './basket';

export type PaymentOption = 'card' | 'cash' | '';

export interface IOrderDelivery {
    payment: PaymentOption;
    address: string;
}

export interface IOrderContacts {
    email: string;
    phone: string;
}

export interface IOrderForm {
    products: IBasketItem[];
    total: number;
    delivery: IOrderDelivery;
    contacts: IOrderContacts;
}

export interface IOrderModel {
    setDelivery(delivery: IOrderDelivery): void;
    setContacts(contacts: IOrderContacts): void;
    validateDelivery(): boolean;
    validateContacts(): boolean;
    getOrderForm(products: IBasketItem[], total: number): IOrderForm;
}