import {Element as PolymerElement} from '../node_modules/@polymer/polymer/polymer-element'

import './otto-schedule-row'

export class OttoTimeSlot extends PolymerElement {
  static get template() {
    return `
    <template is="dom-repeat" items="{{timeSlot.scheduledStaffs}}" as="scheduledStaff">
      [[scheduledStaff.fullName]]
    </template>
    `
  }

  static get properties() {
    return {
      timeSlot: {
        type: Object,
        required: true
      },
    }
  }
}

customElements.define('otto-time-slot', OttoTimeSlot)
