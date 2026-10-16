import { ProductStore } from "../../model/products.store";
import { jest } from '@jest/globals';
import { render, screen } from '@testing-library/react';


let testProductStore: ProductStore;

jest.unstable_mockModule('@/shared/lib', () => ({
    __esModule: true,
    useStores: () => ({
      productStore: testProductStore
    }),
}));

let ProductCard: React.ComponentType<any>;

const mockProducts = [
    { id: '1', name: 'Молоко', price: 85, countLeft: 28, imageUrl: 'https://static.vecteezy.com/system/resources/thumbnails/035/176/109/small/spectral-sophistication-blank-milk-bottle-mockup-on-transparent-background-free-png.png' },
    { id: '2', name: 'Сыр гауда', price: 180, countLeft: 8, imageUrl: '' },
    { id: '3', name: 'Сыр пармезан', price: 240, countLeft: 2, imageUrl: 'https://static.vecteezy.com/system/resources/thumbnails/046/013/741/small/realistic-photograph-of-cheese-on-transparency-background-png.png' },
];


describe('testing /entities/product/ui/product-card', () => {

    beforeAll(async () => {
        const module = await import('../product-card');
        ProductCard = module.ProductCard;
    });

    beforeEach(() => {
        testProductStore = new ProductStore();
        testProductStore.products = mockProducts;
    })

    test('should display info correctly', () => {
        render(<ProductCard product={testProductStore.products[0]} />)

        expect(screen.getByText('Молоко')).toBeInTheDocument();
        expect(screen.queryByText('85 руб./шт.')).not.toBeInTheDocument();
        expect(screen.getByText('Осталось 28 шт.')).toBeInTheDocument();
        expect(screen.getByText('85 руб.')).toBeInTheDocument();
    });

    test('should display image correctly', () => {
        render(<ProductCard product={testProductStore.products[1]} />)

        const image = screen.getByRole('img', { name: /product-card-img/i });
        expect(image).toBeInTheDocument();
        expect(image).toHaveAttribute('src');
        expect(image.getAttribute('src')).not.toBe('');
        expect(image.getAttribute('src')).toBeTruthy();
    });
})