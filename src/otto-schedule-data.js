import {Element as PolymerElement} from '../node_modules/@polymer/polymer/polymer-element'

import {sampleSize, random, range} from '../node_modules/lodash/lodash'

import moment from '../node_modules/moment/moment'

import Day from './models/Day'
import TimeSlot from './models/TimeSlot'
import Schedule from './models/Schedule'
import Staff from './models/Staff'

const staffs = [
  new Staff('John', 'Doe', 'Cook'),
  new Staff('Patricia', 'Carter', 'Cashier'),
  new Staff('Raoul', 'Daqiri', 'Cleaner'),
  new Staff('Steve', 'Trump', 'Manager'),
  new Staff('Anna', 'Banana', 'Cook')
]

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

  scheduleStaff(timeSlot, staff) {
    console.log('scheduling staff', timeSlot, staff)
  }

  _weekChanged(week) {
    this.schedule = this._generateSchedule(week)
  }

  _generateSchedule(week) {
    const days = this._generateDaysForWeek(week)
    return new Schedule(days)
  }

  _generateDaysForWeek(week) {
    return range(7).map((day) => {
      const dayDatetime = moment(week).add(day, 'day')
      const timeSlots = this._generateTimeSlotsForDay(dayDatetime)
      return new Day(dayDatetime, timeSlots)
    })
  }

  _generateTimeSlotsForDay(day) {
    const openAt = random(4, 9)
    const closedAt = random(13, 22)
    return range(openAt, closedAt).map((hour) => {
      const openingHourDatetime = moment(day).startOf('day').add(hour, 'hours')
      const scheduledStaffs = sampleSize(staffs, random(0, 4))
      return new TimeSlot(openingHourDatetime, scheduledStaffs)
    })
  }
}

customElements.define('otto-schedule-data', OttoScheduleData)
