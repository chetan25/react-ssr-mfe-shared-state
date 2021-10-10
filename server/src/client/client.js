// import('./bootstrap');
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import reducers from './reducers';
import { renderRoutes } from 'react-router-config';

const initialState =  window.INITIAL_STATE;
const store = createStore(reducers, initialState, applyMiddleware(thunk));

// console.log(store.getState(), 'store');
ReactDOM.hydrate(
    <Provider store={store}>
        <BrowserRouter>
          <div>{renderRoutes(Routes)}</div>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);
