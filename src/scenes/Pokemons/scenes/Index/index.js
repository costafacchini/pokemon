import React, { useEffect } from 'react'
import Card from './components/Card'
import { useSelector, useDispatch } from 'react-redux'
import { fetchPokemonsDetails } from '../../services/pokemon'
import { addMore, filter, setExpression, setPage } from './slice'

function PokemonsIndex() {
  const dispatch = useDispatch()
  const basicList = useSelector(state => state.pokemon.basicList)
  const pokemonsShowing = useSelector(state => state.pokemonIndex.pokemonsShowing)
  const expression = useSelector(state => state.pokemonIndex.expression)
  const page = useSelector(state => state.pokemonIndex.page)

  const cardsForPage = 40

  useEffect(() => {
    const intervalEnd = page * cardsForPage
    const intervalStart = intervalEnd - cardsForPage

    if ((basicList.length > 0) && (basicList.length > pokemonsShowing.length) && (pokemonsShowing.length < intervalEnd)) {
      const pokemonsOfPage = basicList.slice(intervalStart, intervalEnd)

      fetchPokemonsDetails(pokemonsOfPage).then(pokemons => {
        dispatch(addMore(pokemons))
      })
    }
  }, [dispatch, basicList, page, pokemonsShowing] )

  function changeExpression(e) {
    dispatch(setExpression(e.target.value))
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
                dispatch(filter(expression))
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
              <div className={'row row-cols-1 row-cols-md-4'} >
                {pokemonsShowing && pokemonsShowing.filter(pokemon => pokemon.visible === true).map((pokemon) =>  (
                  <Card key={pokemon.id} pokemon={pokemon} />
                ))}
              </div>
            </div>
          </div>
          {expression === '' && (basicList.length > pokemonsShowing.length) && (
            <div className='row'>
              <div className='col text-center mt-3'>
                <button type='button' className='btn btn-outline-primary d-print-none' onClick={() => dispatch(setPage(page + 1))}>
                  Carregar mais
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  )
}

export default PokemonsIndex