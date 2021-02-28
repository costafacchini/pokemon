import './App.css';
import PokemonsIndex from "./scenes/Pokemons";
import React from "react";

const pokemonList = [
  {
    "abilities": [
      "Overgrow"
    ],
    "number": "001",
    "name": "Bulbasaur",
    "ThumbnailImage": "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/001.png",
    "id": 1
  },
  {
    "abilities": [
      "Overgrow"
    ],
    "number": "002",
    "name": "Ivysaur",
    "ThumbnailImage": "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/002.png",
    "id": 2
  },
  {
    "abilities": [
      "Overgrow"
    ],
    "number": "003",
    "name": "Venusaur",
    "ThumbnailImage": "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/003.png",
    "id": 3
  },
  {
    "abilities": [
      "Blaze"
    ],
    "number": "004",
    "name": "Charmander",
    "ThumbnailImage": "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/004.png",
    "id": 4
  },
  {
    "abilities": [
      "Blaze"
    ],
    "number": "005",
    "name": "Charmeleon",
    "ThumbnailImage": "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/005.png",
    "id": 5
  },
  {
    "abilities": [
      "Blaze"
    ],
    "number": "006",
    "name": "Charizard",
    "ThumbnailImage": "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/006.png",
    "id": 6
  },
  {
    "abilities": [
      "Torrent"
    ],
    "number": "007",
    "name": "Squirtle",
    "ThumbnailImage": "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/007.png",
    "id": 7
  },
  {
    "abilities": [
      "Adaptability"
    ],
    "number": "015",
    "name": "Beedrill",
    "ThumbnailImage": "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/015.png",
    "id": 15
  },
  {
    "abilities": [
      "Keen Eye",
      "Tangled Feet"
    ],
    "number": "017",
    "name": "Pidgeotto",
    "ThumbnailImage": "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/017.png",
    "id": 17
  }
]

function App() {
  return (
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <button className="navbar-brand">
          <img className="navbar-brand" src="https://assets.pokemon.com/assets/cms2/img/misc/gus/buttons/logo-pokemon-79x45.png" alt=""/>
        </button>
      </nav>
      <PokemonsIndex pokemonList={pokemonList}/>
    </div>
  );
}

export default App;
