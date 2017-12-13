import {Element as PolymerElement} from '../node_modules/@polymer/polymer/polymer-element'

export class OttoApp extends PolymerElement {
  static get template() {
    return `
      <div>This is my [[name]] app.</div>
    `
  }

  static get properties() {
    return {
      name: {
        type: String,
        value: 'Otto'
      }
    }
  }
}

customElements.define('otto-app', OttoApp)

