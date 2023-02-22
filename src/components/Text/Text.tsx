import React, { CSSProperties } from 'react'
import { StyledText } from '@/components/Text/Text.styles'
import { IPalette } from '@/styles/styled'

export type TVariant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'p1'
  | 'p2'
  | 'p3'
  | 'l1'
  | 'l2'

export type TText = {
  tag?: keyof JSX.IntrinsicElements
  variant?: TVariant
  children?: React.ReactNode
  align?: CSSProperties['textAlign']
  textTransform?: CSSProperties['textTransform']
  fontStyle?: CSSProperties['fontStyle']
  margin?: CSSProperties['margin']
  color?: keyof IPalette
  onClick?: () => void
  href?: string
  target?: string
  className?: string
}

export const Text = React.forwardRef<HTMLElement, TText>((props, ref) => {
  const { tag = 'div', children, ...otherProps } = props

  return (
    <>
      {children && (
        <StyledText as={tag} ref={ref} {...otherProps}>
          {children}
        </StyledText>
      )}
    </>
  )
})

Text.displayName = 'Text'
