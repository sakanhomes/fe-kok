import { TFormik } from '@/types/formik'
import { TextFieldProps } from '@mui/material'
import { ChangeEvent } from 'react'

export type FormikTextFieldProps = {
  formik: TFormik
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
} & TextFieldProps
