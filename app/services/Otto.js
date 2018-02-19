import ScheduleAssembler from './ScheduleAssembler'

const API_HOST = process.env.API_HOST

const get = (path) => fetch(`${API_HOST}/${path}`, {
  method: 'GET',
  headers: { Accept: 'application/json' },
}).then((response) => response.json())

const post = (path, payload) => fetch(`${API_HOST}/${path}`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
  body: JSON.stringify(payload),
})

const del = (path) => fetch(`${API_HOST}/${path}`, {
  method: 'DELETE',
})

export default class Otto {
  static getSchedule(week) {
    const schedulesEndpoint = `schedules/${week.format('YYYY-MM-DD')}`
    return get(schedulesEndpoint).then((schedule) => ScheduleAssembler.fromJson(schedule))
  }

  static scheduleStaff(timeSlot, staff) {
    const week = timeSlot.datetime.startOf('week')
    const endpoint = `schedules/${week.format('YYYY-MM-DD')}/staffs`
    const payload = {
      ...staff,
      timeSlot: timeSlot.datetime.format('YYYY-MM-DD"T"hh:mm:ss.SSS'),
    }
    post(endpoint, payload)
  }

  static unscheduleStaff(timeSlot, staff) {
    const week = timeSlot.datetime.startOf('week')
    const endpoint = `schedules/${week.format('YYYY-MM-DD')}/staffs/${timeSlot.datetime.format('hh-mm')}/${staff.firstName}/${staff.lastName}`
    del(endpoint)
  }
}
