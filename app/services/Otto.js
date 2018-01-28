import ScheduleAssembler from './ScheduleAssembler'

const API_HOST = process.env.API_HOST

const get = (path) => fetch(`${API_HOST}/${path}`, {
  method: 'GET',
  headers: { Accept: 'application/json' },
}).then((response) => response.json())

export default class Otto {
  static getSchedule(week) {
    const schedulesEndpoint = `schedules/${week.format('YYYY-MM-DD')}`
    return get(schedulesEndpoint).then((schedule) => ScheduleAssembler.fromJson(schedule))
  }
}
