import {Element as PolymerElement} from '../node_modules/@polymer/polymer/polymer-element'

import './otto-schedule-data'
import './otto-schedule'

export class OttoSchedulePage extends PolymerElement {
  static get template() {
    return ` 
    <otto-schedule-data id="schedule" week="[[week]]" schedule="{{schedule}}"></otto-schedule-data>
    
    <otto-schedule schedule="[[schedule]]"></otto-schedule>
    `
  }

  static get properties() {
    return {
      week: {
        type: Date,
        required: true
      },
      schedule: Object
    }
  }

  ready() {
    super.ready()

    this.addEventListener('schedule-staff', (e) => this._onScheduleStaff(e))
  }

  _onScheduleStaff(e) {
    this.$.schedule.scheduleStaff(e.detail.timeSlot, e.detail.staff)
  }
}

customElements.define('otto-schedule-page', OttoSchedulePage)
