import { useSelector } from 'react-redux'
import constants from '../../constants'
import { useUser } from '../../utils/useUser'
import AuctionUnAvailable, { userTypes } from '../AuctionUnavailable'
import BiddingCardCommon from '../BiddingCard/BiddingCardCommon'
import BiddingCardUser from '../BiddingCard/BiddingCardUser'
import BiddingWrapper from '../BiddingCard/BiddingWrapper'
import { bidTypes } from '../BidResult'
import Confetti from '../Confetti'

const SignedInUser = ({ status }) => {
  const username = useSelector(state => state.auth.username)
  const { bidResult } = useSelector(state => state.auction)
  const { sendBid } = useUser(username)

  if (status === constants.AUCTION_STATUS.NOT_STARTED) {
    return (
      <AuctionUnAvailable userType={userTypes.BIDDER} />
    )
  }

  return (
    <>
      {bidResult === bidTypes.WINNER && (
        <Confetti />
      )}
      <BiddingWrapper>
        <BiddingCardCommon />
        {status === constants.AUCTION_STATUS.STARTED && (
          <BiddingCardUser sendBid={sendBid} />
        )}
      </BiddingWrapper>
    </>
  )
}

export default SignedInUser