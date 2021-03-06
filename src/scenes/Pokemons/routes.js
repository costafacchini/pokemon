import React, { useEffect } from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchBasicList } from './services/pokemon'
import { loadBasicList } from './scenes/slice'
import PokemonsIndex from './scenes/Index'
import PokemonRoute from './scenes/routes'

export default function PokemonsRoutes() {
  const dispatch = useDispatch()
  const basicList = useSelector(state => state.pokemon.basicList)

  useEffect(() => {
    if (basicList.length === 0) {
      fetchBasicList().then(pokemonList => {
        dispatch(loadBasicList(pokemonList))
      })
    }
  }, [dispatch, basicList])

  return (
    <HashRouter>
      <Switch>
        <Route path="/pokemon">
          <PokemonRoute />
        </Route>
        <Route path="/">
          <PokemonsIndex />
        </Route>
      </Switch>
    </HashRouter>
  )
}