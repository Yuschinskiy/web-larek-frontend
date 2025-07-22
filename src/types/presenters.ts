import { ApiClient } from '../components/base/ApiClient';
import { EventEmitter } from '../components/base/events';
import { ProductModel } from '../models/ProductModel';
import { BasketModel } from '../models/BasketModel';
import { OrderModel } from '../models/OrderModel';
import { CatalogView } from '../views/CatalogView';
import { AppEventType } from '../types/events';
import { IProduct, ProductID } from '../types/product';

// Экспортируем интерфейс IAppPresenter
export interface IAppPresenter {
    initialize(): void;
}

export class AppPresenter implements IAppPresenter {
    private events: EventEmitter;
    private apiClient: ApiClient;
    private productModel: ProductModel;
    private basketModel: BasketModel;
    private orderModel: OrderModel;
    private catalogView: CatalogView;

    constructor(baseUrl: string) {
        this.events = new EventEmitter();
        this.apiClient = new ApiClient(baseUrl);
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
            const products = await this.apiClient.fetchProducts();
            this.productModel.setProducts(products);
            this.catalogView.render(products); // Добавляем рендеринг продуктов
        } catch (error) {
            console.error('Ошибка загрузки товаров:', error);
        }
    }

    private setupEventListeners(): void {
        this.events.on<IProduct>(AppEventType.CATALOG_ITEM_CLICK, (product) => {
            console.log('Product clicked:', product);
        });

        this.events.on<IProduct>(AppEventType.BASKET_ADD, (product) => {
            this.basketModel.addProduct(product);
            this.catalogView.updateProductState(product.id, true);
        });

        this.events.on<{ productId: ProductID }>(AppEventType.BASKET_REMOVE, (data) => {
            this.basketModel.removeProduct(data.productId);
            this.catalogView.updateProductState(data.productId, false);
        });
    }
}