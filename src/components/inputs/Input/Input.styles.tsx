import styled, { css, CSSProperties } from 'styled-components'

export type TInputContProps = {
  error?: string
  height?: number
}

type TTextAreaContainer = {
  height?: CSSProperties['height']
  disabled?: boolean
  error?: string
}

export const InputContainer = styled.div<{ width: CSSProperties['width'] }>`
  position: relative;
  width: ${({ width }) => width ?? '100%'};
`

export const TextAreaContainer = styled.div<TTextAreaContainer>`
  position: relative;
  padding: 14px 22px;
  border: 1px solid
    ${({ error, theme }) => (error ? theme.palette.danger100 : theme.palette.primary400)};
  border-radius: 8px;
  transition: all 0.2s linear;
  background-color: ${({ disabled, theme: { palette } }) =>
    disabled ? palette.secondary200 : 'unset'};
  margin-bottom: 10px;
  background-color: ${({ theme }) => theme.palette.secondary100};
  display: flex;
  flex-wrap: nowrap;
  gap: 14px;
  align-items: center;
  :hover,
  :focus {
    filter: brightness(0.95);
    border: 1px solid
      ${({ error, theme: { palette } }) =>
        error ? palette.danger200 : palette.primary100};
  }
`
export const TextArea = styled.textarea<TTextAreaContainer>`
  width: 100%;
  resize: none;
  border: unset;
  min-height: ${({ height }) => height ?? 120}px;
  height: auto;
  font-weight: 400;
  font-size: 14px;
  line-height: 26px;
  text-align: left;
  &:focus-visible {
    outline: unset;
  }
  &:disabled {
    background-color: ${({ theme: { palette } }) => palette.secondary200};
  }
`

export const InputCont = styled.div<TInputContProps>((props) => {
  const { palette } = props.theme
  const { height } = props

  return css`
    height: ${height ?? 38}px;
    position: relative;
    font-size: 14px;
    font-weight: 500;
    line-height: 24px;
    letter-spacing: 0;
    text-align: left;
    transition: all 0.2s linear;
    border: 1px solid ${props.error ? palette.danger100 : palette.primary400};
    border-radius: 8px;
    padding: 0 18px;
    display: flex;
    flex-wrap: nowrap;
    gap: 14px;
    align-items: center;
    background-color: ${({ theme }) => theme.palette.secondary100};
    :hover,
    :focus {
      filter: brightness(0.95);
      border: 1px solid ${props.error ? palette.danger200 : palette.primary100};
    }

    & > input {
      border: none;
      border-radius: 8px;
      background-color: unset;

      &::placeholder {
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 24px;
        letter-spacing: 0;
        color: ${palette.secondary200};
      }
    }
  `
})

export const Input = styled.input`
  outline: none;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  &:read-only {
    pointer-events: none;
  }
`

export const IconButton = styled.div`
  & > button {
    margin: 0;
    height: 100%;
  }
`
