import { IPalette } from '@/styles/styled'
import React, { FC } from 'react'
import styled from 'styled-components'
import { Spinner } from '../../Spinner'

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 9999;
  background-color: ${({ theme }) => theme.palette.secondary100};
`

export const GlobalLoader: FC<{ color?: keyof IPalette }> = ({ color }) => (
  <Wrapper>
    <Spinner size={100} color={color} />
  </Wrapper>
)
