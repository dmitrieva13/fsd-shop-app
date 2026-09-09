import {Routes, Route} from 'react-router-dom';
import { useEffect } from 'react';
import { useStores } from '@/shared/lib';
import type { CartStore } from '@/entities/cart';
import { CatalogPage } from '@/pages/catalog-page';
import { CartPage } from '@/pages/cart-page';
import './style/app.css'


const App = () => {
    const { cartStore } = useStores<{ cartStore: CartStore }>();

    useEffect(() => {
        cartStore.fetchCartItems();
    }, []);

    return(
      <Routes>
          <Route path='/' element={<CatalogPage />} />
          <Route path='/cart' element={<CartPage />} />
      </Routes>
    )
  }
  
  export default App;