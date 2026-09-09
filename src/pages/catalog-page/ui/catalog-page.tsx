import { observer } from 'mobx-react-lite';

import { useStores } from '@/shared/lib';
import type { ProductStore } from '@/entities/product';
import { ProductGrid } from '@/widgets/products-grid';
import { Header } from '@/widgets/header';
import { SearchByName } from '@/features/search-by-name';
import './catalog-page.css';

export const CatalogPage = observer(() => {

    return(
        <div className="catalogPage">
            <Header />
            <SearchByName />
            <ProductGrid />
            
        </div>
    )
});