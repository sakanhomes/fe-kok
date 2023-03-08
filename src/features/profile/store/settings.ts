import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { handleActionErrors } from '@/utils/handleActionErrors'
import { TSelector, TAsyncAction } from '@/store'
import { TProlile } from '@/types/profile'
import { profileApi } from '@/api/rest/profile'
import { TFormPropsAsync } from '@/types/formik'
import { setUserData } from 'store/auth'

export type TInit = {
  profileData: TProlile | null
}

const init: TInit = {
  profileData: null,
}

const settings = createSlice({
  name: 'settings',
  initialState: init,
  reducers: {
    setProfileData(state, actions: PayloadAction<TProlile | null>) {
      state.profileData = actions.payload
    },
    resetSettings: () => init,
  },
})

// actions
export const { setProfileData, resetSettings } = settings.actions
// selectors
export const settingsSelector: TSelector<TInit> = (state) => state.settings
// reducer
export default settings.reducer

export const setProfileAsync =
  ({
    formData,
    formik,
  }: TFormPropsAsync<{ name: string; description: string }>): TAsyncAction =>
  async (dispatch) => {
    try {
      const {
        data: {
          data: { user },
        },
      } = await profileApi.set(formData)
      dispatch(setProfileData(user))
      dispatch(setUserData(user))
    } catch (e) {
      handleActionErrors({
        e,
        dispatch,
        formik,
      })
    } finally {
      formik?.setSubmitting(false)
    }
  }
