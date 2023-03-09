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

  const hasAvatar = (padding: string) => css`
    padding: ${padding};
    border: 1px solid ${({ theme }) => theme.palette.secondary200};
  `

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
        ${avatar && hasAvatar('3px')}
      `
    case 'sm':
      return css`
        ${baseStyles}
        width: 40px;
        height: 40px;
        ${avatar && hasAvatar('3.5px')}
      `
    case 'md':
      return css`
        ${baseStyles}
        width: 50px;
        height: 50px;
        ${avatar && hasAvatar('4.5px')}
      `
    case 'lg':
      return css`
        ${baseStyles}
        width: 76px;
        height: 76px;
        ${avatar && hasAvatar('7px')}
      `
    case 'xl':
      return css`
        ${baseStyles}
        width: 129px;
        height: 129px;
        ${avatar && hasAvatar('12px')}
      `
    case '2xl':
      return css`
        ${baseStyles}
        width: 160px;
        height: 160px;
        ${avatar && hasAvatar('15px')}
      `
    default:
      return baseStyles
  }
})

export const Avatar: FC<TAvatarProps> = ({ sizes = 'xs', avatar, className }) => (
  <Wrapper className={className} avatar={!!avatar} sizes={sizes}>
    {!avatar ? <NoAvatarIcon /> : <img src={avatar} alt="" />}
  </Wrapper>
)
