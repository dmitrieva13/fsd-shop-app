import { CartStore } from "../../../model/cart.store";
import { jest } from '@jest/globals';
import { render, screen } from '@testing-library/react';


let testCartStore: CartStore;

jest.unstable_mockModule('@/shared/lib', () => ({
    __esModule: true,
    useStores: () => ({
      cartStore: testCartStore
    }),
}));

let CartTotalInfo: React.ComponentType<any>;

const mockProducts = [
    { id: '1', name: 'Молоко', price: 85, countLeft: 28, imageUrl: 'https://static.vecteezy.com/system/resources/thumbnails/035/176/109/small/spectral-sophistication-blank-milk-bottle-mockup-on-transparent-background-free-png.png' },
    { id: '2', name: 'Сыр гауда', price: 180, countLeft: 8, imageUrl: 'https://static.vecteezy.com/system/resources/thumbnails/060/587/554/small/creamy-yellow-cheese-with-heart-shaped-and-irregular-holes-png.png' },
    { id: '3', name: 'Сыр пармезан', price: 240, countLeft: 2, imageUrl: 'https://static.vecteezy.com/system/resources/thumbnails/046/013/741/small/realistic-photograph-of-cheese-on-transparency-background-png.png' },
];
const getProduct = (id: string) => {
    const product = mockProducts.find(p => p.id === id);
    return product;
}


describe('testing /entities/cart/ui/cart-icon', () => {

    beforeAll(async () => {
        const module = await import('../cart-total-info');
        CartTotalInfo = module.CartTotalInfo;
    });

    beforeEach(() => {
        testCartStore = new CartStore({ productStore: {getProduct} });
    })

    test('should display 0 for empty cart', () => {
        render(<CartTotalInfo />)
        expect(screen.getByText('Итого: 0 руб.')).toBeInTheDocument();
        expect(screen.getByText('В корзине 0 товаров.')).toBeInTheDocument();
    });

    test('should change count when cart items changing', () => {
        testCartStore.addToCart('1');
        testCartStore.addToCart('2');
        testCartStore.increaseItem('1');
        render(<CartTotalInfo />)

        const sum = 85*2 + 180;
        expect(screen.getByText('Итого: ' + sum + ' руб.')).toBeInTheDocument();
        expect(screen.getByText('В корзине 3 товара.')).toBeInTheDocument();
    });
})