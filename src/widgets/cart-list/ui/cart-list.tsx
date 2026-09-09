import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom'

import { useStores } from '@/shared/lib';
import type { CartStore } from '@/entities/cart';
import { CartItemCard, CartTotalInfo } from '@/entities/cart';
import { ChangeCount, RemoveFromCartButton } from '@/features/change-cart-count'
import { Button, LoadingSpinner } from '@/shared/ui';
import './cart-list.css';

export const CartList = observer(() => {
    const { cartStore } = useStores<{ cartStore: CartStore }>();
    const navigate = useNavigate();

    function buyCart() {
        // fetch - make order with cart store items, decrease countLeft in product store
        navigate('/');
    }

    if (cartStore.isLoading) {
        return(
            <div className="cartListBlockLoading">
                <LoadingSpinner />
            </div>
        )
    }
    

    return(
        <div className="cartListBlock">
            { cartStore.isEmpty && 
            <div className="cartListEmpty">В корзине ничего нет.</div>
            }
            { !cartStore.isEmpty && 
            cartStore.items.map((item, index) => {
                return(
                    <CartItemCard item={item} key={'cartItemCard_'+index}>
                        <div className="cartItemCardChildren">
                            <ChangeCount product={item.product} />
                            <RemoveFromCartButton product={item.product} />
                        </div>
                    </CartItemCard>
                )
            })
            }
            { !cartStore.isEmpty && 
            <div className="totalBlock">
                <CartTotalInfo />
            </div>}
            { !cartStore.isEmpty && 
            <div className="buyButtonBlock">
                <Button className='buyButton' onClick={buyCart}>
                    Купить
                </Button>
            </div>
            }
        </div>
    )
});