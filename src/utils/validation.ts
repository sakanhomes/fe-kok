import { Translate } from 'next-translate'
import * as yup from 'yup'
import { AnyObject } from 'yup/lib/types'

const required = yup.string().required('validation:required')

const minWidth = (
  length: number,
  t: Translate
): yup.StringSchema<string | undefined, AnyObject, string | undefined> =>
  yup
    .string()
    .test('len', t('validation:moreThan', { length }), (val = '') => val.length > length)

const maxWidth = (
  length: number,
  t: Translate
): yup.StringSchema<string | undefined, AnyObject, string | undefined> =>
  yup
    .string()
    .test('len', t('validation:lessThan', { length }), (val = '') => val.length <= length)

const singleCheckbox = yup.bool().oneOf([true], 'validation:required')

export const validation = {
  required,
  singleCheckbox,
  minWidth,
  maxWidth,
}
