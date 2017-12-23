import {Element as PolymerElement} from '../node_modules/@polymer/polymer/polymer-element'

import './shared-styles'
import './otto-schedule-col'
import './otto-schedule-row'
import './otto-schedule-row-filler'
import './otto-time-slot'

export class OttoSchedule extends PolymerElement {
  static get template() {
    return ` 
    <style include="shared-styles">
      :host {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        
        height: 100%;
        overflow: auto;
      }

      .opening-hours {
        flex: 0 1 auto;
      }

      .opening-hour {
        padding: 8px;
        justify-content: center;
        align-items: flex-end;
        border: none;
        white-space: nowrap;
      }
      
      .opening-hour:nth-of-type(2) {
        margin-top: 16px;
      }
    </style>
    
    <otto-schedule-col class="opening-hours">
      <otto-schedule-row header></otto-schedule-row>

      <template is="dom-repeat" items="{{openingHours}}" as="openingHour">
        <otto-schedule-row class="opening-hour">[[openingHour]]</otto-schedule-row>
      </template>
    </otto-schedule-col>

    <template is="dom-repeat" items="{{schedule.days}}" as="day">
      <otto-schedule-col>
        <otto-schedule-row header title="[[day.date]]" subtitle="[[day.shortName]]"></otto-schedule-row>
        
        <otto-schedule-row-filler start="0" end="1"></otto-schedule-row-filler>
        <otto-schedule-row-filler start="[[schedule.earliestOpenHour.hour]]" end="[[day.openAt.hour]]"></otto-schedule-row-filler>
        
        <template is="dom-repeat" items="{{day.timeSlots}}" as="timeSlot">
          <otto-schedule-row active>
            <otto-time-slot time-slot="[[timeSlot]]"></otto-time-slot>
          </otto-schedule-row>
        </template>
        
        <otto-schedule-row-filler start="[[day.closedAt.hour]]" end="[[schedule.latestClosedHour.hour]]"></otto-schedule-row-filler>
      </otto-schedule-col>
    </template>
    `
  }

  static get properties() {
    return {
      schedule: Object,
      openingHours: {
        type: Array,
        computed: '_computeOpeningHours(schedule.*)'
      }
    }
  }

  _computeOpeningHours(schedule) {
    return schedule.base.openingHours.map((openingHour) => openingHour.datetime.format('h a'))
  }
}

customElements.define('otto-schedule', OttoSchedule)
