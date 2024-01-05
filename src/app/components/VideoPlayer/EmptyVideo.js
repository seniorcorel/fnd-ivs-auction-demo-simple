import { EmptyVideoWrapper } from './styled'
import { Typography } from '@mui/material'
import constants from '../../constants'
import { ReportProblemRounded } from '@mui/icons-material'
import TvOffIcon from './TvOffIcon'

const EmptyVideo = ({ isAdmin }) => (
  <EmptyVideoWrapper>
    {isAdmin ? (
      <>
        <ReportProblemRounded sx={{ color: 'custom.white', mb: 1.8, opacity: 0.6 }} fontSize="large" />
        <Typography style={{ alignSelf: 'center', opacity: 0.6, textAlign: 'center', width: '250px' }} color="custom.white">{constants.STREAM_TURN_ON_DEVICES}</Typography>
      </>
    ) : (
      <>
        <TvOffIcon />
        <Typography style={{ alignSelf: 'center', opacity: 0.6, textAlign: 'center', marginTop: '0.75rem' }} color="custom.white">{constants.STREAM_OFFLINE}</Typography>
      </>
    )}
  </EmptyVideoWrapper >
)

export default EmptyVideo