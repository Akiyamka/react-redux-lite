import React, { useState } from 'react';
import { connect } from 'unistore/react';
import style from './style.styl';

/* Store */
import { login as loginUser } from 'Entities/currentUser';

function Login({ loginUser }) {
  const [password, setPassword] = useState('');
  const [login, setLogin] = useState('');

  function logIn(e) {
    e.preventDefault();
    loginUser({ login, password });
  }

  return (
    <div className={style['login-screen']}>
      <div className={style.card}>
        <div className={style.cardContent}>
          <h1>Login</h1>
          <form className={style.form} onSubmit={e => logIn(e)} >

            <div style={{ position: 'relative' }}>
              <input
                tabIndex="1"
                type="text"
                name="login"
                id="username"
                minLength="3"
                required
                placeholder="Your email"
                value={login}
                onChange={e => setLogin(e.target.value)} />
            </div>

            <input
              tabIndex="2"
              type="password"
              name="password"
              id="password"
              minLength="3"
              required
              placeholder="Your password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />

            <input
              type="submit"
              value="Log in"
              id="submit"
            />

            <label htmlFor="submit">
              <button>Log in</button>
            </label>

          </form>
        </div>
      </div>
    </div>
  );
}


export default connect(null, { loginUser })(Login);