import React from 'react'
import { screen, fireEvent } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import fetchMock from 'fetch-mock'
import PokemonsShow from './index'
import mountWithRedux, { createStore } from '../../../../../.jest/redux-testing'
import {Route, MemoryRouter} from 'react-router-dom';

describe('<PokemonsShow />', () => {
  let store

  function mount(pokemonsBuffered = []) {
    store = createStore()
    store.getState().pokemon.basicList = [
      { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' }
    ]
    store.getState().pokemonIndex.pokemonsShowing = pokemonsBuffered

    return mountWithRedux(store)(
      <MemoryRouter initialEntries={['pokemon/bulbasaur']}>
        <Route path='pokemon/:pokemonId'>
          <PokemonsShow />
        </Route>
      </MemoryRouter>
      )
  }

  afterEach(() => {
    jest.clearAllMocks()
    fetchMock.reset()
    expect(fetchMock.done()).toBe(true)
  })

  it('shows the pokemon information', async () => {
    await act(async () => {
      const pokemonsBuffered = [
        {
          abilities: [ 'synchronize', 'magic-guard' ],
          types: [ 'grass', 'poison' ],
          height: 109,
          weight: 10,
          number: 1,
          name: 'bulbasaur',
          image: 'https://pokeres.bastionbot.org/images/pokemon/1.png',
          id: 1,
          images: {
            original: 'url_image_1',
            alternative: 'url_image_2'
          },
          stats: [
            {
              name: 'hp',
              value: 60
            },
            {
              name: 'attack',
              value: 20
            },
            {
              name: 'defense',
              value: 28
            }
          ],
          visible: true
        }
      ]

      mount(pokemonsBuffered)
    })

    expect(screen.getByText('bulbasaur')).toBeInTheDocument()
    expect(screen.getByText('NÚMERO')).toBeInTheDocument()
    expect(screen.getByText('ALTURA')).toBeInTheDocument()
    expect(screen.getByText('PESO')).toBeInTheDocument()
    expect(screen.getByText('HABILIDADES')).toBeInTheDocument()
    expect(screen.getByText('TIPOS')).toBeInTheDocument()
    expect(screen.getByText('ESTATÍSTICAS')).toBeInTheDocument()
    expect(screen.getByRole('img')).toHaveAttribute('src', 'url_image_1')
    expect(screen.getByRole('button', { name: 'Voltar' })).toBeInTheDocument()
  })

  describe('when the pokemon information is not in state', () => {
    it('fetches the information from the API and shows the pokemon information', async () => {
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

      await act(async () => {
        mount()

        await fetchMock.flush(true)
      })

      expect(screen.getByText('bulbasaur')).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'Voltar' })).toBeInTheDocument()
    })
  })
})
