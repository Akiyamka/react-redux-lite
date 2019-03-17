import React from 'react';
import style from './style.styl';

export default function Header({ title, menu, children }) {
  return <>
  <header className={style.header}>
    <h1>{title}</h1>
    <div className={style.buttonsDock}>
    { children }
    </div>
  </header>
  <div className={style.tabs}>{ menu }</div>
  </>
}