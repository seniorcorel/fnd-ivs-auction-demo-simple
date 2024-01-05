import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import constants from '../../constants'
import useAdmin from '../../utils/useAdmin'
import BiddingCardAdmin from '../BiddingCard/BiddingCardAdmin'
import BiddingCardCommon from '../BiddingCard/BiddingCardCommon'
import BiddingWrapper from '../BiddingCard/BiddingWrapper'
import AuctionUnAvailable, { userTypes } from '../AuctionUnavailable'

const AdminCard = () => {
  const { startAuction, endAuction } = useAdmin()
  const { status, bidResult, maxBid } = useSelector(state => state.auction)

  useEffect(() => {
    if (status === constants.AUCTION_STATUS.STARTED) {
      startAuction()
    } else if (status === constants.AUCTION_STATUS.FINISHED) {
      endAuction(bidResult, maxBid.bidSender)
    }
  }, [status])

  if (status === constants.AUCTION_STATUS.NOT_STARTED) {
    return (<AuctionUnAvailable userType={userTypes.ADMIN} />)
  }

  return (
    <BiddingWrapper>
      <BiddingCardCommon />
      <BiddingCardAdmin />
    </BiddingWrapper>
  )
}

export default AdminCard