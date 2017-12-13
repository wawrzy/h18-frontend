import {Element as PolymerElement} from '../node_modules/@polymer/polymer/polymer-element'

export class OttoSchedule extends PolymerElement {
  static get template() {
    return ` 
    <h1>Schedule</h1>
    `
  }
}

customElements.define('otto-schedule', OttoSchedule)
