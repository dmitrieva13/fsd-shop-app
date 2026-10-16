import { observer } from 'mobx-react-lite';

import { useStores, numberToFixed } from '@/shared/lib';
import type { CartStore } from '@/entities/cart';
import { ProgressBar } from '@/shared/ui';
import { DISCOUNT_SUM_NEEDED, DISCOUNT_PERCENT } from '@/entities/cart';
import './discount-progress-bar.css';

export const DiscountProgressBar = observer(() => {
    const { cartStore } = useStores<{ cartStore: CartStore }>();

    return(
        <div className="discountProgressBar">
            <ProgressBar value={cartStore.totalSum} max={DISCOUNT_SUM_NEEDED} />
            <div className={cartStore.totalSum < DISCOUNT_SUM_NEEDED ? "discountInfo" : "discountInfo discountSuccessInfo"}>
                { cartStore.totalSum < DISCOUNT_SUM_NEEDED ? 
                `До скидки ${DISCOUNT_PERCENT}% осталось ${DISCOUNT_SUM_NEEDED - cartStore.totalSum} руб.`
                :
                `К оплате со скидкой ${numberToFixed(cartStore.totalSumDiscount, 2)} руб.`
                }
            </div>
        </div>
    )
});