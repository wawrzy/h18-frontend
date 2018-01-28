import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'

import Grid from 'material-ui/Grid'

const Header = ({ classes, title, subtitle }) => (
  <Grid item xs className={classes.root}>
    <h2 className={classes.subtitle}>{subtitle}</h2>
    <h1 className={classes.title}>{title}</h1>
  </Grid>
)

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string,
  subtitle: PropTypes.string,
}

const styles = (theme) => ({
  root: {
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
})

export default withStyles(styles)(Header)
