import { setCurrentUser, resetCurrentUser } from './actions';
import { addError } from 'Entities/errors';

/* Login */
export function login(credentials) {
  return async (dispatch, getState, { loginRequest }) => {
    try {
      const currentUser = await loginRequest(credentials);
      dispatch(setCurrentUser(currentUser))
    } catch (error) {
      dispatch(addError(error))
    }
  }
}

export function logout() {
  return dispatch => {
    dispatch(resetCurrentUser())
  }
}