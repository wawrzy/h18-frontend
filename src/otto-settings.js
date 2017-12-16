import {Element as PolymerElement} from '../node_modules/@polymer/polymer/polymer-element'

import '../node_modules/@polymer/paper-tabs/paper-tabs'
import '../node_modules/@polymer/iron-pages/iron-pages'

import './otto-opening-hours'
import './shared-styles'

export class OttoSettings extends PolymerElement {
  static get template() {
    return `
    <style include="shared-styles">
      :host {
        margin: 0 !important;
        padding: 0 !important;
        min-width: 320px;
      }
      
      .settings-sections > div {
        display: flex;
        flex-direction: column;
        
        padding: 0 24px;
      }
    </style>
    
    <paper-tabs selected="{{section}}">
      <paper-tab>Opening hours</paper-tab>
      <paper-tab>Staffs</paper-tab>
    </paper-tabs>
    
    <iron-pages selected="[[section]]" class="settings-sections">
      <div class="settings-section">
        <template is="dom-repeat" items="{{schedule.days}}" as="day">
          <otto-opening-hours day="[[day]]"></otto-opening-hours>
        </template>
      </div>
      <div class="settings-section">
      </div>
    </iron-pages>
    `
  }

  static get properties() {
    return {
      schedule: {
        type: Object,
        required: true
      },
      section: {
        type: Number,
        value: 0
      }
    }
  }
}

customElements.define('otto-settings', OttoSettings)
