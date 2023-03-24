import { ChangeEvent, CSSProperties, ReactElement } from 'react'

export type TLabelProps = {
  label?: string
  htmlFor?: string
  className?: string
  error?: string
  style?: CSSProperties
}

export type TInputEvent = ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>

export type TInputProps = {
  placeholder?: string
  className?: string
  type?: string
  style?: CSSProperties
  textarea?: boolean
  disabled?: boolean
  value?: string
  name: string
  onChange?: (e: TInputEvent) => void
  onBlur?: (e: TInputEvent) => void
  id?: string
  readOnly?: boolean
  error?: string
  label?: TLabelProps
  maxLength?: number
  height?: number
  decimals?: number
  iconButton?: ReactElement
  onIconButtonClick?: () => void
  iconOutside?: boolean
  width?: CSSProperties['width']
  iconButtonType?: 'submit' | 'reset' | 'button'
}

export type TCheckBoxProps = {
  disabled?: boolean
  style?: CSSProperties
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
  error?: string
  type: 'checkbox' | 'radio'
  value?: string
  checked?: boolean
  name: string
  className?: string
  id?: string
  label?: string | ReactElement
  htmlFor?: string
  variant?: 'main' | 'secondary'
}
