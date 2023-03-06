import { Theme } from '@rainbow-me/rainbowkit'
import { rgba } from 'emotion-rgba'
import { DefaultTheme } from 'styled-components'

export const rainbowkitStyles = ({ palette }: DefaultTheme): Theme => ({
  blurs: {
    modalOverlay: rgba(palette.primary100, 0.4),
  },
  colors: {
    accentColor: palette.accent300,
    accentColorForeground: palette.secondary100,
    actionButtonBorder: 'transparent',
    actionButtonBorderMobile: 'transparent',
    actionButtonSecondaryBackground: palette.secondary200,
    closeButton: palette.primary100,
    closeButtonBackground: palette.secondary200,
    connectButtonBackground: palette.danger200,
    connectButtonBackgroundError: rgba(palette.danger200, 0.5),
    connectButtonInnerBackground: palette.secondary200,
    connectButtonText: palette.primary300,
    connectButtonTextError: palette.danger200,
    connectionIndicator: palette.secondary200,
    downloadBottomCardBackground: palette.secondary200,
    downloadTopCardBackground: palette.secondary200,
    error: palette.danger200,
    generalBorder: palette.secondary200,
    generalBorderDim: palette.secondary200,
    menuItemBackground: palette.secondary200,
    modalBackdrop: rgba(palette.primary100, 0.4),
    modalBackground: palette.secondary100,
    modalBorder: 'transparent',
    modalText: palette.primary100,
    modalTextDim: palette.primary100,
    modalTextSecondary: palette.primary100,
    profileAction: palette.accent300,
    profileActionHover: palette.accent300,
    profileForeground: palette.secondary200,
    selectedOptionBorder: 'transparent',
    standby: palette.primary100,
  },
  fonts: {
    body: 'Poppins',
  },
  radii: {
    actionButton: '8px',
    connectButton: '10px',
    menuButton: '6px',
    modal: '10px',
    modalMobile: '10px',
  },
  shadows: {
    connectButton: palette.primary400,
    dialog: palette.primary400,
    profileDetailsAction: palette.primary400,
    selectedOption: palette.primary400,
    selectedWallet: palette.accent200,
    walletLogo: palette.primary400,
  },
})
