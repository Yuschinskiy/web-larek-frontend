import { IBasketModel, IBasketItem } from '../../types/basket';
import { IProduct } from '../../types/product';
import { EventEmitter } from './events';
import { AppEventType } from '../../types/events';

export class BasketModel implements IBasketModel {
    private items: IBasketItem[] = [];
    private events: EventEmitter;

    constructor(events: EventEmitter) {
        this.events = events;
    }

    getItems(): IBasketItem[] {
        return this.items;
    }

    addProduct(product: IProduct): void {
        const existingItem = this.items.find(item => item.id === product.id);
        if (existingItem) {
            existingItem.count = (existingItem.count || 0) + 1;
        } else {
            this.items.push({
                id: product.id,
                title: product.title,
                price: product.price,
                count: 1
            });
        }
        product.inBasket = true;
        this.events.emit(AppEventType.BASKET_ADD, product);
    }

    removeProduct(productId: string): void {
        this.items = this.items.filter(item => item.id !== productId);
        this.events.emit(AppEventType.BASKET_REMOVE, { productId });
    }

    getTotal(): number {
        return this.items.reduce((total, item) => {
            return total + (item.price * (item.count || 1));
        }, 0);
    }

    clear(): void {
        this.items = [];
        this.events.emit(AppEventType.BASKET_CHECKOUT, {});
    }

    getProductIds(): string[] {
        return this.items.map(item => item.id);
    }

    getItemCount(productId: string): number {
        const item = this.items.find(item => item.id === productId);
        return item?.count || 0;
    }

    updateItemCount(productId: string, count: number): void {
        const item = this.items.find(item => item.id === productId);
        if (item) {
            item.count = count;
            if (count <= 0) {
                this.removeProduct(productId);
            }
        }
    }
}