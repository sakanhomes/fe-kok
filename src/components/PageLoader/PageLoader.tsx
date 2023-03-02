import React, { FC } from 'react'
import styled from 'styled-components'
import { Spinner } from '../Spinner'

const Wrapper = styled.div`
  position: fixed;
  width: 100vw;
  z-index: 9999;
  height: 100vh;
  top: 0;
  left: 0;
  background-color: ${({ theme }) => theme.palette.secondary100};
  display: flex;
  justify-content: center;
  align-items: center;
`

export const PageLoader: FC = () => (
  <Wrapper>
    <Spinner />
  </Wrapper>
)
