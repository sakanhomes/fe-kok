import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { handleActionErrors } from '@/utils/handleActionErrors'
import { TSelector, TAsyncAction } from '@/store'
import { TVideo } from '@/types/video'
import { videosApi } from '@/api/rest/videos'
import { ECategories } from '../enums/categories'

export type TInit = {
  forYou: {
    videos: null | TVideo[]
    fetching: boolean
  }
}

const init: TInit = {
  forYou: {
    videos: null,
    fetching: true,
  },
}

const home = createSlice({
  name: 'home',
  initialState: init,
  reducers: {
    setRandomVideo(state, actions: PayloadAction<TVideo[]>) {
      state.forYou.videos = actions.payload
    },
    setRandomVideoFetching(state, actions: PayloadAction<boolean>) {
      state.forYou.fetching = actions.payload
    },
    resetSettings: () => init,
  },
})

// actions
export const { setRandomVideo, setRandomVideoFetching, resetSettings } = home.actions
// selectors
export const homeSelector: TSelector<TInit> = (state) => state.home
// reducer
export default home.reducer

export const getRandomVideosAsync =
  (category?: ECategories): TAsyncAction =>
  async (dispatch, _store) => {
    const { home } = _store()
    try {
      if (!home.forYou.fetching) dispatch(setRandomVideoFetching(true))
      const {
        data: {
          data: { videos },
        },
      } = await videosApi.getRandom({ amount: 12, category })
      dispatch(setRandomVideo(videos))
    } catch (e) {
      handleActionErrors({
        e,
        dispatch,
      })
    } finally {
      dispatch(setRandomVideoFetching(false))
    }
  }
