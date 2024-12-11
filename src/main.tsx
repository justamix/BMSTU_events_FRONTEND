import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import 'bootstrap/dist/css/bootstrap.css';
import {BrowserRouter} from "react-router-dom";
import { Provider } from 'react-redux'; 
import { store } from './store'; 


ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}> {/* Оборачиваем Provider */}
    <BrowserRouter future={{
      v7_startTransition: true,
      v7_relativeSplatPath: true,
    }} basename="/">
          <App />
    </BrowserRouter>
  </Provider>
)