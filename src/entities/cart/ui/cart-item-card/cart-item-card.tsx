import { ReactNode } from 'react';
import { observer } from 'mobx-react-lite';

import type { CartItem } from '@/entities/cart/';
import './cart-item-card.css'

export const CartItemCard = observer((props: {item: CartItem, children?: ReactNode}) => {

    const product = props.item.product;

    const emptyImgUrl = "https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-15.png";

    return(
        <div className="cartItemCard">
            <div className="cartItemCard_Left">
                <div className="cartItemCard_ImageBlock">
                    <img src={product.imageUrl || emptyImgUrl} 
                        className='cartItemCard_Image' />
                </div>
                <div className="cartItemCard_InfoBlock">
                    
                    <div className="cartItemCard_Title">
                        {product.name}
                    </div>
                    <div className="cartItemCard_Price">
                        {product.price} руб./шт.
                    </div>
                </div>
            </div>
            <div className="cartItemCard_Right">
                <div className="cartItemCard_Total">
                    {product.price * props.item.count} руб.
                </div>
                { props.children && 
                <div className="cartItemCard_ActionsBlock">
                    {props.children}
                </div>
                }
            </div>
        </div>
    );
});