import React, { useEffect } from 'react';
import { connect } from 'unistore/react';
import { actions } from 'Services/store';
import { addMakerMode } from 'Entities/mode/enum';
import Icon from 'Components/ui/Icon'; 
import MapButton from 'Components/ui/MapButton';
import style from './style.styl';

function AddMarkerBTN({ className, mode, switchMode }) {
  
  /* Exit from mode by ESC */
  useEffect(() => {
    const escHandler = event => event.keyCode === 27 && switchMode(null);
    document.addEventListener('keyup', escHandler, false);
    return () => document.removeEventListener('keyup', escHandler, false);
  }, [switchMode]);

  return <>
    <MapButton
      onClick={() => switchMode(mode === addMakerMode ? null : addMakerMode)}
      active={mode === addMakerMode}
    >
      <div className={style.btn}>
        <Icon name="btn_place" />
        Add place
      </div>
    </MapButton>
  </>;
}

export default connect('mode', actions)(AddMarkerBTN);