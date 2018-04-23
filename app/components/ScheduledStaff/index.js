import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'

import IconButton from 'material-ui/IconButton'
import CloseIcon from 'material-ui-icons/Close'

class ScheduledStaff extends React.Component {
  constructor(props) {
    super(props)
    this.showStaff = this.showStaff.bind(this)
    this.unscheduleStaff = this.unscheduleStaff.bind(this)
  }

  showStaff(e) {
    e.stopPropagation()
    if (this.props.onShowStaff) {
      this.props.onShowStaff(this.props.staff)
    }
  }

  unscheduleStaff(e) {
    e.stopPropagation()
    if (this.props.onUnscheduleStaff) {
      this.props.onUnscheduleStaff(this.props.staff)
    }
  }

  render() {
    const { classes, staff } = this.props

    return (
      <div role="button" tabIndex="0" className={classes.root} style={{ backgroundColor: this.props.staff.color }} onClick={this.showStaff}>
        <div className={classes.label}>
          {staff.firstName}
        </div>
        <IconButton className={classes.unscheduleBtn} color="primary" onClick={this.unscheduleStaff}>
          <CloseIcon />
        </IconButton>
      </div>
    )
  }
}

ScheduledStaff.propTypes = {
  classes: PropTypes.object.isRequired,
  staff: PropTypes.object.isRequired,
  onShowStaff: PropTypes.func,
  onUnscheduleStaff: PropTypes.func,
}

const styles = (theme) => ({
  root: {
    display: 'flex',
    flexGrow: 1,
    alignItems: 'center',
    backgroundColor: theme.palette.accent['300'],
    border: '1px solid white',
    borderRadius: '3px',
    color: 'white',
    fontSize: theme.font.size.small,
    height: '100%',
    padding: theme.spacing.unit / 4,
    '&:hover $unscheduleBtn': {
      opacity: 1,
    },
  },
  label: {
    flexGrow: 1,
  },
  unscheduleBtn: {
    fontSize: theme.font.size.small,
    width: 24,
    height: 24,
    opacity: 0,
  },
})

export default withStyles(styles)(ScheduledStaff)
