import { IPalette } from '@/styles/styled'
import { StateManagerProps } from 'react-select/dist/declarations/src/useStateManager'
import { CSSProperties } from 'styled-components'

export interface ISelectProps extends StateManagerProps {
  fullRadius?: boolean
  width?: number
  withoutBorder?: boolean
  height?: number
  zIndex?: number
  icon?: {
    color: keyof IPalette
    zIndex?: CSSProperties['zIndex']
  }
  error?: string
}
