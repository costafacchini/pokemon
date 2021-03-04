import request from '../../../services/request'

async function fetchBasicList() {
  try {
    const pokemonsCount = await request('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1')
    const allPokemons = await request(`https://pokeapi.co/api/v2/pokemon/?offset=0&limit=${pokemonsCount.count}`)

    return allPokemons.results.sort(compare)
  } catch (error) {
    console.error('Erro ao buscar a lista de pokemons', error)
  }
}

function compare(pokemon1, pokemon2) {
  if (pokemon1.name < pokemon2.name){
    return -1
  }

  if (pokemon1.name > pokemon2.name){
    return 1
  }

  return 0
}

async function fetchPokemonsDetails(pokemonsOfPage) {
  try {
    let pokemons = []

    const promises = pokemonsOfPage.map(async pokemon => {
      if (!pokemon.hasOwnProperty('number')) {
        const pokemonInfo = await fetchPokemonInfo(pokemon.url)

        pokemons.push({
          abilities: pokemonInfo.abilities.map(hability => hability.ability.name),
          number: pokemonInfo.order,
          name: pokemonInfo.name,
          image: `https://pokeres.bastionbot.org/images/pokemon/${pokemonInfo.id}.png`,
          image_alt: `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${pokemonInfo.order}.png`,
          id: pokemonInfo.id
        })
      }
    })

    await Promise.all(promises)

    return pokemons
  } catch (error) {
    console.error('Erro ao buscar os detalhes dos pokemons', error)
  }
}

async function fetchPokemonInfo(url) {
  const pokemonInfo = await request(url)

  return pokemonInfo
}

export { fetchBasicList, fetchPokemonsDetails }