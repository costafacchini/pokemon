import store from '../../../../app/store'
import { reset, addMore, filter, setExpression, setPage } from './slice'

describe('slice', () => {
  beforeEach(() => {
    store.dispatch(reset())
  })

  describe('#addMore', () => {
    it('adds the new pokemons on list that is visible to user', () => {
      expect(store.getState().pokemonIndex.pokemonsShowing).toEqual([])

      store.dispatch(addMore([ 'charmander', 'bulbasaur' ]))
      expect(store.getState().pokemonIndex.pokemonsLoaded).toEqual([ 'charmander', 'bulbasaur' ])
      expect(store.getState().pokemonIndex.pokemonsShowing).toEqual([ 'charmander', 'bulbasaur' ])

      store.dispatch(addMore([ 'pikachu' ]))
      expect(store.getState().pokemonIndex.pokemonsLoaded).toEqual([ 'charmander', 'bulbasaur', 'pikachu' ])
      expect(store.getState().pokemonIndex.pokemonsShowing).toEqual([ 'charmander', 'bulbasaur', 'pikachu' ])
    })
  })

  describe('#filter', () => {
    it('filters the pokemons by name with the expression informed by user ignoring case', () => {
      store.dispatch(addMore([
        { name: 'pikachu' },
        { name: 'charmander' },
        { name: 'bulbasaur' }
      ]))

      store.dispatch(filter('pi'))
      expect(store.getState().pokemonIndex.pokemonsShowing).toEqual([{ name: 'pikachu' }])

      store.dispatch(filter('PI'))
      expect(store.getState().pokemonIndex.pokemonsShowing).toEqual([{ name: 'pikachu' }])

      store.dispatch(filter(''))
      expect(store.getState().pokemonIndex.pokemonsShowing).toEqual([
        { name: 'pikachu' },
        { name: 'charmander' },
        { name: 'bulbasaur' }
      ])
    })
  })

  describe('#setExpression', () => {
    it('sets the expression that user informed', () => {
      expect(store.getState().pokemonIndex.expression).toEqual('')

      store.dispatch(setExpression('filter'))
      expect(store.getState().pokemonIndex.expression).toEqual('filter')
    })
  })

  describe('#setPage', () => {
    it('sets the page that user is viewing', () => {
      expect(store.getState().pokemonIndex.page).toEqual(1)

      store.dispatch(setPage(2))
      expect(store.getState().pokemonIndex.page).toEqual(2)
    })
  })
})
