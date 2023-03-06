import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TSelector } from '@/store'

type TInitialState = {
  isCommingSoon: boolean
}

const initialState: TInitialState = {
  isCommingSoon: false,
}

const commingSoon = createSlice({
  name: 'commingSoon',
  initialState,
  reducers: {
    setCommingSoon(state, actions: PayloadAction<boolean>) {
      state.isCommingSoon = actions.payload
    },
  },
})

export default commingSoon.reducer

export const commingSoonSelector: TSelector<TInitialState> = (state) => state.commingSoon

export const { setCommingSoon } = commingSoon.actions
