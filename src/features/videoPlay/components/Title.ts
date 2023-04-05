import styled from 'styled-components'

export const Title = styled.h2`
  font-weight: 600;
  font-size: 25px;
  line-height: 38px;
  letter-spacing: 0.025em;
  text-transform: capitalize;
  color: ${({ theme }) => theme.palette.primary100};
  padding-left: 18px;
  border-left: 5px solid ${({ theme }) => theme.palette.primary100};
  margin-bottom: 24px;
`
