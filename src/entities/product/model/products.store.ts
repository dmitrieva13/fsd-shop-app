import { makeAutoObservable, runInAction } from 'mobx';
import type { Product } from './types';
import { apiGet } from  '@/shared/api';
import type { RootStore } from '@/app/providers/root.store';

export class ProductStore {
    products: Product[] = [];
    isLoading: boolean = false;
    searchStr: string = '';
    rootStore: RootStore;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
        makeAutoObservable(this, { rootStore: false });
    }

    getProduct (id: string) {
        const product = this.products.find(p => p.id === id);
        return product;
    }

    setSearchStr (value: string) {
        this.searchStr = value;
    }

    async fetchProducts() {
        this.isLoading = true;

        try {
            const data = await apiGet<Product[]>('/products');
            await new Promise(resolve => setTimeout(resolve, 500));

            runInAction(() => this.products = data);
            
        } catch (err) {
            console.log(err);
        }
        finally {
            runInAction(() => this.isLoading = false);
        }
    }

    get filteredProducts(): Product[] {
        const str = this.searchStr.toLowerCase().trim();
        if (!str) return this.products;
        
        return this.products.filter((p) => p.name.toLowerCase().includes(str));
    }
}