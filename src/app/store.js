import { configureStore } from '@reduxjs/toolkit'
import pokemonReducer from '../scenes/Pokemons/scenes/slice'
import pokemonIndexReducer from '../scenes/Pokemons/scenes/Index/slice'
import pokemonShowReducer from '../scenes/Pokemons/scenes/Show/slice'

export default configureStore({
  reducer: {
    pokemon: pokemonReducer,
    pokemonIndex: pokemonIndexReducer,
    pokemonShow: pokemonShowReducer
  }
})