class TextField extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(
      document.querySelector('template#text-field').content.cloneNode(true)
    )

    this.shadowRoot
      .querySelector('input')
      .addEventListener('input', this.onInput.bind(this))
  }

  onInput(event) {
    const value = event.target.value
  }
}
