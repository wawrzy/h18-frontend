import {Element as PolymerElement} from '../node_modules/@polymer/polymer/polymer-element'

import '../node_modules/@polymer/paper-styles/color'
import '../node_modules/@polymer/paper-dialog/paper-dialog'
import '../node_modules/@polymer/paper-button/paper-button'

import './shared-styles'
import './otto-schedule-row'
import './otto-time-slot-details'

export class OttoTimeSlot extends PolymerElement {
  static get template() {
    return `
    <style include="shared-styles">
      :host {
        position: relative;
        width: 100%;
        height: 100%;
      }
      
      #content {
        display: flex;
        flex-direction: row;
        box-sizing: border-box;

        width: 100%;
        height: 100%;
        padding: 0 4px;
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
    
    <paper-dialog id="dialog">
      <otto-time-slot-details time-slot="[[timeSlot]]"></otto-time-slot-details>
      <div class="buttons">
        <paper-button dialog-confirm autofocus>Done</paper-button>
      </div>
    </paper-dialog>
    
    <div id="content">
      <template is="dom-repeat" items="{{timeSlot.scheduledStaffs}}" as="staff">
        <div class="staff">{{staff.firstName}}</div> 
      </template>
    </div>
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

  ready() {
    super.ready()

    this.$.content.addEventListener('click', () => this._onClick())
  }

  _onClick() {
    this.$.dialog.open()
  }
}

customElements.define('otto-time-slot', OttoTimeSlot)
