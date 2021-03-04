import fetchMock from 'fetch-mock'
import { fetchBasicList, fetchPokemonsDetails } from './pokemon'

describe('#fetchBasicList', () => {
  afterEach(() => {
    fetchMock.reset()
    expect(fetchMock.done()).toBe(true)
  })

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
      order: 1,
      name: 'bulbasaur',
      id: 1
    })
    fetchMock.get('https://pokeapi.co/api/v2/pokemon/2/', {
      abilities: [ { ability: { name: 'inner-focus' } }, { ability: { name: 'justified' } } ],
      order: 2,
      name: 'ivysaur',
      id: 2
    })
    fetchMock.get('https://pokeapi.co/api/v2/pokemon/3/', {
      abilities: [ { ability: { name: 'magic-guard' } }, { ability: { name: 'super-luck' } } ],
      order: 3,
      name: 'pikachu',
      id: 3
    })

    fetchPokemonsDetails(pokemonList).then(pokemonsData => {
      expect(pokemonsData).toEqual([
        {
          abilities: [ 'synchronize', 'magic-guard' ],
          number: 1,
          name: 'bulbasaur',
          image: 'https://pokeres.bastionbot.org/images/pokemon/1.png',
          image_alt: 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/1.png',
          id: 1
        },
        {
          abilities: [ 'inner-focus', 'justified' ],
          number: 2,
          name: 'ivysaur',
          image: 'https://pokeres.bastionbot.org/images/pokemon/2.png',
          image_alt: 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/2.png',
          id: 2
        },
        {
          abilities: [ 'magic-guard', 'super-luck' ],
          number: 3,
          name: 'pikachu',
          image: 'https://pokeres.bastionbot.org/images/pokemon/3.png',
          image_alt: 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/3.png',
          id: 3
        }
      ])
    })
  })
})