import {Route, Switch, useRouteMatch} from 'react-router-dom'
import PokemonsIndex from './Index'
import PokemonShow from './Show'
import React from 'react'

export default function PokemonRoutes() {
  let match = useRouteMatch()

  return (
    <Switch>
      <Route path={`${match.path}/:pokemonId`}>
        <PokemonShow />
      </Route>
      <Route exact path={`${match.path}`}>
        <PokemonsIndex />
      </Route>
    </Switch>
  )
}