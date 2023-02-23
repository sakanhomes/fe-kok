import React, { FC } from 'react'
import styled, { css } from 'styled-components'
import { NoAvatarIcon } from '../icons/NoAvatarIcon'

type TAvatarProps = {
  sizes?: 'xs' | 'sm' | 'md' | 'lg'
  avatar?: string
}

const Wrapper = styled.div<{ sizes: TAvatarProps['sizes'] }>((props) => {
  const { sizes } = props

  const baseStyles = css`
    border-radius: 50%;
    svg {
      max-width: 100%;
      max-height: 100%;
    }
  `

  switch (sizes) {
    case 'xs':
      return css`
        ${baseStyles}
        width: 35px;
        height: 35px;
      `
    case 'sm':
      return css`
        ${baseStyles}
        width: 40px;
        height: 40px;
      `
    case 'md':
      return css`
        ${baseStyles}
        width: 62px;
        height: 62px;
      `
    case 'lg':
      return css`
        ${baseStyles}
        width: 76px;
        height: 76px;
      `
    default:
      return baseStyles
  }
})

export const Avatar: FC<TAvatarProps> = ({ sizes = 'xs', avatar }) => (
  <Wrapper sizes={sizes}>{!avatar && <NoAvatarIcon />}</Wrapper>
)
