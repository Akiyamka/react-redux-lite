/* Polyfills features for ie */
import '@babel/polyfill';

import React from 'react';
import ReactDOM from 'react-dom';

/* Components */
import App from 'Components/business/App';

/* Redux */
import store from 'Services/store';
import { Provider } from 'unistore/react';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);
