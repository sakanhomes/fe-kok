import '@mui/material/styles'

declare module '@mui/material/styles' {
  interface Palette {
    custom: {
      orange?: string
      black?: string
    }
  }
  interface PaletteOptions {
    custom: {
      orange?: string
      black?: string
    }
  }
}
