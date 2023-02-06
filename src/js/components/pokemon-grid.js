function dbLookupByName(name) {
  const objectStore = database.transaction('pokemon').objectStore('pokemon')
  const results = []

  return new Promise((resolve, reject) => {
    objectStore.openCursor().onsuccess = (event) => {
      const cursor = event.target.result

      if (!cursor) {
        return resolve(results)
      }

      const pokemonName = cursor.key

      if (pokemonName.includes(name)) {
        results.push(cursor.value)
      }

      cursor.continue()
    }
  })
}

class PokemonGrid extends HTMLElement {
  previousSearchValue = null

  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(
      document.querySelector('template#pokemon-grid').content.cloneNode(true)
    )

    const searchForm = this.shadowRoot.querySelector('form')
    searchForm.addEventListener('submit', this.search.bind(this))
  }

  async search(e) {
    e.preventDefault()

    if (this.searchValue === this.previousSearchValue) {
      return
    }

    this.previousSearchValue = this.searchValue

    this.setIsLoading(true)
    const searchResults = await dbLookupByName(this.searchValue)
    this.setIsLoading(false)

    const searchResultsNode = this.shadowRoot.querySelector(
      '.pokemon-grid__search-results'
    )

    const cards = []

    for (const pokemon of searchResults) {
      const name =
        pokemon.speciesData?.names.find((n) => n.language.name === 'en').name ??
        pokemon.name
      const card = document.createElement('pokemon-card')
      card.setAttribute('data-title', name)

      const sprite = pokemon.pokemonData.sprites.front_default
      card.setAttribute('data-image-url', sprite)

      const types = pokemon.pokemonData.types.map((t) => t.type.name).join(':')
      card.setAttribute('data-types', types)
      cards.push(card)
    }

    searchResultsNode.replaceChildren(...cards)
  }

  setIsLoading(isLoading) {
    if (!isLoading) {
      this.shadowRoot.querySelector('.loader').classList.remove('visible')
      this.shadowRoot.querySelector('.loader').classList.add('hidden')
    } else {
      this.shadowRoot.querySelector('.loader').classList.remove('hidden')
      this.shadowRoot.querySelector('.loader').classList.add('visible')
    }
  }

  get searchValue() {
    return this.shadowRoot
      .querySelector('.pokemon-grid__search-field')
      .shadowRoot.querySelector('input').value
  }
}
