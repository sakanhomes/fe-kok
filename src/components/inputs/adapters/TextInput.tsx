import React, { ChangeEvent } from 'react'
import useTranslation from 'next-translate/useTranslation'
import { getFieldError } from '@/utils/getFieldError'
import { TextInput as Component } from '@/components/inputs/TextInput'
import { FormikTextFieldProps } from '../types'

export const TextInput: React.FC<FormikTextFieldProps> = ({
  formik,
  onChange,
  helperText,
  ...props
}) => {
  const { t } = useTranslation('common')
  const field = formik.getFieldProps(props.name)
  const { touched, error } = formik.getFieldMeta(props.name || '')

  const handlerChange = (e: ChangeEvent<HTMLInputElement>) => {
    field.onChange(e)

    if (onChange) {
      onChange(e)
    }

    if (error) return
    formik.setFieldError(props.name || '', '')
  }

  const fieldError = getFieldError({ touched, error, t })

  return (
    <Component
      {...props}
      {...field}
      onChange={handlerChange}
      error={Boolean(fieldError)}
      helperText={fieldError || helperText}
    />
  )
}
