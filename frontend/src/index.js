import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import { disableReactDevTools } from '@fvilers/disable-react-devtools';
import InactiveUser from './components/InactiveUser';

disableReactDevTools();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <BrowserRouter>
    <Routes>
      <Route path='/*' element={<App />}></Route>
    </Routes>
    <InactiveUser/>
    </BrowserRouter>
    </Provider>
  </React.StrictMode>
);