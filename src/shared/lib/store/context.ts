import { createContext, useContext } from 'react';

// Создаем чистый контекст, который ничего не знает про структуру приложения
const StoreContext = createContext<any>({});

export const StoreProvider = StoreContext.Provider;

// Универсальный хук, который теперь лежит в SHARED
export function useStores<T>(): T {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStores должен использоваться внутри StoreProvider');
  }
  return context as T;
};
