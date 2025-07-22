import { EventEmitter } from './components/base/events';
import { Api } from './components/base/api';
import { BasketModel } from './models/BasketModel';
import { ProductModel } from './models/ProductModel';
import { OrderModel } from './models/OrderModel';
import { CatalogView } from './views/CatalogView';
import { AppEventType } from './types/events';
import { IProduct } from './types/product';

export class App {
    private events: EventEmitter;
    private api: Api;
    private productModel: ProductModel;
    private basketModel: BasketModel;
    private orderModel: OrderModel;
    private catalogView: CatalogView;

    constructor(baseUrl: string) {
        this.events = new EventEmitter();
        this.api = new Api(baseUrl);
        this.productModel = new ProductModel(this.events);
        this.basketModel = new BasketModel(this.events);
        this.orderModel = new OrderModel(this.events);
        this.catalogView = new CatalogView('#catalog-container', this.events);
        this.initialize();
    }

    initialize(): void {
        this.loadProducts();
        this.setupEventListeners();
    }

    private async loadProducts(): Promise<void> {
        try {
            const response = await this.api.get('/product') as { items: IProduct[] };
            const products = response.items.map(product => ({
                ...product,
                inBasket: false,
            }));
            this.productModel.setProducts(products);
            this.catalogView.render(products);
        } catch (error) {
            console.error('Ошибка загрузки товаров:', error);
        }
    }

    private setupEventListeners(): void {
        this.events.on(AppEventType.CATALOG_ITEM_CLICK, (product: IProduct) => {
            console.log('Product clicked:', product);
        });

        this.events.on(AppEventType.BASKET_ADD, (product: IProduct) => {
            this.basketModel.addProduct(product);
            this.catalogView.updateProductState(product.id, true);
        });

        this.events.on(AppEventType.BASKET_REMOVE, (data: { productId: string }) => {
            this.basketModel.removeProduct(data.productId);
            this.catalogView.updateProductState(data.productId, false);
        });
    }
}