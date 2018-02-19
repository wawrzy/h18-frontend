import moment from 'moment'

import TimeSlotAssembler from './TimeSlotAssembler'

const fromJson = (schedule) => {
  const days = schedule.days.map((day) => {
    const datetime = moment(day.datetime)
    const timeSlots = TimeSlotAssembler.fromJson(day.timeSlots)
    return { datetime, timeSlots }
  })
  return { days }
}

export default {
  fromJson,
}
