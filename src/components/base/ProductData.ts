import { IProduct } from '../../types/product';
import { EventEmitter } from './events';

export class ProductData {
    private productList: IProduct[] = [];
    private events: EventEmitter;

    constructor(events: EventEmitter) {
        this.events = events;
    }

    setProductList(products: IProduct[]): void {
        this.productList = products;
    }

    getProductList(): IProduct[] {
        return this.productList;
    }

    getProductById(id: string): IProduct | undefined {
        return this.productList.find(product => product.id === id);
    }

    updateProductInBasketState(productId: string, inBasket: boolean): void {
        const product = this.getProductById(productId);
        if (product) {
            product.inBasket = inBasket;
        }
    }
}