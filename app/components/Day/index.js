import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import { calculateOpeningHour, calculateClosingHour } from 'services/openingHours'

import Grid from 'material-ui/Grid'

import Filler from 'components/Cell/Filler'
import TimeSlotList from 'components/TimeSlotList'
import Header from 'components/Header'

const Day = ({ classes, day, earliestOpeningHour, latestClosingHour }) => {
  const openingHour = calculateOpeningHour(day)
  const closingHour = calculateClosingHour(day)

  return (
    <Grid className={classes.root} item xs>
      <Grid container direction="column" spacing={0}>
        <Header title={`${day.datetime.date()}`} subtitle={day.datetime.format('ddd')} />
        <Filler first={earliestOpeningHour - 1} last={openingHour} />
        <TimeSlotList timeSlots={day.timeSlots} />
        <Filler first={closingHour} last={latestClosingHour} />
      </Grid>
    </Grid>
  )
}

Day.propTypes = {
  classes: PropTypes.object.isRequired,
  day: PropTypes.object.isRequired,
  earliestOpeningHour: PropTypes.number.isRequired,
  latestClosingHour: PropTypes.number.isRequired,
}

const styles = () => ({
  root: {
    borderRight: '1px solid lightgray',
  },
})

export default withStyles(styles)(Day)
