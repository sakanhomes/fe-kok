import styled from 'styled-components'
import { TIcon } from './type'

type TSVG = {
  type?: 'stroke' | 'fill'
} & TIcon

export const SVG = styled.svg<TSVG>`
  ${({ type, color, theme }) =>
    type && `${type}: ${theme.palette[color ?? 'primary100']};`}
  transform: rotate(${({ rotate }) => rotate ?? 0}deg);
`
