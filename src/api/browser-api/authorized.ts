export const authorized = {
  set(): void {
    localStorage.setItem('isAuthorized', 'true')
  },
  get(): string | null {
    return localStorage.getItem('isAuthorized')
  },
  remove(): void {
    localStorage.removeItem('isAuthorized')
  },
}
