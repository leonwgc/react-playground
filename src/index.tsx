import React from 'react';
import ReactDOM from 'react-dom';
import {Provider, configureStore} from '~/redux';
import App from './App';

const store = configureStore({app: 'alcedo-demos'}, true);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.querySelector('#root')
);
