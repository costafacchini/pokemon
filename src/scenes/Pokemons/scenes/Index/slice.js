import { createSlice } from '@reduxjs/toolkit'

function contains(pokemon, expression) {
  const expressionNormalized = normalizeValue(expression)
  const nameNormalized = normalizeValue(pokemon.name)

  return nameNormalized.includes(expressionNormalized)
}

function normalizeValue(value) {
  return value.toString().toUpperCase()
}

export const pokemonIndexSlice = createSlice({
  name: 'pokemonIndex',
  initialState: {
    pokemonsLoaded: [],
    pokemonsShowing: [],
    pokemonsFiltered: [],
    expression: '',
    page: 1,
    filtered: false
  },
  reducers: {
    addMore: (state, action) => {
      state.pokemonsShowing = [ ...state.pokemonsShowing, ...action.payload]
      if (!state.filtered) {
        state.pokemonsLoaded = [ ...state.pokemonsLoaded, ...action.payload]
      }
    },
    setExpression: (state, action) => {
      state.expression = action.payload
    },
    filter: (state, action) => {
      const { expression, basicList } = action.payload

      if (expression === '') {
        state.pokemonsShowing = state.pokemonsLoaded
        state.pokemonsFiltered = []
        state.filtered = false
      } else {
        state.pokemonsShowing = []
        state.pokemonsFiltered = basicList.filter(pokemon => contains(pokemon, expression))
        state.filtered = true
      }
    },
    setPage: (state, action) => {
      state.page = action.payload
    }
  }
})

export const { addMore, filter, setExpression, setPage, reset } = pokemonIndexSlice.actions

export default pokemonIndexSlice.reducer