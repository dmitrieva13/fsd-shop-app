import { ProductStore } from '@/entities/product';
import { CartStore } from '@/entities/cart';

export class RootStore {
  productStore: ProductStore;
  cartStore: CartStore;

  constructor() {
    this.productStore = new ProductStore(this);
    this.cartStore = new CartStore(this);
  }
}

export const rootStore = new RootStore();

