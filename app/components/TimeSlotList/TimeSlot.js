import React from 'react'
import PropTypes from 'prop-types'

import Otto from 'services/Otto'

import Cell from 'components/Cell'
import ScheduledStaff from 'components/ScheduledStaff'
import StaffInfoDialog from 'components/StaffInfoDialog'

class TimeSlot extends React.Component {
  constructor(props) {
    super(props)
    this.state = { open: false, staff: null }

    this.renderScheduledStaff = this.renderScheduledStaff.bind(this)
    this.showStaff = this.showStaff.bind(this)
    this.unscheduleStaff = this.unscheduleStaff.bind(this)
    this.closeStaffInfoDialog = this.closeStaffInfoDialog.bind(this)
  }

  showStaff(staff) {
    const { timeSlot } = this.props
    this.setState({ ...this.state, timeSlot, staff, open: true })
  }

  unscheduleStaff(staff) {
    const { timeSlot } = this.props
    Otto.unscheduleStaff(timeSlot, staff)
  }

  closeStaffInfoDialog() {
    this.setState({ ...this.state, open: false, staff: null })
  }

  renderScheduledStaff(staff) {
    const { timeSlot } = this.props

    return (
      <ScheduledStaff key={`${timeSlot.datetime}-${staff.firstName}-${staff.lastName}`} staff={staff} onShowStaff={this.showStaff} onUnscheduleStaff={this.unscheduleStaff} />
    )
  }

  render() {
    const { timeSlot } = this.props
    const { open, staff } = this.state

    return (
      <Cell>
        { timeSlot.scheduledStaffs.map((scheduledStaff) => this.renderScheduledStaff(scheduledStaff)) }
        { staff && <StaffInfoDialog open={open} staff={staff} timeSlot={timeSlot} onClose={this.closeStaffInfoDialog} /> }
      </Cell>
    )
  }
}

TimeSlot.propTypes = {
  timeSlot: PropTypes.object.isRequired,
}

export default TimeSlot
