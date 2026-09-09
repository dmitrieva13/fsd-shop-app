import { observer } from 'mobx-react-lite';
import { useStores } from '@/shared/lib';
import type { CartStore } from '@/entities/cart';
import './cart-total-info.css';

export const CartTotalInfo = observer(() => {
    const { cartStore } = useStores<{ cartStore: CartStore }>();
    const totalCount = cartStore.totalCount;
    const totalSum = cartStore.totalSum;

    const getCorrectEnding = () => {
        let ending = 'ов';
        if (totalCount % 10 > 1 && totalCount % 10 < 4 && 
            (totalCount < 10 || totalCount > 20)) {
            ending = 'а';
        }
        if (totalCount % 10 === 1 && totalCount !== 11) {
            ending = '';
        }
        return ending;
    }

    return(
        <div className="cartTotalInfo">
            <div className="cartTotalInfo_Sum">
                Итого: {totalSum} руб.
            </div>
            <div className="cartTotalInfo_Count">
                В корзине {totalCount} товар{getCorrectEnding()}.
            </div>
        </div>
    )
})