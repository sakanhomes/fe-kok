import React, { FC } from 'react'
import styled from 'styled-components'
import { TButton } from './types'

const Button = styled.button<TButton>`
  border: none;
  padding: 0;
  background-color: transparent;
  display: flex;
  gap: 10px;
`

export const BaseButton: FC<TButton> = ({
  children,
  icon,
  type = 'button',
  ...props
}) => (
  <Button type={type} {...props}>
    {icon?.place === 'prepend' && icon.el}
    {children}
    {icon?.place === 'append' && icon.el}
  </Button>
)
