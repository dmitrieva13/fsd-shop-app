import type { Product } from '../types';
import { jest } from '@jest/globals';
import { ProductStore } from "../products.store";

describe('testing /entities/product/model.product.store', () => {
    let store: ProductStore;
    const mockProducts = [
        { id: '1', name: 'Молоко', price: 85, countLeft: 28, imageUrl: 'https://static.vecteezy.com/system/resources/thumbnails/035/176/109/small/spectral-sophistication-blank-milk-bottle-mockup-on-transparent-background-free-png.png' },
        { id: '2', name: 'Сыр гауда', price: 180, countLeft: 8, imageUrl: 'https://static.vecteezy.com/system/resources/thumbnails/060/587/554/small/creamy-yellow-cheese-with-heart-shaped-and-irregular-holes-png.png' },
        { id: '3', name: 'Сыр пармезан', price: 240, countLeft: 2, imageUrl: 'https://static.vecteezy.com/system/resources/thumbnails/046/013/741/small/realistic-photograph-of-cheese-on-transparency-background-png.png' },
    ];

    beforeEach(() => {
        store = new ProductStore();
    });


    test('should initialize correctly', () => {
        expect(store.products.length).toBe(0);
        expect(store.searchStr).toBe('');
    });

    test('should set products array correctly', () => {
        store.products = mockProducts;
        expect(store.products.length).toBe(3);
    });

    test('should set searchStr correctly', () => {
        store.setSearchStr("abc")
        expect(store.searchStr).toBe('abc');
    });

    test('should set products array correctly', () => {
        store.products = mockProducts;
        expect(store.products.length).toBe(3);
    });

    test('should get product by id', () => {
        store.products = mockProducts;
        expect(store.getProduct('2')).toStrictEqual({ id: '2', name: 'Сыр гауда', price: 180, countLeft: 8, imageUrl: 'https://static.vecteezy.com/system/resources/thumbnails/060/587/554/small/creamy-yellow-cheese-with-heart-shaped-and-irregular-holes-png.png' });
        expect(store.getProduct('abc')).not.toBeDefined();
    });

    test('should filter products by name correctly', () => {
        store.products = mockProducts;
        store.setSearchStr("Сыр ");
        expect(store.filteredProducts.length).toBe(2);
        store.setSearchStr("qwerty");
        expect(store.filteredProducts.length).toBe(0);
    });
})