// types/events.ts
import { IProduct, ProductID } from './product';
import { IOrderDelivery, IOrderContacts, IOrderForm } from './order';

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

    export interface AppEventData {
    [AppEventType.BASKET_REMOVE]: { productId: string };
}