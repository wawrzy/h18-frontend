import {Element as PolymerElement} from '../node_modules/@polymer/polymer/polymer-element'

import {range} from '../node_modules/lodash/lodash'
import moment from '../node_modules/moment/moment'

export class OttoOpeningHours extends PolymerElement {
  static get template() {
    return `
    <style>
      :host {
        display: flex;
        flex-direction: row;
        align-items: center;
        align-content: stretch;
      }
      
      .day {
        font-weight: bold;
        margin-right: 10px;
      }
      
      paper-dropdown-menu {
        width: 84px;
        margin: 0 8px;
      }
      
      paper-item {
        white-space: nowrap;
        padding: 0 24px;
      }
    </style>
    
    <span class="day">[[day.name]]:</span>
    
    <paper-dropdown-menu selected-item-label="{{selectedOpenAt}}" label="Open at" no-animations>
      <paper-listbox slot="dropdown-content" selected="[[day.openAt.hour]]">
        <template is="dom-repeat" items="{{hours}}" as="hour">
          <paper-item label="[[hour]]">[[hour]]</paper-item>
        </template>
      </paper-listbox>
    </paper-dropdown-menu>
    
    <paper-dropdown-menu selected-item-label="{{selectedCloseAt}}" label="Close at" no-animations>
      <paper-listbox slot="dropdown-content" selected="[[day.closedAt.hour]]">
        <template is="dom-repeat" items="{{hours}}" as="hour">
          <paper-item label="[[hour]]">[[hour]]</paper-item>
        </template>
      </paper-listbox>
    </paper-dropdown-menu>
    `
  }

  static get properties() {
    return {
      day: {
        type: Object,
        required: true
      },
      hours: {
        type: Array,
        computed: '_computeHours()'
      }
    }
  }

  _computeHours() {
    return range(24).map((hour) => moment(hour, 'h').format('h a'))
  }
}

customElements.define('otto-opening-hours', OttoOpeningHours)
