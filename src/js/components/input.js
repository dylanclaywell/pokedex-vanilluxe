function Input() {
  Component.call(this, { name: 'Input' })

  this.render = function () {
    const template = document.querySelector('#Input')
    const clone = template.content.querySelector('label').cloneNode(true)

    return clone
  }
}

Object.setPrototypeOf(Input.prototype, Component.prototype)
