import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Provider, configureStore} from 'simple-redux-store';

const store = configureStore({app: 'alcedo-demos'}, true);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.querySelector('#root')
);
