import React from 'react';
import cn from 'classnames/bind';

import Card from 'Components/ui/Card';
import style from './style.styl';
const cx = cn.bind(style);

export default function MapButton({ className, children, onClick, active }) {
  const classes = [
    cx('mapButton', { active: active }),
    className
  ].join(' ');

  return <Card className={classes} onClick={onClick} >
    { children }
  </Card>;
}