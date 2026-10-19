import { MemoryRouter } from 'react-router-dom';
import type { Meta, StoryObj } from '@storybook/react';
import { Header } from './header';
import { StoreProvider } from '@/shared/lib'; 
import type { CartStore } from '@/entities/cart'; 
import { mockRootStore, mockProducts } from '../../../../.storybook/preview';


const meta: Meta<typeof Header> = {
  title: 'widgets/header',
  component: Header,
  tags: ['autodocs'], 
};

export default meta;
type Story = StoryObj<typeof Header>;

/**
 * Should render Header with active "catalog" button on path /
 */
export const CatalogPathHeader: Story = {
    decorators: [
        (Story) => {

            return (
                <StoreProvider value={ mockRootStore }>
                    <MemoryRouter initialEntries={['/']}>
                        <Story />
                    </MemoryRouter>
                </StoreProvider>
            );
        },
    ],
};

/**
 * Should render Header with active "cart" button on path /cart
 */
export const CartPathHeader: Story = {
    args: {
        product: mockProducts[2]
    },
    decorators: [
      (Story) => {
  
        return (
          <StoreProvider value={ mockRootStore }>
                <MemoryRouter initialEntries={['/cart']}>
                    <Story />
                </MemoryRouter>
          </StoreProvider>
        );
      },
    ],
};

/** 
 * Header should render correct count of cart items in CartIcon.
 */
export const CartHasItems: Story = {
    decorators: [
      (Story) => {
        const customRootStore = {
            ...mockRootStore, 
            cartStore: {
                ...mockRootStore.cartStore, 
                totalCount: 5    
            },
        };

        return(
            <StoreProvider value={customRootStore}>
                <MemoryRouter initialEntries={['/cart']}>
                    <Story />
                </MemoryRouter>
            </StoreProvider>
      )},
    ],
};

/** 
 * Hovered items should have light yellow background.
 */
export const HoveredHeaderLink: Story = {
    parameters: {
        pseudo: { hover: ':first-child' },
    },
    decorators: [
      (Story) => {
        const customRootStore = {
            ...mockRootStore, 
            cartStore: {
                ...mockRootStore.cartStore, 
                totalCount: 5    
            },
        };

        return(
            <StoreProvider value={customRootStore}>
                <MemoryRouter initialEntries={['/cart']}>
                    <Story />
                </MemoryRouter>
            </StoreProvider>
      )},
    ],
};