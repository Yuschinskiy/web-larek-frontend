import { ApiClient } from '../components/base/ApiClient';
import { EventEmitter } from '../components/base/events';
import { ProductModel } from '../components/base/ProductModel';
import { BasketModel } from '../components/base/BasketModel';
import { OrderModel } from '../components/base/OrderModel';
import { CatalogView } from '../components/base/CatalogView';
import { AppEventType } from '../types/events';
import { IProduct, ProductID } from '../types/product';

// Экспортируем интерфейс IAppPresenter
export interface IAppPresenter {
    initialize(): void;
}

// Реализация класса AppPresenter
export class AppPresenter implements IAppPresenter {
    private events: EventEmitter; // Слушатель событий
    private apiClient: ApiClient; // Класс для работы с API
    private productModel: ProductModel; // Модель для работы с продуктами
    private basketModel: BasketModel; // Модель для работы с корзиной
    private orderModel: OrderModel; // Модель для работы с заказами
    private catalogView: CatalogView; // Представление каталога

    constructor(baseUrl: string) {
        this.events = new EventEmitter(); // Инициализация слушателя событий
        this.apiClient = new ApiClient(baseUrl); // Инициализация API клиента
        this.productModel = new ProductModel(this.events); // Инициализация модели продуктов
        this.basketModel = new BasketModel(this.events); // Инициализация модели корзины
        this.orderModel = new OrderModel(this.events); // Инициализация модели заказов
        this.catalogView = new CatalogView('#catalog-container', this.events); // Инициализация представления каталога
        this.initialize(); // Вызов метода инициализации
    }

    // Метод инициализации
    initialize(): void {
        this.loadProducts(); // Загрузка продуктов
        this.setupEventListeners(); // Настройка слушателей событий
    }

    // Метод для загрузки продуктов
    private async loadProducts(): Promise<void> {
        try {
            const products = await this.apiClient.fetchProducts(); // Получаем продукты из API
            this.productModel.setProducts(products); // Устанавливаем продукты в модель
            this.catalogView.render(products); // Рендерим продукты в представлении каталога
        } catch (error) {
            console.error('Ошибка загрузки товаров:', error); // Обработка ошибок
        }
    }

    // Метод для настройки слушателей событий
    private setupEventListeners(): void {
        // Слушатель события клика по продукту
        this.events.on<IProduct>(AppEventType.CATALOG_ITEM_CLICK, (product) => {
            console.log('Product clicked:', product); // Логируем клик
        });

        // Слушатель события добавления продукта в корзину
        this.events.on<IProduct>(AppEventType.BASKET_ADD, (product) => {
            this.basketModel.addProduct(product); // Добавляем продукт в корзину
            this.catalogView.updateProductState(product.id, true); // Обновляем состояние продукта в представлении
        });

        // Слушатель события удаления продукта из корзины
        this.events.on<{ productId: ProductID }>(AppEventType.BASKET_REMOVE, (data) => {
            this.basketModel.removeProduct(data.productId); // Удаляем продукт из корзины
            this.catalogView.updateProductState(data.productId, false); // Обновляем состояние продукта в представлении
        });
    }
}