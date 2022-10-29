function Grid({ children }) {
  Component.call(this, { name: 'Grid', children })

  this.render = function () {
    const template = document.querySelector('#Grid')
    const clone = template.content.querySelector('div').cloneNode(true)

    this.addChildren(clone)

    return clone
  }
}

Object.setPrototypeOf(Grid.prototype, Component.prototype)
