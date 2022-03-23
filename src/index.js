import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import App from './App/index';
import * as serviceWorker from './serviceWorker';
import reducer from './store/reducer';
import config from './config';
import { AuthContextProvider } from './contexts/AuthContext';
import 'react-toastify/dist/ReactToastify.css';

const store = createStore(reducer);

const app = (
    <Provider store={store}>
        <AuthContextProvider>
            <BrowserRouter basename={config.basename}>
                {/* basename="/datta-able" */}
                <ToastContainer autoClose={3000} />
                <App />
            </BrowserRouter>
        </AuthContextProvider>
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
