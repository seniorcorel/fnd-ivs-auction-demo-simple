import { EmptyVideoWrapper } from './styled'
import { Typography } from '@mui/material'
import constants from '../../constants'
import { VideocamOff } from '@mui/icons-material'

const CameraOff = () => (
  <EmptyVideoWrapper style={{ position: 'absolute' }}>
    <VideocamOff sx={{ color: 'custom.white', mb: 1.8, opacity: 0.6 }} fontSize="large" />
    <Typography style={{ alignSelf: 'center', opacity: 0.6, textAlign: 'center', width: '250px' }} color="custom.white">
      {constants.CAMERA_OFF}
    </Typography>
  </EmptyVideoWrapper >
)

export default CameraOff