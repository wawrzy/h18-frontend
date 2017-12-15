export default class TimeSlot {
  constructor(datetime, scheduledStaffs) {
    this.datetime = datetime
    this.scheduledStaffs = scheduledStaffs || []
  }

  isSame(timeSlot) {
    return this.datetime.isSame(timeSlot.datetime)
  }

  get hour() {
    return this.datetime.hours()
  }
}
