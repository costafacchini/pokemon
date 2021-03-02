import './App.css'
import PokemonsIndex from "./scenes/Pokemons"
import React from "react"

function App() {
  return (
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <button className="navbar-brand">
          <img className="navbar-brand" src="https://assets.pokemon.com/assets/cms2/img/misc/gus/buttons/logo-pokemon-79x45.png" alt=""/>
        </button>
      </nav>
      <PokemonsIndex />
    </div>
  )
}

export default App
