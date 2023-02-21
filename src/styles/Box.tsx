import styled, { DefaultTheme, StyledComponent } from 'styled-components'
import {
  space,
  color,
  layout,
  grid,
  position,
  LayoutProps,
  SpaceProps,
  ColorProps,
  GridProps,
  PositionProps,
} from 'styled-system'

type TTagType = keyof Pick<
  JSX.IntrinsicElements,
  'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'div'
>

type TBoxProps = {
  as?: TTagType
} & LayoutProps &
  SpaceProps &
  ColorProps &
  GridProps &
  PositionProps

const Box: StyledComponent<TTagType, DefaultTheme, TBoxProps, never> =
  styled.div<TBoxProps>(
    {
      boxSizing: 'border-box',
    },
    space,
    color,
    layout,
    grid,
    position
  )

export default Box
