/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TAsyncAction, TSelector } from '@/store'
import { uploadsApi } from '@/api/rest/uploads'
import { handleActionErrors } from '@/utils/handleActionErrors'
import { CHUNK_SIZE } from '@/constants/upload'
import { TParts, TUploads } from '@/types/uploads'
import { TVideoCreateReq, videosApi } from '@/api/rest/videos'
import { TOwnerVideo } from '@/types/video'
import { TFormik } from '@/types/formik'

export type TVideoData = {
  size: number
  name: string
  duration?: number
  localLink: string
}

type TInitialState = {
  closeType: 'back' | 'close' | null
  step: 'drop' | 'form' | 'success'
  videoData: TVideoData | null
  uploads: TUploads<TParts | null> | null
  completedPercentage: number
  allChanksCreated: boolean
  uploadVideoComplete: boolean
  thumbnail: TUploads<null> | null
  video: TOwnerVideo | null
  localImage: string | null
}

const initialState: TInitialState = {
  closeType: null,
  videoData: null,
  step: 'drop',
  uploads: null,
  completedPercentage: 0,
  allChanksCreated: false,
  uploadVideoComplete: false,
  thumbnail: null,
  video: null,
  localImage: null,
}

const uploadVideo = createSlice({
  name: 'uploadVideo',
  initialState,
  reducers: {
    setVideoClosed(state, actions: PayloadAction<TInitialState['closeType']>) {
      state.closeType = actions.payload
    },
    setStep(state, actions: PayloadAction<TInitialState['step']>) {
      state.step = actions.payload
    },
    setCompletedPercentage(state, actions: PayloadAction<number>) {
      state.completedPercentage = actions.payload
    },
    setAllChunksCreated(state, actions: PayloadAction<boolean>) {
      state.allChanksCreated = actions.payload
    },
    setUploadVideoComplete(state, actions: PayloadAction<boolean>) {
      state.uploadVideoComplete = actions.payload
    },
    setVideo(state, actions: PayloadAction<TOwnerVideo>) {
      state.video = actions.payload
    },
    setVideoData(state, actions: PayloadAction<TInitialState['videoData']>) {
      state.videoData = actions.payload
      if (actions.payload?.localLink) state.step = 'form'
    },
    setUploads(state, actions: PayloadAction<TUploads<TParts | null>>) {
      state.uploads = actions.payload
    },
    setLocalImage(state, actions: PayloadAction<string>) {
      state.localImage = actions.payload
    },
    setThumbnail(state, actions: PayloadAction<TUploads<null>>) {
      state.thumbnail = actions.payload
    },
    resetUpload: () => initialState,
  },
})

export default uploadVideo.reducer

export const uploadVideoSelector: TSelector<TInitialState> = (state) => state.uploadVideo

export const {
  setVideoClosed,
  resetUpload,
  setVideoData,
  setStep,
  setUploads,
  setCompletedPercentage,
  setAllChunksCreated,
  setUploadVideoComplete,
  setThumbnail,
  setVideo,
  setLocalImage,
} = uploadVideo.actions

export const singleUploadAsync =
  (name: string, body: File, type: 'video' | 'image'): TAsyncAction =>
  async (dispatch) => {
    try {
      const {
        data: { data },
      } = await uploadsApi.uploadSingle({ name, body })
      if (type === 'video') {
        dispatch(setUploads(data.upload))
        dispatch(setAllChunksCreated(true))
        dispatch(setCompletedPercentage(100))
      }
      if (type === 'image') {
        dispatch(setLocalImage(URL.createObjectURL(body)))
        dispatch(setThumbnail(data.upload))
      }
      dispatch(setUploadVideoComplete(true))
    } catch (e) {
      handleActionErrors({ dispatch, e })
    }
  }

export const uploadVideoAsync =
  (body: File): TAsyncAction =>
  async (dispatch) => {
    const { size, name } = body

    let offset = 0
    let part = 0

    try {
      if (size >= CHUNK_SIZE) {
        // Multipart
        const { data } = await uploadsApi.createMultipart({
          name,
          size,
        })
        const totalParts = Math.ceil(size / data.data.upload.chunkSize)

        dispatch(setUploads(data.data.upload))
        const { id, chunkSize } = data.data.upload
        // Chunk uploading
        while (offset < size) {
          const chunk = body.slice(offset, offset + chunkSize)
          const { data } = await uploadsApi.uploadPart({ id, part, body: chunk })
          dispatch(
            setCompletedPercentage(
              part + 1 === totalParts ? 99 : Math.round(((part + 1) * 100) / totalParts)
            )
          )
          dispatch(setUploads(data.data.upload))
          offset += chunkSize
          part += 1
        }
        if (offset >= size) dispatch(setAllChunksCreated(true))
      } else {
        // Single
        dispatch(singleUploadAsync(name, body, 'video'))
      }
    } catch (e) {
      handleActionErrors({
        e,
        dispatch,
      })
    }
  }

export const getUploadAsync = (): TAsyncAction => async (dispatch, _store) => {
  const { uploadVideo } = _store()
  if (!uploadVideo.allChanksCreated) return
  if (uploadVideo.uploadVideoComplete) return
  if (!uploadVideo.uploads) return

  try {
    const {
      data: { data },
    } = await uploadsApi.getById(uploadVideo.uploads.id)
    dispatch(setUploads(data.upload))
    const partsValues = Object.values(data.upload.parts)
    const onlyUploadedPartsValues = partsValues.filter((part) => part === 'uploaded')
    if (partsValues.length === onlyUploadedPartsValues.length) {
      const {
        data: {
          data: { upload },
        },
      } = await uploadsApi.complete({
        id: uploadVideo.uploads.id,
      })
      dispatch(setUploadVideoComplete(true))
      dispatch(setCompletedPercentage(100))
      dispatch(setUploads(upload))
    }
  } catch (e) {
    handleActionErrors({ dispatch, e })
  }
}

export const abortAsync =
  (id: string, callback: () => void): TAsyncAction =>
  async (dispatch) => {
    try {
      await uploadsApi.abort({ id })
      dispatch(resetUpload())
      callback?.()
    } catch (e) {
      handleActionErrors({ dispatch, e })
    }
  }

export const createVideoAsync =
  (params: TVideoCreateReq, formik: TFormik, callback: () => void): TAsyncAction =>
  async (dispatch) => {
    try {
      const { data } = await videosApi.createVideo(params)
      dispatch(setVideo(data.data.video))
      if (callback) callback()
    } catch (e) {
      handleActionErrors({ dispatch, e, formik })
    } finally {
      formik.setSubmitting(false)
    }
  }
