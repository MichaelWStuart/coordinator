import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { logger } from 'redux-logger';

import App from './app';
import { APP_CONTAINER_SELECTOR } from '../shared/config';
import { isProd } from '../shared/util';
import rootReducer from './reducers/root';

const composeEnhancers = (isProd ? compose : window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__);
const middleware = [thunkMiddleware];
if (!isProd) middleware.push(logger);

// eslint-disable-next-line
const store = createStore(rootReducer, { polls, user }, composeEnhancers(applyMiddleware(...middleware)));

const rootEl = document.querySelector(APP_CONTAINER_SELECTOR);

const wrapApp = (AppComponent, reduxStore) =>
  <Provider store={reduxStore}>
    <BrowserRouter>
      <AppContainer>
        <AppComponent />
      </AppContainer>
    </BrowserRouter>
  </Provider>;

ReactDOM.render(wrapApp(App, store), rootEl);

if (module.hot) {
  module.hot.accept('./app', () => {
    // eslint-disable-next-line global-require
    const NextApp = require('./app').default;
    ReactDOM.render(wrapApp(NextApp, store), rootEl);
  });
}
