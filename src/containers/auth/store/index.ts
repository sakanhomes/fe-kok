import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { handleActionErrors } from '@/utils/handleActionErrors'
import { authorized } from '@/api/browser-api/authorized'
import { TSelector, TAsyncAction } from '@/store'
import { authApi } from '@/api/rest/auth'
import { TUserData } from '../types'

export type TInit = {
  openAuthModal: boolean
  user: TUserData | null
}

const init: TInit = {
  openAuthModal: false,
  user: null,
}

const auth = createSlice({
  name: 'auth',
  initialState: init,
  reducers: {
    setOpenModal(state, actions: PayloadAction<boolean>) {
      state.openAuthModal = actions.payload
    },
    setUser(state, actions: PayloadAction<TUserData>) {
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
  (userData: TUserData): TAsyncAction =>
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
    authorized.remove()
  } catch (e) {
    handleActionErrors({ e, dispatch })
  }
}

export const actionsAsync = { logoutAsync, logout, setUserData }
export const selectors = { authSelector }
