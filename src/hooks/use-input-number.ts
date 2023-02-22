import { useRef } from 'react'
import { stringIsNumber } from '@/utils/string-is-number'

type CutDecimals = (val: string, decimals?: number) => string

export const cutDecimals: CutDecimals = (val, decimals) => {
  if (!decimals) return val
  const value = val.toString()
  if (value === '' || value === '-') return value
  if (!value.includes('.')) {
    return value
  }
  const decLength = value.toString().split('.')[1].length || 0
  const cutedVal = value.substring(0, value.length + decimals - decLength)
  return cutedVal
}

interface TTarget {
  target: {
    value: string
  }
}

type TProps<T> = {
  decimals?: number
  onChange?: (e: T) => void
}

type TReturn<T> = (e: T) => void

export function useInputNumber<T extends TTarget>({
  decimals,
  onChange,
}: TProps<T>): TReturn<T> {
  const lastNumberVal = useRef('')
  const onChangeNumber = (e: T) => {
    if (!onChange) return
    const lastVal = lastNumberVal.current
    let val = e.target.value
    val = val.replace(',', '.')
    if (decimals === 0) {
      val = val.replace(/\..*$/, '')
    }
    const isValid = stringIsNumber(val)
    if (!isValid && lastVal) {
      val = lastVal
      return
    }
    if (!isValid && !lastVal) {
      val = ''
      return
    }
    // replace multiple zeros
    if (/^0+$/.test(val)) {
      val = val.replace(/^0+/, '0')
    }
    // remove before zeros
    if (/^0+\d+$/.test(val)) {
      val = val.replace(/^0+/, '')
    }
    // remove before zeros (decimals)
    if (/^\d+[.]\d+$/.test(val)) {
      val = val.replace(/^0+/, '')
    }
    // add before zero if it's not there (decimals)
    if (/^[.,].+$/.test(val)) {
      val = `0${val}`
    }
    lastNumberVal.current = val
    // eslint-disable-next-line no-param-reassign
    e.target.value = cutDecimals(val, decimals)
    if (!onChange) return
    onChange(e)
  }
  return onChangeNumber
}
