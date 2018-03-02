import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'

import Button from 'material-ui/Button'
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog'


const StaffInfoDialog = ({ timeSlot, staff, open, onClose, classes }) => {
  const title = `${timeSlot.datetime.format('MMM Do - HH:mm')}`

  return (
    <Dialog keepMounted open={open} onClose={onClose} aria-labelledby="staff-dialog-title" aria-describedby="staff-dialog-description">
      <DialogTitle id="staff-dialog-title" className={classes.staffDialogTitle}>{title}</DialogTitle>
      <DialogContent className={classes.staffDialogContent}>
        <DialogContentText id="staff-dialog-description">
          <strong>First name: </strong>{staff.firstName}<br />
          <strong>Last name: </strong>{staff.lastName}<br />
          <strong>Role: </strong>{staff.role}<br />
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">Close</Button>
      </DialogActions>
    </Dialog>
  )
}

StaffInfoDialog.propTypes = {
  timeSlot: PropTypes.object.isRequired,
  staff: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
  classes: PropTypes.object.isRequired,
}

const styles = (theme) => {
  const spacing = theme.spacing.unit * 3

  return {
    staffDialogTitle: {
      backgroundColor: theme.palette.primary['500'],
    },
    staffDialogContent: {
      padding: `${spacing}px ${spacing}px ${theme.spacing.unit}px ${spacing}px`,
    },
  }
}

export default withStyles(styles)(StaffInfoDialog)
