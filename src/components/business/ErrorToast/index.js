import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'unistore/react';
import { actions } from 'Services/store';
import Card from 'Components/ui/Card';


function humanReadableError(rawMessage) {
  return {
    'Failed to fetch': 'Network error. Please check your connection'
  }[rawMessage];
  
}
function ErrorToast({ error }) {
  return error && error.message ? <Card borderColor="255, 188, 65">
    { humanReadableError(error.message) }
    <br></br>
    <a href="#" onClick={() => document.location.reload(true)}> Refresh page </a>
  </Card> : null;
}

export default connect('error', actions)(ErrorToast);

ErrorToast.propTypes = {
  error: PropTypes.shape({
    type: PropTypes.string,
    message: PropTypes.string
  })
};