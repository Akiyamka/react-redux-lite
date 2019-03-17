export const USER_LOGIN_MARK = 'userAuth';
export const USER_GUEST_MARK = 'userIsGuest';

export const SET_CURRENT_USER = 'SET_CURRENT_USER';
export function setCurrentUser(user) {
  window.sessionStorage.setItem(USER_LOGIN_MARK, true);
  if (user.isGuest) window.sessionStorage.setItem(USER_GUEST_MARK, true);
  return {
    type: SET_CURRENT_USER,
    payload: user
  }
}

export const RESET_CURRENT_USER = 'RESET_CURRENT_USER';
export function resetCurrentUser() {
  window.sessionStorage.setItem(USER_LOGIN_MARK, false);
  window.sessionStorage.setItem(USER_GUEST_MARK, false);
  return {
    type: RESET_CURRENT_USER,
    payload: null
  }
}
