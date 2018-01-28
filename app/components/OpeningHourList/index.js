import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import { range } from 'lodash'
import moment from 'moment'

import Grid from 'material-ui/Grid'

import Header from 'components/Header'
import OpeningHour from './OpeningHour'

const OpeningHourList = ({ classes, openAt, closedAt }) => {
  const now = moment().startOf('day')
  return (
    <Grid className={classes.root} item>
      <Grid container direction="column" spacing={0}>
        <Header />
        {range(openAt, closedAt + 1).map((i) => <OpeningHour hour={moment(now).add(i, 'hour')} key={i} />)}
      </Grid>
    </Grid>
  )
}

OpeningHourList.propTypes = {
  classes: PropTypes.object.isRequired,
  openAt: PropTypes.number.isRequired,
  closedAt: PropTypes.number.isRequired,
}

const styles = () => ({
  root: {
    borderRight: '1px solid lightgray',
    borderBottom: '1px solid lightgray',
  },
})

export default withStyles(styles)(OpeningHourList)
