import { screen } from '@testing-library/react'
import App from './App'
import React from 'react'
import mountWithRedux, { createStore } from '../.jest/redux-testing'

describe('<App />', () => {
  let store

  it('shows the nav bar and pokemons', () => {
    store = createStore()
    mountWithRedux(store)(<App />)

    expect(screen.getByRole('navigation')).toBeInTheDocument()
    expect(screen.getAllByRole('img')[0]).toHaveAttribute('src', 'https://assets.pokemon.com/assets/cms2/img/misc/gus/buttons/logo-pokemon-79x45.png')
    expect(screen.getByRole('textbox', { value: 'expression' })).toBeInTheDocument()
  })
})
