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

let RemoveFromCartButton: React.ComponentType<any>;

const mockProducts: Product[] = [
    { id: '1', name: 'Молоко', price: 85, countLeft: 28, imageUrl: 'https://static.vecteezy.com/system/resources/thumbnails/035/176/109/small/spectral-sophistication-blank-milk-bottle-mockup-on-transparent-background-free-png.png' },
    { id: '2', name: 'Сыр гауда', price: 180, countLeft: 8, imageUrl: 'https://static.vecteezy.com/system/resources/thumbnails/060/587/554/small/creamy-yellow-cheese-with-heart-shaped-and-irregular-holes-png.png' },
    { id: '3', name: 'Сыр пармезан', price: 240, countLeft: 0, imageUrl: 'https://static.vecteezy.com/system/resources/thumbnails/046/013/741/small/realistic-photograph-of-cheese-on-transparency-background-png.png' },
];
const getProduct = (id: string) => {
    const product = mockProducts.find(p => p.id === id);
    return product;
}

describe('testing /features/change-cart-count/ui/cancel-remove-from-cart', () => {

    beforeAll(async () => {
        const module = await import('../remove-from-cart');
        RemoveFromCartButton = module.RemoveFromCartButton;
    });

    beforeEach(() => {
        testCartStore = new CartStore({ productStore: {getProduct} });
    })

    test('should render correctly', () => {
        render(<RemoveFromCartButton product={mockProducts[0]} />);

        const button = screen.getByLabelText('remove-btn');
        expect(button).toBeInTheDocument();
    });

    test('should call cancelRemovingFromCart on click', async () => {
        const user = userEvent.setup();
        testCartStore.handleRemove = jest.fn();
        render(<RemoveFromCartButton product={mockProducts[0]} />);

        const button = screen.getByLabelText('remove-btn');
        await user.click(button);

        expect(testCartStore.handleRemove).toHaveBeenCalledTimes(1);
    });
})