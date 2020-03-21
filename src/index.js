import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import GAListener from './GAListener';

ReactDOM.render(
    <BrowserRouter>
        <GAListener trackingId="UA-161475072-1">
            <App />
        </GAListener>
    </BrowserRouter>,
    document.getElementById('root')
);

serviceWorker.unregister();
