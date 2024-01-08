import { Button, Typography } from '@mui/material'
import constants from '../../constants'
import { ButtonsWrapper } from './styled'
import useActions from '../../state/useActions'
import { bidTypes } from '../../components/BidResult'

const EndAuctionConfirmation = ({ handleClose }) => {
  const { changeAuctionStatus } = useActions()

  const handleEndAuction = (e) => {
    changeAuctionStatus({
      status: constants.AUCTION_STATUS.FINISHED,
      bidResult: bidTypes.CANCELLED
    })
    handleClose(e)
  }
  return (
    <>
      <Typography color={'custom.opacityWhite'}>{constants.END_AUCTION_MESSAGE}</Typography>
      <ButtonsWrapper>
        <Button onClick={handleClose} sx={{ color: 'custom.lightGrey' }}>
          {constants.CANCEL}
        </Button>
        <Button onClick={(e) => handleEndAuction(e)} sx={{ color: 'custom.error' }}>
          {constants.END_AUCTION}
        </Button>
      </ButtonsWrapper>
    </>
  )
}

export default EndAuctionConfirmation