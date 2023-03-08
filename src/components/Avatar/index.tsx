import React, { FC } from 'react'
import styled, { css } from 'styled-components'
import { NoAvatarIcon } from '../icons/NoAvatarIcon'

type TAvatarProps = {
  sizes?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  avatar?: string
  className?: string
}

const Wrapper = styled.div<{ sizes: TAvatarProps['sizes']; avatar: boolean }>((props) => {
  const { sizes, avatar } = props

  const hasAvatar = css`
    padding: 9%;
    border: 1px solid ${({ theme }) => theme.palette.secondary200};
  `

  const baseStyles = css`
    border-radius: 50%;
    ${avatar && hasAvatar}
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
        width: 50px;
        height: 50px;
      `
    case 'lg':
      return css`
        ${baseStyles}
        width: 76px;
        height: 76px;
      `
    case 'xl':
      return css`
        ${baseStyles}
        width: 129px;
        height: 129px;
      `
    case '2xl':
      return css`
        ${baseStyles}
        width: 160px;
        height: 160px;
      `
    default:
      return baseStyles
  }
})

export const Avatar: FC<TAvatarProps> = ({ sizes = 'xs', avatar, className }) => (
  <Wrapper className={className} avatar={!!avatar} sizes={sizes}>
    {!avatar && <NoAvatarIcon />}
  </Wrapper>
)
