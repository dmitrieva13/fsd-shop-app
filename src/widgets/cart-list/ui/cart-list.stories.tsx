import type { Meta, StoryObj } from '@storybook/react';
import { CartList } from './cart-list';
import { StoreProvider } from '@/shared/lib'; 
import type { Product } from '@/entities/product'; 
import { mockRootStore, mockProducts, observableMockCartStore } from '../../../../.storybook/preview';
import { MemoryRouter } from 'react-router-dom';
import { within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';


const meta: Meta<typeof CartList> = {
    title: 'widgets/cart-list',
    component: CartList,
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof CartList>;

/**
 * Should render cart list with correct info and buttons. Buttons should be
 * inside each cart item on the right.
 */
export const CartListBasic: Story = {
    decorators: [
        (Story) => {
            const mockCartStore = new observableMockCartStore();
            mockCartStore.setItems([{
                product: mockProducts[1],
                count: 1
            },
            {
                product: mockProducts[2],
                count: 2
            }]);
            const customRootStore = {
                ...mockRootStore, 
                cartStore: mockCartStore
            };

            return (
                <StoreProvider value={ customRootStore }>
                    <MemoryRouter>
                        <Story />
                    </MemoryRouter>
                </StoreProvider>
            );
        },
    ],
};

/**
 * Should render cart item with button "Отменить" to cancel removing.
 * Button should have animated background. There should be no other buttons for this item.
 */
export const CartListCancellingItem: Story = {
    decorators: [
        (Story) => {
            const customRootStore = {
                ...mockRootStore, 
                cartStore: {
                    ...mockRootStore.cartStore,
                    items: [{
                        product: mockProducts[2],
                        count: 2,
                        isCancelling: true
                    }],
                    totalSum: 240*2
                }
            };
            const uniqueId = 'cart-list-cancel-animation-infinite-' + Math.random().toString(36).slice(2, 12);


            return (
                <StoreProvider value={ customRootStore }>
                    <MemoryRouter>
                    <div id={uniqueId}>
                        <style>{`
                            #${uniqueId} button {
                            animation-iteration-count: infinite !important;
                            -webkit-animation-iteration-count: infinite !important;
                        }
                    `}</style>
                        <Story /></div>
                    </MemoryRouter>
                </StoreProvider>
            );
        },
    ],
};

/**
 * Should render info that the cart is empty.
 */
export const CartListEmpty: Story = {
    decorators: [
        (Story) => {
            const customRootStore = {
                ...mockRootStore, 
                cartStore: new observableMockCartStore()
            };

            return (
                <StoreProvider value={ customRootStore }>
                    <MemoryRouter>
                        <Story />
                    </MemoryRouter>
                </StoreProvider>
            );
        },
    ],
};

/**
 * Should render loading component.
 */
export const CartListLoading: Story = {
    decorators: [
        (Story) => {
            const customRootStore = {
                ...mockRootStore, 
                cartStore: {
                    ...mockRootStore.cartStore,
                    items: [{
                        product: mockProducts[1],
                        count: 1
                    },
                    {
                        product: mockProducts[2],
                        count: 2
                    }],
                    isLoading: true
                }
            };

            return (
                <StoreProvider value={ customRootStore }>
                    <MemoryRouter>
                        <Story />
                    </MemoryRouter>
                </StoreProvider>
            );
        },
    ],
};



/**
 * Should render button "Отменить" indtead of ChangeCount and remove buttons
 * on click on remove button.
 * 
 * After 3 seconds removed item should be erased from cart and cart list.
 */
export const ClickOnRemoveButton: Story = {
    decorators: [
      (Story) => {

            const mockCartStore = new observableMockCartStore();
            mockCartStore.setItems([{
                product: mockProducts[1],
                count: 1
            },
            {
                product: mockProducts[0],
                count: 5
            },
            {
                product: mockProducts[2],
                count: 2
            }]);

            const customRootStore = {
                ...mockRootStore, 
                cartStore: mockCartStore
            };

  
        return (
          <StoreProvider value={ customRootStore }>
                <MemoryRouter>
                    <Story />
                </MemoryRouter>
          </StoreProvider>
        );
      },
    ],

    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const productRow = canvas.getByText(/молоко/i).closest('.cartItemCard');
        if (!productRow || !(productRow instanceof HTMLElement)) {
            throw new Error('Строка товара не найдена');
        }
        const rowCanvas = within(productRow);
        const removeButton = rowCanvas.getByLabelText('remove-btn');

        await userEvent.click(removeButton);
    }
};

/**
 * Should render button "Отменить" indtead of ChangeCount and remove buttons
 * on click on remove button.
 * 
 * After 2 seconds user clicks on cancel button and removing gets cancelled.
 * ChangeCount and remove buttons return on their place.
 */
export const ClickOnCancelRemoveButton: Story = {
    decorators: [
      (Story) => {

            const mockCartStore = new observableMockCartStore();
            mockCartStore.setItems([{
                product: mockProducts[1],
                count: 1
            },
            {
                product: mockProducts[0],
                count: 5
            },
            {
                product: mockProducts[2],
                count: 2
            }]);

            const customRootStore = {
                ...mockRootStore, 
                cartStore: mockCartStore
            };

  
        return (
          <StoreProvider value={ customRootStore }>
                <MemoryRouter>
                    <Story />
                </MemoryRouter>
          </StoreProvider>
        );
      },
    ],

    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const productRow = canvas.getByText(/молоко/i).closest('.cartItemCard');
        if (!productRow || !(productRow instanceof HTMLElement)) {
            throw new Error('Строка товара не найдена');
        }
        const rowCanvas = within(productRow);
        const removeButton = rowCanvas.getByLabelText('remove-btn');

        await userEvent.click(removeButton);

        const cancelButton = rowCanvas.getByRole('button', {name: 'Отменить'});
        await new Promise(resolve => setTimeout(resolve, 1000));
        await userEvent.click(cancelButton);
    }
};

