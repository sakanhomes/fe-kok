import React, { FC } from 'react'
import styled, { css } from 'styled-components'
import { NoAvatarIcon } from '../icons/NoAvatarIcon'

type TAvatarProps = {
  sizes?: 'xxs' | 'xs' | 'sm' | 'md' | 'md2' | 'lg' | 'xl' | '2xl'
  avatar?: string
  className?: string
  bordered?: boolean
  customSize?: number
}

const Wrapper = styled.div<{
  sizes: TAvatarProps['sizes']
  avatar: boolean
  bordered: boolean
  customSize?: number
}>((props) => {
  const { sizes, avatar, bordered, customSize } = props

  const hasAvatar = (padding: string) => css`
    padding: ${padding};
    border: 1px solid ${({ theme }) => theme.palette.secondary300};
  `

  const customSizeCSS = css`
    min-width: ${customSize}px;
    width: ${customSize}px;
    height: ${customSize}px;
  `

  const baseStyles = css`
    border-radius: 50%;
    ${customSize && customSizeCSS}
    svg {
      max-width: 100%;
      max-height: 100%;
    }
    img {
      object-fit: cover;
      border-radius: 50%;
      width: 100%;
      height: 100%;
    }
  `

  switch (sizes) {
    case 'xxs':
      return css`
        min-width: 28px;
        width: 28px;
        height: 28px;
        ${baseStyles}
        ${avatar && bordered && hasAvatar('3px')}
      `
    case 'xs':
      return css`
        min-width: 35px;
        width: 35px;
        height: 35px;
        ${baseStyles}
        ${avatar && bordered && hasAvatar('3px')}
      `
    case 'sm':
      return css`
        min-width: 40px;
        width: 40px;
        height: 40px;
        ${baseStyles}
        ${avatar && bordered && hasAvatar('3.5px')}
      `
    case 'md':
      return css`
        min-width: 50px;
        width: 50px;
        height: 50px;
        ${baseStyles}
        ${avatar && bordered && hasAvatar('4.5px')}
      `
    case 'md2':
      return css`
        min-width: 62px;
        width: 62px;
        height: 62px;
        ${baseStyles}
        ${avatar && bordered && hasAvatar('4.5px')}
      `
    case 'lg':
      return css`
        min-width: 76px;
        width: 76px;
        height: 76px;
        ${baseStyles}
        ${avatar && bordered && hasAvatar('7px')}
      `
    case 'xl':
      return css`
        min-width: 129px;
        width: 129px;
        height: 129px;
        ${baseStyles}
        ${avatar && bordered && hasAvatar('12px')}
      `
    case '2xl':
      return css`
        min-width: 160px;
        width: 160px;
        height: 160px;
        ${baseStyles}
        ${avatar && bordered && hasAvatar('15px')}
      `
    default:
      return baseStyles
  }
})

export const Avatar: FC<TAvatarProps> = ({
  sizes = 'xs',
  avatar,
  bordered = true,
  className,
  customSize,
}) => (
  <Wrapper
    bordered={bordered}
    className={className}
    customSize={customSize}
    avatar={!!avatar}
    sizes={sizes}
  >
    {!avatar ? <NoAvatarIcon /> : <img src={avatar} alt="" />}
  </Wrapper>
)
