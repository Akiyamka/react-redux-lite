import React from 'react';
import { connect } from 'react-redux';
import { logout } from 'Entities/currentUser';

function LogoutButton({ className, logout }) {
  return <button className={className} onClick={logout}>
    Logout
  </button>
}

export default connect(null, { logout } )(LogoutButton)