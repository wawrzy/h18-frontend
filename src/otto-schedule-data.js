import {Element as PolymerElement} from '../node_modules/@polymer/polymer/polymer-element'

import {flatten, random, range} from '../node_modules/lodash/lodash'

import moment from '../node_modules/moment/moment'

import OpeningHour from "./models/OpeningHour"
import TimeSlot from "./models/TimeSlot"

export class OttoScheduleData extends PolymerElement {
  static get properties() {
    return {
      week: {
        type: Date,
        required: true
      },
      openingHours: {
        type: Object,
        notify: true
      },
      timeSlots: {
        type: Array,
        notify: true
      }
    }
  }

  ready() {
    super.ready()

    // TODO: Fetch opening hours and time slots from API
    this.openingHours = this._generateOpeningHours()
    this.timeSlots = this._generateTimeSlots(this.openingHours)
  }

  _generateOpeningHours() {
    return range(7).map((day) => {
      const date = moment(this.week).add(day, 'day')
      const openAt = random(6, 9)
      const closedAt = random(15, 19)
      return new OpeningHour(date, openAt, closedAt)
    })
  }

  _generateTimeSlots(openingHours) {
    const timeSlots = openingHours.map((openingHour) => {
      const latestHour = openingHour.closedAt - openingHour.openAt
      const hours = range(random(3, 7)).map(() => random(0, latestHour)).sort()
      const availableHours = [...new Set(hours)]
      const dates = availableHours.map((hour) => moment(openingHour.date).add(hour, 'hours'))
      return dates.map((date) => new TimeSlot(date))
    })
    return flatten(timeSlots)
  }
}

customElements.define('otto-schedule-data', OttoScheduleData)
