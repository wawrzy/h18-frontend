import {first, last, sortBy} from '../../node_modules/lodash/lodash'

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

  get closedAt() {
    return last(this.sortedTimeSlots)
  }

  get date() {
    return this.datetime.date()
  }

  get shortName() {
    return this.datetime.format('ddd')
  }
}
