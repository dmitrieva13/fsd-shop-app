import React from 'react';
import type { Preview } from "@storybook/react";
import { StoreProvider } from '../src/shared/lib';
import type { CartStore } from '../src/entities/cart';
import type { ProductStore, Product } from '../src/entities/product';
import type { RootStore } from '../src/app/providers/root.store';
import { makeAutoObservable } from 'mobx';
import 'bootstrap/dist/css/bootstrap.min.css'
import '@/app/style/app.css';

const mockProductStore = {
    products: [],
    isLoading: false,
    searchStr: '',
    getProduct: (id: number): Product | undefined => {
        return undefined;
    }
} as unknown as ProductStore;

const mockCartStore = {
    totalSum: 0,
    totalCount: 0,
    totalSumDiscount: 0,
    items: []
} as unknown as CartStore;

export const mockRootStore: RootStore = {
    productStore: mockProductStore,
    cartStore: mockCartStore
};

export const mockProducts: Product[] = [
    { id: '1', name: 'Молоко', price: 85, countLeft: 28, imageUrl: 'https://static.vecteezy.com/system/resources/thumbnails/035/176/109/small/spectral-sophistication-blank-milk-bottle-mockup-on-transparent-background-free-png.png' },
    { id: '2', name: 'Сыр гауда', price: 180, countLeft: 8, imageUrl: '' },
    { id: '3', name: 'Сыр пармезан', price: 240, countLeft: 2, imageUrl: 'https://static.vecteezy.com/system/resources/thumbnails/046/013/741/small/realistic-photograph-of-cheese-on-transparency-background-png.png' },
    { id: '4', name: 'Хлеб', price: 75, countLeft: 0, imageUrl: 'https://static.vecteezy.com/system/resources/thumbnails/070/129/276/small/delicious-loaf-of-crusty-bread-golden-baked-food-on-transparent-background-png.png' },
];


export class observableMockCartStore {
    items: any[] = [];
    isLoading: boolean = false;
  
    constructor() {
        makeAutoObservable(this);
    }

    setItems = (items: any) => this.items = items;

    getProduct = (id: string) => {
        const existing = mockProducts.find(product => product.id === id);
        return existing;
    }
  
    hasCartItem = (id: string) => {
        const existing = this.items.find(item => item.product.id === id);
        return existing !== undefined;
    }
  
    getCartItem = (id: string) => {
        const existing = this.items.find(item => item.product.id === id);
        return existing;
    }
  
    addToCart = (id: string) => {
        if (!this.hasCartItem(id)) {
            const item = {
                product: this.getProduct(id),
                count: 1
            }
        this.items.push(item);
        }
    }
  
    increaseItem = (id: string) => {
        const item = this.getCartItem(id);
        if (item) {
            item.count += 1;
        }
    }
  
    decreaseItem = (id: string) => {
        const item = this.getCartItem(id);
        if (item) {
            if (item.count > 1) {
                item.count -= 1;
                return;
            }
            this.items = this.items.filter(item => item.product.id !== id);
        }
    }

    get isEmpty () { 
        return this.items.length === 0; 
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
        }
    }

    cancelRemovingFromCart(productId: string) {
        const existing = this.items.find(item => item.product.id === productId);
        if (existing) {
            existing.isCancelling = false;
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
};


const preview: Preview = {
    parameters: {
        controls: {
            matchers: {
            color: /(background|color)$/i,
            date: /Date$/i,
            },
        },
        layout: 'fullscreen'
    },
    decorators: [
        (Story) => (
        <StoreProvider value={mockRootStore}>
            <div style={{fontFamily: '\'Gill Sans\', \'Gill Sans MT\', Calibri, \'Trebuchet MS\', sans-serif'}}>
                <Story />
            </div>
        </StoreProvider>
        ),
    ],
};

export default preview;
