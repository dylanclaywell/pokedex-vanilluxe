function Card({ title, imageUrl, types, children }) {
  this.title = title
  this.imageUrl = imageUrl
  this.types = types

  Component.call(this, { name: 'Card', children })

  this.render = function () {
    const template = document.querySelector('#Card')
    const clone = template.content.querySelector('div').cloneNode(true)
    clone.querySelector('.Card__title').textContent = this.title

    if (this.imageUrl) {
      clone.querySelector('.Card__image').src = this.imageUrl
    }

    if (this.types) {
      const types = this.types.map((type) => type.type.name)
      clone.classList.add(...types.map((type) => `Card--${type}`))
    }

    this.addChildren(clone)

    return clone
  }
}

Object.setPrototypeOf(Card.prototype, Component.prototype)
