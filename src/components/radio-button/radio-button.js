class RadioButton extends HTMLElement {
  static get observedAttributes() {
    return ['data-label', 'data-value', 'data-name']
  }
  constructor() {
    super()

    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(
      document.querySelector('template#radio-button').content.cloneNode(true)
    )

    this.shadowRoot
      .querySelector('input')
      .addEventListener('input', this.onInput.bind(this))

    this.shadowRoot
      .querySelector('input')
      .addEventListener('keydown', this.onKeyDown.bind(this))
  }

  onInput(event) {
    const value = event.target.value
  }

  onKeyDown(event) {
    if (event.key === 'Enter') {
      const form = this.closest('form')
      form.dispatchEvent(
        new Event('submit', { bubbles: true, cancelable: true })
      )
    }
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case 'data-label':
        this.shadowRoot.querySelector('span').textContent = newValue
        break
      case 'data-value':
        this.shadowRoot.querySelector('input').value = newValue
        break
      case 'data-name':
        this.shadowRoot.querySelector('input').name =
          this.shadowRoot.querySelector('input').id = newValue
    }
  }
}
