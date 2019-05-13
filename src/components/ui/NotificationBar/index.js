import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import style from './style.styl';

export default function NotificationBar({ className, children }) {
  return <div className={cn(style.topBar, className)}>
    {
      React.Children.map(children, child => (
        <div>
          {
            React.cloneElement(child, {
              className: cn(child.props.className, style.children)
            })
          }
        </div>
      ))
    }
  </div>;
}

NotificationBar.propTypes = {
  className: PropTypes.string,
  // children: PropTypes.element
};