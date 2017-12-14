import {Element as PolymerElement} from '../node_modules/@polymer/polymer/polymer-element'

import '../node_modules/web-animations-js/web-animations-next-lite.min'

import '../node_modules/@polymer/paper-dropdown-menu/paper-dropdown-menu'
import '../node_modules/@polymer/paper-item/paper-item'
import '../node_modules/@polymer/paper-listbox/paper-listbox'
import '../node_modules/@polymer/paper-button/paper-button'

import './shared-styles'

export class OttoScheduleStaff extends PolymerElement {
  static get template() {
    return `
    <style include="shared-styles"></style>
    
    <paper-dropdown-menu selected-item="{{selectedStaff}}" label="Staff" no-animations>
      <paper-listbox slot="dropdown-content" id="dropdownContent">
        <template is="dom-repeat" items="{{timeSlot.availableStaffs}}" as="staff">
          <paper-item id="[[index]]">[[staff.fullName]] - [[staff.role]]</paper-item>
        </template>
      </paper-listbox>
    </paper-dropdown-menu>
    <paper-button id="scheduleBtn" raised>Schedule</paper-button>
    `
  }

  static get properties() {
    return {
      timeSlot: {
        type: Object,
        required: true
      },
      selectedStaff: Object
    }
  }

  static get observers() {
    return [
      '_selectedStaffChanged(selectedStaff)'
    ]
  }

  ready() {
    super.ready()

    this.$.scheduleBtn.addEventListener('click', () => this._onScheduleStaff())
  }

  _selectedStaffChanged(selectedStaff) {
    this.staffToSchedule = selectedStaff ? this.timeSlot.availableStaffs[selectedStaff.id] : null
  }

  _onScheduleStaff() {
    if (!this.staffToSchedule) return

    const payload = {bubbles: true, composed: true, detail: {timeSlot: this.timeSlot, staff: this.staffToSchedule}}
    const event = new CustomEvent('schedule-staff', payload)
    this.dispatchEvent(event)

    this.$.dropdownContent.selected = null
  }
}

customElements.define('otto-schedule-staff', OttoScheduleStaff)
