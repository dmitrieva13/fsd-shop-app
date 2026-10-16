import { makeAutoObservable, runInAction } from 'mobx';
import { apiGet } from  '@/shared/api';
import type { CartItem } from './types';
import { DISCOUNT_PERCENT, DISCOUNT_SUM_NEEDED } from '../config/constants';

interface ICartDependencies {
    productStore: {
        getProduct: (id: string) => {
            id: string,
            name: string,
            price: number,
            countLeft: number,
            imageUrl: string
            } | undefined;
    };
}

export class CartStore {
    items: CartItem[] = [];
    isLoading: boolean = false;
    dependencies: ICartDependencies;

    constructor(dependencies: ICartDependencies) {
        this.dependencies = dependencies;
        makeAutoObservable(this, { dependencies: false });
    }

    async fetchCartItems() {
        this.isLoading = true;

        try {
            const data = await apiGet<CartItem[]>('/cart');
            await new Promise(resolve => setTimeout(resolve, 500));

            runInAction(() => this.items = data);
            console.log(data)
            
        } catch (err) {
            console.log(err);
        }
        finally {
            runInAction(() => this.isLoading = false);
        }
    }

    getCartItem(productId: string) {
        const existing = this.items.find(item => item.product.id === productId);
        return existing;
    }

    hasCartItem(productId: string) {
        const existing = this.items.find(item => item.product.id === productId);
        return existing !== undefined;
    }

    addToCart(productId: string) {
        if (this.getCartItem(productId)) {
            this.increaseItem(productId);
            return;
        }

        const product = this.dependencies.productStore.getProduct(productId);
        if (!product) {
            throw new Error('no product with such id');
        }

        if (product.countLeft < 1) {
            throw new Error('out of stock');
        }

        this.items.push({ product, count: 1});
    }

    increaseItem(productId: string) {
        const product = this.dependencies.productStore.getProduct(productId);
        if (!product) {
            throw new Error('no product with such id');
        }

        const existing = this.items.find(item => item.product.id === productId);

        if (existing) {
            if (existing.count >= existing.product.countLeft) {
                throw new Error('max number reached');
            }
            existing.count += 1;
        } else {
            this.addToCart(productId);
        }
    }

    decreaseItem(productId: string) {
        const product = this.dependencies.productStore.getProduct(productId);
        if (!product) {
            throw new Error('no product with such id');
        }

        const existing = this.items.find(item => item.product.id === productId);

        if (existing) {
            if (existing.count === 1) {
                this.removeFromCart(productId);
            } else {
                existing.count -= 1;
            }
            
        } else {
            throw new Error('no such item in cart');
        }
    }

    removeFromCart(productId: string) {
        this.items = this.items.filter(item => item.product.id !== productId);
    }

    handleRemove(productId: string) {
        const existing = this.items.find(item => item.product.id === productId);
        if (existing) {
            existing.isCancelling = true;
            setTimeout(() => {
                if (existing.isCancelling) {
                    this.removeFromCart(productId);
                }
            }, 3000);
        } else {
            throw new Error('no such item in cart');
        }
    }

    cancelRemovingFromCart(productId: string) {
        const existing = this.items.find(item => item.product.id === productId);
        if (existing) {
            existing.isCancelling = false;
        } else {
            throw new Error('no such item in cart');
        }
    }

    get totalSum() {
        const total = this.items.reduce((acc, curr) => 
            acc + curr.product.price*curr.count, 0);

        return total;
    }

    get totalCount() {
        const total = this.items.reduce((acc, curr) => 
            acc + curr.count, 0);

        return total;
    }

    get isEmpty() {
        return this.items.length === 0;
    }

    get discount() {
        const discount = this.totalSum < DISCOUNT_SUM_NEEDED ? 0 : DISCOUNT_PERCENT;
        return discount;
    }

    get totalSumDiscount () {
        const sum = this.totalSum * ((100 - this.discount)/100);
        return sum;
    }
}