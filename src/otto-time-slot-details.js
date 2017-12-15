import {Element as PolymerElement} from '../node_modules/@polymer/polymer/polymer-element'

import {uniq} from '../node_modules/lodash/lodash'

import './otto-schedule-staff'
import './otto-staff-item'

import './shared-styles'

export class OttoTimeSlotDetails extends PolymerElement {
  static get template() {
    return `
    <style include="shared-styles">
      :host {
        display: flex;
        flex-direction: column;
      }

      .role {
        font-weight: bold;
      }
      
      .staff {
        position: relative;
      }

      .staff:not(:last-of-type) {
        margin-right: 2px;
      }

      .staff:not(:first-of-type):before {
        display: block;
        position: absolute;
        left: -6px;
        bottom: 50%;
        transform: translate3d(0, 50%, 0);
        font-weight: bold;
        font-size: large;
        content: '\u00B7';
      }
    </style>
    
    <h1>[[day]] - [[time]]</h1>

    <template is="dom-if" if="{{anyStaffRequired}}">
      <h2>Required staff</h2>
      <template is="dom-repeat" items="{{timeSlot.requiredStaffs}}" as="requiredStaff">
        <div>
          <span class="role">[[requiredStaff.role]]:</span>
          <span>[[requiredStaff.quantity]]</span>
        </div>
      </template>
    </template>

    <template is="dom-if" if="{{anyStaffScheduled}}">
      <h2>Scheduled staff</h2>
      <template is="dom-repeat" items="{{scheduledStaffRoles}}" as="role">
        <div>
          <span class="role">[[role.name]]:</span>
          <template is="dom-repeat" items="{{role.staffs}}" as="staff">
            <otto-staff-item class="staff" staff="[[staff]]" on-unschedule-staff="unscheduleStaff">[[staff.fullName]]</otto-staff-item>
          </template>
        </div>
      </template>
    </template>
    
    <otto-schedule-staff time-slot="[[timeSlot]]"></otto-schedule-staff>
    `
  }

  static get properties() {
    return {
      day: {
        type: String,
        computed: '_computeDay(timeSlot)'
      },
      time: {
        type: String,
        computed: '_computeTime(timeSlot)'
      },
      timeSlot: {
        type: Object,
        required: true
      },
      anyStaffRequired: {
        type: Boolean,
        computed: '_computeAnyStaffRequired(timeSlot.requiredStaffs)'
      },
      anyStaffScheduled: {
        type: Boolean,
        computed: '_computeAnyStaffScheduled(timeSlot.scheduledStaffs)'
      },
      scheduledStaffRoles: {
        type: Array,
        computed: '_computeScheduledStaffRoles(timeSlot.scheduledStaffs)'
      }
    }
  }

  unscheduleStaff(e) {
    const payload = {bubbles: true, composed: true, detail: {timeSlot: this.timeSlot, staff: e.detail.staff}}
    this.dispatchEvent(new CustomEvent('unschedule-staff', payload))
  }

  _computeDay(timeSlot) {
    return timeSlot.datetime.format('dddd')
  }

  _computeTime(timeSlot) {
    return timeSlot.datetime.format('HH:mm')
  }

  _computeAnyStaffRequired(requiredStaffs) {
    return false
  }

  _computeAnyStaffScheduled(scheduledStaffs) {
    return scheduledStaffs.length > 0
  }

  _computeScheduledStaffRoles(scheduledStaffs) {
    const roles = uniq(scheduledStaffs.map((staff) => staff.role))
    return roles.map((role) => {
      const staffs = scheduledStaffs.filter((staff) => staff.role === role)
      return {
        name: role,
        staffs
      }
    })
  }
}

customElements.define('otto-time-slot-details', OttoTimeSlotDetails)
