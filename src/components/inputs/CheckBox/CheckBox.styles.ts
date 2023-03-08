import { rgba } from 'emotion-rgba'
import styled, { css } from 'styled-components'

export const Label = styled.label<{ notActive?: boolean }>`
  color: ${({ theme }) => theme.palette.primary100};
  font-weight: 400;
  font-size: 17px;
  line-height: 26px;
  display: flex;
  align-items: center;
  gap: 33px;
  cursor: ${({ notActive }) => (notActive ? 'default' : 'pointer')};
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

export const SecondaryCheckbox = styled.div<{ checked: boolean }>(
  ({ checked, theme }) => {
    const baseCSS = css`
      min-width: 52px;
      max-width: 52px;
      height: 24px;
      border-radius: 40px;
      position: relative;
      :before {
        width: 28px;
        height: 28px;
        border-radius: 50%;
        background-color: ${theme.palette.primary600};
        content: '';
        display: block;
        position: absolute;
      }
    `

    const checkedCSS = css`
      background-color: ${theme.palette.accent300};
      :before {
        top: -2px;
        right: -2px;
      }
    `

    const uncheckedCSS = css`
      background-color: ${theme.palette.secondary200};
      border: 1px solid ${rgba(theme.palette.primary400, 0.25)};
      :before {
        top: -2px;
        right: calc(100% - 26px);
      }
    `

    return css`
      ${baseCSS}
      ${checked ? checkedCSS : uncheckedCSS}
    `
  }
)
