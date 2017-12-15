import {Element as PolymerElement} from '../node_modules/@polymer/polymer/polymer-element'

import '../node_modules/@polymer/paper-dialog/paper-dialog'

import './otto-opening-hours'
import './otto-schedule-data'
import './otto-schedule'

export class OttoSchedulePage extends PolymerElement {
  static get template() {
    return ` 
    <style>
      #openingHoursDialog {
        display: flex;
        flex-direction: column;
      }
    </style>
    
    <otto-schedule-data id="schedule" week="[[week]]" schedule="{{schedule}}"></otto-schedule-data>
    
    <paper-dialog id="openingHoursDialog">
      <h1>Opening hours</h1>
      <template is="dom-repeat" items="{{schedule.days}}" as="day">
        <otto-opening-hours day="[[day]]"></otto-opening-hours>
      </template>
      <div class="buttons">
        <paper-button dialog-confirm autofocus>Done</paper-button>
      </div>
    </paper-dialog>
    
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
    this.addEventListener('unschedule-staff', (e) => this._onUnscheduleStaff(e))
  }

  editOpeningHours() {
    this.$.openingHoursDialog.open()
  }

  _onScheduleStaff(e) {
    this.$.schedule.scheduleStaff(e.detail.timeSlot, e.detail.staff)
  }

  _onUnscheduleStaff(e) {
    this.$.schedule.unscheduleStaff(e.detail.timeSlot, e.detail.staff)
  }
}

customElements.define('otto-schedule-page', OttoSchedulePage)
