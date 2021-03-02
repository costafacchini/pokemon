import React, { useState, useEffect } from 'react'
import Card from './components/Card'
import request from '../../services/request'

function PokemonsIndex() {
  const [pokemons, setPokemons] = useState()
  const [expression, setExpression] = useState('')

  function compare(a, b) {
    if (a.name < b.name){
      return -1
    }

    if (a.name > b.name){
      return 1
    }

    return 0
  }

  useEffect(() => {
    async function getPokemons() {
      try {
        const pokemonsList = []

        //Get first 40 pokemons
        const pokemonsData = await request('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=40')
        const allPokemons = pokemonsData.results

        const promises = allPokemons.map(async pokemon => {
          const pokemonInfo = await request(pokemon.url)

          pokemonsList.push({
            abilities: pokemonInfo.abilities.map(hability => hability.ability.name),
            number: pokemonInfo.order,
            name: pokemonInfo.name,
            image: `https://pokeres.bastionbot.org/images/pokemon/${pokemonInfo.id}.png`,
            id: pokemonInfo.id
          })
        })

        await Promise.all(promises)

        return pokemonsList.sort(compare)
      } catch (error) {
        console.error('Error', error)
      }
    }
    getPokemons().then(pokemons => {
      setPokemons(pokemons)
    })
  }, [])

  function changeExpression(e) {
    setExpression(e.target.value)
  }

  function contains(attribute, substring) {
    return attribute.toUpperCase().includes(substring.toUpperCase())
  }

  function filterPokemons(expression) {
    const pokemonsFiltered = pokemons.filter(pokemon => contains(pokemon.name, expression) || contains(pokemon.number.toString(), expression))
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
                {pokemons && pokemons.map((pokemon) => (
                  <Card key={pokemon["id"]}
                    imgURL={pokemon["image"]}
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