import React from 'react';
import cn from 'classnames';
import style from './style.styl';

export default function BottomBar({ className, children }) {
  return <div className={cn(style.bottomBar, className)}>
    { children }
  </div>;
}