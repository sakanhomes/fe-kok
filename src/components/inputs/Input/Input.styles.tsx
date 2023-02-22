import styled, { css, CSSProperties } from 'styled-components'

export type TInputContProps = {
  error?: string
  iconOutside?: boolean
}

type TIconButton = {
  iconOutside?: boolean
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
  &:hover,
  &:focus {
    border-color: ${({ theme: { palette } }) => palette.primary400};
  }
`
export const TextArea = styled.textarea`
  width: 100%;
  resize: none;
  border: unset;
  height: 120px;
  font-weight: 400;
  font-size: 17px;
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

  return css`
    height: 38px;
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
    align-items: center;

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

    &:hover,
    &:focus {
      border: 1px solid ${props.error ? palette.danger200 : palette.primary300};
    }
  `
})

export const Input = styled.input`
  outline: none;
  box-sizing: border-box;

  &:read-only {
    pointer-events: none;
  }
`

export const IconButton = styled.div<TIconButton>((props) => {
  const isIconOutside = () => {
    if (props.iconOutside) {
      return css`
        position: absolute;
        top: 0;
        right: 17px;

        & > button {
          margin: 0;
          height: 38px;

          & > svg {
            height: 20px;
            width: 20px;
          }
        }
      `
    }
  }
  return css`
    ${isIconOutside}
  `
})
