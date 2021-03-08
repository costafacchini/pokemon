import { createSlice } from '@reduxjs/toolkit'

export const pokemonShowSlice = createSlice({
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

export const { setPokemon } = pokemonShowSlice.actions

export default pokemonShowSlice.reducer