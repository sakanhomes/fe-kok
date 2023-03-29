import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { handleActionErrors } from '@/utils/handleActionErrors'
import { TSelector, TAsyncAction } from '@/store'
import { TVideo } from '@/types/video'
import { videosApi } from '@/api/rest/videos'
import { TLeaderboard } from '@/types/common'
import { commonApi } from '@/api/rest/common'
import { ECategories } from '../enums/categories'

export type TInit = {
  forYou: {
    videos: null | TVideo[]
    fetching: boolean
  }
  trending: {
    videos: null | TVideo[]
    fetching: boolean
  }
  leaderboard: {
    data: TLeaderboard | null
    fetching: boolean
  }
}

const init: TInit = {
  forYou: {
    videos: null,
    fetching: true,
  },
  trending: {
    videos: null,
    fetching: true,
  },
  leaderboard: {
    fetching: true,
    data: null,
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
    setTrendingVideo(state, actions: PayloadAction<TVideo[]>) {
      state.trending.videos = actions.payload
    },
    setTrendingVideoFetching(state, actions: PayloadAction<boolean>) {
      state.trending.fetching = actions.payload
    },
    setLeaderboard(state, actions: PayloadAction<TLeaderboard>) {
      state.leaderboard.data = actions.payload
    },
    setLeaderboardFetching(state, actions: PayloadAction<boolean>) {
      state.leaderboard.fetching = actions.payload
    },
    resetSettings: () => init,
  },
})

// actions
export const {
  setRandomVideo,
  setRandomVideoFetching,
  setLeaderboard,
  setLeaderboardFetching,
  setTrendingVideo,
  setTrendingVideoFetching,
  resetSettings,
} = home.actions
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

export const getTrendingVideosAsync =
  (category?: ECategories): TAsyncAction =>
  async (dispatch, _store) => {
    const { home } = _store()
    try {
      if (!home.trending.fetching) dispatch(setTrendingVideoFetching(true))
      const {
        data: {
          data: { videos },
        },
      } = await videosApi.getTranding({ amount: 12, category })
      dispatch(setTrendingVideo(videos))
    } catch (e) {
      handleActionErrors({
        e,
        dispatch,
      })
    } finally {
      dispatch(setTrendingVideoFetching(false))
    }
  }

export const getLeaderboardAsync = (): TAsyncAction => async (dispatch, _store) => {
  const { home } = _store()
  try {
    if (!home.leaderboard.fetching) dispatch(setLeaderboardFetching(true))
    const {
      data: {
        data: { leaderboard },
      },
    } = await commonApi.leaderboard()
    dispatch(setLeaderboard(leaderboard))
  } catch (e) {
    handleActionErrors({
      e,
      dispatch,
    })
  } finally {
    dispatch(setLeaderboardFetching(false))
  }
}
