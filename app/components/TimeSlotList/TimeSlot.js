import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'

import Cell from 'components/Cell'

const TimeSlot = ({ classes, timeSlot }) => (
  <Cell>
    { timeSlot.scheduledStaffs.map((staff) => (<div className={classes.scheduledStaff} key={`${timeSlot.datetime}-${staff.firstName}-${staff.lastName}`}>{staff.firstName}</div>))}
  </Cell>
)

TimeSlot.propTypes = {
  classes: PropTypes.object.isRequired,
  timeSlot: PropTypes.object.isRequired,
}

const styles = (theme) => ({
  scheduledStaff: {
    flexGrow: 1,
    backgroundColor: theme.palette.accent['300'],
    border: '1px solid white',
    borderRadius: '3px',
    color: 'white',
    fontSize: theme.font.size.small,
    height: '100%',
    padding: theme.spacing.unit / 2,
  },
})

export default withStyles(styles)(TimeSlot)
