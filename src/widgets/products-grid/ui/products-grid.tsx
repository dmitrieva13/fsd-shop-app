import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';

import { useStores } from '@/shared/lib';
import type { ProductStore, Product } from '@/entities/product';
import type { CartStore } from '@/entities/cart';
import { ProductCard } from '@/entities/product';
import { ChangeCount, AddToCartButton } from '@/features/change-cart-count'
import { LoadingSpinner } from '@/shared/ui';
import { CartXFill } from 'react-bootstrap-icons';

import './product-grid.css';

export const ProductGrid = observer(() => {
    const { productStore } = useStores<{ productStore: ProductStore }>();
    const products = productStore.filteredProducts;

    const { cartStore } = useStores<{ cartStore: CartStore }>();

    useEffect(() => {
        productStore.fetchProducts();
    }, []);
    
    if (productStore.isLoading) {
        return(
            <div className="productGridBlockLoading">
                <LoadingSpinner />
            </div>
        )
    }


    return(
        <div className="productGridBlock">
            { products.length === 0 && 
            <div className="productGridEmpty">
                <CartXFill size={38} color='var(--olive-color)' />
                <div className="productFridEmptyText">
                    Ничего не найдено.
                </div>
            </div>
            }
            { products.length > 0 && 
            products.map((product, index) => {
                const hasItem = cartStore.hasCartItem(product.id);
                return(
                    <ProductCard product={product} key={'productCard_'+index}>
                        <div className="productCardChildren">
                            {hasItem &&
                            <ChangeCount product={product} />
                            }
                            {!hasItem &&
                            <AddToCartButton product={product} />
                            }
                        </div>
                    </ProductCard>
                )
            })
            }
        </div>
    )
});