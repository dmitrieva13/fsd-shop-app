import type { Meta, StoryObj } from '@storybook/react';
import { AddToCartButton } from './add-to-cart';
import { StoreProvider } from '@/shared/lib'; 
import type { CartStore } from '@/entities/cart'; 
import { mockRootStore, mockProducts } from '../../../../../.storybook/preview';

const meta: Meta<typeof AddToCartButton> = {
    title: 'features/change-cart-count/ui/add-to-cart',
    component: AddToCartButton,
    tags: ['autodocs'], 
};

export default meta;
type Story = StoryObj<typeof AddToCartButton>;

/**
 * Should render button "В корзину" for products in stock.
 */
export const BasicAddToCart: Story = {
    args: {
        product: mockProducts[0]
    },
    decorators: [
        (Story) => {

        return (
            <StoreProvider value={mockRootStore}>
                <Story />
            </StoreProvider>
        );
        },
    ],
};

/**
 * Should render disabled button "Нет в наличии" for products out of stock.
 */
export const DisabledAddToCart: Story = {
    args: {
        product: mockProducts[3]
    },
    decorators: [
      (Story) => {
  
            return (
            <StoreProvider value={ mockRootStore }>
                <Story />
            </StoreProvider>
            );
      },
    ],
};