/* Polyfills features for ie */
import '@babel/polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from 'Services/store';

/* Components */
import App from 'Components/business/App';
import Login from 'Components/business/Login';

/* Redux */
import { connect } from 'react-redux';

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
