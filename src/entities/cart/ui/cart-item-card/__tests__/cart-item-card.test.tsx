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

let CartItemCard: React.ComponentType<any>;

const mockProducts = [
    { id: '1', name: 'Молоко', price: 85, countLeft: 28, imageUrl: '' },
    { id: '2', name: 'Сыр гауда', price: 180, countLeft: 8, imageUrl: 'https://static.vecteezy.com/system/resources/thumbnails/060/587/554/small/creamy-yellow-cheese-with-heart-shaped-and-irregular-holes-png.png' },
    { id: '3', name: 'Сыр пармезан', price: 240, countLeft: 2, imageUrl: '' },
];
const getProduct = (id: string) => {
    const product = mockProducts.find(p => p.id === id);
    return product;
}


describe('testing /entities/cart/ui/cart-item-card', () => {

    beforeAll(async () => {
        const module = await import('../cart-item-card');
        CartItemCard = module.CartItemCard;
    });

    beforeEach(() => {
        testCartStore = new CartStore({ productStore: {getProduct} });
        testCartStore.addToCart('1');
        testCartStore.increaseItem('1');
    })

    test('should display info correctly', () => {
        render(<CartItemCard item={testCartStore.items[0]} />)

        expect(screen.getByText('Молоко')).toBeInTheDocument();
        expect(screen.getByText('85 руб./шт.')).toBeInTheDocument();
        expect(screen.getByText('170 руб.')).toBeInTheDocument();
        expect(screen.queryByText('85 руб.')).not.toBeInTheDocument();
    });

    test('should display image correctly', () => {
        render(<CartItemCard item={testCartStore.items[0]} />)

        const image = screen.getByRole('img', { name: /cart-item-card-img/i });
        expect(image).toBeInTheDocument();
        expect(image).toHaveAttribute('src');
        expect(image.getAttribute('src')).not.toBe('');
        expect(image.getAttribute('src')).toBeTruthy();
    });
})