import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import store from 'Services/store';
import MapButton from 'Components/ui/MapButton';

function isEmpty(item) {
  if (Array.isArray(item)) {
    return item.length === 0;
  }

  if (typeof item === 'function') {
    // eslint-disable-next-line no-console
    console.log('Why are you store function? 0_o');
    return false;
  }

  if (Object(item) === item) {
    return Object.keys.length === 0;
  }

  return !!item;
}

function createNewSnapshot(state, fieldsForSave) {
  const newSnapShot = {};
  fieldsForSave.forEach(field => {
    newSnapShot[field] = state[field];
  });
  return newSnapShot;
}

function haveSomethingUseful(obj, usefulIFields) {
  if (!obj || !usefulIFields) return;
  return usefulIFields.some(f => !isEmpty(obj[f]));
}

function RememberLastState({ storeFields, className }) {
  const STORAGE_NAME = 'lastState';
  const [userChoice, setUserChoice] = useState(
    haveSomethingUseful(
      JSON.parse(localStorage.getItem(STORAGE_NAME)), storeFields
    ) ? undefined : false
  );

  const restore = () => {
    setUserChoice(true);
    try {
      const restoredState = JSON.parse(localStorage.getItem(STORAGE_NAME));
      store.setState(restoredState);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Restore failed, reason:', error);
    }
  };

  useEffect(() => {
    const unsubscribe = store.subscribe(state => {
      if (userChoice === undefined) {
        if (haveSomethingUseful(state, storeFields)) {
          // localStorage.removeItem(STORAGE_NAME);
          setUserChoice(false);
          const newSnapShot = createNewSnapshot(state, storeFields);
          localStorage.setItem(STORAGE_NAME, JSON.stringify(newSnapShot));
        }
      } else {
        const newSnapShot = createNewSnapshot(state, storeFields);
        localStorage.setItem(STORAGE_NAME, JSON.stringify(newSnapShot));
      }


    });
    return unsubscribe;
  });

  return userChoice === undefined ? <div onClick={restore} className={className}>
    <MapButton>
      Restore last session?
    </MapButton>
  </div> : null;
}

export default RememberLastState;

RememberLastState.propTypes = {
  storeFields: PropTypes.arrayOf(PropTypes.string).isRequired
};


RememberLastState.defaultProps = {
  storeFields: []
};