import React, { ChangeEvent } from 'react'
import { CheckBox } from 'components/inputs/CheckBox'
import { TFormik } from '@/types/formik'
import { TCheckBoxProps } from '../types'

type TProps = {
  formik: TFormik
} & TCheckBoxProps

export const FormikCheckbox: React.FC<TProps> = ({ formik, ...props }) => {
  const field = formik.getFieldProps(props.name)
  const { touched, error } = formik.getFieldMeta(props.name)

  const handlerChange = (e: ChangeEvent) => {
    field.onChange(e)

    // clear error
    if (error) return
    formik.setFieldError(props.name, '')
  }

  return (
    <CheckBox
      {...props}
      {...field}
      onChange={handlerChange}
      error={!touched || !error ? '' : error}
    />
  )
}
