import React from 'react';
import style from './style.styl';

export default function BaseLayout({ children }) {
  return <div className={style.baseLayout}>
    { children }
  </div>
}