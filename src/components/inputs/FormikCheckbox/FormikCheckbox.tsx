import React, { ChangeEvent } from 'react'
import { CheckBox } from 'components/inputs/CheckBox'
import { TFormik } from '@/types/formik'
import { getFieldError } from '@/utils/getFieldError'
import useTranslation from 'next-translate/useTranslation'
import { TCheckBoxProps } from '../types'

type TProps = {
  formik: TFormik
} & TCheckBoxProps

export const FormikCheckbox: React.FC<TProps> = ({ formik, ...props }) => {
  const { t } = useTranslation('common')
  const field = formik.getFieldProps(props.name)
  const { touched, error } = formik.getFieldMeta(props.name)

  const handlerChange = (e: ChangeEvent) => {
    field.onChange(e)
  }

  const fieldError = getFieldError({ touched, error, t })

  return (
    <CheckBox
      {...props}
      {...field}
      value={props.type === 'radio' ? props.value : field.value}
      checked={props.value === field.value}
      onChange={handlerChange}
      error={fieldError}
    />
  )
}
