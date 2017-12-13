import {Element as PolymerElement} from '../node_modules/@polymer/polymer/polymer-element'

import './shared-styles'
import './otto-schedule-col'
import './otto-schedule-row'
import './otto-schedule-row-filler'
import './otto-schedule-data'

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
        <otto-schedule-row-filler start="[[schedule.earliestOpeningHour]]" end="[[day.openingHour.openAt]]"></otto-schedule-row-filler>
        
        <template is="dom-repeat" items="{{day.openingHour.hours}}" as="hour">
          <otto-schedule-row active>
            <!--<otto-timeslot hour="[[hour]]" time-slots="[[day.timeSlots]]" on-time-slot-selected="handleTimeSlotSelected"></otto-timeslot>-->
          </otto-schedule-row>
        </template>
        <otto-schedule-row-filler start="[[day.openingHour.closedAt]]" end="[[schedule.latestOpeningHour]]"></otto-schedule-row-filler>
      </otto-schedule-col>
    </template>
    `
  }

  static get properties() {
    return {
      schedule: Object,
      openingHours: {
        type: Array,
        computed: '_computeOpeningHours(schedule)'
      }
    }
  }

  _computeOpeningHours(schedule) {
    return schedule.openingHours.map((openingHour) => openingHour.format('h a'))
  }
}

customElements.define('otto-schedule', OttoSchedule)
