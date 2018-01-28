import React from 'react'
import PropTypes from 'prop-types'
import { calculateEarliestOpeningHour, calculateLatestClosingHour } from 'services/openingHours'

import Grid from 'material-ui/Grid'

import OpeningHours from 'components/OpeningHourList'
import Day from 'components/Day'

const Schedule = ({ schedule }) => {
  const earliestOpeningHour = calculateEarliestOpeningHour(schedule)
  const latestClosingHour = calculateLatestClosingHour(schedule)

  return (
    <Grid container spacing={0}>
      <OpeningHours openAt={earliestOpeningHour} closedAt={latestClosingHour} />
      {schedule.days.map((day) => <Day key={day.datetime} day={day} earliestOpeningHour={earliestOpeningHour} latestClosingHour={latestClosingHour} />)}
    </Grid>
  )
}

Schedule.propTypes = {
  schedule: PropTypes.object.isRequired,
}

export default Schedule
