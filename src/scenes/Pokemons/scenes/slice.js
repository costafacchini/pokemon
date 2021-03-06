import { createSlice } from '@reduxjs/toolkit'

export const slice = createSlice({
  name: 'pokemon',
  initialState: {
    basicList: []
  },
  reducers: {
    loadBasicList: (state, action) => {
      state.basicList = action.payload
    }
  }
})

export const { loadBasicList } = slice.actions

export default slice.reducer