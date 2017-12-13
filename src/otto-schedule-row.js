import {Element as PolymerElement} from '../node_modules/@polymer/polymer/polymer-element'

export class OttoScheduleRow extends PolymerElement {
  static get template() {
    return `
    <style>
      :host {
        display: flex;
        flex-direction: column;

        box-sizing: border-box;

        height: var(--row-height, 32px);
        border-bottom: 1px solid lightgray;

        font-size: 12px;

        @apply --otto-schedule-border;
      }

      :host([header]) {
        height: 96px;

        padding: var(--row-padding, 8px);
      }
      
      :host([active]) {
        cursor: pointer;
        background-color: rgba(21, 241, 12, 0.1)
      }
      
      :host([active]):hover {
        background-color: rgba(21, 241, 12, 0.2)
      }

      .subtitle {
        margin: 0;
        padding: 0;

        font-size: 12px;
        font-weight: normal;
      }

      .title {
        margin: 0;
        padding: 0;

        font-weight: normal;
        font-size: 48px;
      }
    </style>

    <template is="dom-if" if="{{subtitle}}">
      <h2 class="subtitle">{{subtitle}}</h2>
    </template>

    <template is="dom-if" if="{{title}}">
      <h1 class="title">{{title}}</h1>
    </template>

    <slot></slot>
    `
  }
}

customElements.define('otto-schedule-row', OttoScheduleRow)
