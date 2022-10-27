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
  const cards = []

  for (const pokemon of loadedPokemon) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    const data = await response.json()

    cards.push(
      new Card({
        title: data.name,
        imageUrl: data.sprites.front_default,
        types: data.types,
      })
    )
  }

  const grid = new Grid({
    children: cards,
  })

  document.querySelector('body').appendChild(grid.render())
}

window.onload = load
