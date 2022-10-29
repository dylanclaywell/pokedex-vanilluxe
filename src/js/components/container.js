function Container({ children }) {
  Component.call(this, { name: 'Container', children })

  this.render = function () {
    const template = document.querySelector('#Container')
    const clone = template.content.querySelector('div').cloneNode(true)

    this.addChildren(clone)

    return clone
  }
}

Object.setPrototypeOf(Container.prototype, Component.prototype)
