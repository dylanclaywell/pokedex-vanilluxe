class PokemonGrid extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(
      document.querySelector('template#pokemon-grid').content.cloneNode(true)
    )

    const searchButton = this.shadowRoot.querySelector(
      '.pokemon-grid__search-button'
    )
    searchButton.addEventListener('click', this.search.bind(this))
  }

  search() {
    console.log(this.searchValue)
  }

  get searchValue() {
    return this.shadowRoot
      .querySelector('.pokemon-grid__search-field')
      .shadowRoot.querySelector('input').value
  }
}
