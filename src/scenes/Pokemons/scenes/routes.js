import {Route, Switch, useRouteMatch} from 'react-router-dom'
import PokemonsIndex from './Index'
import PokemonShow from './Show'
import React from 'react'
import { useSelector } from 'react-redux'

export default function PokemonRoutes({ basicList }) {
  const pokemonsShowing = useSelector(state => state.pokemonIndex.pokemonsShowing)

  let match = useRouteMatch()

  return (
    <Switch>
      <Route path={`${match.path}/:pokemonId`}>
        <PokemonShow basicList={basicList} pokemonsShowing={pokemonsShowing} />
      </Route>
      <Route exact path={`${match.path}`}>
        <PokemonsIndex basicList={basicList} />
      </Route>
    </Switch>
  )
}