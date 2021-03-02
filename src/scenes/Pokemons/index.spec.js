import React from 'react'
import { render, screen, fireEvent } from "@testing-library/react"
import { act } from 'react-dom/test-utils'
import fetchMock from 'fetch-mock'
import PokemonsIndex from './index'

describe('<PokemonsIndex />', () => {
  function mount() {
    fetchMock.get('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=40',
      {
        count: 1118,
        next: 'https://pokeapi.co/api/v2/pokemon/?offset=40&limit=40',
        previous: null,
        results: [
          {
            name: 'ivysaur',
            url: 'https://pokeapi.co/api/v2/pokemon/2/'
          },
          {
            name: 'bulbasaur',
            url: 'https://pokeapi.co/api/v2/pokemon/1/'
          }
        ]
      }
    )

    fetchMock.get('https://pokeapi.co/api/v2/pokemon/2/',
      {
        abilities: [
          {
            ability: {
              name: 'overgrow'
            }
          },
          {
            ability: {
              name: 'chlorophyll'
            }
          }
        ],
        order: '002',
        name: 'ivysaur',
        id: 2
      }
    )

    fetchMock.get('https://pokeapi.co/api/v2/pokemon/1/',
      {
        abilities: [
          {
            ability: {
              name: 'overgrow'
            }
          }
        ],
        order: '001',
        name: 'bulbasaur',
        id: 1
      }
    )

    render(<PokemonsIndex />)
  }

  afterEach(() => {
    jest.clearAllMocks()
    fetchMock.reset()
    expect(fetchMock.done()).toBe(true)
  })

  it('shows the search field', async () => {
    await act(async () => {
      mount()

      await fetchMock.flush(true)
    })

    expect(screen.getByRole('textbox', { value: 'expression' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Buscar' })).toBeInTheDocument()
  })

  it('shows the pokeomn cards ordered by name', async () => {
    await act(async () => {
      mount()

      await fetchMock.flush(true)
    })

    expect(screen.getAllByRole('heading')[0]).toHaveTextContent('bulbasaur')
    expect(screen.getAllByRole('heading')[1]).toHaveTextContent('ivysaur')

    expect(screen.getByText('bulbasaur')).toBeInTheDocument()
    expect(screen.getByText('ivysaur')).toBeInTheDocument()
  })

  describe('about the expression', () => {
    it('searches for pokemons by filtering by the expression', async () => {
      await act(async () => {
        mount()

        await fetchMock.flush(true)
      })

      const searchInput = screen.getByRole('textbox', { value: 'expression' })
      fireEvent.change(searchInput, { target: { value: 'Bulb' } })
      screen.getByRole('button', { name: 'Buscar' }).click()

      expect(screen.getByText('bulbasaur')).toBeInTheDocument()
      expect(screen.queryByText('ivysaur')).not.toBeInTheDocument()
    })
  })
})
