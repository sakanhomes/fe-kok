import React from 'react'
import { Input } from '@/components/inputs/Input'
import { TInputEvent, TInputProps } from '@/components/inputs/types'
import { TFormik } from '@/types/formik'

type TProps = {
  formik: TFormik
} & TInputProps

export const FormikInput: React.FC<TProps> = ({ formik, onChange, ...props }) => {
  const field = formik.getFieldProps(props.name)
  const { error, touched } = formik.getFieldMeta(props.name)

  const handlerChange = (e: TInputEvent) => {
    field.onChange(e)

    if (onChange) {
      onChange(e)
    }

    if (error) return
    formik.setFieldError(props.name, '')
  }

  return (
    <Input
      {...props}
      {...field}
      onChange={handlerChange}
      error={!touched || !error ? '' : error}
    />
  )
}
