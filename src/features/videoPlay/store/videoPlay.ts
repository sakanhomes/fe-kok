import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { handleActionErrors } from '@/utils/handleActionErrors'
import { TSelector, TAsyncAction } from '@/store'
import { TVideo } from '@/types/video'
import { videosApi } from '@/api/rest/videos'

export type TInit = {
  id: string | null
  video: TVideo | null
  videoFetching: boolean
}

const init: TInit = {
  id: null,
  video: null,
  videoFetching: true,
}

const videoPlay = createSlice({
  name: 'videoPlay',
  initialState: init,
  reducers: {
    setVideoId(state, actions: PayloadAction<string>) {
      state.id = actions.payload
    },
    setVideo(state, actions: PayloadAction<TVideo>) {
      state.video = actions.payload
    },
    setVideoFetching(state, actions: PayloadAction<boolean>) {
      state.videoFetching = actions.payload
    },
    resetSettings: () => init,
  },
})

// actions
export const { setVideoId, setVideo, setVideoFetching, resetSettings } = videoPlay.actions
// selectors
export const videoPlaySelector: TSelector<TInit> = (state) => state.videoPlay
// reducer
export default videoPlay.reducer

export const getVideoAsync =
  (id: string): TAsyncAction =>
  async (dispatch, _store) => {
    const { videoPlay } = _store()
    try {
      if (!videoPlay.videoFetching) dispatch(setVideoFetching(true))
      const {
        data: {
          data: { video },
        },
      } = await videosApi.getVideo(id)
      dispatch(setVideo(video))
    } catch (e) {
      handleActionErrors({
        e,
        dispatch,
      })
    } finally {
      dispatch(setVideoFetching(false))
    }
  }
