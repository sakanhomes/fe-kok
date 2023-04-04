import React, { useEffect, useRef } from 'react'
import { Label } from '@/components/inputs/Label'
import { stringIsNumber } from '@/utils/string-is-number'
import { useInputNumber } from '@/hooks/use-input-number'
import { TInputEvent, TInputProps } from '../types'
import * as S from './Input.styles'

export const Input: React.FC<TInputProps> = ({
  placeholder,
  type = 'text',
  style,
  textarea,
  disabled,
  value,
  name,
  onChange,
  onBlur,
  id,
  additionalContent,
  readOnly,
  error,
  label,
  maxLength,
  decimals,
  iconButton = undefined,
  onIconButtonClick,
  height,
  className,
  width,
}) => {
  // type number logic
  const inputElem = useRef<HTMLInputElement | null>(null)
  const lastNumberVal = useRef('')

  useEffect(() => {
    if (type !== 'number') return
    if (!inputElem.current) return
    const isValid = stringIsNumber(inputElem.current.value)
    if (!isValid) return
    lastNumberVal.current = inputElem.current.value
  }, [inputElem.current])

  const onChangeNumber = useInputNumber<TInputEvent>({ decimals, onChange })

  if (textarea) {
    return (
      <S.InputContainer width={width}>
        <Label {...label} error={error} htmlFor={id}>
          <S.TextAreaContainer error={error} className={className} disabled={disabled}>
            {additionalContent?.place === 'prepend' && additionalContent?.el}
            <S.TextArea
              value={value}
              disabled={disabled}
              height={height}
              placeholder={placeholder}
              style={style}
              name={name}
              onChange={onChange}
              onBlur={onBlur}
              id={id}
              readOnly={readOnly}
              maxLength={maxLength}
            />
            {additionalContent?.place === 'append' && additionalContent?.el}
            {iconButton && (
              <S.IconButton onClick={onIconButtonClick}>{iconButton}</S.IconButton>
            )}
          </S.TextAreaContainer>
        </Label>
      </S.InputContainer>
    )
  }

  return (
    <S.InputContainer width={width}>
      <Label {...label} error={error} htmlFor={id}>
        <S.InputCont className={className} height={height} error={error}>
          {additionalContent?.place === 'prepend' && additionalContent?.el}
          <S.Input
            value={value}
            disabled={disabled}
            placeholder={placeholder}
            type={type === 'text' || type === 'number' ? 'text' : type}
            style={style}
            name={name}
            onChange={type === 'number' ? onChangeNumber : onChange}
            onBlur={onBlur}
            id={id}
            readOnly={readOnly}
          />
          {additionalContent?.place === 'append' && additionalContent?.el}
          {iconButton && (
            <S.IconButton onClick={onIconButtonClick}>{iconButton}</S.IconButton>
          )}
        </S.InputCont>
      </Label>
    </S.InputContainer>
  )
}
