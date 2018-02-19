import { createMuiTheme } from 'material-ui/styles'
import red from 'material-ui/colors/red'
import green from 'material-ui/colors/green'
import teal from 'material-ui/colors/teal'

const theme = createMuiTheme({
  palette: {
    primary: red,
    secondary: green,
    accent: teal,
  },
  font: {
    size: {
      small: '12px',
      normal: '14px',
      large: '16px',
    },
  },
})

export default theme
