import { ReactNode } from 'react';
import { observer } from 'mobx-react-lite';

import type { Product } from '../model/types';
import './product-card.css';

export const ProductCard = observer((props: {product: Product, children?: ReactNode}) => {

    // const { name, price, countLeft, imageUrl } = props.product;

    const emptyImgUrl = "https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-15.png";

    return(
        <div className="productCard">
            <div className="productCard_ImageBlock">
                <img src={props.product.imageUrl || emptyImgUrl} 
                    className='productCard_Image' />
            </div>
            <div className="productCard_InfoBlock">
                <div className="productCard_Price">
                    {props.product.price} руб.
                </div>
                <div className="productCard_Title">
                    <div className="productCard_TitleText">
                        {props.product.name}
                    </div>
                </div>
                <div className="productCard_CountLeft">
                    Осталось {props.product.countLeft} шт.
                </div>
            </div>
            { props.children && 
            <div className="productCard_ActionsBlock">
                {props.children}
            </div>
            }
        </div>
    );
})