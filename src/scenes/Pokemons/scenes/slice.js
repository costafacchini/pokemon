import { createSlice } from '@reduxjs/toolkit'

export const pokemonsSlice = createSlice({
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

export const { loadBasicList } = pokemonsSlice.actions

export default pokemonsSlice.reducer