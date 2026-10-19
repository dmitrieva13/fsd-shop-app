import type { Meta, StoryObj } from '@storybook/react';
import { RemoveFromCartButton } from './remove-from-cart';
import { StoreProvider } from '@/shared/lib'; 
import type { CartStore } from '@/entities/cart'; 
import { mockRootStore, mockProducts } from '../../../../../.storybook/preview';

const meta: Meta<typeof RemoveFromCartButton> = {
    title: 'features/change-cart-count/ui/remove-from-cart',
    component: RemoveFromCartButton,
    tags: ['autodocs'], 
};

export default meta;
type Story = StoryObj<typeof RemoveFromCartButton>;

/**
 * Should render clickable dark gray trash can icon with size = 22px.
 */
export const RemoveFromCart: Story = {
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