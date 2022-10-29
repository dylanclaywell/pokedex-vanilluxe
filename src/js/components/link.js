function Link({ children, href, target, ariaLabel }) {
  this.href = href
  this.target = target
  this.ariaLabel = ariaLabel

  Component.call(this, { name: 'Link', children })

  this.render = function () {
    const template = document.querySelector('#Link')
    const clone = template.content.querySelector('a').cloneNode(true)

    clone.href = this.href
    if (this.target) {
      clone.target = this.target
    }

    if (this.ariaLabel) {
      clone.setAttribute('aria-label', this.ariaLabel)
    }

    this.addChildren(clone)

    return clone
  }
}

Object.setPrototypeOf(Link.prototype, Component.prototype)
