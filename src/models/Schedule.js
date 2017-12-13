import {head, uniq, range} from '../../node_modules/lodash/lodash'
import moment from '../../node_modules/moment/moment'

export default class Schedule {
  constructor(week, days) {
    this.week = week
    this.days = days || []
  }

  get openingHours() {
    return range(this.earliestOpeningHour, this.latestOpeningHour).map((hour) => moment(this.week).add(hour, 'hours'))
  }

  get earliestOpeningHour() {
    const openingHours = this.days.map((day) => day.openingHour)
    const openAt = head(uniq(openingHours.map((openingHour) => openingHour.openAt)).sort())
    return openAt || 0
  }

  get latestOpeningHour() {
    const openingHours = this.days.map((day) => day.openingHour)
    const closedAt = head(uniq(openingHours.map((openingHour) => openingHour.closedAt)).sort().reverse())
    return closedAt || 24
  }
}
