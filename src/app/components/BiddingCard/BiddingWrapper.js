import { useRef } from 'react'
import { useSelector } from 'react-redux'
import BidResult from '../BidResult'
import { BiddingPosition, BidWrapper, CardWrapper, BidWrapperSm } from './styled'
import { useMediaQuery } from '@mui/material'

const BiddingWrapper = ({ children }) => {
  const biddingCardRef = useRef()
  const { bidResult } = useSelector(state => state.auction)
  const matches = useMediaQuery((theme) => theme.breakpoints.up('md'))

  return (
    matches ? (
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
    ) : (
      <BidWrapperSm>
        {bidResult && (
          <BidResult />
        )}
        {children}
      </BidWrapperSm>
    )
  )
}

export default BiddingWrapper