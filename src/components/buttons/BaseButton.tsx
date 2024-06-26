import React, { FC } from 'react'
import styled from 'styled-components'
import { TButton } from './types'

const Button = styled.button<TButton>`
  border: none;
  padding: 0;
  display: flex;
  gap: 10px;
  align-items: center;
  transition: 0.3s;
  :not(:disabled):hover,
  :not(:disabled):focus {
    filter: brightness(0.9);
  }
  background-color: ${({ bg, theme }) => (bg ? theme.palette[bg] : 'transparent')};
  color: ${({ color, theme }) =>
    color ? theme.palette[color] : theme.palette.primary100};
  :disabled {
    cursor: ${({ isLoading }) => (isLoading ? 'wait' : 'default')};
    filter: grayscale(0.75);
  }
  cursor: ${({ isLoading }) => (isLoading ? 'wait' : 'pointer')};
`

export const BaseButton: FC<TButton> = ({
  children,
  icon,
  type = 'button',
  ...props
}) => (
  <Button type={type} {...props} disabled={props.isLoading || props.disabled}>
    {icon?.place === 'prepend' && icon.el}
    {children}
    {icon?.place === 'append' && icon.el}
  </Button>
)
