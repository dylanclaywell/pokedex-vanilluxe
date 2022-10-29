function Component({ name, children }) {
  this.name = name
  this.children = children
}

Component.prototype.addChild = function (element, child) {
  if (isObject(child) && 'render' in child) {
    element.appendChild(child.render())
  } else if (typeof child === 'string') {
    element.textContent = child
  } else {
    console.warn(`${this.name}'s children prop must be a string or a component`)
  }
}

Component.prototype.addChildren = function (element) {
  if (!this.children) return

  if (Array.isArray(this.children)) {
    for (const child of this.children) {
      this.addChild(element, child)
    }
  } else {
    this.addChild(element, this.children)
  }
}
