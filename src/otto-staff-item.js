import {Element as PolymerElement} from '../node_modules/@polymer/polymer/polymer-element'

import '../node_modules/@polymer/paper-button/paper-button'

import './shared-styles'

export class OttoStaffItem extends PolymerElement {
  static get template() {
    return `
    <style include="shared-styles">
      #staffBtn {
        position: relative;
        padding: 6px 8px;
        margin: 0;
        font-weight: normal;
        text-transform: none;
      }
      
      #staffBtn:hover:after {
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
    
    <paper-button id="staffBtn">[[staff.fullName]]</paper-button>
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
}

customElements.define('otto-staff-item', OttoStaffItem)
