import React from 'react'
import { screen, fireEvent, waitFor } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import fetchMock from 'fetch-mock'
import PokemonsIndex from './index'
import mountWithRedux, { createStore } from '../../../../../.jest/redux-testing'

describe('<PokemonsIndex />', () => {
  let store
  const basicList = [
    { name: 'abomasnow', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
    { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
    { name: 'pikachu', url: 'https://pokeapi.co/api/v2/pokemon/3/' }
  ]

  function mount(list = basicList) {
    list.map((element, index) => {
      fetchMock.get(`${element.url}`, {
        abilities: [ { ability: { name: 'synchronize' } }, { ability: { name: 'magic-guard' } } ],
        types: [ { type: { name: 'grass' } }, { type: { name: 'poison' } } ],
        order: index,
        name: `${element.name}`,
        id: index,
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
    })

    fetchMock.get('https://pokeapi.co/api/v2/pokemon/3/', { status: 404, body: 'Not Found' }, { overwriteRoutes: true })

    store = createStore()
    return mountWithRedux(store)(<PokemonsIndex basicList={list} />)
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

  it('shows the pokeomn cards visibles', async () => {
    await act(async () => {
      mount()

      await fetchMock.flush(true)
    })

    expect(screen.getByText('abomasnow')).toBeInTheDocument()
    expect(screen.getByText('bulbasaur')).toBeInTheDocument()
    expect(screen.queryByText('pikachu')).not.toBeInTheDocument()
  })

  describe('about the expression', () => {
    it('searches for pokemon by filtering by the expression', async () => {
      await act(async () => {
        mount()

        await fetchMock.flush(true)
      })

      const searchInput = screen.getByRole('textbox', { value: 'expression' })
      fireEvent.change(searchInput, { target: { value: 'abo' } })
      screen.getByRole('button', { name: 'Buscar' }).click()

      await waitFor(() => expect(screen.getByText('abomasnow')).toBeInTheDocument())
      expect(screen.queryByText('bulbasaur')).not.toBeInTheDocument()
    })

    it('hides the load more button', async () => {
      for (let index = 4; index < 50; index++) {
        basicList.push({ name: `bulbasaur ${index}`, url: `https://pokeapi.co/api/v2/pokemon/${index}/` })
      }

      await act(async () => {
        mount()

        await fetchMock.flush(true)
      })

      expect(screen.getByText('Carregar mais')).toBeInTheDocument()

      const searchInput = screen.getByRole('textbox', { value: 'expression' })
      fireEvent.change(searchInput, { target: { value: 'Bulb' } })

      expect(screen.queryByText('Carregar mais')).not.toBeInTheDocument()
    })

    describe('when the user clears the filter', () => {
      it('shows the pokemons loaded before filtering', async () => {
        await act(async () => {
          mount()

          await fetchMock.flush(true)
        })

        const searchInput = screen.getByRole('textbox', { value: 'expression' })
        fireEvent.change(searchInput, { target: { value: 'abo' } })
        screen.getByRole('button', { name: 'Buscar' }).click()

        await waitFor(() => expect(screen.getByText('abomasnow')).toBeInTheDocument())
        expect(screen.queryByText('bulbasaur')).not.toBeInTheDocument()

        fireEvent.change(searchInput, { target: { value: '' } })
        screen.getByRole('button', { name: 'Buscar' }).click()

        await waitFor(() => expect(screen.getByText('abomasnow')).toBeInTheDocument())
        expect(screen.queryByText('bulbasaur')).toBeInTheDocument()
      })
    })
  })

  describe('about the load more button', () => {
    it('shows the load more button', async () => {
      let list = []
      for (let index = 1; index < 50; index++) {
        list.push({ name: `bulbasaur ${index}`, url: `https://pokeapi.co/api/v2/pokemon/${index}/` })
      }

      await act(async () => {
        mount(list)

        await fetchMock.flush(true)
      })

      expect(screen.getByRole('button', { name: 'Carregar mais' })).toBeInTheDocument()
    })

    describe('when the user clicks to load a new page of pokemons', () => {
      beforeEach(async () => {
        let list = []
        for (let index = 1; index <= 50; index++) {
          list.push({ name: `abomasnow ${index}`, url: `https://pokeapi.co/api/v2/pokemon/${index}/` })
        }

        await act(async () => {
          mount(list)

          await fetchMock.flush(true)
        })

        expect(screen.queryByText('abomasnow 50')).not.toBeInTheDocument()
        expect(screen.getByText('abomasnow 40')).toBeInTheDocument()

        screen.getByRole('button', { name: 'Carregar mais' }).click()
      })

      it('load a new page of pokemons', async () => {
        await waitFor(() => expect(screen.getByText('abomasnow 50')).toBeInTheDocument())
      })

      it('shows the load more button', async () => {
        await waitFor(() => expect(screen.getByRole('button', { name: 'Carregar mais' })).toBeInTheDocument())
      })

      describe('when you have no more pokemons to show', () => {
        beforeEach(() => {
          screen.getByRole('button', { name: 'Carregar mais' }).click()
        })

        it('hides the load more button', async () => {
          await waitFor(() => expect(screen.queryByText('Carregar mais')).not.toBeInTheDocument())
        })
      })
    })
  })
})
