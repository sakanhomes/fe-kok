import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { handleActionErrors } from '@/utils/handleActionErrors'
import { authorized } from '@/api/browser-api/authorized'
import { TSelector, TAsyncAction } from '@/store'
import { TProlile } from '@/types/profile'
import { profileApi } from '@/api/rest/profile'
import { authApi } from '../api/rest/api/auth'

export type TInit = {
  user: TProlile | null
}

const init: TInit = {
  user: null,
}

const auth = createSlice({
  name: 'auth',
  initialState: init,
  reducers: {
    setUser(state, actions: PayloadAction<TProlile>) {
      state.user = actions.payload
    },
    reset: () => init,
  },
})

// actions
export const { actions } = auth
// selectors
export const authSelector: TSelector<TInit> = (state) => state.auth
// reducer
export default auth.reducer

export const setUserData =
  (userData: TProlile): TAsyncAction =>
  async (dispatch) => {
    dispatch(actions.setUser(userData))
    authorized.set()
  }

const logout = (): TAsyncAction => (dispatch) => {
  authorized.remove()
  dispatch(actions.reset())
}

const logoutAsync = (): TAsyncAction => async (dispatch) => {
  try {
    await authApi.logout()
    dispatch(logout())
  } catch (e) {
    handleActionErrors({ e, dispatch })
  }
}

const getProfileAsync = (): TAsyncAction => async (dispatch) => {
  try {
    const { data } = await profileApi.get()
    dispatch(setUserData(data.data.user))
  } catch (e) {
    handleActionErrors({
      e,
      dispatch,
      additionalConditions: () => true,
    })
  }
}

export const actionsAsync = {
  logoutAsync,
  logout,
  setUserData,
  getProfileAsync,
}

export const selectors = { authSelector }
