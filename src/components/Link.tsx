import React from 'react'
import NextLink from 'next/link'
import { ROUTES } from '@/constants/routes'
import styled from 'styled-components'

type LinkProps = {
  type?: 'internal' | 'external'
  href?: string
  anchorStyles?: React.CSSProperties | undefined
  anchorProps?: React.AnchorHTMLAttributes<HTMLAnchorElement> | undefined
  onClick?: (e: React.SyntheticEvent) => void
}

const LinkStyled = styled('a')({
  textDecoration: 'none',
  color: 'inherit',
  WebkitTapHighlightColor: 'transparent',
})

export const Link: React.FC<LinkProps> = ({
  type = 'internal',
  href = ROUTES.HOME,
  anchorStyles,
  anchorProps,
  onClick,
  children,
}) =>
  type === 'internal' ? (
    <NextLink href={href} passHref>
      <LinkStyled onClick={onClick} style={{ ...anchorStyles }} {...anchorProps}>
        {children}
      </LinkStyled>
    </NextLink>
  ) : (
    <LinkStyled
      onClick={onClick}
      href={href}
      rel="noopener noreferrer"
      style={{ ...anchorStyles }}
      {...anchorProps}
    >
      {children}
    </LinkStyled>
  )
