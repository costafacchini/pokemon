import { createSlice } from '@reduxjs/toolkit'

export const slice = createSlice({
  name: 'pokemonShow',
  initialState: {
    pokemonData: { }
  },
  reducers: {
    setPokemon: (state, action) => {
      state.pokemonData = action.payload
    }
  }
})

export const { setPokemon } = slice.actions

export default slice.reducer