import React from 'react'
import { render, screen } from '@testing-library/react'
import Card from './index'

describe('<Card />', () => {
  function mount(pokemon) {
    render(<Card pokemon={pokemon} />)
  }

  it('shows the pokeomn card', () => {
    const pokemon = { name: 'Charmander', number: '001', abilities: ['Adaptability', 'Aerilate'], images: { original: 'http://img.com' } }
    mount(pokemon)

    expect(screen.getByText('Charmander')).toBeInTheDocument()
    expect(screen.getByText('001')).toBeInTheDocument()
    expect(screen.getByText('Adaptability')).toBeInTheDocument()
    expect(screen.getByText('Aerilate')).toBeInTheDocument()
    expect(screen.getByRole('img')).toHaveAttribute('src', 'http://img.com')
    expect(screen.getByRole('link')).toHaveAttribute('href', '/pokemon/charmander')
  })
})
