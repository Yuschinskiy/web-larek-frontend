import { IProductListView, ProductID } from '../types/product';
import { IProduct } from '../types/product';
import { EventEmitter } from '../components/base/events';
import { AppEventType } from '../types/events';

export class CatalogView implements IProductListView {
    private container: HTMLElement;
    private events: EventEmitter;

    constructor(containerSelector: string, events: EventEmitter) {
        this.container = document.querySelector(containerSelector) as HTMLElement;
        if (!this.container) {
            throw new Error(`Container with selector ${containerSelector} not found`);
        }
        this.events = events;
    }

    render(products: IProduct[]): void {
        this.container.innerHTML = '';
        products.forEach(product => {
            const card = this.createProductCard(product);
            this.container.appendChild(card);
        });
    }

    updateProductState(productId: ProductID, inBasket: boolean): void {
        const card = this.container.querySelector(`[data-id="${productId}"]`);
        if (card) {
            const button = card.querySelector('button');
            if (button) {
                button.textContent = inBasket ? 'Убрать из корзины' : 'В корзину';
            }
        }
    }

    private createProductCard(product: IProduct): HTMLElement {
        const card = document.createElement('div');
        card.setAttribute('data-id', product.id);
        card.classList.add('product-card');
        card.innerHTML = `
            <img src="${product.image}" alt="${product.title}" />
            <h3>${product.title}</h3>
            <p>Цена: ${product.price ?? 'Бесплатно'}</p>
            <button>${product.inBasket ? 'Убрать из корзины' : 'В корзину'}</button>
        `;
        card.addEventListener('click', () => {
            this.events.emit(AppEventType.CATALOG_ITEM_CLICK, product);
        });
        return card;
    }
}