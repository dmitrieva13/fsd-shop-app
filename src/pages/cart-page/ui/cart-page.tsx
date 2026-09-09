import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom'
import { CartList } from '@/widgets/cart-list';
import { Header } from '@/widgets/header';
import './cart-page.css';

export const CartPage = observer(() => {
    const navigate = useNavigate();

    return(
        <div className="cartPage">
            <Header />
            <CartList />
        </div>
    )
});