import { configureStore, ThunkAction, AnyAction } from '@reduxjs/toolkit'
import errorsReducer from '@/containers/errors/store'
import auth from 'store/auth'

const store = configureStore({
  reducer: {
    auth,
    errors: errorsReducer,
  },
})

export default store

export type TStore = typeof store
export type TRootState = ReturnType<typeof store.getState>
export type TDispatch = typeof store.dispatch
export type TAsyncAction = ThunkAction<void, TRootState, unknown, AnyAction>
export type TSelector<P> = (s: TRootState) => P
