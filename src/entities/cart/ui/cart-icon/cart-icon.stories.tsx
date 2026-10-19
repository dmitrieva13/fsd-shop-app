import type { Meta, StoryObj } from '@storybook/react';
import { CartIcon } from './cart-icon';
import { StoreProvider } from '@/shared/lib'; 
import type { CartStore } from '@/entities/cart';
import { mockRootStore, mockProducts } from '../../../../../.storybook/preview';

const meta: Meta<typeof CartIcon> = {
    title: 'entities/cart/ui/cart-icon',
    component: CartIcon,
    tags: ['autodocs'], 
};

export default meta;
type Story = StoryObj<typeof CartIcon>;

/**
 * Should render item icon with correct count = 0 (cart is empty).
 */
export const EmptyCartIcon: Story = {
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
 * Should render item icon with count 2 
 * (cart is not empty and cotains 2 items of same product).
 */
export const CartHasItemsIcon: Story = {
    decorators: [
      (Story) => {
            const customRootStore = {
                ...mockRootStore, 
                cartStore: {
                    ...mockRootStore.cartStore, 
                    totalCount: 2      
                },
            };
  
            return (
            <StoreProvider value={ customRootStore }>
                <Story />
            </StoreProvider>
            );
      },
    ],
};
