function Grid({ children }) {
  this.children = children

  this.render = function () {
    const template = document.querySelector('#Grid')
    const clone = template.content.querySelector('div').cloneNode(true)

    for (const child of this.children) {
      clone.appendChild(child.render())
    }

    return clone
  }
}
