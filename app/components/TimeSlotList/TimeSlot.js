import React from 'react'
import PropTypes from 'prop-types'

import Otto from 'services/Otto'

import Cell from 'components/Cell'
import ScheduledStaff from 'components/ScheduledStaff'
import StaffInfoDialog from 'components/StaffInfoDialog'
import ScheduleStaffDialog from 'components/ScheduleStaffDialog'

class TimeSlot extends React.Component {
  constructor(props) {
    super(props)
    this.state = { staffDialogOpen: false, scheduleDialogOpen: false, staff: null, addedStaffs: [] }

    this.showScheduleStaffDialog = this.showScheduleStaffDialog.bind(this)
    this.renderScheduledStaff = this.renderScheduledStaff.bind(this)
    this.showStaff = this.showStaff.bind(this)
    this.scheduleStaff = this.scheduleStaff.bind(this)
    this.unscheduleStaff = this.unscheduleStaff.bind(this)
    this.closeStaffDialog = this.closeStaffDialog.bind(this)
    this.closeScheduleDialog = this.closeScheduleDialog.bind(this)
  }

  showStaff(staff) {
    this.setState({ ...this.state, staff, staffDialogOpen: true })
  }

  showScheduleStaffDialog() {
    this.setState({ ...this.state, scheduleDialogOpen: true })
  }

  scheduleStaff(staff) {
    const { timeSlot } = this.props
    Otto.scheduleStaff(timeSlot, staff).then(() => {
      const state = { ...this.state, scheduleDialogOpen: false }
      state.addedStaffs.push(staff)
      this.setState(state)
    })
  }

  unscheduleStaff(staff) {
    const { timeSlot } = this.props
    Otto.unscheduleStaff(timeSlot, staff)
  }

  closeStaffDialog() {
    this.setState({ ...this.state, staffDialogOpen: false, staff: null })
  }

  closeScheduleDialog() {
    this.setState({ ...this.state, scheduleDialogOpen: false })
  }

  renderScheduledStaff(staff) {
    const { timeSlot } = this.props

    return (
      <ScheduledStaff key={`${timeSlot.datetime}-${staff.firstName}-${staff.lastName}`} staff={staff} onShowStaff={this.showStaff} onUnscheduleStaff={this.unscheduleStaff} />
    )
  }

  render() {
    const { timeSlot } = this.props
    const { staffDialogOpen, scheduleDialogOpen, staff } = this.state
    const scheduledStaffs = timeSlot.scheduledStaffs.concat(this.state.addedStaffs)

    return (
      <div role="button" tabIndex="0" onClick={this.showScheduleStaffDialog}>
        <Cell>
          { scheduledStaffs.map((scheduledStaff) => this.renderScheduledStaff(scheduledStaff)) }
          { <ScheduleStaffDialog open={scheduleDialogOpen} timeSlot={timeSlot} onClose={this.closeScheduleDialog} onConfirm={this.scheduleStaff} /> }
          { staff && <StaffInfoDialog open={staffDialogOpen} staff={staff} timeSlot={timeSlot} onClose={this.closeStaffDialog} /> }
        </Cell>
      </div>
    )
  }
}

TimeSlot.propTypes = {
  timeSlot: PropTypes.object.isRequired,
}

export default TimeSlot
