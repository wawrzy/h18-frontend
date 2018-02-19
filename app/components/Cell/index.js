import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import classNames from 'classnames'

import Grid from 'material-ui/Grid'

const Cell = ({ classes, disabled, children }) => {
  const className = classNames([classes.root, { [classes.disabled]: disabled }])

  return (
    <Grid className={className} item xs>
      {children}
    </Grid>
  )
}

Cell.propTypes = {
  classes: PropTypes.object.isRequired,
  disabled: PropTypes.bool.isRequired,
  children: PropTypes.any,
}

Cell.defaultProps = {
  disabled: false,
}

const styles = () => ({
  root: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    minHeight: 32,
    borderBottom: '1px solid lightgray',
    backgroundColor: 'rgba(21, 241, 12, 0.1)',
    '&:not($disabled)': {
      cursor: 'pointer',
      '&:hover': {
        backgroundColor: 'rgba(21, 241, 12, 0.2)',
      },
    },
  },
  disabled: {
    backgroundColor: 'transparent',
  },
})

export default withStyles(styles)(Cell)
