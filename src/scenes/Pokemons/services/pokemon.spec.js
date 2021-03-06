import fetchMock from 'fetch-mock'
import { fetchBasicList, fetchPokemonsDetails } from './pokemon'

describe('pokemons', () => {
  beforeEach(() => {
    fetchMock.reset()
    expect(fetchMock.done()).toBe(true)
  })

  describe('#fetchBasicList', () => {
    it('returns the pokemons basic list order by name', () => {
      fetchMock.get('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1', { count: 543 })
      fetchMock.get('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=543',
        {
          count: 543,
          results: [
            { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
            { name: 'pikachu', url: 'https://pokeapi.co/api/v2/pokemon/3/' },
            { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' }
          ]
        }
      )

      fetchBasicList().then(basicList => {
        expect(basicList).toEqual([
          { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
          { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
          { name: 'pikachu', url: 'https://pokeapi.co/api/v2/pokemon/3/' }
        ])
      })
    })
  })

  describe('#fetchPokemonsDetails', () => {
    it('returns the pokemons data', () => {
      const pokemonList = [
        { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
        { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
        { name: 'pikachu', url: 'https://pokeapi.co/api/v2/pokemon/3/' }
      ]

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
        height: 158,
        weight: 23,
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
        height: 39,
        weight: 47,
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

      fetchPokemonsDetails(pokemonList).then(pokemonsData => {
        expect(pokemonsData).toEqual([
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
            visible: true
          },
          {
            abilities: [ 'inner-focus', 'justified' ],
            types: [ 'grass' ],
            height: 158,
            weight: 23,
            number: 2,
            name: 'ivysaur',
            image: 'https://pokeres.bastionbot.org/images/pokemon/2.png',
            id: 2,
            images: {
              original: 'url_image_1',
              alternative: 'url_image_2'
            },
            visible: true
          },
          {
            abilities: [ 'magic-guard', 'super-luck' ],
            types: [ 'poison' ],
            height: 39,
            weight: 47,
            number: 3,
            name: 'pikachu',
            image: 'https://pokeres.bastionbot.org/images/pokemon/3.png',
            id: 3,
            images: {
              original: 'url_image_1',
              alternative: 'url_image_2'
            },
            visible: true
          }
        ])
      })
    })

    it('returns the pokemons data with pokemon that data "Nof Found" invisible', () => {
      const pokemonList = [
        { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
        { name: 'pikachu', url: 'https://pokeapi.co/api/v2/pokemon/3/' }
      ]

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
      fetchMock.get('https://pokeapi.co/api/v2/pokemon/3/', { status: 404, body: 'Not Found' })

      fetchPokemonsDetails(pokemonList).then(pokemonsData => {
        expect(pokemonsData).toEqual([
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
            visible: true
          },
          {
            name: 'pikachu',
            url: 'https://pokeapi.co/api/v2/pokemon/3/',
            visible: false
          }
        ])
      })
    })
  })
})