import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux'; // Импортируем Provider
import { store } from './store'; // Импортируем ваш store

createRoot(document.getElementById('root')!).render(
  <Provider store={store}> {/* Оборачиваем Provider */}
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
      basename="/FRONTEND"
    >
      <App />
    </BrowserRouter>
  </Provider>
);

if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker
      .register('/FRONTEND/serviceWorker.js')
      .then((res) => console.log('Service Worker registered', res))
      .catch((err) => console.log('Service Worker not registered', err));
  });
}