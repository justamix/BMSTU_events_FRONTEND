import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import 'bootstrap/dist/css/bootstrap.css';
import {BrowserRouter} from "react-router-dom";

createRoot(document.getElementById('root')!).render(
  <BrowserRouter future={{
    v7_startTransition: true,
    v7_relativeSplatPath: true,
  }} basename="/FRONTEND">
        <App />
  </BrowserRouter>

)

if ("serviceWorker" in navigator) {
    window.addEventListener("load", function() {
      navigator.serviceWorker
      .register('/FRONTEND/serviceWorker.js')
      .then((res) => console.log('Service Worker registered', res))
      .catch((err) => console.log('Service Worker not registered', err));
    })
  }