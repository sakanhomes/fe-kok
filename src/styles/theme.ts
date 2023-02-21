import { DefaultTheme } from 'styled-components'

export const defaultColorConfig = {}

export type TTheme = 'dark'

type TThemingConfig = Record<TTheme, DefaultTheme>

const dark: DefaultTheme = {
  palette: {
    currentTheme: 'dark',
    primary100: '#110F15',
    primary200: '#242730',
    primary300: '#3F3F3F',
    primary400: '#6A6A6A',
    secondary100: '#ffffff',
    secondary200: '#D9D9D9',
    accent100: '#173456',
    accent200: '#08A0F7',
    accent300: '#6481CA',
    success100: '#0DBC9C',
    success200: '#0CD781',
    success300: '#12A969',
    danger100: '#EF3737',
    danger200: '#FD0505',
    warning: '#FC9904',
  },
}

export const theming: TThemingConfig = {
  dark,
}
