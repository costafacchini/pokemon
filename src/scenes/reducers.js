import pokemonReducer from './Pokemons/scenes/slice'
import pokemonIndexReducer from './Pokemons/scenes/Index/slice'
import pokemonShowReducer from './Pokemons/scenes/Show/slice'

const combinedReducers = {
  pokemon: pokemonReducer,
  pokemonIndex: pokemonIndexReducer,
  pokemonShow: pokemonShowReducer
}

export default combinedReducers