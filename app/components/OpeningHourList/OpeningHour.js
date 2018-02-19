import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'

import Grid from 'material-ui/Grid'

const OpeningHour = ({ classes, hour }) => (
  <Grid className={classes.root} item>
    {hour.format('H a')}
  </Grid>
)

OpeningHour.propTypes = {
  classes: PropTypes.object.isRequired,
  hour: PropTypes.object.isRequired,
}

const styles = (theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: theme.grid.cell.height,
    marginTop: theme.spacing.unit * 2,
    marginBottom: -theme.spacing.unit * 2,
    padding: theme.spacing.unit,
  },
})

export default withStyles(styles)(OpeningHour)
