import React from 'react';
import ReactDOM from 'react-dom';
import {ToastContainer} from 'react-toastify';
import {Provider} from 'react-redux';
import {store} from './store/store';
import HistoryRouter from './components/history-router';
import browserHistory from './services/browser-history';
import {fetchGuitarsActions, fetchPriceMin, fetchPriceMax} from './store/api-actions';
import App from './components/app/app';
import 'react-toastify/dist/ReactToastify.css';

store.dispatch(fetchPriceMin());
store.dispatch(fetchPriceMax());
store.dispatch(fetchGuitarsActions());

ReactDOM.render(
  <React.StrictMode>
    <Provider store = {store}>
      <ToastContainer theme={'dark'} />
      <HistoryRouter history={browserHistory}>
        <App />
      </HistoryRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
