import { IOrder, IOrderResult } from '../../types/order';
import { TBasketItem } from '../../types/product';
import { EventEmitter } from './events';
import { IOrderData } from '../../types/order';

export class OrderData implements IOrderData {
    private basket: TBasketItem[] = [];
    private order: IOrder = { payment: '', email: '', phone: '', address: '', total: 0, items: [] };
    private events: EventEmitter;

    constructor(events: EventEmitter) {
        this.events = events;
    }

    getBasket(): TBasketItem[] {
        return this.basket;
    }

    addProduct(item: TBasketItem): void {
        this.basket.push(item);
        this.order.items.push(item.id);
        this.updateTotal();
        this.events.emit('totalUpdated', this.getTotal());
    }

    deleteProduct(idProduct: string): void {
        this.basket = this.basket.filter(item => item.id !== idProduct);
        this.order.items = this.order.items.filter(id => id !== idProduct);
        this.updateTotal();
        this.events.emit('totalUpdated', this.getTotal());
    }

    getTotal(): number {
        return this.basket.reduce((total, item) => total + (item.price * (item.count || 1)), 0);
    }

    private updateTotal(): void {
        this.order.total = this.getTotal();
    }

    setOrderField(field: keyof IOrder, value: string): void {
        this.order[field] = value;
        this.events.emit(`order.${String(field)}:change`, value);
    }

    validateOrder(): boolean {
        return this.order.payment !== '' && this.order.address !== '';
    }

    clearBasket(): void {
        this.basket = [];
        this.order.items = [];
        this.order.total = 0;
    }
}