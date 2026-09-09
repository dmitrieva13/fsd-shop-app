import { observer } from 'mobx-react-lite';

import { useStores } from '@/shared/lib';
import type { CartStore } from '@/entities/cart';
import type { Product } from '@/entities/product';
import { Button } from '@/shared/ui';
import './change-count.css';

export const ChangeCount = observer((props: { product: Product }) => {
    const { cartStore } = useStores<{ cartStore: CartStore }>();
    // const { countLeft } = props.product;
    const item = cartStore.items.find(item => item.product.id === props.product.id);

    return(
        <div className="changeCountBlock">
            <Button className='increaseButton' onClick={() => cartStore.decreaseItem(props.product.id)}>
                –
            </Button>
            <div className="changeCount_Count">
                {item?.count}
            </div>
            <Button className='decreaseButton' disabled={item?.count !== undefined && item.count >= props.product.countLeft}
                onClick={() => cartStore.increaseItem(props.product.id)}>
                +
            </Button>
        </div>
    )
});