import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import MainPage from './MainPage/MainPage.jsx';

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept();
  const {whyDidYouUpdate} = require('why-did-you-update');
  whyDidYouUpdate(React);
}

const ready = () => {
  ReactDom.render(
    <Provider store={store}>
      <MainPage />
    </Provider>,
    document.getElementById('app')
  );
};

document.addEventListener("DOMContentLoaded", ready);

