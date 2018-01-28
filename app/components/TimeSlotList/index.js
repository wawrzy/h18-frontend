import React from 'react'
import PropTypes from 'prop-types'

import TimeSlot from './TimeSlot'

const TimeSlotList = ({ timeSlots }) => (
  <div>
    { timeSlots.map((timeSlot) => <TimeSlot timeSlot={timeSlot} key={timeSlot.datetime} />) }
  </div>
)

TimeSlotList.propTypes = {
  timeSlots: PropTypes.array.isRequired,
}

export default TimeSlotList
