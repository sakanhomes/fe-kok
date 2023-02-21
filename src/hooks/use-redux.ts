import { createSelectorHook, useDispatch, useStore } from 'react-redux'
import { TRootState, TStore, TDispatch } from 'store'

export const useRedux = (): {
  select: typeof select
  dispatch: TDispatch
  store: TStore
} => {
  const select = createSelectorHook<TRootState>()
  const dispatch = useDispatch()
  const store: TStore = useStore()

  return { select, dispatch, store }
}
