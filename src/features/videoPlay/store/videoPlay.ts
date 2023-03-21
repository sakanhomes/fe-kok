import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { handleActionErrors } from '@/utils/handleActionErrors'
import { TSelector, TAsyncAction } from '@/store'
import { TVideo } from '@/types/video'
import { videosApi } from '@/api/rest/videos'

export type TInit = {
  id: string | null
  video: TVideo | null
  videoFetching: boolean
  likingFetching: boolean
  related: {
    videos: TVideo[] | null
    fetching: boolean
  }
}

const init: TInit = {
  id: null,
  video: null,
  videoFetching: true,
  likingFetching: false,
  related: {
    videos: null,
    fetching: true,
  },
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
    setLikingFetching(state, actions: PayloadAction<boolean>) {
      state.likingFetching = actions.payload
    },
    setRelatedVideos(state, actions: PayloadAction<TVideo[]>) {
      state.related.videos = actions.payload
    },
    setRelatedVideoFetching(state, actions: PayloadAction<boolean>) {
      state.related.fetching = actions.payload
    },
    resetVideoPlay: () => init,
  },
})

// actions
export const {
  setVideoId,
  setVideo,
  setVideoFetching,
  setRelatedVideos,
  setLikingFetching,
  setRelatedVideoFetching,
  resetVideoPlay,
} = videoPlay.actions
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

export const setLikeAsync =
  (id: string): TAsyncAction =>
  async (dispatch, _store) => {
    const { videoPlay } = _store()
    try {
      dispatch(setLikingFetching(true))
      if (!videoPlay.video) return
      const {
        data: {
          data: { video },
        },
      } = await videosApi[videoPlay.video.flags.isLiked ? 'deleteLike' : 'setLike'](id)

      dispatch(setVideo(video))
    } catch (e) {
      handleActionErrors({
        e,
        dispatch,
      })
    } finally {
      dispatch(setLikingFetching(false))
    }
  }

export const getViewedAsync =
  (id: string): TAsyncAction =>
  async (dispatch, _store) => {
    const { videoPlay } = _store()
    try {
      if (!videoPlay.video) return
      const {
        data: {
          data: { video },
        },
      } = await videosApi.getViewed(id)

      dispatch(setVideo(video))
    } catch (e) {
      handleActionErrors({
        e,
        dispatch,
      })
    }
  }

export const getRelatedVideosAsync = (): TAsyncAction => async (dispatch, _store) => {
  const {
    videoPlay: { video, related },
  } = _store()
  try {
    if (!related.fetching) dispatch(setRelatedVideoFetching(true))
    const {
      data: {
        data: { videos },
      },
    } = await videosApi.getRandom({ amount: 5, category: video?.category })
    dispatch(setRelatedVideos(videos))
  } catch (e) {
    handleActionErrors({
      e,
      dispatch,
    })
  } finally {
    dispatch(setRelatedVideoFetching(false))
  }
}
