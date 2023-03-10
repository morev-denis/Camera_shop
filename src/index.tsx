import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import browserHistory from './browser-history';

import App from './components/app/app';
import HistoryRouter from './components/history-router/history-router';

import { store } from './store';

import { fetchPromoAction, fetchCamerasAction } from './store/api-actions';

store.dispatch(fetchPromoAction());
store.dispatch(fetchCamerasAction());

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <HistoryRouter basename="/Camera_shop" history={browserHistory}>
        <ToastContainer />
        <App />
      </HistoryRouter>
    </Provider>
  </React.StrictMode>,
);
