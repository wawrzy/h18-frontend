import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'

import Button from 'material-ui/Button'
import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle,
} from 'material-ui/Dialog'
import TextField from 'material-ui/TextField'

class ScheduleStaffDialog extends React.Component {
  constructor(props) {
    super(props)
    this.state = { firstName: '', lastName: '', role: '' }

    this.submit = this.submit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(field) {
    return (e) => this.setState({ ...this.state, [field]: e.target.value })
  }

  submit(e) {
    e.preventDefault()

    const { onConfirm } = this.props
    const { firstName, lastName, role } = this.state
    if (firstName.trim() === '' || lastName.trim() === '' || role.trim() === '') return

    onConfirm({ firstName, lastName, role })
    this.setState({ ...this.state, firstName: '', lastName: '', role: '' })
  }

  render() {
    const { timeSlot, open, onClose, classes } = this.props
    const title = `${timeSlot.datetime.format('MMM Do - HH:mm')}`

    return (
      <Dialog keepMounted open={open} onClose={onClose} aria-labelledby="staff-dialog-title">
        <form onSubmit={this.submit}>
          <DialogTitle id="staff-dialog-title" className={classes.dialogTitle}>Schedule staff</DialogTitle>
          <DialogContent className={classes.dialogContent}>
            <h3 className={classes.dialogSubtitle}>{title}</h3>
            <TextField required label="First name" value={this.state.firstName} onChange={this.handleChange('firstName')} margin="normal" /><br />
            <TextField required label="Last name" value={this.state.lastName} onChange={this.handleChange('lastName')} margin="normal" /><br />
            <TextField required label="Role" value={this.state.role} onChange={this.handleChange('role')} margin="normal" />
          </DialogContent>
          <DialogActions>
            <Button type="cancel" onClick={onClose} color="primary">Close</Button>
            <Button type="submit" color="primary">Confirm</Button>
          </DialogActions>
        </form>
      </Dialog>
    )
  }
}

ScheduleStaffDialog.propTypes = {
  timeSlot: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
  onConfirm: PropTypes.func,
  classes: PropTypes.object.isRequired,
}

const styles = (theme) => {
  const spacing = theme.spacing.unit * 3

  return {
    dialogTitle: {
      backgroundColor: theme.palette.primary['500'],
    },
    dialogSubtitle: {
      margin: 0,
    },
    dialogContent: {
      padding: `${spacing}px ${spacing}px ${theme.spacing.unit}px ${spacing}px`,
    },
  }
}

export default withStyles(styles)(ScheduleStaffDialog)
