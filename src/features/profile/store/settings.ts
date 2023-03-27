import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { handleActionErrors } from '@/utils/handleActionErrors'
import { TSelector, TAsyncAction } from '@/store'
import { profileApi } from '@/api/rest/profile'
import { TFormPropsAsync } from '@/types/formik'
import { setUserData } from 'store/auth'
import { TMeSettings } from '@/types/settings'
import { uploadsApi } from '@/api/rest/uploads'
import { TProlile } from '@/types/profile'

export type TInit = {
  profileData: TProlile | null
  imageLocal: {
    avatar?: string
    bg?: string
  } | null
  notifications: TMeSettings | null
}

const init: TInit = {
  profileData: null,
  notifications: null,
  imageLocal: null,
}

const settings = createSlice({
  name: 'settings',
  initialState: init,
  reducers: {
    setProfileData(state, actions: PayloadAction<TProlile | null>) {
      state.profileData = actions.payload
    },
    setLocalImage(state, actions: PayloadAction<TInit['imageLocal']>) {
      state.imageLocal = actions.payload
    },
    setNotifications(state, actions: PayloadAction<TMeSettings>) {
      state.notifications = actions.payload
    },
    resetSettings: () => init,
  },
})

// actions
export const { setProfileData, resetSettings, setNotifications, setLocalImage } =
  settings.actions
// selectors
export const settingsSelector: TSelector<TInit> = (state) => state.settings
// reducer
export default settings.reducer

export const setProfileAsync =
  ({
    formData: { name, description },
    formik,
  }: TFormPropsAsync<{ name: string; description: string }>): TAsyncAction =>
  async (dispatch, _store) => {
    const { auth, settings } = _store()
    try {
      const {
        data: {
          data: { user },
        },
      } = await profileApi.set({
        description,
        name: auth.user?.name ? undefined : name,
        profileImageUploadId: settings.imageLocal?.avatar
          ? settings.profileData?.profileImage
          : undefined,
        backgroundImageUploadId: settings.imageLocal?.bg
          ? settings.profileData?.backgroundImage
          : undefined,
      })
      dispatch(setProfileData(user))
      dispatch(setUserData(user))
      dispatch(setLocalImage(null))
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

export const getNotificationsAsync = (): TAsyncAction => async (dispatch) => {
  try {
    const {
      data: {
        data: { settings },
      },
    } = await profileApi.getSettings()
    dispatch(setNotifications(settings))
  } catch (e) {
    handleActionErrors({
      e,
      dispatch,
    })
  }
}

export const setNotificationsAsync =
  ({ formData, formik }: TFormPropsAsync<TMeSettings>): TAsyncAction =>
  async (dispatch) => {
    try {
      const {
        data: {
          data: { settings },
        },
      } = await profileApi.setSettings(formData)
      dispatch(setNotifications(settings))
    } catch (e) {
      handleActionErrors({
        e,
        dispatch,
      })
    } finally {
      formik?.setSubmitting(false)
    }
  }

export const uploadImageAsync =
  (
    body: File,
    callback?: () => void,
    type: 'bg' | 'avatar' | undefined = 'bg'
  ): TAsyncAction =>
  async (dispatch, store) => {
    const { settings } = store()
    try {
      if (!settings.profileData) return
      const {
        data: { data },
      } = await uploadsApi.uploadSingle({ name: body.name, body })
      if (type === 'bg') {
        dispatch(
          setProfileData({ ...settings.profileData, backgroundImage: data.upload.id })
        )
      }
      if (type === 'avatar') {
        dispatch(
          setProfileData({ ...settings.profileData, profileImage: data.upload.id })
        )
      }
      dispatch(
        setLocalImage({ ...settings.imageLocal, [type]: URL.createObjectURL(body) })
      )
      callback?.()
    } catch (e) {
      handleActionErrors({ dispatch, e })
    }
  }
