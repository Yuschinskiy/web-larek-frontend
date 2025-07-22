import { IOrderModel, IOrderDelivery, IOrderContacts, IOrderForm } from '../types/order';
import { IBasketItem } from '../types/basket';
import { EventEmitter } from '../components/base/events';
import { AppEventType } from '../types/events';

export class OrderModel implements IOrderModel {
    private delivery: IOrderDelivery = { payment: 'card', address: '' };
    private contacts: IOrderContacts = { email: '', phone: '' };
    private events: EventEmitter;

    constructor(events: EventEmitter) {
        this.events = events;
    }

    setDelivery(delivery: IOrderDelivery): void {
        this.delivery = delivery;
        this.events.emit(AppEventType.ORDER_DELIVERY_COMPLETE, delivery);
    }

    setContacts(contacts: IOrderContacts): void {
        this.contacts = contacts;
        this.events.emit(AppEventType.ORDER_CONTACTS_COMPLETE, contacts);
    }

    validateDelivery(): boolean {
        return this.delivery.payment !== '' && this.delivery.address.trim() !== '';
    }

    validateContacts(): boolean {
        return this.contacts.email.trim() !== '' && this.contacts.phone.trim() !== '';
    }

    getOrderForm(products: IBasketItem[], total: number): IOrderForm {
        return {
            products,
            total,
            delivery: this.delivery,
            contacts: this.contacts,
        };
    }
}