import { DangerousRounded, GavelRounded, StarRounded, WarningRounded, WorkspacePremiumRounded } from '@mui/icons-material'
import constants from '../../constants'
import { useSelector } from 'react-redux'
import { BidResultWrapper } from './styled'

export const bidTypes = {
  HIGHEST: 'HIGHEST',
  CANCELLED: 'CANCELLED',
  NOBID: 'NOBID',
  SOLD: 'SOLD',
  WINNER: 'WINNER'
}

const bidResultList = {
  CANCELLED: {
    text: constants.BID_RESULT.CANCELLED,
    icon: <DangerousRounded />,
    color: 'custom.errorSecondary'
  },
  NOBID: {
    text: constants.BID_RESULT.NOBID,
    icon: <WarningRounded />,
    color: 'custom.darkGrey'
  },
  SOLD: {
    text: constants.BID_RESULT.SOLD,
    icon: <GavelRounded />,
    color: 'secondary.main'
  },
  HIGHEST: {
    text: constants.BID_RESULT.HIGHEST,
    icon: <StarRounded />,
    color: 'custom.orange'
  },
  WINNER: {
    text: constants.BID_RESULT.WINNER,
    icon: <WorkspacePremiumRounded />,
    color: 'secondary.main'
  }
}

const BidResult = () => {
  const { bidResult } = useSelector(state => state.auction)
  return (
    <BidResultWrapper
      variant='filled'
      icon={bidResultList[bidResult].icon}
      sx={{ backgroundColor: bidResultList[bidResult].color }}
    >
      {bidResultList[bidResult].text}
    </BidResultWrapper>
  )
}

export default BidResult