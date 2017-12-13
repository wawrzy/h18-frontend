import {Element as PolymerElement} from '../node_modules/@polymer/polymer/polymer-element'

export class OttoScheduleCol extends PolymerElement {
  static get template() {
    return `
    <style>
      :host {
        display: flex;
        flex-direction: column;
        flex: 1 0 auto;

        border-right: 1px solid lightgray;

        @apply --otto-schedule-border;
      }

      .host(:last-of-type) {
        border-right: none;
      }
    </style>

    <slot></slot>
    `
  }
}

customElements.define('otto-schedule-col', OttoScheduleCol)
