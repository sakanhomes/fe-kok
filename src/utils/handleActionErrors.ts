import axios from 'axios'
import { FormikErrors, FormikHelpers } from 'formik'
import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from '@reduxjs/toolkit'
import { ERROR_STATUS } from '@/constants/error-status'
import { TRootState } from '@/store'
import { ERROR_CODES } from '@/constants/error-codes'
import { actions } from '@/containers/errors'

export type TResponse<M> = {
  message: M
  error?: typeof ERROR_CODES[keyof typeof ERROR_CODES]
}

type THandleActionErrorProps<M> = {
  e: unknown
  dispatch: ThunkDispatch<TRootState, unknown, AnyAction>
  additionalConditions?: (status: number, data: TResponse<M>) => boolean | void
  formik?: FormikHelpers<any>
}

export function handleActionErrors<M = string>({
  e,
  dispatch,
  additionalConditions,
  formik,
}: THandleActionErrorProps<M>): void {
  if (formik) {
    formik.setSubmitting(false)
  }

  if (!axios.isAxiosError<TResponse<M | FormikErrors<any>>>(e) || !e.response) return

  const { status, data } = e.response
  const { message } = data

  if (axios.isCancel(e)) {
    return
  }

  if (formik && status === ERROR_STATUS.VALIDATION && typeof message === 'object') {
    formik.setErrors(message)
    return
  }

  if (additionalConditions) {
    const hasReturn = additionalConditions(status, data as TResponse<M>)

    if (hasReturn) return
  }

  dispatch(actions.showGlobalError(message as any))
}
