import { useEffect } from 'react'
import constants from '../../constants'
import useActions from '../../hooks/useActions'
import { useUser } from '../../utils/useUser'
import BiddingCardCommon from '../BiddingCard/BiddingCardCommon'
import BiddingWrapper from '../BiddingCard/BiddingWrapper'
import AuctionUnAvailable, { userTypes } from '../AuctionUnavailable'

const SignedOutUser = ({ status }) => {
  useUser('guest')
  const { setGuestUser } = useActions()

  useEffect(() => {
    setGuestUser()
  }, [])

  if (status === constants.AUCTION_STATUS.NOT_STARTED) {
    return (
      <AuctionUnAvailable userType={userTypes.LOGGED_OUT} />
    )
  }

  return (
    <BiddingWrapper>
      <BiddingCardCommon />
    </BiddingWrapper>
  )
}

export default SignedOutUser