import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'unistore/react';
import { actions } from 'Services/store';
import { Throttler } from '../../../tools/throttle';
import style from './style.styl';
import Slider from 'Components/ui/Slider';
import Card from 'Components/ui/Card';

const throttle = Throttler(100);

function generateRulerSteps({max, min, step = 10}) {
  const ruler = [];
  for (let n = min; n <= max; n += step) {
    ruler.push(n);
  }
  return ruler;
}
function TimeSlider({ legend, setLegend }) {
  /* Performance optimization - refresh ui instant, state after throttle */ 
  const [localLegend, setLocalLegend] = useState(legend);
  useEffect(() => {
    throttle(() => setLegend(localLegend));
  }, [localLegend, setLegend]);

  const { colors, max, current } = localLegend;
  const value = current / (max / 100) / 100;
  
  return colors.length > 0 ? (
    <Card size={1} maxWidth={'600px'}>
      <h2>Time (min)</h2>
      <Slider steps={colors.map(c => [1, c])}
        value={value}
        onChange={currentInProc => {
          setLocalLegend(legend => ({
            ...legend,
            current: max * (currentInProc / 100)
          }));
        }}
      />
      <div className={style.ruler}>
        { generateRulerSteps(localLegend).map(step => (
          <div key={step} className={style.rule} data-step={step}>|</div>
        )) }
      </div>
    </Card>) : null;
}

export default connect('legend', actions)(TimeSlider);

TimeSlider.defaultProps = {
  legend: {
    colors: [],
    max: 0.5
  },
  setLegend: () => { },
};

TimeSlider.propTypes = {
  legend: PropTypes.shape({
    colors: PropTypes.array.isRequired,
    max: PropTypes.number.isRequired
  }).isRequired,
  setLegend: PropTypes.func.isRequired
};