import React from 'react';
import { Route, Link } from 'react-router-dom';

import style from './style.styl';
import cn from 'classnames/bind';
const cx = cn.bind(style);

export default function RouteLink({ children, to, activeOnlyWhenExact }) {
  return (
    <Route
      path={to}
      exact={activeOnlyWhenExact}
    >
    {
      ({ match }) => (
        <div className={cx({ active: match })}>
          <Link to={to}>{children}</Link>
        </div>
      )
    }
    </Route>
  );
}