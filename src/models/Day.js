import {remove, first, last, sortBy} from '../../node_modules/lodash/lodash'
import moment from '../../node_modules/moment/moment'

import TimeSlot from "./TimeSlot"

export default class Day {
  constructor(datetime, timeSlots) {
    this.datetime = datetime
    this.timeSlots = timeSlots || []
  }

  get sortedTimeSlots() {
    return sortBy(this.timeSlots, (timeSlot) => timeSlot.hour)
  }

  get openAt() {
    return first(this.sortedTimeSlots)
  }

  set openAt(openAt) {
    this._removeTimeSlotsBefore(openAt)
    this._addTimeSlotsAfter(openAt)
  }

  _removeTimeSlotsBefore(datetime) {
    const timeSlots = this.timeSlots.filter((timeSlot) => timeSlot.datetime.isBefore(datetime))
    timeSlots.forEach((timeSlot) => {
      remove(this.timeSlots, timeSlot)
    })
  }

  _addTimeSlotsAfter(datetime) {
    const firstTimeSlot = first(this.sortedTimeSlots)
    const timeSlotCount = (firstTimeSlot) ? this._countTimeSlotBetween(firstTimeSlot.datetime, datetime) : 0
    for (let i = 0; i < timeSlotCount; i++) {
      const timeSlotDateTime = moment(datetime).add(i, 'hours')
      const timeSlot = new TimeSlot(timeSlotDateTime)
      this.timeSlots.push(timeSlot)
    }
  }

  _countTimeSlotBetween(firstDatetime, secondDatetime) {
    if (firstDatetime && secondDatetime) {
      return firstDatetime.diff(secondDatetime, 'hours')
    }

    return 0
  }

  get closedAt() {
    return last(this.sortedTimeSlots)
  }

  set closedAt(closedAt) {
    this._removeTimeSlotsAfter(closedAt)
    this._addTimeSlotsBefore(closedAt)
  }

  _removeTimeSlotsAfter(datetime) {
    const timeSlots = this.timeSlots.filter((timeSlot) => timeSlot.datetime.isAfter(datetime))
    timeSlots.forEach((timeSlot) => {
      remove(this.timeSlots, timeSlot)
    })
  }

  _addTimeSlotsBefore(datetime) {
    const lastTimeSlot = last(this.sortedTimeSlots)
    const timeSlotCount = (lastTimeSlot) ? this._countTimeSlotBetween(datetime, lastTimeSlot.datetime) : 0
    for (let i = 1; i <= timeSlotCount; i++) {
      const timeSlotDateTime = moment(lastTimeSlot.datetime).add(i, 'hours')
      const timeSlot = new TimeSlot(timeSlotDateTime)
      this.timeSlots.push(timeSlot)
    }
  }

  get date() {
    return this.datetime.date()
  }

  get name() {
    return this.datetime.format('dddd')
  }

  get shortName() {
    return this.datetime.format('ddd')
  }
}
