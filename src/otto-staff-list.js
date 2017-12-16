import {Element as PolymerElement} from '../node_modules/@polymer/polymer/polymer-element'

import {uniq} from '../node_modules/lodash/lodash'

import './otto-staff-item'

export class OttoStaffList extends PolymerElement {
  static get template() {
    return `
    <template is="dom-repeat" items="{{staffRoles}}" as="role">
      <div>
        <span class="role">[[role.name]]:</span>
        <template is="dom-repeat" items="{{role.staffs}}" as="staff">
          <otto-staff-item staff="[[staff]]" on-tap="onStaffTap"></otto-staff-item>
        </template>
      </div>
    </template>
    `
  }

  static get properties() {
    return {
      staffs: {
        type: Array,
        required: true
      },
      staffRoles: {
        type: Array,
        computed: '_computeStaffRoles(staffs.*)'
      }
    }
  }

  _computeStaffRoles(staffs) {
    staffs = staffs.base
    const roles = uniq(staffs.map((staff) => staff.role))
    return roles.map((role) => {
      const staffsWithRole = staffs.filter((staff) => staff.role === role)
      return {
        name: role,
        staffs: staffsWithRole
      }
    })
  }

  onStaffTap(e) {
    this.dispatchEvent(new CustomEvent('remove-staff', {detail: {staff: e.target.staff}}))
  }
}

customElements.define('otto-staff-list', OttoStaffList)
