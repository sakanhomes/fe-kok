import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { handleActionErrors } from '@/utils/handleActionErrors'
import { authorized } from '@/api/browser-api/authorized'
import { TSelector, TAsyncAction } from '@/store'
import { TProlile } from '@/types/profile'
import { profileApi } from '@/api/rest/profile'
import { AuthenticationConfig } from '@rainbow-me/rainbowkit'
import { TShortUserInfo } from '@/types/common'
import { authApi } from '../api/rest/auth'

export type TInit = {
  user: TProlile | null
  authStatus: AuthenticationConfig<string>['status']
  globalFetching: boolean
  subscriptions: TShortUserInfo[]
}

const init: TInit = {
  user: null,
  authStatus: 'unauthenticated',
  globalFetching: true,
  subscriptions: [],
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
    setSubscriptions(state, actions: PayloadAction<TShortUserInfo[]>) {
      state.subscriptions = actions.payload
    },
    setGlobalFetching(state, actions: PayloadAction<boolean>) {
      state.globalFetching = actions.payload
    },
    resetUser(state) {
      state.user = null
    },
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
  dispatch(actions.resetUser())
  dispatch(actions.setAuthStatus('unauthenticated'))
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

const getSubscriptionsAsync =
  (callback?: () => void): TAsyncAction =>
  async (dispatch) => {
    try {
      const { data } = await profileApi.getSubscriptions()
      dispatch(actions.setSubscriptions(data.data.users))
      if (callback) callback()
    } catch (e) {
      handleActionErrors({
        e,
        dispatch,
        additionalConditions: () => true,
      })
    }
  }

const getProfileAsync =
  (callback?: () => void): TAsyncAction =>
  async (dispatch) => {
    try {
      if (!authorized.get()) return dispatch(actions.setGlobalFetching(false))
      const { data } = await profileApi.get()
      dispatch(setUserData(data.data.user))
      dispatch(getSubscriptionsAsync())
      if (callback) callback()
    } catch (e) {
      handleActionErrors({
        e,
        dispatch,
        additionalConditions: () => true,
      })
    } finally {
      dispatch(actions.setGlobalFetching(false))
    }
  }

export const actionsAsync = {
  logoutAsync,
  logout,
  setUserData,
  getProfileAsync,
  getSubscriptionsAsync,
}

export const selectors = { authSelector }
