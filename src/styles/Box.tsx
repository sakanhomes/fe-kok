import styled, { DefaultTheme, StyledComponent } from 'styled-components'
import {
  space,
  color,
  layout,
  grid,
  position,
  flexbox,
  FlexboxProps,
  LayoutProps,
  SpaceProps,
  ColorProps,
  GridProps,
  PositionProps,
} from 'styled-system'

type TTagType = keyof Pick<
  JSX.IntrinsicElements,
  'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'div' | 'ul' | 'ol' | 'li'
>

type TBoxProps = {
  as?: TTagType
} & LayoutProps &
  SpaceProps &
  ColorProps &
  GridProps &
  PositionProps &
  FlexboxProps

const Box: StyledComponent<TTagType, DefaultTheme, TBoxProps, never> =
  styled.div<TBoxProps>(
    {
      boxSizing: 'border-box',
    },
    space,
    color,
    layout,
    grid,
    flexbox,
    position
  )

export default Box
