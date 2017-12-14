import {remove} from '../../node_modules/lodash/lodash'

export default class TimeSlot {
  constructor(datetime, scheduledStaffs, availableStaffs) {
    this.datetime = datetime
    this.scheduledStaffs = scheduledStaffs || []
    this.availableStaffs = availableStaffs || []
  }

  scheduleStaff(staff) {
    remove(this.availableStaffs, staff)
    this.scheduledStaffs.push(staff)
  }

  isSame(timeSlot) {
    return this.datetime.isSame(timeSlot.datetime)
  }

  get hour() {
    return this.datetime.hours()
  }

  get anyStaffScheduled() {
    return this.scheduledStaffs.length > 0
  }
}
