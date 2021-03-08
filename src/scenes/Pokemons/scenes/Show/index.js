import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setPokemon } from './slice'
import { fetchPokemonsDetails } from '../../services/pokemon'
import styles from './style.css'
import Stats from './components/Stats'
import Information from './components/Information'
import MultipleInformation from './components/MultipleInformation'

function isEmpty(obj) {
  for(let prop in obj) {
    if(obj.hasOwnProperty(prop)) {
      return false
    }
  }

  return JSON.stringify(obj) === JSON.stringify({});
}

export default function PokemonShow({ basicList, pokemonsShowing }) {
  const dispatch = useDispatch()
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
      {isEmpty(pokemonData) && (
        <h3>{pokemonId} não encontrado</h3>
      )}
      {!isEmpty(pokemonData) && (
        <div className='container'>
          <div className='row'>
            <div className='col-6'>
              <img src={pokemonData.images.original} alt="" />
            </div>
            <div className='col-6'>
              <div className='container'>
                <div className='row'>
                  <div className='col-12'>
                    <h1>{pokemonData.name}</h1>
                  </div>
                </div>
                <div className='row row-info' style={styles.rowInfo}>
                  <div className='col-4'>
                    <Information title={'Número'} value={pokemonData.number} />
                  </div>
                  <div className='col-4'>
                    <Information title={'Altura'} value={pokemonData.height} />
                  </div>
                  <div className='col-4'>
                    <Information title={'Peso'} value={pokemonData.weight} />
                  </div>
                </div>
                <div className='row row-info' style={styles.rowInfo}>
                  <div className='col-6'>
                    <MultipleInformation title={'Habilidades'} collection={pokemonData.abilities} />
                  </div>
                  <div className='col-6'>
                    <MultipleInformation title={'Tipos'} collection={pokemonData.types} />
                  </div>
                </div>
                <div className='row row-graph' style={styles.rowGraph}>
                  <div className='col-12'>
                    <Stats stats={pokemonData.stats} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='col-12 text-center'>
              <button className='btn btn-primary btn-lg' onClick={handleClick}>Voltar</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
