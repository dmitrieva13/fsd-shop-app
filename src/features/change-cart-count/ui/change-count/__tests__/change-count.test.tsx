import { CartStore } from "@/entities/cart";
import type { Product } from "@/entities/product";
import { jest } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

let testCartStore: CartStore;

jest.unstable_mockModule('@/shared/lib', () => ({
    __esModule: true,
    useStores: () => ({
      cartStore: testCartStore
    }),
}));

let ChangeCount: React.ComponentType<any>;

const mockProducts: Product[] = [
    { id: '1', name: 'Молоко', price: 85, countLeft: 28, imageUrl: 'https://static.vecteezy.com/system/resources/thumbnails/035/176/109/small/spectral-sophistication-blank-milk-bottle-mockup-on-transparent-background-free-png.png' },
    { id: '2', name: 'Сыр гауда', price: 180, countLeft: 8, imageUrl: 'https://static.vecteezy.com/system/resources/thumbnails/060/587/554/small/creamy-yellow-cheese-with-heart-shaped-and-irregular-holes-png.png' },
    { id: '3', name: 'Сыр пармезан', price: 240, countLeft: 2, imageUrl: 'https://static.vecteezy.com/system/resources/thumbnails/046/013/741/small/realistic-photograph-of-cheese-on-transparency-background-png.png' },
];
const getProduct = (id: string) => {
    const product = mockProducts.find(p => p.id === id);
    return product;
}

describe('testing /features/change-cart-count/ui/change-count', () => {

    beforeAll(async () => {
        const module = await import('../change-count');
        ChangeCount = module.ChangeCount;
    });

    beforeEach(() => {
        testCartStore = new CartStore({ productStore: {getProduct} });
        testCartStore.addToCart('1');
        testCartStore.addToCart('3');
        testCartStore.increaseItem('1');
    })

    test('should display item count in cart correctly', () => {
        render(<ChangeCount product={mockProducts[0]} />);
        expect(screen.getByText('2')).toBeInTheDocument();
    });

    test('should disable + button if max number of products reached', () => {
        testCartStore.addToCart('3');
        render(<ChangeCount product={mockProducts[2]} />)
        const buttonMinus = screen.getByRole('button', { name: '–' });
        const buttonPlus = screen.getByRole('button', { name: '+' });
        expect(buttonPlus).toBeInTheDocument();
        expect(buttonPlus).toBeDisabled();
        expect(buttonMinus).toBeInTheDocument();
        expect(buttonMinus).not.toBeDisabled();
    });

    test('should increase item count on click on +', async () => {
        const user = userEvent.setup();
        render(<ChangeCount product={mockProducts[2]} />);
        expect(screen.getByText('1')).toBeInTheDocument();

        const buttonPlus = screen.getByRole('button', { name: '+' });
        await user.click(buttonPlus);

        expect(screen.getByText('2')).toBeInTheDocument();
        expect(screen.queryByText('1')).not.toBeInTheDocument();
    });

    test('should call increaseItem on click on +', async () => {
        const user = userEvent.setup();
        testCartStore.increaseItem = jest.fn();
        render(<ChangeCount product={mockProducts[0]} />);

        const buttonPlus = screen.getByRole('button', { name: '+' });
        await user.click(buttonPlus);

        expect(testCartStore.increaseItem).toHaveBeenCalledTimes(1);
    });

    test('should decrease item count on click on +', async () => {
        const user = userEvent.setup();
        render(<ChangeCount product={mockProducts[0]} />);
        expect(screen.getByText('2')).toBeInTheDocument();

        const buttonMinus = screen.getByRole('button', { name: '–' });
        await user.click(buttonMinus);

        expect(screen.getByText('1')).toBeInTheDocument();
        expect(screen.queryByText('2')).not.toBeInTheDocument();
    });

    test('should call decreaseItem on click on +', async () => {
        const user = userEvent.setup();
        testCartStore.decreaseItem = jest.fn();
        render(<ChangeCount product={mockProducts[0]} />);

        const buttonMinus = screen.getByRole('button', { name: '–' });
        await user.click(buttonMinus);

        expect(testCartStore.decreaseItem).toHaveBeenCalledTimes(1);
    });
})