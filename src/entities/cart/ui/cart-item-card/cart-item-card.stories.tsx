import type { Meta, StoryObj } from '@storybook/react';
import { CartItemCard } from './cart-item-card';
import { StoreProvider } from '@/shared/lib'; 
import type { CartStore } from '@/entities/cart';
import { mockRootStore, mockProducts } from '../../../../../.storybook/preview';

const meta: Meta<typeof CartItemCard> = {
    title: 'entities/cart/ui/cart-item-card',
    component: CartItemCard,
    tags: ['autodocs'], 
};

export default meta;
type Story = StoryObj<typeof CartItemCard>;

/**
 * Should render item card and all info (count, total sum of this item etc) correctly.
 */
export const BasicCard: Story = {
    args: {
        item: {
            product: mockProducts[0],
            count: 3
        }
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
 * Should use default image if there is no image link in product.
 */
export const DefaultImageCard: Story = {
    args: {
        item: {
            product: mockProducts[1],
            count: 1
        }
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
 * Should render correctly with long product name. Long name should be
 * shorten withh ellipses and shown on hover.
 */
export const LongTitleCard: Story = {
    args: {
        item: {
            product: {
                ...mockProducts[0],
                name: 'ThisisaveryverylongstringtobeaproductnameletsrepeatitThisisaveryverylongstringtobeaproductnameletsrepeatit'
            },
            count: 1
        }
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
 * Should render childrens passed to card.
 */
export const TextChildrenInCard: Story = {
    args: {
        item: {
            product: mockProducts[2],
            count: 1
        },
        children: 'Child text'
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
 * Should render components as children.
 */
export const ButtonChildrenInCard: Story = {
    args: {
        item: {
            product: mockProducts[2],
            count: 1
        },
        children: (<button>Child</button>)
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