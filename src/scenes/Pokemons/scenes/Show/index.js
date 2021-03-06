import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setPokemon } from './slice'
import { fetchPokemonsDetails } from '../../services/pokemon'

export default function PokemonShow() {
  const dispatch = useDispatch()
  const basicList = useSelector(state => state.pokemon.basicList)
  const pokemonsShowing = useSelector(state => state.pokemonIndex.pokemonsShowing)
  const pokemonData = useSelector(state => state.pokemonShow.pokemonData)

  let { pokemonId } = useParams()

  useEffect(() => {
    if (basicList.length > 0) {
      const pokemonBuffered = pokemonsShowing.find(pokemon => pokemon.name === pokemonId)
      if (pokemonBuffered) {
        dispatch(setPokemon(pokemonBuffered))
      } else {
        const pokemon = basicList.find(pokemon => pokemon.name === pokemonId)
        fetchPokemonsDetails([ pokemon ]).then(pokemonsInfo => {
          dispatch(setPokemon(pokemonsInfo[0]))
        })
      }
    }
  }, [dispatch, basicList, pokemonId, pokemonsShowing])

  function handleClick() {
    window.history.back()
  }

  return (
    <>
      {JSON.stringify(pokemonData)}
      {!pokemonData && (
        <h3>Pokemon: {pokemonId} não encontrado</h3>
      )}
      {pokemonData && (
        <div className='container'>
          <div className='row'>
            <div className='col-36'>
              <h3>Em construção</h3>
            </div>
          </div>
          <button onClick={handleClick}>Voltar</button>
        </div>
      )}
    </>
  )
}