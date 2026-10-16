import { observer } from 'mobx-react-lite';
import { useStores } from '@/shared/lib';
import type { CartStore } from '@/entities/cart';
import type { Product } from '@/entities/product';
import { Button } from '@/shared/ui';
import './cancel-remove-from-cart.css';

export const CancelRemoveFromCartButton = observer((props: { product: Product }) => {
    const { cartStore } = useStores<{ cartStore: CartStore }>();

    return(
        <div className="cancelRemoveFromCartButton">
            <Button className='cancelButton' 
                onClick={() => cartStore.cancelRemovingFromCart(props.product.id)}>
                    Отменить
            </Button>
        </div>
    )
});