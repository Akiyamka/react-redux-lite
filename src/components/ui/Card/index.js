import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import style from './style.styl';

export default function Card({
  className,
  children,
  onClick,
  size,
  maxWidth,
  borderColor,
}) {
  const styleOptions = { flex: size };
  if (maxWidth) styleOptions.maxWidth = maxWidth;
  if (borderColor) styleOptions.boxShadow = `0 0 0 4px rgba(${borderColor},0.2), 0 0 2px 1px rgba(${borderColor}, 1)`;
  return <div onClick={onClick} className={cn(style.card, className)} style={styleOptions}>
    { children }
  </div>;
} 


Card.defaultProps = {
  size: 'unset',
};

Card.propTypes = {
  className: PropTypes.string,
  children: PropTypes.any,
  onClick: PropTypes.func,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  maxWidth: PropTypes.string,
  borderColor: PropTypes.string
};