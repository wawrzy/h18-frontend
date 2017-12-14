import {sortBy, sortedUniqBy, first, last, flatten} from '../../node_modules/lodash/lodash'

export default class Schedule {
  constructor(days) {
    this.days = days || []
  }

  get openingHours() {
    let timeSlots = flatten(this.days.map((day) => day.timeSlots))
    timeSlots = sortBy(timeSlots, (timeSlot) => timeSlot.hour)
    timeSlots = sortedUniqBy(timeSlots, (timeSlot) => timeSlot.hour)
    return timeSlots
  }

  get earliestOpenHour() {
    let timeSlots = this.days.map((day) => day.openAt)
    timeSlots = sortBy(timeSlots, (timeSlot) => timeSlot.hour)
    timeSlots = sortedUniqBy(timeSlots, (timeSlot) => timeSlot.hour)
    return first(timeSlots)
  }

  get latestClosedHour() {
    let timeSlots = this.days.map((day) => day.closedAt)
    timeSlots = sortBy(timeSlots, (timeSlot) => timeSlot.hour)
    timeSlots = sortedUniqBy(timeSlots, (timeSlot) => timeSlot.hour)
    return last(timeSlots)
  }
}
