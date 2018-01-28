import moment from 'moment'

import TimeSlotAssembler from './TimeSlotAssembler'

const fromJson = (schedule) => {
  const days = schedule.days.map((day) => {
    const date = moment(day.datetime)
    const timeSlots = TimeSlotAssembler.fromJson(day.timeSlots)
    return { datetime: date, timeSlots }
  })
  return { days }
}

export default {
  fromJson,
}
