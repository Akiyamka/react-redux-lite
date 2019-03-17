import {
  ADD_ERROR,
  CLEAR_ERRORS,
} from './actions';

export function errors(state = {}, action) {
  switch (action.type) {

    case ADD_ERROR:
      return {
        ...action.payload
      }

    case CLEAR_ERRORS:
      return {
        ...action.payload
      }


    default:
      return state;
  }
}
