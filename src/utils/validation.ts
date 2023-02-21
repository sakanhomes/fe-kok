import * as yup from 'yup'

const required = yup.string().required('validation:required')

const date = yup.string().required('validation:required')

const email = yup
  .string()
  .required('validation:required')
  .email('validation:invalid-email')

const phone = yup.string().required('validation:required')

const password = yup
  .string()
  .required('validation:required')
  .min(8, 'validation:password-min')

const repeatePassword = yup
  .string()
  .required('validation:required')
  .oneOf([yup.ref('password')], 'validation:passwords-not-match')

const repeatePasswordNew = yup
  .string()
  .required('validation:required')
  .oneOf([yup.ref('newPassword')], 'validation:passwords-not-match')

const singleCheckbox = yup.bool().oneOf([true], 'validation:required')

export const validation = {
  required,
  date,
  email,
  phone,
  password,
  repeatePassword,
  repeatePasswordNew,
  singleCheckbox,
}
