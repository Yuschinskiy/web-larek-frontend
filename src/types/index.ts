// Тип идентификатора товара
export type ProductID = string;

// Товар в каталоге и в модальном окне
export interface IProduct {
    id: ProductID;
    title: string;
    description: string;
    image: string;
    category: string;
    price: number | null;
    inBasket?: boolean;
}

// Корзина с товарами
export interface IBasket {
    items: IBasketItem[];
    total: number;
}

export interface IBasketItem {
    product: IProduct;
    quantity: number;
}

export interface IBasketModel {
    getItems(): IBasketItem[];
    addProduct(product: IProduct): void;
    removeProduct(productId: ProductID): void;
    getTotal(): number;
    clear(): void;
    getProductIds(): ProductID[];
}

// Шаг 1 и 2 оформления заказа
export type PaymentOption = 'card' | 'cash';

export interface IOrderDelivery {
    payment: PaymentOption;
    address: string;
}

export interface IOrderContacts {
    email: string;
    phone: string;
}

export interface IOrderForm {
    products: IBasketItem[];
    total: number;
    delivery: IOrderDelivery;
    contacts: IOrderContacts;
}

export interface IOrderModel {
    setDelivery(delivery: IOrderDelivery): void;
    setContacts(contacts: IOrderContacts): void;
    validateDelivery(): boolean;
    validateContacts(): boolean;
    getOrderForm(products: IBasketItem[], total: number): IOrderForm;
}

// Интерфейс модального окна
export interface IModal {
    open(content: HTMLElement): void;
    close(): void;
    isOpen(): boolean;
}

// API клиент
export interface IApiClient {
    fetchProducts(): Promise<IProduct[]>;
    submitOrder(order: IOrderForm): Promise<{ id: string; status: string }>;
}

// Типы событий
export enum AppEventType {
    CATALOG_ITEM_CLICK = 'catalog:item-click',
    BASKET_OPEN = 'basket:open',
    BASKET_ADD = 'basket:add',
    BASKET_REMOVE = 'basket:remove',
    BASKET_CHECKOUT = 'basket:checkout',
    ORDER_DELIVERY_COMPLETE = 'order:delivery-complete',
    ORDER_CONTACTS_COMPLETE = 'order:contacts-complete',
    ORDER_SUBMIT = 'order:submit',
    ORDER_SUCCESS = 'order:success',
    MODAL_OPEN = 'modal:open',
    MODAL_CLOSE = 'modal:close',
}

export type AppEvent =
    | { type: AppEventType.CATALOG_ITEM_CLICK; payload: IProduct }
    | { type: AppEventType.BASKET_OPEN; payload?: never }
    | { type: AppEventType.BASKET_ADD; payload: IProduct }
    | { type: AppEventType.BASKET_REMOVE; payload: ProductID }
    | { type: AppEventType.BASKET_CHECKOUT; payload?: never }
    | { type: AppEventType.ORDER_DELIVERY_COMPLETE; payload: IOrderDelivery }
    | { type: AppEventType.ORDER_CONTACTS_COMPLETE; payload: IOrderContacts }
    | { type: AppEventType.ORDER_SUBMIT; payload: IOrderForm }
    | { type: AppEventType.ORDER_SUCCESS; payload?: never }
    | { type: AppEventType.MODAL_OPEN; payload: HTMLElement }
    | { type: AppEventType.MODAL_CLOSE; payload?: never };

// Интерфейсы для View
export interface IProductListView {
    render(products: IProduct[]): void;
    updateProductState(productId: ProductID, inBasket: boolean): void;
}

export interface IBasketView {
    render(items: IBasketItem[], total: number): void;
    show(): void;
    hide(): void;
}
