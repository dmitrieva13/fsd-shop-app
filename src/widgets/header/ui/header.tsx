import { useLocation, useNavigate } from 'react-router-dom';
import { CartIcon } from '@/entities/cart';
import './header.css';

export const Header = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const path = location.pathname;

    return(
        <div className="header">
            <div className={path === '/' ? "headerItem activeHeaderItem" : "headerItem"}
            onClick={() => navigate('/')}>
                Каталог
            </div>
            <div className={path === '/cart' ? "headerItem activeHeaderItem" : "headerItem"}
            onClick={() => navigate('/cart')}>
                Корзина
                <CartIcon color={path === '/cart' ? "var(--bg-color)" : "var(--primary-color)"} />
            </div>
        </div>
    )
};