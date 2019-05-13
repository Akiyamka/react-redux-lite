import React from 'react';
import BottomBar from 'Components/ui/BottomBar';
import AddMarkerBTN from 'Components/business/AddMarkerBTN';
import Map from 'Components/business/Map';
import NotificationBar from 'Components/ui/NotificationBar';
import RememberLastState from 'Components/business/RememberLastState';
import { REDUCER as markersInitialState } from 'Entities/markers';
import IsochroneLoadingStatus from 'Components/business/IsochroneLoadingStatus';
import TimeSlider from 'Components/business/TimeSlider';
import ErrorToast from 'Components/business/ErrorToast';

export default function MainPage() {
  return <>
    <NotificationBar>
      <IsochroneLoadingStatus />
      <ErrorToast />
      <RememberLastState storeFields={Object.keys(markersInitialState)} />
    </NotificationBar>
    <Map />
    <BottomBar>
      <TimeSlider />
      <AddMarkerBTN />
    </BottomBar>
  </>;
}