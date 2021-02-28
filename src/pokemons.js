import React, { useState } from 'react'

const pokemonList = [
  {
    "abilities": [
      "Overgrow"
    ],
    "detailPageURL": "/us/pokedex/bulbasaur",
    "weight": 15.2,
    "weakness": [
      "Fire",
      "Psychic",
      "Flying",
      "Ice"
    ],
    "number": "001",
    "height": 28.0,
    "collectibles_slug": "bulbasaur",
    "featured": "true",
    "slug": "bulbasaur",
    "name": "Bulbasaur",
    "ThumbnailAltText": "Bulbasaur",
    "ThumbnailImage": "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/001.png",
    "id": 1,
    "type": [
      "grass",
      "poison"
    ]
  },
  {
    "abilities": [
      "Overgrow"
    ],
    "detailPageURL": "/us/pokedex/ivysaur",
    "weight": 28.7,
    "weakness": [
      "Fire",
      "Psychic",
      "Flying",
      "Ice"
    ],
    "number": "002",
    "height": 39.0,
    "collectibles_slug": "ivysaur",
    "featured": "true",
    "slug": "ivysaur",
    "name": "Ivysaur",
    "ThumbnailAltText": "Ivysaur",
    "ThumbnailImage": "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/002.png",
    "id": 2,
    "type": [
      "grass",
      "poison"
    ]
  },
  {
    "abilities": [
      "Overgrow"
    ],
    "detailPageURL": "/us/pokedex/venusaur",
    "weight": 9999.0,
    "weakness": [
      "Fire",
      "Psychic",
      "Flying",
      "Ice"
    ],
    "number": "003",
    "height": 945.0,
    "collectibles_slug": "venusaur",
    "featured": "true",
    "slug": "venusaur",
    "name": "Venusaur",
    "ThumbnailAltText": "Venusaur",
    "ThumbnailImage": "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/003.png",
    "id": 3,
    "type": [
      "grass",
      "poison"
    ]
  },
  {
    "abilities": [
      "Blaze"
    ],
    "detailPageURL": "/us/pokedex/charmander",
    "weight": 18.7,
    "weakness": [
      "Water",
      "Ground",
      "Rock"
    ],
    "number": "004",
    "height": 24.0,
    "collectibles_slug": "charmander",
    "featured": "true",
    "slug": "charmander",
    "name": "Charmander",
    "ThumbnailAltText": "Charmander",
    "ThumbnailImage": "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/004.png",
    "id": 4,
    "type": [
      "fire"
    ]
  },
  {
    "abilities": [
      "Blaze"
    ],
    "detailPageURL": "/us/pokedex/charmeleon",
    "weight": 41.9,
    "weakness": [
      "Water",
      "Ground",
      "Rock"
    ],
    "number": "005",
    "height": 43.0,
    "collectibles_slug": "charmeleon",
    "featured": "true",
    "slug": "charmeleon",
    "name": "Charmeleon",
    "ThumbnailAltText": "Charmeleon",
    "ThumbnailImage": "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/005.png",
    "id": 5,
    "type": [
      "fire"
    ]
  },
  {
    "abilities": [
      "Blaze"
    ],
    "detailPageURL": "/us/pokedex/charizard",
    "weight": 9999.0,
    "weakness": [
      "Water",
      "Electric",
      "Rock"
    ],
    "number": "006",
    "height": 1102.0,
    "collectibles_slug": "charizard",
    "featured": "true",
    "slug": "charizard",
    "name": "Charizard",
    "ThumbnailAltText": "Charizard",
    "ThumbnailImage": "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/006.png",
    "id": 6,
    "type": [
      "fire",
      "flying"
    ]
  },
  {
    "abilities": [
      "Torrent"
    ],
    "detailPageURL": "/us/pokedex/squirtle",
    "weight": 19.8,
    "weakness": [
      "Grass",
      "Electric"
    ],
    "number": "007",
    "height": 20.0,
    "collectibles_slug": "squirtle",
    "featured": "true",
    "slug": "squirtle",
    "name": "Squirtle",
    "ThumbnailAltText": "Squirtle",
    "ThumbnailImage": "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/007.png",
    "id": 7,
    "type": [
      "water"
    ]
  },
  {
    "abilities": [
      "Adaptability"
    ],
    "detailPageURL": "/us/pokedex/beedrill",
    "weight": 89.3,
    "weakness": [
      "Fire",
      "Psychic",
      "Flying",
      "Rock"
    ],
    "number": "015",
    "height": 55.0,
    "collectibles_slug": "beedrill",
    "featured": "true",
    "slug": "beedrill",
    "name": "Beedrill",
    "ThumbnailAltText": "Beedrill",
    "ThumbnailImage": "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/015.png",
    "id": 15,
    "type": [
      "bug",
      "poison"
    ]
  },
  {
    "abilities": [
      "Keen Eye",
      "Tangled Feet"
    ],
    "detailPageURL": "/us/pokedex/pidgeotto",
    "weight": 66.1,
    "weakness": [
      "Electric",
      "Ice",
      "Rock"
    ],
    "number": "017",
    "height": 43.0,
    "collectibles_slug": "pidgeotto",
    "featured": "true",
    "slug": "pidgeotto",
    "name": "Pidgeotto",
    "ThumbnailAltText": "Pidgeotto",
    "ThumbnailImage": "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/017.png",
    "id": 17,
    "type": [
      "normal",
      "flying"
    ]
  }
]

