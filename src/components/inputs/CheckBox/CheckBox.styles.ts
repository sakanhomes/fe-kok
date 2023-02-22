import styled from 'styled-components'

export const Label = styled.label<{ notActive?: boolean }>`
  color: ${({ theme }) => theme.palette.primary100};
  font-weight: 400;
  font-size: 17px;
  line-height: 26px;
  ${({ notActive }) => notActive && 'opacity: 0.5;'}
  display: flex;
  align-items: center;
  gap: 20px;
  cursor: pointer;
  transition: 300ms;
  width: fit-content;
  & input {
    display: none;
  }
`

export const ErrorComponent = styled.p`
  margin-left: 26px;
  display: block;
  margin-top: 11px;
  margin-bottom: 8px;
  color: ${({ theme }) => theme.palette.danger100};
  font-size: 14px;
  line-height: 23px;
`
