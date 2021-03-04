import { configureStore } from '@reduxjs/toolkit'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import React from 'react'
import reducer from '../src/scenes/reducers'

export const createStore = (preloadedState) =>
  configureStore({
    reducer,
    preloadedState,
    devTools: false,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
        immutableCheck: false,
      }),
  })

export default function mountWithRedux(store = createStore(), optionsForMounter) {
  const mountWithProvider = (component, store) => render(<Provider store={store}>{component}</Provider>, optionsForMounter)

  return (component) => mountWithProvider(component, store)
}