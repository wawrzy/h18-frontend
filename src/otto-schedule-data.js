import {Element as PolymerElement} from '../node_modules/@polymer/polymer/polymer-element'

import {findIndex, random, range} from '../node_modules/lodash/lodash'

import moment from '../node_modules/moment/moment'

import Otto from './services/Otto'

import Day from './models/Day'
import TimeSlot from './models/TimeSlot'
import Schedule from './models/Schedule'

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
      '_weekChanged(week)',
    ]
  }

  scheduleStaff(timeSlot, staff) {
    const dayId = this._findTimeSlotDayIndex(timeSlot)
    const timeSlotId = this._findTimeSlotIndex(dayId, timeSlot)

    this.push(`schedule.days.${dayId}.timeSlots.${timeSlotId}.scheduledStaffs`, staff)
    this.notifyPath(`schedule.days.${dayId}.timeSlots.${timeSlotId}.scheduledStaffs`)

    Otto.scheduleStaff(timeSlot, staff)
  }

  unscheduleStaff(timeSlot, staff) {
    const dayId = this._findTimeSlotDayIndex(timeSlot)
    const timeSlotId = this._findTimeSlotIndex(dayId, timeSlot)
    const staffId = this._findStaffIndex(dayId, timeSlotId, staff)

    this.splice(`schedule.days.${dayId}.timeSlots.${timeSlotId}.scheduledStaffs`, staffId, 1)
    this.notifyPath(`schedule.days.${dayId}.timeSlots.${timeSlotId}.scheduledStaffs`)

    Otto.unscheduleStaff(timeSlot, staff)
  }

  changeOpeningHours(day, openAt, closedAt) {
    if (openAt) {
      day.openAt = openAt
    }

    if (closedAt) {
      day.closedAt = closedAt
    }

    const dayId = findIndex(this.schedule.days, day)
    this.set(`schedule.days.${dayId}.timeSlots`, this.schedule.days[dayId].timeSlots.slice())
    this.notifyPath(`schedule.days.${dayId}.openAt`)
    this.notifyPath(`schedule.days.${dayId}.closedAt`)
    this.notifyPath(`schedule.earliestOpenHour`)
    this.notifyPath(`schedule.latestClosedHour`)
    this.notifyPath(`schedule.openingHours`)

    Otto.changeOpeningHours(day)
  }

  _findStaffIndex(dayIndex, timeSlotIndex, staff) {
    return findIndex(this.schedule.days[dayIndex].timeSlots[timeSlotIndex].scheduledStaffs, staff)
  }

  _findTimeSlotIndex(dayIndex, timeSlot) {
    return findIndex(this.schedule.days[dayIndex].timeSlots, (dayTimeSlot) => dayTimeSlot.isSame(timeSlot))
  }

  _findTimeSlotDayIndex(timeSlot) {
    return findIndex(this.schedule.days, (day) => {
      const startOfDay = moment(day.datetime).startOf('day')
      const startOfTimeSlotDay = moment(timeSlot.datetime).startOf('day')
      return startOfDay.isSame(startOfTimeSlotDay)
    })
  }

  _weekChanged(week) {
    this.schedule = Otto.getSchedule(week)
  }
}

customElements.define('otto-schedule-data', OttoScheduleData)
