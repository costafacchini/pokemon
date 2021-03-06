import { configureStore } from '@reduxjs/toolkit'
import pokemonReducer from '../scenes/Pokemons/scenes/Index/slice'
import pokemonShowReducer from '../scenes/Pokemons/scenes/Show/slice'

export default configureStore({
  reducer: {
    pokemon: pokemonReducer,
    pokemonShow: pokemonShowReducer
  }
})