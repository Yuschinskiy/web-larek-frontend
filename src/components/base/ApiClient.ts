export class ApiClient {
    private baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    async fetchProducts(): Promise<any[]> {
        const response = await fetch(`${this.baseUrl}/products`);
        return response.json();
    }
}