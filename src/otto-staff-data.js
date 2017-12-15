import {Element as PolymerElement} from '../node_modules/@polymer/polymer/polymer-element'

import staffs from './fixtures/staffs'

export class OttoStaffData extends PolymerElement {
  static get properties() {
    return {
      staffs: {
        type: Array,
        value: staffs,
        notify: true
      }
    }
  }

  // TODO: Fetch staffs from API
}

customElements.define('otto-staff-data', OttoStaffData)
