/* Polyfills features for ie */
import '@babel/polyfill';

import React from 'react';
import ReactDOM from 'react-dom';

/* Components */
import App from 'Components/business/App';
import Login from 'Components/business/Login';

/* Redux */
import store from 'Services/store';
import { Provider, connect } from 'unistore/react';

function loginResolver({ currentUser }) {
  const isAuthorized = currentUser && currentUser.isAuthorized;
  return isAuthorized ? <App /> : <Login />;
}

const Authenticator = connect(state => ({
  currentUser: state.currentUser
}))(loginResolver);

ReactDOM.render(
  <Provider store={store}>
    <Authenticator />
  </Provider>,
  document.getElementById('app')
);
