import { IBasketModel, IBasketItem } from '../types/basket';
import { IProduct, ProductID } from '../types/product';
import { EventEmitter } from '../components/base/events';
import { AppEventType } from '../types/events';

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
        const existingItem = this.items.find(item => item.product.id === product.id);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.items.push({ product, quantity: 1 });
        }
        product.inBasket = true;
        this.events.emit(AppEventType.BASKET_ADD, product);
    }

    removeProduct(productId: ProductID): void {
        this.items = this.items.filter(item => item.product.id !== productId);
        const product = this.items.find(item => item.product.id === productId)?.product;
        if (product) {
            product.inBasket = false;
        }
        // Передаем объект с полем productId вместо строки
        this.events.emit(AppEventType.BASKET_REMOVE, { productId });
    }

    getTotal(): number {
        return this.items.reduce((total, item) => {
            return item.product.price ? total + item.product.price * item.quantity : total;
        }, 0);
    }

    clear(): void {
        this.items = [];
        this.events.emit(AppEventType.BASKET_CHECKOUT, {});
    }

    getProductIds(): ProductID[] {
        return this.items.map(item => item.product.id);
    }
}