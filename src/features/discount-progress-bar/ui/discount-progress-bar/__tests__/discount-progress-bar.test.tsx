import { CartStore } from "@/entities/cart";
import type { Product } from "@/entities/product";
import { jest } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

let testCartStore: CartStore;

jest.unstable_mockModule('@/shared/lib', async () => {
    const actual = await jest.requireActual<typeof import('@/shared/lib')>('@/shared/lib');

    return {
        ...actual,
        __esModule: true,
        useStores: () => ({
            cartStore: testCartStore
    }),}
});

let DiscountProgressBar: React.ComponentType<any>;

const mockProducts: Product[] = [
    { id: '1', name: 'Молоко', price: 85, countLeft: 28, imageUrl: 'https://static.vecteezy.com/system/resources/thumbnails/035/176/109/small/spectral-sophistication-blank-milk-bottle-mockup-on-transparent-background-free-png.png' },
    { id: '2', name: 'Сыр гауда', price: 180, countLeft: 8, imageUrl: 'https://static.vecteezy.com/system/resources/thumbnails/060/587/554/small/creamy-yellow-cheese-with-heart-shaped-and-irregular-holes-png.png' },
    { id: '3', name: 'Сыр пармезан', price: 240, countLeft: 0, imageUrl: 'https://static.vecteezy.com/system/resources/thumbnails/046/013/741/small/realistic-photograph-of-cheese-on-transparency-background-png.png' },
];
const getProduct = (id: string) => {
    const product = mockProducts.find(p => p.id === id);
    return product;
}

describe('testing /features/discount-progress-bar/ui/discount-progress-bar', () => {

    beforeAll(async () => {
        const module = await import('../discount-progress-bar');
        DiscountProgressBar = module.DiscountProgressBar;
    });

    beforeEach(() => {
        testCartStore = new CartStore({ productStore: {getProduct} });
    })

    test('should render correctly', () => {
        render(<DiscountProgressBar />);

        const progressBar = screen.getByRole('progressbar', { name: /progress-bar/i });
        expect(progressBar).toBeInTheDocument();
        expect(screen.getByText(`До скидки 10% осталось 1200 руб.`)).toBeInTheDocument();
    });

    test('should change text when adding items enough to get discount', async () => {
        for (let i = 0; i < 20; i++) {
            testCartStore.addToCart('1');
        }
        const sum = (170 - 17) * 10;
        render(<DiscountProgressBar />);
        expect(screen.getByText(`К оплате со скидкой ${sum} руб.`)).toBeInTheDocument();
    });

    test('should change text when adding items', async () => {

        testCartStore.addToCart('1');
        render(<DiscountProgressBar />);
        expect(screen.getByText(`До скидки 10% осталось 1115 руб.`)).toBeInTheDocument();

    });
})