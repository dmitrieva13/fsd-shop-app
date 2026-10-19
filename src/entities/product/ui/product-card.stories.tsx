import type { Meta, StoryObj } from '@storybook/react';
import { ProductCard } from './product-card';
import { StoreProvider } from '@/shared/lib'; 
import type { CartStore } from '@/entities/cart';
import { mockRootStore, mockProducts } from '../../../../.storybook/preview';

const meta: Meta<typeof ProductCard> = {
    title: 'entities/product/ui/product-card',
    component: ProductCard,
    tags: ['autodocs'], 
};

export default meta;
type Story = StoryObj<typeof ProductCard>;

/**
 * Should render product card correctly.
 */
export const BasicCard: Story = {
    args: {
        product: mockProducts[0],
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
        product: mockProducts[1]
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
        product: {
            ...mockProducts[0],
            name: 'Thisisaveryverylongstringtobeaproductname'
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
        product: mockProducts[2],
        children: 'Child test text'
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
        product: mockProducts[2],
        children: (<button>Child button</button>)
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