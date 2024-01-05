import { Typography } from '@mui/material'
import Countdown, { zeroPad } from 'react-countdown'
import { useSelector } from 'react-redux'
import constants from '../../constants'
import useActions from '../../hooks/useActions'
import { bidTypes } from '../BidResult'

const CountDownTimer = ({ auctionEndTimeMilliSeconds, setTimeLeft }) => {
  const { changeAuctionStatus } = useActions()
  const { maxBid, product } = useSelector(state => state.auction)

  const renderer = (props) => {
    console.log('renderer:', props);
    const { minutes, hours, seconds, completed, total } = props
    setTimeLeft(total)
    if (completed) {
      changeAuctionStatus({
        status: constants.AUCTION_STATUS.FINISHED,
        bidResult: maxBid.bidValue === product.initialBid ? bidTypes.NOBID : bidTypes.SOLD
      })
    }
    return <span>{constants.TIME_LEFT}: {zeroPad(hours)}:{zeroPad(minutes)}:{zeroPad(seconds)}</span>
  }

  return (
    <>
      <Typography sx={{ paddingBottom: 1, paddingTop: 2.25 }} color='custom.lightGrey' fontWeight='light'>
        <Countdown date={auctionEndTimeMilliSeconds} renderer={renderer} />
      </Typography>
    </>
  )
}

export default CountDownTimer