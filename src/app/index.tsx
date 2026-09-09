import ReactDOM from 'react-dom/client'
import { rootStore } from './providers/root.store';
import { StoreProvider } from '@/shared/lib'
import 'bootstrap/dist/css/bootstrap.min.css'

import App from './App';
import {
    BrowserRouter as Router,
  } from "react-router-dom";


const root = document.getElementById('root');

    if (!root) {
        throw new Error('Не удалось найти корневой элемент #root. Убедитесь, что он есть в HTML.');
    }
  

ReactDOM.createRoot(root).render(
    <StoreProvider value={rootStore}>
        <Router>
            <App />
        </Router>
    </StoreProvider>
)