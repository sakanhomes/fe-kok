import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TSelector } from '@/store'
import type { TPageError } from '../types'

type TInitialState = {
  globalError: {
    hasError: boolean
    message: string | Record<string, unknown>
  }

  errorPage: TPageError
  networkError: boolean
}

const initialState: TInitialState = {
  globalError: {
    hasError: false,
    message: '',
  },
  errorPage: null,
  networkError: false,
}

const errorsState = createSlice({
  name: 'errorsState',
  initialState,
  reducers: {
    showGlobalError(
      state,
      action: PayloadAction<TInitialState['globalError']['message']>
    ) {
      state.globalError.hasError = true
      state.globalError.message = action.payload
    },
    hideGlobalError(state) {
      state.globalError = initialState.globalError
    },
    setPageError(state, action: PayloadAction<TInitialState['errorPage']>) {
      state.errorPage = action.payload
    },
    setNetworkError(state, action: PayloadAction<TInitialState['networkError']>) {
      state.networkError = action.payload
    },
  },
})

export default errorsState.reducer

const errors: TSelector<TInitialState> = (state) => state.errors

export const { actions } = errorsState
export const selectors = { errors }
