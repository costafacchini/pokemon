import pokemonReducer from './Pokemons/scenes/Index/slice'
import pokemonShowReducer from './Pokemons/scenes/Show/slice'

const combinedReducers = {
  pokemon: pokemonReducer,
  pokemonShow: pokemonShowReducer
}

export default combinedReducers