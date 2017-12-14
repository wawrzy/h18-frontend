import {Element as PolymerElement} from '../node_modules/@polymer/polymer/polymer-element'

import '../node_modules/@polymer/paper-styles/color'

import './otto-schedule-row'

export class OttoTimeSlot extends PolymerElement {
  static get template() {
    return `
    <style>
      :host {
        display: flex;
        flex-direction: row;
        box-sizing: border-box;

        width: 100%;
        height: 100%;
        padding: 0 4px;

        cursor: pointer;

        transition: background .2s ease-out;
      }
      
      .staff {
        display: flex;
        align-items: center;
        box-sizing: content-box;

        flex: 1 0 0;
        padding: 4px;

        background-color: var(--paper-blue-500);
        
        border-radius: 2px;
        color: white;
      }
      
      .staff:not(:last-of-type) {
        border-right: 1px solid white;
      }
    </style>
    
    <template is="dom-repeat" items="{{timeSlot.scheduledStaffs}}" as="staff">
      <div class="staff">{{staff.firstName}}</div> 
    </template>
    `
  }

  static get properties() {
    return {
      timeSlot: {
        type: Object,
        required: true
      },
    }
  }
}

customElements.define('otto-time-slot', OttoTimeSlot)
