import 'materialize-css/dist/css/materialize.min.css'
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/App';
import store from './store';

ReactDOM.render(
    <Provider store={store}><App /></Provider>,
    document.querySelector('#root')
);

console.log('stripe key is', process.env.REACT_APP_STRIPE_KEY);
console.log('env is', process.env.NODE_ENV); 