import { addMore, filter, setExpression, setPage } from './slice'
import { createStore } from '../../../../../.jest/redux-testing'

describe('pokemonIndexSlice', () => {
  let store = createStore()

  beforeEach(() => {
    store = createStore()
  })

  describe('#addMore', () => {
    it('adds the new pokemons on list that is visible to user and list of pokemons loaded', () => {
      expect(store.getState().pokemonIndex.pokemonsShowing).toEqual([])

      store.dispatch(addMore([{ name: 'charmander' }, { name: 'bulbasaur'}]))
      expect(store.getState().pokemonIndex.pokemonsLoaded).toEqual([{ name: 'charmander' }, { name: 'bulbasaur' }])
      expect(store.getState().pokemonIndex.pokemonsShowing).toEqual([{ name: 'charmander' }, { name: 'bulbasaur' }])

      store.dispatch(addMore([{ name: 'pikachu' }]))
      expect(store.getState().pokemonIndex.pokemonsLoaded).toEqual([{ name: 'charmander' }, { name: 'bulbasaur' }, { name: 'pikachu' }])
      expect(store.getState().pokemonIndex.pokemonsShowing).toEqual([{ name: 'charmander' }, { name: 'bulbasaur' }, { name: 'pikachu' }])
    })

    it('does not add the new pokemons on list of pokemons loaded if filtered', () => {
      expect(store.getState().pokemonIndex.pokemonsShowing).toEqual([])

      store.dispatch(addMore([{ name: 'charmander' }, { name: 'bulbasaur'}]))
      expect(store.getState().pokemonIndex.pokemonsShowing).toEqual([{ name: 'charmander' }, { name: 'bulbasaur' }])
      expect(store.getState().pokemonIndex.pokemonsLoaded).toEqual([{ name: 'charmander' }, { name: 'bulbasaur' }])

      store.dispatch(filter({ expression: 'bul', basicList: [{ name: 'charmander' }, { name: 'bulbasaur' }] }))
      store.dispatch(addMore([{ name: 'pikachu' }]))
      expect(store.getState().pokemonIndex.pokemonsShowing).toEqual([{ name: 'pikachu' }])
      expect(store.getState().pokemonIndex.pokemonsLoaded).toEqual([{ name: 'charmander' }, { name: 'bulbasaur' }])
    })
  })

  describe('#filter', () => {
    it('filters the pokemons by name with the expression informed by user ignoring case', () => {
      store.dispatch(addMore([{ name: 'pikachu' }, { name: 'charmander' }, { name: 'bulbasaur'}]))
      store.dispatch(filter({ expression: 'pi', basicList: [{ name: 'pikachu' }, { name: 'charmander' }, { name: 'bulbasaur' }] }))
      expect(store.getState().pokemonIndex.pokemonsFiltered).toEqual([{ name: 'pikachu' }])
      expect(store.getState().pokemonIndex.pokemonsShowing).toEqual([])
      expect(store.getState().pokemonIndex.filtered).toEqual(true)

      store.dispatch(filter({ expression: 'PI', basicList: [{ name: 'pikachu' }, { name: 'charmander' }, { name: 'bulbasaur' }] }))
      expect(store.getState().pokemonIndex.pokemonsFiltered).toEqual([{ name: 'pikachu' }])
      expect(store.getState().pokemonIndex.pokemonsShowing).toEqual([])
      expect(store.getState().pokemonIndex.filtered).toEqual(true)

      store.dispatch(filter({ expression: '', basicList: [{ name: 'pikachu' }, { name: 'charmander' }, { name: 'bulbasaur' }] }))
      expect(store.getState().pokemonIndex.pokemonsFiltered).toEqual([])
      expect(store.getState().pokemonIndex.pokemonsShowing).toEqual([{ name: 'pikachu' }, { name: 'charmander' }, { name: 'bulbasaur'}])
      expect(store.getState().pokemonIndex.filtered).toEqual(false)
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
