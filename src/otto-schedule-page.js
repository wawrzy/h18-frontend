import {Element as PolymerElement} from '../node_modules/@polymer/polymer/polymer-element'

import '../node_modules/@polymer/paper-dialog/paper-dialog'

import './otto-schedule-data'
import './otto-schedule'
import './otto-settings'

export class OttoSchedulePage extends PolymerElement {
  static get template() {
    return ` 
    <otto-schedule-data id="schedule" week="[[week]]" schedule="{{schedule}}"></otto-schedule-data>
    
    <paper-dialog id="settings">
      <otto-settings schedule="[[schedule]]"></otto-settings>
      
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
    this.addEventListener('change-opening-hours', (e) => this._onChangeOpeningHours(e))
  }

  openSettings() {
    this.$.settings.open()
  }

  _onScheduleStaff(e) {
    this.$.schedule.scheduleStaff(e.detail.timeSlot, e.detail.staff)
  }

  _onUnscheduleStaff(e) {
    this.$.schedule.unscheduleStaff(e.detail.timeSlot, e.detail.staff)
  }

  _onChangeOpeningHours(e) {
    this.$.schedule.changeOpeningHours(e.detail.day, e.detail.openAt, e.detail.closedAt)
  }
}

customElements.define('otto-schedule-page', OttoSchedulePage)
