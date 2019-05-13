import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'unistore/react';
import LoadingSpinner from 'Components/ui/LoadingSpinner';

function IsochroneLoadingStatus({ className, task }) {
  return task && task.status === false && <div className={className}>
    <LoadingSpinner />
  </div>;
}

export default connect('task', null)(IsochroneLoadingStatus);

IsochroneLoadingStatus.propTypes = {
  layerRequest: PropTypes.oneOfType([
    () => null,
    PropTypes.object
  ])
};