import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import App from './App/index';
import reducer from './store/reducer';
import config from './config';
import { AuthContextProvider } from './contexts/AuthContext';
import 'react-toastify/dist/ReactToastify.css';
import './assets/scss/index.css';

const store = createStore(reducer);

const app = (
    <Provider store={store}>
        <AuthContextProvider>
            <BrowserRouter basename={config.basename}>
                <ToastContainer autoClose={3000} />
                <App />
            </BrowserRouter>
        </AuthContextProvider>
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
