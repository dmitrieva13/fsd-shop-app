import { CartStore } from "../cart.store";
import { jest } from '@jest/globals';
import { DISCOUNT_PERCENT, DISCOUNT_SUM_NEEDED } from '../../config/constants';

describe('testing /entities/cart/model/cart.store', () => {
    let store: CartStore;
    const mockProducts = [
        { id: '1', name: 'Молоко', price: 85, countLeft: 28, imageUrl: 'https://static.vecteezy.com/system/resources/thumbnails/035/176/109/small/spectral-sophistication-blank-milk-bottle-mockup-on-transparent-background-free-png.png' },
        { id: '2', name: 'Сыр гауда', price: 180, countLeft: 8, imageUrl: 'https://static.vecteezy.com/system/resources/thumbnails/060/587/554/small/creamy-yellow-cheese-with-heart-shaped-and-irregular-holes-png.png' },
        { id: '3', name: 'Сыр пармезан', price: 240, countLeft: 2, imageUrl: 'https://static.vecteezy.com/system/resources/thumbnails/046/013/741/small/realistic-photograph-of-cheese-on-transparency-background-png.png' },
    ];
    const getProduct = (id: string) => {
        const product = mockProducts.find(p => p.id === id);
        return product;
    }

    beforeEach(() => {
        store = new CartStore({ productStore: {getProduct} });
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.useRealTimers();
    });


    test('should initialize correctly', () => {
        expect(store.items.length).toBe(0);
        expect(store.totalCount).toBe(0);
        expect(store.totalSum).toBe(0);
    });

    test('should add to cart correctly', () => {
        store.addToCart('2');
        expect(store.items.length).toBe(1);
        expect(store.items[0].product).toStrictEqual({ id: '2', name: 'Сыр гауда', price: 180, countLeft: 8, imageUrl: 'https://static.vecteezy.com/system/resources/thumbnails/060/587/554/small/creamy-yellow-cheese-with-heart-shaped-and-irregular-holes-png.png' });

        expect(() => store.addToCart('abc')).toThrow('no product with such id');
    });

    test('should increase correctly', () => {
        store.addToCart('2');
        store.increaseItem('2');
        expect(store.items.length).toBe(1);
        expect(store.items[0].count).toBe(2);
    });

    test('should throw error when trying add to cart more then available', () => {
        store.addToCart('3');
        store.increaseItem('3');

        expect(() => store.increaseItem('3')).toThrow('max number reached');
    });

    test('should increase count when adding twice', () => {
        store.addToCart('2');
        store.addToCart('2');
        expect(store.items.length).toBe(1);
        expect(store.items[0].count).toBe(2);
    });

    test('should add to cart when increasing item not in cart', () => {
        store.increaseItem('2');
        expect(store.items.length).toBe(1);
        expect(store.items[0].count).toBe(1);
    });

    test('should descrease correctly', () => {
        store.addToCart('2');
        store.increaseItem('2');

        store.decreaseItem('2');
        expect(store.items.length).toBe(1);
        expect(store.items[0].count).toBe(1);

        store.decreaseItem('2');
        expect(store.items.length).toBe(0);
    });

    test('should remove from cart after 3s delay', () => {
        store.addToCart('2');
        store.handleRemove('2');
        jest.advanceTimersByTime(2999);
        expect(store.items.length).toBe(1);
        jest.advanceTimersByTime(1);
        expect(store.items.length).toBe(0);
    });

    test('should cancel removing from cart on cancel during 3s delay', () => {
        store.addToCart('2');
        store.handleRemove('2');
        jest.advanceTimersByTime(2999);
        store.cancelRemovingFromCart('2');
        jest.advanceTimersByTime(1);
        expect(store.items.length).toBe(1);
    });

    test('should get total sum correctly', () => {
        expect(store.totalSum).toBe(0);
        store.addToCart('2');
        expect(store.totalSum).toBe(180);
        store.addToCart('3');
        expect(store.totalSum).toBe(180 + 240);
    });

    test('should get total count correctly', () => {
        store.addToCart('2');
        expect(store.totalCount).toBe(1);
        store.addToCart('3');
        expect(store.totalCount).toBe(2);
        store.increaseItem('2');
        expect(store.totalCount).toBe(3);
    });

    test('should check if item in cart correctly', () => {
        store.addToCart('1');
        expect(store.hasCartItem('1')).toBeTruthy();
        expect(store.hasCartItem('2')).toBeFalsy();
        expect(store.hasCartItem('abc')).toBeFalsy();
    });

    test('should check if cart is empty correctly', () => {
        expect(store.isEmpty).toBeTruthy();
        store.addToCart('1');
        expect(store.isEmpty).toBeFalsy();
    });

    test('should compute discount correctly', () => {
        expect(store.discount).toBe(0);
        store.addToCart('1');
        expect(store.discount).toBe(0);
        for (let i = 0; i < 8; i++) {
            store.addToCart('2');
        }
        expect(store.discount).toBe(DISCOUNT_PERCENT);
    });

    test('should compute sum with discount correctly', () => {
        expect(store.totalSumDiscount).toBe(0);
        for (let i = 0; i < 20; i++) {
            store.addToCart('1');
        }
        const sum = (85 - 8.5) * 20;
        expect(store.totalSumDiscount).toBeCloseTo(sum);
    });
})