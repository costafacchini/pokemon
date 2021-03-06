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

        if (pokemonInfo !== 'Not Found') {
          pokemons.push({
            abilities: pokemonInfo.abilities?.map(hability => hability.ability.name),
            types: pokemonInfo.types?.map(type => type.type.name),
            height: pokemonInfo.height,
            weight: pokemonInfo.weight,
            number: pokemonInfo.order,
            name: pokemonInfo.name,
            image: `https://pokeres.bastionbot.org/images/pokemon/${pokemonInfo.id}.png`,
            id: pokemonInfo.id,
            images: {
              original: pokemonInfo.sprites.other["official-artwork"]["front_default"],
              alternative: pokemonInfo.sprites.other["dream_world"]["front_default"]
            },
            stats: pokemonInfo.stats?.map(stat => {
              return { name: stat.stat.name, value: stat["base_stat"] }
            }),
            visible: true
          })
        } else {
          pokemons.push({ ...pokemon, visible: false })
        }
      }
    })

    await Promise.all(promises)

    return pokemons
  } catch (error) {
    console.error('Erro ao buscar os detalhes dos pokemons', error)
  }
}

async function fetchPokemonInfo(url) {
  return await request(url)
}

export { fetchBasicList, fetchPokemonsDetails }