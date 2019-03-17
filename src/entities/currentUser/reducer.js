import { SET_CURRENT_USER, RESET_CURRENT_USER, USER_LOGIN_MARK} from './actions';

const covertToBool = val => { try { return JSON.parse(val) } catch(e) { console.warn(e); return null; } };

export function currentUser(state = {
  isAuthorized: covertToBool(window.sessionStorage.getItem(USER_LOGIN_MARK))
}, action) {

  switch (action.type) {

    case SET_CURRENT_USER:
      return {
        ...action.payload
      }

    case RESET_CURRENT_USER:
      return null;

    default:
      return state;
  }
}
