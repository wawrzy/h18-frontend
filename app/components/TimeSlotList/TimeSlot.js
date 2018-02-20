import React from 'react'
import PropTypes from 'prop-types'

import { difference } from 'lodash'

import Otto from 'services/Otto'

import Cell from 'components/Cell'
import ScheduledStaff from 'components/ScheduledStaff'
import StaffInfoDialog from 'components/StaffInfoDialog'
import ScheduleStaffDialog from 'components/ScheduleStaffDialog'

class TimeSlot extends React.Component {
  constructor(props) {
    super(props)
    this.state = { staffDialogOpen: false, scheduleDialogOpen: false, staff: null, scheduledStaffs: [], unscheduledStaffs: [] }

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
      state.scheduledStaffs.push(staff)
      this.setState(state)
    })
  }

  unscheduleStaff(staff) {
    const { timeSlot } = this.props
    Otto.unscheduleStaff(timeSlot, staff).then(() => {
      const state = { ...this.state }
      state.unscheduledStaffs.push(staff)
      this.setState(state)
    })
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
    let scheduledStaffs = timeSlot.scheduledStaffs.concat(this.state.scheduledStaffs)
    scheduledStaffs = difference(scheduledStaffs, this.state.unscheduledStaffs)

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
