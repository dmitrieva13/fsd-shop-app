import { observer } from 'mobx-react-lite';
import { useStores } from '@/shared/lib';
import type { CartStore } from '@/entities/cart';
import type { Product } from '@/entities/product';
import { Button } from '@/shared/ui';
import './add-to-cart.css';

export const AddToCartButton = observer((props: { product: Product }) => {
    const { cartStore } = useStores<{ cartStore: CartStore }>();

    return(
        <div className="addToCartButton">
            <Button disabled={props.product.countLeft === 0} 
                onClick={() => cartStore.addToCart(props.product.id)}>
                    {props.product.countLeft > 0 ? 'В корзину' : 'Нет в наличии'}
            </Button>
        </div>
    )
});