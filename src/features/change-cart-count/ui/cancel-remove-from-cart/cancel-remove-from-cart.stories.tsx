import type { Meta, StoryObj } from '@storybook/react';
import { CancelRemoveFromCartButton } from './cancel-remove-from-cart';
import { StoreProvider } from '@/shared/lib'; 
import type { CartStore } from '@/entities/cart'; 
import { mockRootStore, mockProducts } from '../../../../../.storybook/preview';

const meta: Meta<typeof CancelRemoveFromCartButton> = {
    title: 'features/change-cart-count/ui/cancel-remove-from-cart',
    component: CancelRemoveFromCartButton,
    tags: ['autodocs'], 
};

export default meta;
type Story = StoryObj<typeof CancelRemoveFromCartButton>;

/**
 * Should render button correctly.
 */
export const CancelRemoveFromCart: Story = {
    args: {
        product: mockProducts[0]
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

/**
 * Should have 3s animation: light gray button is filling with dark gray color steadely
 * from left to right.
 */
export const InfiniteAnimation: Story = {
    args: {
        product: mockProducts[2]
    },
    decorators: [
      (Story) => {
            const uniqueId = 'cancel-remove-animation-infinite-' + Math.random().toString(36).slice(2, 12);

    
            return (
            <StoreProvider value={ mockRootStore }>
                <div id={uniqueId}>
                    <style>{`
                            #${uniqueId} button {
                            animation-iteration-count: infinite !important;
                            -webkit-animation-iteration-count: infinite !important;
                        }
                    `}</style>
                    <Story />
                </div>
            </StoreProvider>
            );
      },
    ],
};