import React from 'react';
import style from './style.styl';

export default function TabsMenu({ children }) {
  return <ul className={style.tabsMenu}>
    { children }
  </ul>
}