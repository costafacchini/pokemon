import { createSlice } from '@reduxjs/toolkit'

function contains(pokemon, expression) {
  const expressionNormalized = normalizeValue(expression)
  const nameNormalized = normalizeValue(pokemon.name)

  return nameNormalized.includes(expressionNormalized)
}

function normalizeValue(value) {
  return value.toString().toUpperCase()
}

export const slice = createSlice({
  name: 'pokemonIndex',
  initialState: {
    pokemonsLoaded: [],
    pokemonsShowing: [],
    expression: '',
    page: 1
  },
  reducers: {
    reset: (state) => {
      state.pokemonsLoaded = []
      state.pokemonsShowing = []
      state.expression = ''
      state.page = 1
    },
    addMore: (state, action) => {
      state.pokemonsLoaded = [ ...state.pokemonsLoaded, ...action.payload ]
      state.pokemonsShowing = [ ...state.pokemonsShowing, ...action.payload]
    },
    setExpression: (state, action) => {
      state.expression = action.payload
    },
    filter: (state, action) => {
      const expression = action.payload

      if (expression === '') {
        state.pokemonsShowing = state.pokemonsLoaded
        state.page = 1
      } else {
        state.pokemonsShowing = state.pokemonsLoaded.filter(pokemon => contains(pokemon, expression))
      }
    },
    setPage: (state, action) => {
      state.page = action.payload
    }
  }
})

export const { addMore, filter, setExpression, setPage, reset } = slice.actions

export default slice.reducer