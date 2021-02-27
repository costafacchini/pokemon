import React, { useState } from 'react'

const pokemonList = [
  {
    "abilities": [
      "Overgrow", "Fire"
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
  }
]

function PokemonsIndex() {
  const [pokemons, setPokemons] = useState(pokemonList);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#">
          <img className="navbar-brand" src="https://assets.pokemon.com/assets/cms2/img/misc/gus/buttons/logo-pokemon-79x45.png" alt=""/>
        </a>
      </nav>
      <div className='row'>
        <div className='col-36 col-sm-18 col-md-15 col-lg-12 col-xl-10'>
          <div className='input-group'>
            <input
              className='form-control'
              name='expression'
              type='text'
              placeholder='Busque por nome ou número'
            />
            <div className='input-group-append'>
              <button
                type='button'
                className='btn btn-default'
              >
                Buscar
              </button>
            </div>
          </div>
        </div>
      </div>

      <section>
        <div className='row'>
          <div className='col-36'>
            <div className='table-responsive'>
              <table className={`table table-hover table-fixed-header`}>
                <thead>
                <tr>
                  <th>Imagem</th>
                  <th>Nome</th>
                  <th>Número</th>
                  <th>Habilidades</th>
                </tr>
                </thead>
                <tbody>
                  {pokemons.map((pokemon) => (
                    <>
                      <tr key={pokemon["id"]}>
                        <td>
                          <img
                            src={pokemon["ThumbnailImage"]}
                          />
                        </td>
                        <td>{pokemon["ThumbnailAltText"]}</td>
                        <td>{pokemon["number"]}</td>
                        <td>
                          <ul>
                            {pokemon["abilities"].map(hability => (
                              <li>{hability}</li>
                            ))}
                          </ul>
                        </td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default PokemonsIndex