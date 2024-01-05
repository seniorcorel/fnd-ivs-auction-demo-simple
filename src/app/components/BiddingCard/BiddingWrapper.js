import { useRef } from 'react'
import { useSelector } from 'react-redux'
import BidResult from '../BidResult'
import { BiddingPosition, BidWrapper, CardWrapper } from './styled'

const BiddingWrapper = ({ children }) => {
  const biddingCardRef = useRef()
  const { bidResult, status } = useSelector(state => state.auction)

  return (
    <BiddingPosition ref={biddingCardRef}>
      <BidWrapper>
        {bidResult && (
          <BidResult />
        )}
        <CardWrapper>
          {children}
        </CardWrapper>
      </BidWrapper>
    </BiddingPosition>
  )
}

export default BiddingWrapper