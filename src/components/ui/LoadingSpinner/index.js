import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import style from './style.styl';

export default function LoadingSpinner({ className, text, waves, delay }) {
  return <div className={cn(style.loadingSpinner, className)}>
    <div className={style.loadingSpinnerText}>{ text || 'Calculating...'}</div>
    <div className={style.sonar}>
      {
        new Array(waves).fill(0).map((_, i) => (
          <div key={i} className={style.sonarAnimationWave} style={{
            animationDelay: `${i * delay}s`
          }}></div>
        ))
      }
    </div>
  </div>;
}

LoadingSpinner.propTypes = {
  className: PropTypes.string,
  text: PropTypes.string,
  waves: PropTypes.number.isRequired,
  delay: PropTypes.number.isRequired,
};

LoadingSpinner.defaultProps = {
  waves: 3,
  delay: 0.3
};