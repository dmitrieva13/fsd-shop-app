import { observer } from 'mobx-react-lite';
import { useStores } from '@/shared/lib';
import type { CartStore } from '@/entities/cart';
import type { Product } from '@/entities/product';
import { Trash3 } from 'react-bootstrap-icons';
import './remove-from-cart.css';

export const RemoveFromCartButton = observer((props: { product: Product }) => {
    const { cartStore } = useStores<{ cartStore: CartStore }>();

    return(
        <div className="removeFromCartButton">
            <Trash3 size={24} color='rgba(0,0,0,0.7)' 
                onClick={() => cartStore.removeFromCart(props.product.id)} />
        </div>
    )
});