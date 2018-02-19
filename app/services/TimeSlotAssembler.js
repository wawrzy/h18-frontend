import moment from 'moment'

const fromJson = (timeSlots) => timeSlots.map((timeSlot) => {
  const datetime = moment(timeSlot.datetime)
  return { ...timeSlot, datetime }
})

export default {
  fromJson,
}
