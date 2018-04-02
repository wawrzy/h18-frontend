import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'

import Otto from 'services/Otto'

import Grid from 'material-ui/Grid'
import IconButton from 'material-ui/IconButton'
import ClearAllIcon from 'material-ui-icons/ClearAll'

class Header extends React.Component {
  constructor(props) {
    super(props)
    this.handleClearAll = this.handleClearAll.bind(this)
  }

  handleClearAll(e) {
    e.preventDefault()
    Otto.unscheduleAllStaff(this.props.date).then(() => {
      // const state = { ...this.state, scheduleDialogOpen: false }
      // state.scheduledStaffs.push(staff)
      // this.setState(state)
    })
  }

  render() {
    const { classes } = this.props

    return (
      <Grid item xs className={classes.root}>
        <Grid item xs className={classes.subroot}>
          <h2 className={classes.subtitle}>{this.props.subtitle}</h2>
          <h1 className={classes.title}>{this.props.title}</h1>
        </Grid>
        {this.props.day &&
        <IconButton className={classes.clearButton} color="inherit" onClick={this.handleClearAll}>
          <ClearAllIcon />
        </IconButton>
        }
      </Grid>
    )
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  date: PropTypes.string,
  day: PropTypes.object,
}

const styles = (theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    flexGrow: 1,
    justifyContent: 'space-between',
    minHeight: 96,
    padding: theme.spacing.unit,
    borderBottom: '1px solid lightgray',
  },
  subroot: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    justifyContent: 'space-between',
    minHeight: 96,
    padding: theme.spacing.unit,
    borderBottom: '1px solid lightgray',
  },
  title: {
    margin: 0,
    padding: 0,
    fontWeight: 'normal',
    fontSize: 48,
  },
  subtitle: {
    margin: 0,
    padding: 0,
    fontSize: 12,
    fontWeight: 'normal',
  },
  clearButton: {
    // marginLeft: 'auto',
  },
})

export default withStyles(styles)(Header)
