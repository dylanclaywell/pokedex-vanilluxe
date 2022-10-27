function Card({ title, imageUrl, types }) {
  this.title = title
  this.imageUrl = imageUrl
  this.types = types

  this.render = function () {
    const template = document.querySelector('#Card')
    const clone = template.content.querySelector('div').cloneNode(true)
    clone.querySelector('.Card--title').textContent = this.title

    if (this.imageUrl) {
      clone.querySelector('.Card--image').src = this.imageUrl
    }

    if (this.types) {
      const types = this.types.map((type) => type.type.name)
      clone.classList.add(...types.map((type) => `Card__${type}`))
    }

    return clone
  }
}
