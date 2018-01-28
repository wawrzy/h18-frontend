import moment from 'moment'
import { random, range } from 'lodash'

const firstDayOfWeek = moment().startOf('week').startOf('day')
const days = range(7).map((day) => {
  const date = moment(firstDayOfWeek).add(day, 'day')
  const timeSlots = range(random(4, 9), random(15, 22)).map((hour) => {
    const datetime = moment(date).add(hour, 'hour')
    return {
      datetime,
    }
  })

  return {
    datetime: date,
    timeSlots,
  }
})

const schedule = {
  days,
}

export { schedule }
