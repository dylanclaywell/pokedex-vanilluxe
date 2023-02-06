class RadioButton extends HTMLElement {
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
}
