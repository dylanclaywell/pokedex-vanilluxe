class PokemonCard extends HTMLElement {
  static get observedAttributes() {
    return ['data-title', 'data-types', 'data-image-url']
  }

  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(
      document.querySelector('template#pokemon-card').content.cloneNode(true)
    )
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case 'data-title':
        this.shadowRoot.querySelector('.pokemon-card__title').textContent =
          newValue
        break
      case 'data-types':
        const card = this.shadowRoot.querySelector('.pokemon-card')
        const types = newValue.split(':')

        card.style.background =
          types.length > 1
            ? `
                linear-gradient( 
                  -15deg, 
                  var(--color-${types[0]}) 0%,
                  var(--color-${types[0]}) 65%,
                  var(--color-${types[1]}) 35%
                )
              `
            : `var(--color-${types[0]})`
        break
      case 'data-image-url':
        this.shadowRoot.querySelector('.pokemon-card__image').src = newValue
        break
    }
  }
}
