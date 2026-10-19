import type { Meta, StoryObj } from '@storybook/react';
import { ProductGrid } from './products-grid';
import { StoreProvider } from '@/shared/lib'; 
import type { Product } from '@/entities/product'; 
import { mockRootStore, mockProducts, observableMockCartStore } from '../../../../.storybook/preview';
import { within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';


const meta: Meta<typeof ProductGrid> = {
  title: 'widgets/product-grid',
  component: ProductGrid,
  tags: ['autodocs'], 
};

export default meta;
type Story = StoryObj<typeof ProductGrid>;

const mockProductStore = {
    ...mockRootStore.productStore,
    products: mockProducts,
    filteredProducts: mockProducts,
    fetchProducts: () => {}
};

/**
 * Should render product grid with correct buttons "В корзину"
 * or "Нет в наличии". Cart is empty.
 */
export const ProductGridBasic: Story = {
    decorators: [
        (Story) => {
            const customRootStore = {
                ...mockRootStore, 
                productStore: mockProductStore,
                cartStore: {
                    ...mockRootStore.cartStore,
                    hasCartItem: (id: string) => false
                }
            };

            return (
                <StoreProvider value={ customRootStore }>
                    <Story />
                </StoreProvider>
            );
        },
    ],
};

/**
 * Should render product grid correctly when array of products is small.
 */
export const ProductGridSmall: Story = {
    decorators: [
        (Story) => {
            const customRootStore = {
                ...mockRootStore, 
                productStore: {
                    ...mockProductStore,
                    filteredProducts: [mockProducts[0], mockProducts[1]]
                },
                cartStore: {
                    ...mockRootStore.cartStore,
                    hasCartItem: (id: string) => false
                }
            };

            return (
                <StoreProvider value={ customRootStore }>
                    <Story />
                </StoreProvider>
            );
        },
    ],
};

/**
 * Should render product grid with info about absence of products.
 */
export const ProductGridEmpty: Story = {
    decorators: [
        (Story) => {
            const customRootStore = {
                ...mockRootStore, 
                productStore: {
                    ...mockProductStore,
                    filteredProducts: []
                },
                cartStore: {
                    ...mockRootStore.cartStore,
                    hasCartItem: (id: string) => false
                }
            };

            return (
                <StoreProvider value={ customRootStore }>
                    <Story />
                </StoreProvider>
            );
        },
    ],
};

/**
 * Should render loading component instead of grid.
 */
export const ProductGridLoading: Story = {
    decorators: [
        (Story) => {
            const customRootStore = {
                ...mockRootStore, 
                productStore: {
                    ...mockProductStore,
                    isLoading: true
                },
                cartStore: {
                    ...mockRootStore.cartStore,
                    hasCartItem: (id: string) => false
                }
            };

            return (
                <StoreProvider value={ customRootStore }>
                    <Story />
                </StoreProvider>
            );
        },
    ],
};

/**
 * Should render product grid with correct buttons "В корзину"
 * or "Нет в наличии" or ChangeCount button. Cart is filled.
 */
export const ProductGridWithFilledCart: Story = {
    decorators: [
      (Story) => {
        const item = {
            product: mockProducts[0],
            count: 5
        };
        const customRootStore = {
            ...mockRootStore, 
            productStore: mockProductStore,
            cartStore: {
                ...mockRootStore.cartStore,
                items: [item],
                hasCartItem: (id: string) => id === mockProducts[0].id,
                getCartItem: (id: string) =>  item
            }
        };
  
        return (
          <StoreProvider value={ customRootStore }>
                <Story />
          </StoreProvider>
        );
      },
    ],
};

/**
 * Should render product grid with disabled increase (+) button for parmesan cheese.
 */
export const ProductGridWithDisabledIncrease: Story = {
    decorators: [
      (Story) => {
        const item = {
            product: mockProducts[2],
            count: 2
        };
        const customRootStore = {
            ...mockRootStore, 
            productStore: mockProductStore,
            cartStore: {
                ...mockRootStore.cartStore,
                items: [item],
                hasCartItem: (id: string) => id === mockProducts[2].id,
                getCartItem: (id: string) =>  item
            }
        };
  
        return (
          <StoreProvider value={ customRootStore }>
                <Story />
          </StoreProvider>
        );
      },
    ],
};

/**
 * Should render product grid with correct buttons "В корзину"
 * or "Нет в наличии" or ChangeCount button. Buttons are clickable.
 * 
 * 
 * Button "В корзину" should change to ChangeCount button after adding to cart.
 * ChangeCount button should change to "В корзину" after decreasing item wich was only 1 in cart.
 */
export const ProductGridWithClickableButton: Story = {
    decorators: [
      (Story) => {

        const customRootStore = {
            ...mockRootStore, 
            productStore: mockProductStore,
            cartStore: new observableMockCartStore()
        };
  
        return (
          <StoreProvider value={ customRootStore }>
                <Story />
          </StoreProvider>
        );
      },
    ],
};

