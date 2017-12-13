import {Element as PolymerElement} from '../node_modules/@polymer/polymer/polymer-element'

import {range} from '../node_modules/lodash/lodash'

import './otto-schedule-row'

export class OttoScheduleRowFiller extends PolymerElement {
  static get template() {
    return `
    <template is="dom-repeat" items="{{fillers}}">
      <otto-schedule-row></otto-schedule-row>
    </template>
    `
  }

  static get properties() {
    return {
      start: {
        type: Number,
        required: true
      },
      end: {
        type: Number,
        required: true
      },
      fillers: {
        type: Array,
        computed: '_computeFillers(start, end)'
      }
    }
  }

  _computeFillers(start, end) {
    return range(start, end)
  }
}

customElements.define('otto-schedule-row-filler', OttoScheduleRowFiller)
