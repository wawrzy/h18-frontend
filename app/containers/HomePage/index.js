import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { withStyles } from 'material-ui/styles'
import { FormattedMessage } from 'react-intl'
import Otto from 'services/Otto'

import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import IconButton from 'material-ui/IconButton'
import Typography from 'material-ui/Typography'
import SettingsIcon from 'material-ui-icons/Settings'

import Schedule from 'components/Schedule'
import messages from './messages'

class HomePage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      firstDayOfWeek: moment().startOf('week').startOf('day'),
      schedule: null,
    }
    this.fetchSchedule = this.fetchSchedule.bind(this)
  }

  componentDidMount() {
    this.fetchSchedule()
  }

  fetchSchedule() {
    const { firstDayOfWeek } = this.state
    Otto.getSchedule(firstDayOfWeek).then((schedule) => this.setState({ ...this.state, schedule }))
  }

  render() {
    const { classes } = this.props
    const { firstDayOfWeek, schedule } = this.state
    const lastDayOfWeek = moment(firstDayOfWeek).add(6, 'day')
    const period = `${firstDayOfWeek.format('MMMM')} ${firstDayOfWeek.format('DD')}-${lastDayOfWeek.format('DD')}`

    return (
      <div>
        <AppBar position="static" color="primary">
          <Toolbar>
            <Typography className={classes.title} type="title" color="inherit">
              <FormattedMessage {...messages.title} />
            </Typography>
            <Typography type="title" color="inherit">
              {period}
            </Typography>
            <IconButton color="inherit">
              <SettingsIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        {schedule && <Schedule schedule={schedule} />}
      </div>
    )
  }
}

HomePage.propTypes = {
  classes: PropTypes.object.isRequired,
}

const styles = {
  title: {
    flex: 1,
  },
}

export default withStyles(styles)(HomePage)
