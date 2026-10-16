import { CartStore } from "@/entities/cart";
import { Product, ProductStore } from "@/entities/product";
import { jest } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

let testProductStore: ProductStore;

jest.unstable_mockModule('@/shared/lib', async () => {
    const actual = await jest.requireActual<typeof import('@/shared/lib')>('@/shared/lib');

    return {
        ...actual,
        __esModule: true,
        useStores: () => ({
            productStore: testProductStore
    }),}
});

let SearchByName: React.ComponentType<any>;

describe('testing /features/search-by-name/ui/search-by-name', () => {

    beforeAll(async () => {
        const module = await import('../search-by-name');
        SearchByName = module.SearchByName;
    });

    beforeEach(() => {
        testProductStore = new ProductStore();
    })

    test('should render correctly', () => {
        render(<SearchByName />);

        const input = screen.getByPlaceholderText(/введите название товара/i);
        expect(input).toBeInTheDocument();
        expect(input).toHaveValue('');

        const clearBtn = screen.getByLabelText('input-clear');
        expect(clearBtn).toBeInTheDocument();
    });

    test('should render correctly when search string not empty', () => {
        testProductStore.setSearchStr('Мол');
        render(<SearchByName />);

        const input = screen.getByPlaceholderText(/введите название товара/i);
        expect(input).toBeInTheDocument();
        expect(input).toHaveValue('Мол');
    });

    test('should change value on user input', async () => {
        const user = userEvent.setup();
        render(<SearchByName />);
        const input = screen.getByPlaceholderText(/введите название товара/i);
        await user.type(input, 'Сыр');
        expect(input).toHaveValue('Сыр');
    });

    test('should clear on user click on clear', async () => {
        testProductStore.setSearchStr('Мол');
        const user = userEvent.setup();
        render(<SearchByName />);

        const input = screen.getByPlaceholderText(/введите название товара/i);
        const clearBtn = screen.getByLabelText('input-clear');

        expect(input).toHaveValue('Мол');
        await user.click(clearBtn);
        expect(input).toHaveValue('');
    });
})