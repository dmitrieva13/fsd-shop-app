import { useState, useMemo, useEffect } from 'react';
import { observer } from 'mobx-react-lite';

import { useStores } from '@/shared/lib';
import type { ProductStore } from '@/entities/product';
import { Input } from '@/shared/ui';
import { debounce } from '@/shared/lib';
import './search-by-name.css';

export const SearchByName = observer(() => {
    const { productStore } = useStores<{ productStore: ProductStore }>();
    const [value, setValue] = useState(productStore.searchStr || '');

    useEffect(() => {
        setValue(productStore.searchStr);
      }, [productStore.searchStr]);

    function search(searchStr: string) {
        productStore.setSearchStr(searchStr);
    }

    const debouncedSearch = useMemo(() => debounce(search, 500),
        [productStore]
      );

    function handleChange(context: any, searchStr: string) {
        setValue(searchStr);
        debouncedSearch(searchStr);
    }

    function handleClear() {
        setValue('');
        productStore.setSearchStr('');
    }

    return(
        <div className="searchByName">
            <Input value={value} placeholder='Введите название товара'
                onChange={e => handleChange(this, e.target.value)}
                onClear={handleClear}>
            </Input>
        </div>
    )
});