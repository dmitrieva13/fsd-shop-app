import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { DiscountProgressBar } from './discount-progress-bar';
import { StoreProvider } from '@/shared/lib'; 
import type { CartStore } from '@/entities/cart'; 
import { mockRootStore } from '../../../../.storybook/preview';

const meta: Meta<typeof DiscountProgressBar> = {
  title: 'features/discount-progress-bar',
  component: DiscountProgressBar,
  tags: ['autodocs'], 
};

export default meta;
type Story = StoryObj<typeof DiscountProgressBar>;

/** 
 * Cart is empty, sum for discount isn't reached. 
 * ProgressBar should be empty, text should be "До скидки осталось 1200 руб."
 */
export const EmptyCart: Story = {
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
 * Cart totalSum is 100, sum for discount isn't reached. 
 * ProgressBar should be small red, text should be "До скидки осталось 1100 руб."
 */
export const BeforeDiscount: Story = {
  decorators: [
    (Story) => {
        const customRootStore = {
            ...mockRootStore, 
            cartStore: {
                ...mockRootStore.cartStore, 
                totalSum: 100,           
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
 * Cart totalSum is 600, sum for discount isn't reached. 
 * ProgressBar should be 50% filled yellowish green, text should be "До скидки осталось 600 руб."
 */
export const HalfwayDiscount: Story = {
  decorators: [
    (Story) => {
        const customRootStore = {
            ...mockRootStore, 
            cartStore: {
                ...mockRootStore.cartStore, 
                totalSum: 600,           
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
 * Cart totalSum is 1250, sum for discount isn reached. 
 * ProgressBar should be 100% filled green, text should be "Сумма со скидкой 1125 руб."
 */
export const DiscountApplied: Story = {
  decorators: [
    (Story) => {
      const customRootStore = {
        ...mockRootStore,
        cartStore: {
            ...mockRootStore.cartStore,
            totalSum: 1250, 
            totalSumDiscount: 1125         
        },
    };

      return (
        <StoreProvider value={customRootStore}>
          <Story />
        </StoreProvider>
      );
    },
  ],
};
