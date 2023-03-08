import 'styled-components'

interface IPalette {
  currentTheme: 'dark' | 'light'
  primary100: string
  primary200: string
  primary300: string
  primary400: string
  primary500: string
  secondary100: string
  secondary200: string
  secondary300: string
  accent100: string
  accent200: string
  accent300: string
  success100: string
  success200: string
  success300: string
  danger100: string
  danger200: string
  warning: string
}

interface INetworkPalette {
  eth: string
  bnb: string
  polygon: string
}

declare module 'styled-components' {
  export interface DefaultTheme {
    palette: IPalette
    network: INetworkPalette
  }
}
