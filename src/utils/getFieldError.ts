import { Translate } from 'next-translate'

type TProps = {
  touched: boolean
  error?: string
  t: Translate
}

type TGetFieldError = ({ touched, error, t }: TProps) => string

export const getFieldError: TGetFieldError = ({ touched, error, t }) => {
  if (!touched || !error) return ''
  return error.includes('validation:') ? t(error) : error
}
