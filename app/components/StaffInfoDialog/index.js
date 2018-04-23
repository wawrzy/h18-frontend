import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import { CirclePicker } from 'react-color'

import Button from 'material-ui/Button'
import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle,
} from 'material-ui/Dialog'
import TextField from 'material-ui/TextField'

class StaffInfoDialog extends React.Component {
  constructor(props) {
    super(props)

    this.state = { firstName: this.props.staff.firstName, lastName: this.props.staff.lastName, role: this.props.staff.role, color: this.props.staff.color }
    this.sauv = { firstName: this.props.staff.firstName, lastName: this.props.staff.lastName, role: this.props.staff.role, color: this.props.staff.color }

    this.submit = this.submit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleColorChange = this.handleColorChange.bind(this)
  }

  handleChange(field) {
    return (e) => this.setState({ ...this.state, [field]: e.target.value })
  }

  handleColorChange(color) {
    this.setState({ ...this.state, color: color.hex })
  }

  submit(e) {
    e.preventDefault()

    const { onConfirm } = this.props
    const { firstName, lastName, role, color } = this.state
    if (firstName.trim() === '' || lastName.trim() === '' || role.trim() === '') return

    onConfirm({ firstName, lastName, role, color }, this.sauv)
    this.setState({ ...this.state, firstName: '', lastName: '', role: '', color: '' })
  }

  render() {
    const { timeSlot, staff, open, onClose, classes } = this.props
    const title = `${timeSlot.datetime.format('MMM Do - HH:mm')}`


    return (
      <Dialog keepMounted open={open} onClose={onClose} aria-labelledby="staff-dialog-title" aria-describedby="staff-dialog-description">
        <form onSubmit={this.submit}>
          <DialogTitle id="staff-dialog-title" className={classes.staffDialogTitle}>{title}</DialogTitle>
          <DialogContent className={classes.staffDialogContent} id="staff-dialog-description">
            <strong>First name: </strong><TextField defaultValue={staff.firstName} onChange={this.handleChange('firstName')} /><br />
            <strong>Last name: </strong><TextField defaultValue={staff.lastName} onChange={this.handleChange('lastName')} /><br />
            <strong>Role: </strong><TextField defaultValue={staff.role} onChange={this.handleChange('role')} /><br />
            <CirclePicker color={this.state.color} onChange={this.handleColorChange} />
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose} color="primary">Close</Button>
            <Button type="submit" color="primary">Confirm</Button>
          </DialogActions>
        </form>
      </Dialog>
    )
  }
}

StaffInfoDialog.propTypes = {
  timeSlot: PropTypes.object.isRequired,
  staff: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
  onConfirm: PropTypes.func,
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
