import Cookies from 'js-cookie'

export const locale = {
  get(): string {
    return Cookies.get('NEXT_LOCALE') ?? 'ru'
  },
}
