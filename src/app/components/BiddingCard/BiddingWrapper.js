import { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import useActions from '../../hooks/useActions'
import BidResult from '../BidResult'
import { BiddingPosition, BidWrapper, BidWrapperSm, CardWrapper } from './styled'
import { useMediaQuery } from '@mui/material'
import constants from '../../constants'
import { landscapeOrientation } from '../../styles/device'

const BiddingWrapper = ({ children }) => {
  const biddingCardRef = useRef()
  const { bidResult, status } = useSelector(state => state.auction)
  const { setShowImage } = useActions()
  const matches = useMediaQuery((theme) => theme.breakpoints.up('md'))
  const matchesLandscape = useMediaQuery(landscapeOrientation)

  const handleResize = () => {
    if (matches) {
      const { y, height } = biddingCardRef.current.getBoundingClientRect()
      setShowImage({ showImage: (y - 48) > 0, cardHeight: height })
    }
  }

  useEffect(() => {
    handleResize()
  }, [status])

  return (
    matches ?
      <BiddingPosition ref={biddingCardRef}>
        <BidWrapper>
          {bidResult && (
            <BidResult />
          )}
          <CardWrapper>
            {children}
          </CardWrapper>
        </BidWrapper>
      </BiddingPosition >
      :
      <BidWrapperSm>
        {bidResult && !matchesLandscape && (
          <BidResult />
        )}
        {children}
      </BidWrapperSm>
  )
}

export default BiddingWrapper