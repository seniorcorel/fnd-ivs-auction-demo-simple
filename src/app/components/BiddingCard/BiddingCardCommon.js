import { IconButton, Typography, useMediaQuery } from '@mui/material'
import Content from './Content'
import constants from '../../constants'
import { Product, ProductImage, ProductName, HighestBidderText } from './styled'
import { useSelector } from 'react-redux'
import CountDownTimer from './CountDownTimer'
import { useState } from 'react'
import useActions from '../../hooks/useActions'
import TimerBar from './TimerBar'
import { AddRounded } from '@mui/icons-material'
const {
  HIGHEST_BID,
  AUCTION_STATUS,
  PRODUCT
} = constants

const BiddingCardCommon = () => {
  const { toggleModal } = useActions()
  const [timeLeft, setTimeLeft] = useState(null)
  const matches = useMediaQuery((theme) => theme.breakpoints.up('md'))
  const { status, product, maxBid } = useSelector(state => state.auction)
  const { isAdmin } = useSelector(state => state.auction)


  const auctionEndTimeMilliSeconds = (product.auctionStartTimeMilliSeconds) + (product.durationSeconds * 1000)
  const durationMiliseconds = product.durationSeconds * 1000

  //if auction started and is a user, hide image (because there is no space)
  const auctionStartedUser = (status === constants.AUCTION_STATUS.STARTED) && (!isAdmin)

  return (
    <>
      {product.imageLink && matches && !auctionStartedUser && (
        <Product>
          <ProductImage src={product.imageLink} />
        </Product>
      )}
      <Content>
        <ProductName>
          <Typography variant='h6' color='primary.p500' lineHeight={1}>{product.productName}</Typography>
          <IconButton
            onClick={() => toggleModal(constants.MODAL_TYPE.PRODUCT)}
            aria-label='show the product description'
            sx={{ color: 'custom.opacityWhite' }}
          >
            <AddRounded />
          </IconButton >
        </ProductName >
      </Content >
      <Content>
        <HighestBidderText
          color='custom.lightGrey'
          fontWeight='light'
        >
          {product.initialBid == maxBid.bidValue ? `${PRODUCT.STARTING_BID.label}:` : (
            <>{HIGHEST_BID}: {maxBid.bidSender}</>
          )}
        </HighestBidderText>
        <Typography variant='h4' lineHeight={1}>$ {maxBid.bidValue}</Typography>

        {(durationMiliseconds > 0 && (status === AUCTION_STATUS.STARTED)) && (
          <>
            <CountDownTimer
              auctionEndTimeMilliSeconds={auctionEndTimeMilliSeconds}
              setTimeLeft={setTimeLeft}
            />
            <TimerBar
              timeLeft={timeLeft}
              durationMiliseconds={durationMiliseconds}
            />
          </>
        )}
      </Content >
    </>
  )
}

export default BiddingCardCommon