import {Element as PolymerElement} from '../node_modules/@polymer/polymer/polymer-element'

import {random, range} from '../node_modules/lodash/lodash'

import moment from '../node_modules/moment/moment'

import Day from './models/Day'
import OpeningHour from "./models/OpeningHour"
import Schedule from "./models/Schedule"

export class OttoScheduleData extends PolymerElement {
  static get properties() {
    return {
      week: {
        type: Date,
        required: true
      },
      schedule: {
        type: Object,
        notify: true
      }
    }
  }

  static get observers() {
    return [
      '_weekChanged(week)'
    ]
  }

  ready() {
    super.ready()
  }

  scheduleStaff(timeSlot, staff) {
    console.log('scheduling staff', timeSlot, staff)
  }

  _weekChanged(week) {
    this._generateSchedule(week)
  }

  _generateSchedule(week) {
    const days = this._generateDays(week)
    this.schedule = new Schedule(week, days)
  }

  _generateDays(week) {
    return range(7).map((day) => {
      const datetime = moment(week).add(day, 'day')
      const openAt = random(4, 9)
      const closedAt = random(13, 22)
      const openingHour = new OpeningHour(openAt, closedAt)
      return new Day(datetime, openingHour)
    })
  }

  // _generateTimeSlots(openingHours) {
  //   const timeSlots = openingHours.map((openingHour) => {
  //     const latestHour = openingHour.closedAt - openingHour.openAt
  //     const availableHours = uniq(range(random(3, 7)).map(() => random(0, latestHour)).sort())
  //     const dates = availableHours.map((hour) => moment(openingHour.date).add(hour, 'hours'))
  //     return dates.map((date) => new TimeSlot(date))
  //   })
  //   return flatten(timeSlots)
  // }
}

customElements.define('otto-schedule-data', OttoScheduleData)
