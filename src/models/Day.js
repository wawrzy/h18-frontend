export default class Day {
  constructor(datetime, openingHour) {
    this.datetime = datetime
    this.openingHour = openingHour
  }

  get date() {
    return this.datetime.date()
  }

  get shortName() {
    return this.datetime.format('ddd')
  }
}
