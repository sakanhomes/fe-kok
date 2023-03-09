import React, { FC } from 'react'
import styled from 'styled-components'
import { Spinner } from '../Spinner'

const Wrapper = styled.div`
  width: 100%;
  min-height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const Loader: FC = () => (
  <Wrapper>
    <Spinner size={40} />
  </Wrapper>
)
