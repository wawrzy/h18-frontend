import moment from '../../node_modules/moment/moment'

import Schedule from "../models/Schedule"
import Day from "../models/Day"
import TimeSlot from "../models/TimeSlot"
import Staff from "../models/Staff"

const assembleSchedule = (schedule) => {
  const days = assembleDays(schedule.days)
  return new Schedule(days)
}

const assembleDays = (days) => {
  if (!days) return []

  return days.map((day) => {
    const datetime = moment(day.datetime)
    const timeSlots = assembleTimeSlots(day.timeSlots)
    return new Day(datetime, timeSlots)
  })
}

const assembleTimeSlots = (timeSlots) => {
  if (!timeSlots) return []

  return timeSlots.map((timeSlot) => {
    const datetime = moment(timeSlot.datetime)
    const scheduledStaffs = assembleStaffs(timeSlot.scheduledStaffs)
    return new TimeSlot(datetime, scheduledStaffs)
  })
}

const assembleStaffs = (staffs) => {
  if (!staffs) return []

  return staffs.map((staff) => {
    return new Staff(staff.firstName, staff.lastName, staff.role)
  })
}

export default {
  assembleSchedule
}
