async function fetchPokemon() {
  const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=10000')
  const data = await response.json()
  const summary = data.results

  const pokemon = await Promise.all(
    summary.map(async (p) => {
      const response = await fetch(p.url)
      const data = await response.json()
      return data
    })
  )
  const species = await Promise.all(
    pokemon.map(async (p) => {
      const response = await fetch(p.species.url)
      const data = await response.json()
      return data
    })
  )

  return summary.map((p) => {
    const pokemonData = pokemon.find((pkmn) => pkmn.name === p.name)
    const speciesData = species.find((s) => s.name === p.name)
    return {
      name: p.name,
      pokemonData,
      speciesData,
    }
  })
}

const indexedDBRequest = indexedDB.open('pokedex-vanilluxe', 1)
let database = null

indexedDBRequest.onsuccess = (event) => {
  database = event.target.result
}

indexedDBRequest.onupgradeneeded = async (event) => {
  // Save the IDBDatabase interface
  const db = event.target.result

  // Create an objectStore for this database
  const objectStore = db.createObjectStore('pokemon', { keyPath: 'name' })
  objectStore.createIndex('name', 'name', { unique: true })

  objectStore.transaction.oncomplete = async (event) => {
    const pokemon = await fetchPokemon()
    // Store values in the newly created objectStore.
    const pokemonObjectStore = db
      .transaction('pokemon', 'readwrite')
      .objectStore('pokemon')
    pokemon.forEach((p) => {
      pokemonObjectStore.add(p)
    })
  }
}

customElements.define('text-field', TextField)
customElements.define('pokemon-grid', PokemonGrid)
customElements.define('pokemon-card', PokemonCard)
