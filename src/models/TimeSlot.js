export default class Hour {
  constructor(datetime, scheduledStaffs) {
    this.datetime = datetime
    this.scheduledStaffs = scheduledStaffs || []
  }

  get hour() {
    return this.datetime.hours()
  }
}
