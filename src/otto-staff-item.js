import {Element as PolymerElement} from '../node_modules/@polymer/polymer/polymer-element'

import '../node_modules/@polymer/paper-button/paper-button'

import './shared-styles'

export class OttoStaffItem extends PolymerElement {
  static get template() {
    return `
    <style include="shared-styles">
      #unscheduleBtn {
        position: relative;
        padding: 6px 8px;
        margin: 0;
        font-weight: normal;
        text-transform: none;
      }
      
      #unscheduleBtn:hover:after {
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        right: 0;
        border-radius: 3px;
        background-color: rgba(175, 175, 175, 0.65);
        color: var(--primary-color);
        font-size: 24px;
        font-weight: bold;
        content: '\u2a2f';
        opacity: 1;
      }
    </style>
    
    <paper-button id="unscheduleBtn">[[staff.fullName]]</paper-button>
    `
  }

  static get properties() {
    return {
      staff: {
        type: Object,
        required: true
      }
    }
  }

  ready() {
    super.ready()

    this.addEventListener('click', () => this._unscheduleStaff())
  }

  _unscheduleStaff() {
    const payload = {detail: {staff: this.staff}}
    this.dispatchEvent(new CustomEvent('unschedule-staff', payload))
  }
}

customElements.define('otto-staff-item', OttoStaffItem)
