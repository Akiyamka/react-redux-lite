export function loginRequest(credentials) {
  return Promise.resolve({ user: 'fakeUser', isAuthorized: true })
}