export const ADD_ERROR = 'ADD_ERROR';
export function addError(data) {
  return {
    type: ADD_ERROR,
    payload: data
  }
}

export const CLEAR_ERRORS = 'CLEAR_ERRORS';
export function clearErrors(data) {
  return {
    type: CLEAR_ERRORS,
    payload: data
  }
}

