import { observer } from 'mobx-react-lite';
import { useStores } from '@/shared/lib';
import type { CartStore } from '@/entities/cart';
import { Basket3 } from 'react-bootstrap-icons';
import './cart-icon.css';

export const CartIcon = observer((props: {color: string}) => {
    const { cartStore } = useStores< {cartStore: CartStore} >();

    return(
        <div className="cartIcon">
            {/* <div className="cartIconImage">
                <Basket3 size={24} color={props.color} />
            </div> */}
            <div className="cartIconCount">{cartStore.totalCount}</div>
        </div>
    )
})