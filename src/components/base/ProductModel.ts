import { IProduct } from '../../types/product';
import { EventEmitter } from './events';
import { IProductData } from '../../types/product';

export class ProductData implements IProductData {
    private productList: IProduct[] = [];
    private events: EventEmitter;

    constructor(events: EventEmitter) {
        this.events = events;
    }

    setProductList(items: IProduct[]): void {
        this.productList = items;
        this.events.emit('productList:changed', this.productList);
    }

    getProductList(): IProduct[] {
        return this.productList;
    }

    getProductById(id: string): IProduct {
        return this.productList.find(product => product.id === id);
    }
}