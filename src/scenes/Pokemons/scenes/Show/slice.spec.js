import store from '../../../../app/store'
import { setPokemon } from './slice'

describe('pokemonShowSlice', () => {
  describe('#setPokemon', () => {
    it('sets the pokemon data', () => {
      expect(store.getState().pokemonShow.pokemonData).toEqual({})

      store.dispatch(setPokemon({ name: 'bulbasaur', id: 1, number: 2 }))
      expect(store.getState().pokemonShow.pokemonData).toEqual({ name: 'bulbasaur', id: 1, number: 2 })
    })
  })
})