function compare(a, b) {
  if (a["ThumbnailAltText"] < b["ThumbnailAltText"]){
    return -1;
  }
  if (a["ThumbnailAltText"] > b["ThumbnailAltText"]){
    return 1;
  }
  return 0;
}

function PokemonsIndex() {
  const [pokemons, setPokemons] = useState(pokemonList.sort(compare))
  const [expression, setExpression] = useState('')

  function changeExpression(e) {
    setExpression(e.target.value)
  }

  function contains(expression, substring) {
    return expression.toUpperCase().includes(substring.toUpperCase())
  }

  function filterPokemons(expression) {
    const pokemonsFiltered = pokemonList.filter((pokemon) => contains(pokemon["ThumbnailAltText"], expression) || contains(pokemon["number"], expression))
    setPokemons(pokemonsFiltered.sort(compare))
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <button className="navbar-brand">
          <img className="navbar-brand" src="https://assets.pokemon.com/assets/cms2/img/misc/gus/buttons/logo-pokemon-79x45.png" alt=""/>
        </button>
      </nav>
      <div className='container'>
        <div className='row'>
          <div className='col-6'>
            <input
              className='form-control'
              name='expression'
              type='text'
              value={expression}
              placeholder='Busque por nome ou número'
              onChange={changeExpression}
            />
          </div>
          <div className='col-2'>
            <button
              type='button'
              className='btn btn-primary'
              onClick={() => {
                filterPokemons(expression)
              }}
            >
              Buscar
            </button>
          </div>
        </div>
      </div>

      <section>
        <div className='container'>
          <div className='row'>
            <div className='col-36'>
              <div className={`row row-cols-1 row-cols-md-4`} >
                {pokemons.map((pokemon) => (
                  <>
                    <div className="col mt-4">
                      <div className='card shadow-sm border-0 rounded'>
                        <div className='card-body p-0'>
                          <img className='card-img-top w-80 img-thumbnail' src={pokemon["ThumbnailImage"]} alt="" />
                          <div className="p-3">
                            <h5 className="mb-0">{pokemon["ThumbnailAltText"]}</h5>
                            <p className="small text-muted">{pokemon["number"]}</p>
                            <ul className="social mb-0 list-inline mt-3">
                              {pokemon["abilities"].map((hability, index) => (
                                <li className="list-inline-item m-0">
                                  <span key={index} className="badge badge-primary mr-1">
                                  {hability}
                                </span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default PokemonsIndex