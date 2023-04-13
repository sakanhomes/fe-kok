import { configureStore, ThunkAction, AnyAction } from '@reduxjs/toolkit'
import errorsReducer from '@/containers/errors/store'
import commingSoon from '@/containers/comming-soon/store'
import settings from '@/features/profile/store/settings'
import videoPlay from '@/features/videoPlay/store/videoPlay'
import creatorCenter from '@/features/creatorCenter/store/creatorCenter'
import auth from 'store/auth'
import uploadVideo from '@/features/uploadVideo/store/uploadVideo'

const store = configureStore({
  reducer: {
    auth,
    errors: errorsReducer,
    commingSoon,
    settings,
    videoPlay,
    creatorCenter,
    uploadVideo,
  },
})

export default store

export type TStore = typeof store
export type TRootState = ReturnType<typeof store.getState>
export type TDispatch = typeof store.dispatch
export type TAsyncAction = ThunkAction<void, TRootState, unknown, AnyAction>
export type TSelector<P> = (s: TRootState) => P
