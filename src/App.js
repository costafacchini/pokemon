import './App.css'
import React from 'react'
import Routes from './scenes/routes'

function App() {
  return (
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <button className="navbar-brand">
          <img className="navbar-brand" src="https://assets.pokemon.com/assets/cms2/img/misc/gus/buttons/logo-pokemon-79x45.png" alt=""/>
        </button>
      </nav>
        <Routes />
    </div>
  )
}

export default App
