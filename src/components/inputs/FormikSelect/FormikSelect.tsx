/* eslint-disable no-nested-ternary */
import { TFormik } from '@/types/formik'
import React, { FC, ReactNode } from 'react'
import styled from 'styled-components'
import useTranslation from 'next-translate/useTranslation'
import Box from '@/components/Box'
import { Label } from '../Label'
import { TLabelProps } from '../types'
import { ISelectProps, Select } from '../Select'

export type TFormikSelectProps = {
  formik: TFormik
  name: string
  label: TLabelProps
} & ISelectProps

const ErrorComponent = styled.span`
  margin-left: 26px;
  display: block;
  margin-top: 11px;
  margin-bottom: 8px;
  color: ${({ theme }) => theme.palette.danger100};
  font-size: 14px;
  line-height: 23px;
`

export const FormikSelect: FC<TFormikSelectProps> = ({
  formik,
  name,
  label,
  id,
  ...props
}) => {
  const { t } = useTranslation('common')
  const field = formik.getFieldProps(name)
  const { touched, error } = formik.getFieldMeta(name)

  const handlerChange = (newValue: unknown) => {
    const option = newValue as { label: ReactNode; value: string }
    if (!option) return
    formik.setFieldValue(name, option.value)

    // clear error
    if (error) return
    formik.setFieldError(name, '')
  }

  const fieldError = error?.includes('validation:') ? t(error) : error
  return (
    <Box position="relative">
      {label ? (
        <Label error={error} {...label} htmlFor={id}>
          <Select
            {...props}
            {...field}
            value={
              props.options?.find((option) => {
                const formatedOption = option as { label: ReactNode; value: string }
                return formatedOption.value === field.value
              }) ?? ''
            }
            id={id}
            error={!touched || !error ? '' : error}
            onFocus={() => {
              if (!field.value) formik.setFieldError(name, 'validation:required')
            }}
            onChange={handlerChange}
          />
        </Label>
      ) : (
        <>
          <Select
            {...props}
            {...field}
            id={id}
            error={!touched || !error || props.isDisabled ? '' : error}
            onChange={handlerChange}
          />
          {formik.errors[name] && (
            <ErrorComponent>
              {!touched || !error || props.isDisabled ? '' : fieldError}
            </ErrorComponent>
          )}
        </>
      )}
    </Box>
  )
}
