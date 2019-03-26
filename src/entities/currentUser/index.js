import { loginRequest } from './api';
import { addError } from './../errors';

const REDUCER = 'currentUser';

export async function login(state, credentials) {
  try {
    const currentUser = await loginRequest(credentials);
    rememberUser(currentUser);
    return { [REDUCER]: currentUser };
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn(error);
    return addError(state, error.message);
  }
}

export function logout() {
  forgotUser();
  return { [REDUCER]: null };
}

export const USER_LOGIN_MARK = 'userAuth';
export const USER_GUEST_MARK = 'userIsGuest';

function rememberUser(user) {
  window.sessionStorage.setItem(USER_LOGIN_MARK, true);
  if (user.isGuest) window.sessionStorage.setItem(USER_GUEST_MARK, true);
}

function forgotUser() {
  window.sessionStorage.setItem(USER_LOGIN_MARK, false);
  window.sessionStorage.setItem(USER_GUEST_MARK, false);
}