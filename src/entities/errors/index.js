const REDUCER = 'error';

export function addError(store, message) {
  return { [REDUCER]: message };
}

export function clearErrors() {
  return { [REDUCER]: null };
}

