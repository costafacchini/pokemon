import { HashRouter, Route, Switch } from 'react-router-dom'
import PokemonsIndex from './scenes/Index'

export default function PokemonRoutes() {
  return (
    <HashRouter>
      <Switch>
        <Route path="/pokemon">
          <PokemonRoutes />
        </Route>
        <Route path="/">
          <PokemonsIndex />
        </Route>
      </Switch>
    </HashRouter>
  )
}