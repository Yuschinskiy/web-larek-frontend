import { Api } from '../components/base/api';
import { IProduct } from './product';
import { IOrderForm } from './order';

export interface IApiClient {
    fetchProducts(): Promise<IProduct[]>;
    submitOrder(order: IOrderForm): Promise<{ id: string; status: string }>;
}

export class ApiClient implements IApiClient {
    private api: Api;

    constructor(baseUrl: string) {
        this.api = new Api(baseUrl);
    }

    async fetchProducts(): Promise<IProduct[]> {
        try {
            const response = await this.api.get('/product') as { items: IProduct[] };
            return response.items.map(product => ({
                ...product,
                inBasket: false,
            }));
        } catch (error) {
            console.error('Ошибка при получении продуктов:', error);
            throw error; // Пробрасываем ошибку дальше
        }
    }

    async submitOrder(order: IOrderForm): Promise<{ id: string; status: string }> {
        try {
            const response = await this.api.post('/order', order) as { id: string; status: string };
            return response;
        } catch (error) {
            console.error('Ошибка при отправке заказа:', error);
            throw error; // Пробрасываем ошибку дальше
        }
    }
}