import store from '../../../../app/store'
import { reset, loadBasicList, addMore, filter, setExpression, setPage } from './slice'

describe('slice', () => {
  beforeEach(() => {
    store.dispatch(reset())
  })

  describe('#loadBasicList', () => {
    it('loads the basic list of pokemons with few details', () => {
      expect(store.getState().pokemon.basicList).toEqual([])

      store.dispatch(loadBasicList([ 'charmander', 'bulbasaur' ]))
      expect(store.getState().pokemon.basicList).toEqual([ 'charmander', 'bulbasaur' ])
    })
  })

  describe('#addMore', () => {
    it('adds the new pokemons on list that is visible to user', () => {
      expect(store.getState().pokemon.pokemonsShowing).toEqual([])

      store.dispatch(addMore([ 'charmander', 'bulbasaur' ]))
      expect(store.getState().pokemon.pokemonsLoaded).toEqual([ 'charmander', 'bulbasaur' ])
      expect(store.getState().pokemon.pokemonsShowing).toEqual([ 'charmander', 'bulbasaur' ])

      store.dispatch(addMore([ 'pikachu' ]))
      expect(store.getState().pokemon.pokemonsLoaded).toEqual([ 'charmander', 'bulbasaur', 'pikachu' ])
      expect(store.getState().pokemon.pokemonsShowing).toEqual([ 'charmander', 'bulbasaur', 'pikachu' ])
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
      expect(store.getState().pokemon.pokemonsShowing).toEqual([{ name: 'pikachu' }])

      store.dispatch(filter('PI'))
      expect(store.getState().pokemon.pokemonsShowing).toEqual([{ name: 'pikachu' }])

      store.dispatch(filter(''))
      expect(store.getState().pokemon.pokemonsShowing).toEqual([
        { name: 'pikachu' },
        { name: 'charmander' },
        { name: 'bulbasaur' }
      ])
    })
  })

  describe('#setExpression', () => {
    it('sets the expression that user informed', () => {
      expect(store.getState().pokemon.expression).toEqual('')

      store.dispatch(setExpression('filter'))
      expect(store.getState().pokemon.expression).toEqual('filter')
    })
  })

  describe('#setPage', () => {
    it('sets the page that user is viewing', () => {
      expect(store.getState().pokemon.page).toEqual(1)

      store.dispatch(setPage(2))
      expect(store.getState().pokemon.page).toEqual(2)
    })
  })
})
