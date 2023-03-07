import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { handleActionErrors } from '@/utils/handleActionErrors'
import { authorized } from '@/api/browser-api/authorized'
import { TSelector, TAsyncAction } from '@/store'
import { TProlile } from '@/types/profile'
import { profileApi } from '@/api/rest/profile'
import { AuthenticationConfig } from '@rainbow-me/rainbowkit'
import { authApi } from '../api/rest/auth'

export type TInit = {
  user: TProlile | null
  authStatus: AuthenticationConfig<string>['status']
}

const init: TInit = {
  user: null,
  authStatus: 'unauthenticated',
}

const auth = createSlice({
  name: 'auth',
  initialState: init,
  reducers: {
    setUser(state, actions: PayloadAction<TProlile>) {
      state.user = actions.payload
    },
    setAuthStatus(state, actions: PayloadAction<TInit['authStatus']>) {
      state.authStatus = actions.payload
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
    dispatch(actions.setAuthStatus('unauthenticated'))
  } catch (e) {
    handleActionErrors({ e, dispatch })
  }
}

const getProfileAsync = (): TAsyncAction => async (dispatch) => {
  try {
    if (!authorized.get()) return
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
