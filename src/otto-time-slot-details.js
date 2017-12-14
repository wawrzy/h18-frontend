import {Element as PolymerElement} from '../node_modules/@polymer/polymer/polymer-element'

import {uniq} from '../node_modules/lodash/lodash'

export class OttoTimeSlotDetails extends PolymerElement {
  static get template() {
    return `
    <style>
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
        margin-right: 4px;
      }

      .staff:not(:last-of-type)::after {
        position: absolute;
        right: -4px;
        bottom: -2px;
        display: block;
        content: ',';
      }
    </style>
    
    <h1>[[day]] - [[time]]</h1>

    <template is="dom-if" if="{{timeSlot.anyStaffRequired}}">
      <h2>Required staff</h2>
      <template is="dom-repeat" items="{{timeSlot.requiredStaffs}}" as="requiredStaff">
        <div>
          <span class="role">[[requiredStaff.role]]:</span>
          <span>[[requiredStaff.quantity]]</span>
        </div>
      </template>
    </template>

    <template is="dom-if" if="{{timeSlot.anyStaffScheduled}}">
      <h2>Scheduled staff</h2>
      <template is="dom-repeat" items="{{scheduledStaffRoles}}" as="role">
        <div>
          <span class="role">[[role.name]]:</span>
          <template is="dom-repeat" items="{{role.staffs}}" as="staff">
            <span class="staff">[[staff.fullName]]</span>
          </template>
        </div>
      </template>
    </template>
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
      scheduledStaffRoles: {
        type: Array,
        computed: '_computeScheduledStaffRoles(timeSlot)',
      }
    }
  }

  _computeDay(timeSlot) {
    return timeSlot.datetime.format('dddd')
  }

  _computeTime(timeSlot) {
    return timeSlot.datetime.format('HH:mm')
  }

  _computeScheduledStaffRoles(timeSlot) {
    const roles = uniq(timeSlot.scheduledStaffs.map((staff) => staff.role))
    return roles.map((role) => {
      const staffs = timeSlot.scheduledStaffs.filter((staff) => staff.role === role)
      return {
        name: role,
        staffs
      }
    })
  }
}

customElements.define('otto-time-slot-details', OttoTimeSlotDetails)
