import { configureStore } from '@reduxjs/toolkit'
import pokemonReducer from '../scenes/Pokemons/slice'

export default configureStore({
  reducer: {
    pokemon: pokemonReducer
  }
})