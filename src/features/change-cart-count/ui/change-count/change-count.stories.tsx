import type { Meta, StoryObj } from '@storybook/react';
import { ChangeCount } from './change-count';
import { StoreProvider } from '@/shared/lib'; 
import type { CartStore } from '@/entities/cart'; 
import { mockRootStore, mockProducts } from '../../../../../.storybook/preview';

const meta: Meta<typeof ChangeCount> = {
  title: 'features/change-cart-count/ui/change-count',
  component: ChangeCount,
  tags: ['autodocs'], 
};

export default meta;
type Story = StoryObj<typeof ChangeCount>;

/**
 * Should render ChangeCount button with text '1' and
 * not disabled increase (+) and descrease (-) buttons.
 */
export const BasicChangeCount: Story = {
    args: {
        product: mockProducts[0]
    },
    decorators: [
        (Story) => {
            const item = {
                product: mockProducts[0],
                count: 1
            };
            const customRootStore = {
                ...mockRootStore, 
                cartStore: {
                    ...mockRootStore.cartStore, 
                    items: [item],
                    getCartItem: (id: number) => item       
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

/**
 * Should render ChangeCount button with text '2' and
 * disabled increase (+) button.
 */
export const DisabledIncreaseChangeCount: Story = {
    args: {
        product: mockProducts[2]
    },
    decorators: [
      (Story) => {
        const item = {
            product: mockProducts[2],
            count: 2
        };
        const customRootStore = {
            ...mockRootStore, 
            cartStore: {
                ...mockRootStore.cartStore, 
                items: [item],
                getCartItem: (id: number) => item
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

/** 
 * Button should fill 100% height of the parent element (50px).
 */
export const FillHeight: Story = {
    args: {
        product: mockProducts[0]
    },
    decorators: [
      (Story) => {
        const item = {
            product: mockProducts[0],
            count: 1
        };
        const customRootStore = {
            ...mockRootStore, 
            cartStore: {
                ...mockRootStore.cartStore, 
                items: [item],
                getCartItem: (id: number) => item       
            },
        };

        return(
            <StoreProvider value={customRootStore}>
                <div style={{height: '50px'}}>
                    <Story />
                </div>
            </StoreProvider>
      )},
    ],
};

/** 
 * Button's height should not be more than 80px even when parent's height is bigger.
 */
export const MaxHeight: Story = {
    args: {
        product: mockProducts[0]
    },
    decorators: [
      (Story) => {
        const item = {
            product: mockProducts[0],
            count: 1
        };
        const customRootStore = {
            ...mockRootStore, 
            cartStore: {
                ...mockRootStore.cartStore, 
                items: [item],
                getCartItem: (id: number) => item       
            },
        };

        return(
            <StoreProvider value={customRootStore}>
                <div style={{height: '100px'}}>
                    <Story />
                </div>
            </StoreProvider>
      )},
    ],
};