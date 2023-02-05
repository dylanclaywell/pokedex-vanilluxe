const loadedPokemon = [
  'vanilluxe',
  'vanillish',
  'vanillite',
  'charizard',
  'charmander',
  'charmeleon',
  'squirtle',
  'wartortle',
  'blastoise',
]

async function load() {
  // const cards = []
  // for (const pokemon of loadedPokemon) {
  //   const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
  //   const data = await response.json()
  //   const link = new Link({
  //     children: new Card({
  //       title: data.name,
  //       imageUrl: data.sprites.front_default,
  //       types: data.types,
  //     }),
  //     href: 'https://google.com',
  //     target: '_blank',
  //     ariaLabel: 'Google',
  //   })
  //   cards.push(link)
  // }
  // const grid = new Grid({
  //   children: cards,
  // })
  // const input = new Input({
  //   label: 'Search',
  // })
  // const container = new Container({
  //   children: [input, grid],
  // })
  // document.querySelector('body').appendChild(container.render())
}

customElements.define('text-field', TextField)
customElements.define('pokemon-grid', PokemonGrid)

customElements.define(
  'pokemon-card',
  class extends HTMLElement {
    constructor() {
      super()
      const template = document.getElementById('pokemon-card')
      const templateContent = template.content

      this.attachShadow({ mode: 'open' }).appendChild(
        templateContent.cloneNode(true)
      )
    }
  }
)

window.onload = load
