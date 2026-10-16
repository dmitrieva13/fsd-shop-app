import { createContext, useContext } from 'react';

const StoreContext = createContext<any>({});

export const StoreProvider = StoreContext.Provider;

export function useStores<T>(): T {
    const context = useContext(StoreContext);
    if (!context) {
      throw new Error('useStores должен использоваться внутри StoreProvider');
    }
    return context as T;
};
