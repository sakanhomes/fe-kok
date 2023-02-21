import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { handleActionErrors } from '@/utils/handleActionErrors'
import { authorized } from '@/api/browser-api/authorized'
import { TSelector, TAsyncAction } from '@/store'
import { apiUser } from '../api'
import { TUser, TUserData } from '../types'

export type TInit = {
  userFetching: boolean
  user: TUser | null
}

const init: TInit = {
  userFetching: true,
  user: null,
}

const userState = createSlice({
  name: 'user',
  initialState: init,
  reducers: {
    setUser(state, action: PayloadAction<TUserData>) {
      if (action.payload.user) {
        state.user = action.payload.user
        state.userFetching = false
      }
    },
    setUserFetching(state, action: PayloadAction<boolean>) {
      state.userFetching = action.payload
    },
    removeUser(state) {
      state.user = null
    },
    reset: () => init,
  },
})

// actions
export const { actions } = userState
// selectors
export const user: TSelector<TInit> = (state) => state.user
// reducer
export default userState.reducer

export const setUserData =
  (userData: TUserData): TAsyncAction =>
  async (dispatch) => {
    dispatch(actions.setUser(userData))
    authorized.set()
  }

export const getProfile = (): TAsyncAction => async (dispatch) => {
  try {
    if (!authorized.get()) return dispatch(actions.setUserFetching(false))

    const { data } = await apiUser.getProfile()
    dispatch(actions.setUser({ user: data }))
  } catch (e) {
    dispatch(actions.setUserFetching(false))
    handleActionErrors({ e, dispatch })
  }
}

const logout = (): TAsyncAction => (dispatch) => {
  authorized.remove()
  dispatch(actions.removeUser())
}

const logoutAsync = (): TAsyncAction => async (dispatch) => {
  try {
    await apiUser.logout()
    authorized.remove()
    dispatch(actions.removeUser())
  } catch (e) {
    handleActionErrors({ e, dispatch })
  }
}

export const actionsAsync = { logoutAsync, logout, getProfile, setUserData }
export const selectors = { user }
