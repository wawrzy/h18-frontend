import {range} from '../../node_modules/lodash/lodash'

export default class OpeningHour {
  constructor(openAt, closedAt) {
    this.openAt = openAt
    this.closedAt = closedAt
  }

  get hours() {
    return range(this.openAt, this.closedAt)
  }
}
