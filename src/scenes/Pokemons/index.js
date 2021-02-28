import React, { useState, useEffect } from 'react'
import Card from './components/Card'

function PokemonsIndex({ pokemonList }) {
  const [pokemons, setPokemons] = useState([])
  const [expression, setExpression] = useState('')

  useEffect(() => {
    setPokemons(pokemonList.sort(compare))
  }, [pokemonList])

  function compare(a, b) {
    if (a["name"] < b["name"]){
      return -1
    }

    if (a["name"] > b["name"]){
      return 1
    }

    return 0
  }

  function changeExpression(e) {
    setExpression(e.target.value)
  }

  function contains(expression, substring) {
    return expression.toUpperCase().includes(substring.toUpperCase())
  }

  function filterPokemons(expression) {
    const pokemonsFiltered = pokemonList.filter((pokemon) => contains(pokemon["name"], expression) || contains(pokemon["number"], expression))
    setPokemons(pokemonsFiltered.sort(compare))
  }

  return (
    <>
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
                  <Card key={pokemon["id"]}
                    imgURL={pokemon["ThumbnailImage"]}
                    name={pokemon["name"]}
                    number={pokemon["number"]}
                    abilities={pokemon["abilities"]}
                  />
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