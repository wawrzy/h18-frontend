import React from 'react'
import PropTypes from 'prop-types'
import { range } from 'lodash'

import Cell from 'components/Cell'

const Filler = ({ first, last }) => (
  <div>
    { range(first, last).map((i) => <Cell disabled key={i} />) }
  </div>
)

Filler.propTypes = {
  first: PropTypes.number.isRequired,
  last: PropTypes.number.isRequired,
}

export default Filler
