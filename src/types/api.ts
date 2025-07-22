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
        const response = await this.api.get('/product') as { items: IProduct[] };
        return response.items.map(product => ({
            ...product,
            inBasket: false,
        }));
    }

    async submitOrder(order: IOrderForm): Promise<{ id: string; status: string }> {
        const response = await this.api.post('/order', order) as { id: string; status: string };
        return response;
    }
}