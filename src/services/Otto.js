import config from './config'

import ScheduleAssembler from './ScheduleAssembler'

const get = (path) => {
  return fetch(`${config.OTTO_BASE_PATH}/${path}`, {method: 'GET', headers: {'Accept': 'application/json'}})
    .then((response) => {
      return response.json()
    })
}

export default class Otto {
  static getSchedule(week) {
    get(`schedules/${week.format('YYYY-MM-DD')}`)
      .then((schedule) => {
        return ScheduleAssembler.assembleSchedule(schedule)
      })
  }

  static scheduleStaff(timeSlot, staff) {

  }

  static unscheduleStaff(timeSlot, staff) {

  }

  static changeOpeningHours(day) {

  }
}
