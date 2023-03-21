import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TAsyncAction, TSelector } from '@/store'
import { TOwnerVideo } from '@/types/video'
import { profileApi } from '@/api/rest/profile'
import { handleActionErrors } from '@/utils/handleActionErrors'

export type TInit = {
  activeTab: 'videos' | 'articles'
  videos: TOwnerVideo[]
  videosFetching: boolean
}

const init: TInit = {
  activeTab: 'videos',
  videosFetching: true,
  videos: [],
}

const creatorCenter = createSlice({
  name: 'creatorCenter',
  initialState: init,
  reducers: {
    setActiveTab(state, actions: PayloadAction<TInit['activeTab']>) {
      state.activeTab = actions.payload
    },
    setVideos(state, actions: PayloadAction<TOwnerVideo[]>) {
      state.videos = actions.payload
    },
    setVideosFetching(state, actions: PayloadAction<boolean>) {
      state.videosFetching = actions.payload
    },
    resetCreatorCenter: () => init,
  },
})

// actions
export const { resetCreatorCenter, setActiveTab, setVideos, setVideosFetching } =
  creatorCenter.actions
// selectors
export const creatorCenterSelector: TSelector<TInit> = (state) => state.creatorCenter
// reducer
export default creatorCenter.reducer

export const getVideosAsync = (): TAsyncAction => async (dispatch, _store) => {
  const { creatorCenter } = _store()
  try {
    if (!creatorCenter.videosFetching) dispatch(setVideosFetching(true))
    const {
      data: {
        data: { videos },
      },
    } = await profileApi.getVideos()
    dispatch(setVideos(videos))
  } catch (e) {
    handleActionErrors({
      e,
      dispatch,
    })
  } finally {
    dispatch(setVideosFetching(false))
  }
}
