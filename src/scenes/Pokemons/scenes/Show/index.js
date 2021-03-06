import { useParams } from 'react-router-dom'
import React from 'react'
import { useSelector } from 'react-redux'

export default function PokemonShow() {
  let { pokemonId } = useParams()

  const pokemonData = useSelector(state => state.pokemonShow.pokemonData)

  function handleClick() {
    window.history.back()
  }

  return (
    <>
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
          <a className='btn ml-1 btn-default' onClick={handleClick}>
            Voltar
          </a>
        </div>
      )}
    </>
  )
}