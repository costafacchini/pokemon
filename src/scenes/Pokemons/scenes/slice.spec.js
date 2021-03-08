import store from '../../../app/store'
import { loadBasicList } from './slice'

describe('pokemonsSlice', () => {
  describe('#loadBasicList', () => {
    it('loads the basic list of pokemons with few details', () => {
      expect(store.getState().pokemon.basicList).toEqual([])

      store.dispatch(loadBasicList([ 'charmander', 'bulbasaur' ]))
      expect(store.getState().pokemon.basicList).toEqual([ 'charmander', 'bulbasaur' ])
    })
  })
})
