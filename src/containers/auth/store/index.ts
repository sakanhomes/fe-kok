import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { handleActionErrors } from '@/utils/handleActionErrors'
import { authorized } from '@/api/browser-api/authorized'
import { TSelector, TAsyncAction } from '@/store'
import { TProlile } from '@/types/profile'
import { profileApi } from '@/api/rest/profile'
import { authApi } from '../api/auth'

export type TInit = {
  openAuthModal: boolean
  user: TProlile | null
  userFetching: boolean
}

const init: TInit = {
  openAuthModal: false,
  user: null,
  userFetching: true,
}

const auth = createSlice({
  name: 'auth',
  initialState: init,
  reducers: {
    setOpenModal(state, actions: PayloadAction<boolean>) {
      state.openAuthModal = actions.payload
    },
    setUser(state, actions: PayloadAction<TProlile>) {
      state.user = actions.payload
    },
    setUserFetching(state, actions: PayloadAction<boolean>) {
      state.userFetching = actions.payload
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

const loginAsync =
  ({ address, signature }: { address: string; signature: string }): TAsyncAction =>
  async (dispatch) => {
    try {
      await authApi.login({ address, signature })
      const {
        data: { data },
      } = await profileApi.get()
      dispatch(setUserData(data.user))
    } catch (e) {
      handleActionErrors({ e, dispatch })
    }
  }

const getProfileAsync = (): TAsyncAction => async (dispatch) => {
  try {
    dispatch(actions.setUserFetching(true))
    const { data } = await profileApi.get()
    dispatch(setUserData(data.data.user))
  } catch (e) {
    handleActionErrors({ e, dispatch })
  } finally {
    dispatch(actions.setUserFetching(false))
  }
}

export const actionsAsync = {
  logoutAsync,
  loginAsync,
  logout,
  setUserData,
  getProfileAsync,
}

export const selectors = { authSelector }
