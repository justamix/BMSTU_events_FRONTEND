import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux'; // Импортируем Provider
import { store } from './store'; // Импортируем ваш store

createRoot(document.getElementById('root')!).render(
  <Provider store={store}> {/* Оборачиваем Provider */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);