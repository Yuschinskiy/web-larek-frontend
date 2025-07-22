import { IProduct } from '../types/product';
import { EventEmitter } from '../components/base/events';
import { AppEventType } from '../types/events';

export class ProductModel {
    private products: IProduct[] = [];
    private events: EventEmitter;

    constructor(events: EventEmitter) {
        this.events = events;
    }

    setProducts(products: IProduct[]) {
        this.products = products;
        this.events.emit(AppEventType.CATALOG_ITEM_CLICK, this.products);
    }

    getProducts(): IProduct[] {
        return this.products;
    }

    getProductById(id: string): IProduct | undefined {
        return this.products.find(product => product.id === id);
    }
}