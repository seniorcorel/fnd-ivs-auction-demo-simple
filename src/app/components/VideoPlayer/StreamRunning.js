import { EmptyVideoWrapper } from './styled'
import { Typography } from '@mui/material'
import constants from '../../constants'
import { Sensors } from '@mui/icons-material'

const StreamRunning = () => (
  <EmptyVideoWrapper style={{ position: 'absolute' }}>
    <Sensors sx={{ color: 'custom.white', mb: 1.8, opacity: 0.6 }} fontSize="large" />
    <Typography style={{ alignSelf: 'center', opacity: 0.6, textAlign: 'center', width: '250px' }} color="custom.white">
      {constants.STREAM_RUNNING}
    </Typography>
  </EmptyVideoWrapper >
)

export default StreamRunning