import { sortedUniq, sortBy, first, last } from 'lodash'

const sortTimeSlots = (timeSlots) => sortBy(timeSlots, (timeSlot) => timeSlot.datetime.hours())

const calculateEarliestOpeningHour = (schedule) => {
  const openingHours = schedule.days.map((day) => calculateOpeningHour(day))
  const sorted = sortBy(openingHours)
  return first(sortedUniq(sorted))
}

const calculateLatestClosingHour = (schedule) => {
  const closingHours = schedule.days.map((day) => calculateClosingHour(day))
  const sorted = sortBy(closingHours)
  return last(sortedUniq(sorted))
}

const calculateOpeningHour = (day) => {
  const timeSlots = sortTimeSlots(day.timeSlots)
  const openingTimeSlot = first(timeSlots)
  return openingTimeSlot ? openingTimeSlot.datetime.hours() : 0
}

const calculateClosingHour = (day) => {
  const timeSlots = sortTimeSlots(day.timeSlots)
  const closingTimeSlot = last(timeSlots)
  return closingTimeSlot ? closingTimeSlot.datetime.hours() : 23
}

export {
  calculateOpeningHour,
  calculateClosingHour,
  calculateEarliestOpeningHour,
  calculateLatestClosingHour,
}
