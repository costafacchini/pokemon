import React from 'react'
import { render, screen, fireEvent } from "@testing-library/react"
import PokemonsIndex from './index'

describe('<PokemonsIndex />', () => {
  const pokemonList = [
    {
      "abilities": [
        "Overgrow"
      ],
      "number": "002",
      "name": "Ivysaur",
      "ThumbnailImage": "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/002.png",
      "id": 2
    },
    {
      "abilities": [
        "Overgrow"
      ],
      "number": "001",
      "name": "Bulbasaur",
      "ThumbnailImage": "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/001.png",
      "id": 1
    }
  ]

  function mount(pokemonList) {
    render(<PokemonsIndex pokemonList={pokemonList} />)
  }

  it('shows the search field', () => {
    mount(pokemonList)

    expect(screen.getByRole('textbox', { value: 'expression' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Buscar' })).toBeInTheDocument()
  })

  it('shows the pokeomn cards ordered by name', () => {
    mount(pokemonList)

    expect(screen.getAllByRole('heading')[0]).toHaveTextContent('Bulbasaur')
    expect(screen.getAllByRole('heading')[1]).toHaveTextContent('Ivysaur')

    expect(screen.getByText('Bulbasaur')).toBeInTheDocument()
    expect(screen.getByText('Ivysaur')).toBeInTheDocument()
  })

  describe('about the expression', () => {
    it('searches for pokemons by filtering by the expression', () => {
      mount(pokemonList)

      const searchInput = screen.getByRole('textbox', { value: 'expression' })
      fireEvent.change(searchInput, { target: { value: 'Bulb' } })
      screen.getByRole('button', { name: 'Buscar' }).click()

      expect(screen.getByText('Bulbasaur')).toBeInTheDocument()
      expect(screen.queryByText('Ivysaur')).not.toBeInTheDocument()
    })
  })
})
