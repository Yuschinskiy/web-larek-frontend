import { EventEmitter } from './components/base/events';
import { Api } from './components/base/api';
import { ProductData } from './components/base/ProductData';
import { OrderData } from './components/base/OrderData';
import { CatalogView } from './components/base/CatalogView';
import { AppEventType } from './types/events';
import { IProduct, TBasketItem } from './types/product';

export class App {
    private events: EventEmitter;
    private api: Api;
    private productData: ProductData;
    private orderData: OrderData;
    private catalogView: CatalogView;

    constructor(baseUrl: string) {
        this.events = new EventEmitter();
        this.api = new Api(baseUrl);
        this.productData = new ProductData(this.events);
        this.orderData = new OrderData(this.events);
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
            this.productData.setProductList(response.items);
            this.catalogView.render(this.productData.getProductList());
        } catch (error) {
            console.error('Ошибка загрузки товаров:', error);
        }
    }

    private setupEventListeners(): void {
        this.events.on(AppEventType.CATALOG_ITEM_CLICK, (product: IProduct) => {
            console.log('Product clicked:', product);
        });

        this.events.on(AppEventType.BASKET_ADD, (product: IProduct) => {
            const basketItem: TBasketItem = { 
                id: product.id, 
                title: product.title, 
                price: product.price 
            };
            this.orderData.addProduct(basketItem);
            this.productData.updateProductInBasketState(product.id, true);
            this.catalogView.updateProductState(product.id, true);
        });

        this.events.on(AppEventType.BASKET_REMOVE, (data: { productId: string }) => {
            this.orderData.deleteProduct(data.productId);
            this.productData.updateProductInBasketState(data.productId, false);
            this.catalogView.updateProductState(data.productId, false);
        });
    }
}