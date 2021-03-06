import React from 'react'
import { screen, fireEvent } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import fetchMock from 'fetch-mock'
import PokemonsIndex from './index'
import mountWithRedux, { createStore } from '../../../../../.jest/redux-testing'

describe('<PokemonsIndex />', () => {
  let store

  function mount() {
    fetchMock.get('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1', { count: 3 })
    fetchMock.get('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=3',
      {
        count: 543,
        results: [
          { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
          { name: 'pikachu', url: 'https://pokeapi.co/api/v2/pokemon/3/' },
          { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' }
        ]
      }
    )
    fetchMock.get('https://pokeapi.co/api/v2/pokemon/1/', {
      abilities: [ { ability: { name: 'synchronize' } }, { ability: { name: 'magic-guard' } } ],
      types: [ { type: { name: 'grass' } }, { type: { name: 'poison' } } ],
      order: 1,
      name: 'bulbasaur',
      id: 1,
      height: 109,
      weight: 10,
      sprites: {
        other: {
          'official-artwork': {
            'front_default': 'url_image_1'
          },
          "dream_world": {
            "front_default": 'url_image_2'
          }
        }
      }
    })
    fetchMock.get('https://pokeapi.co/api/v2/pokemon/2/', {
      abilities: [ { ability: { name: 'inner-focus' } }, { ability: { name: 'justified' } } ],
      types: [ { type: { name: 'grass' } } ],
      order: 2,
      name: 'ivysaur',
      id: 2,
      height: 28,
      weight: 35,
      sprites: {
        other: {
          'official-artwork': {
            'front_default': 'url_image_1'
          },
          "dream_world": {
            "front_default": 'url_image_2'
          }
        }
      }
    })
    fetchMock.get('https://pokeapi.co/api/v2/pokemon/3/', {
      abilities: [ { ability: { name: 'magic-guard' } }, { ability: { name: 'super-luck' } } ],
      types: [ { type: { name: 'poison' } } ],
      order: 3,
      name: 'pikachu',
      id: 3,
      height: 79,
      weight: 90,
      sprites: {
        other: {
          'official-artwork': {
            'front_default': 'url_image_1'
          },
          "dream_world": {
            "front_default": 'url_image_2'
          }
        }
      }
    })

    store = createStore()
    return mountWithRedux(store)(<PokemonsIndex />)
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

  it('shows the pokeomn cards', async () => {
    await act(async () => {
      mount()

      await fetchMock.flush(true)
    })

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

    it('hides the load more button', async () => {
      await act(async () => {
        mount()

        await fetchMock.flush(true)
      })

      expect(screen.getByText('Carregar mais')).toBeInTheDocument()

      const searchInput = screen.getByRole('textbox', { value: 'expression' })
      fireEvent.change(searchInput, { target: { value: 'Bulb' } })

      expect(screen.queryByText('Carregar mais')).not.toBeInTheDocument()
    })
  })

  describe('about the load more button', () => {
    it('shows the load more button', async () => {
      await act(async () => {
        mount()

        await fetchMock.flush(true)
      })

      expect(screen.getByText('Carregar mais')).toBeInTheDocument()
    })

    describe('when the user clicks to load a new page of pokemons', () => {
      beforeEach(async () => {
        await act(async () => {
          mount()

          await fetchMock.flush(true)
        })

        screen.getByRole('button', { name: 'Carregar mais' }).click()
      })

      it('load a new page of pokemons', async () => {
        //Preciso carregar a segunda página
        expect(true).toEqual(false)
      })

      it('shows the load more button', () => {
        expect(screen.getByText('Carregar mais')).toBeInTheDocument()
      })
    })
  })
})
