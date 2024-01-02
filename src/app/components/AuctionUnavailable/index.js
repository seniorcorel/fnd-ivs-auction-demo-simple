import { Typography } from '@mui/material'
import constants from '../../constants'
import { AuctionUnAvailableWrapper, AuctionNotAvailable, AuctionNotAvailableSm, AuctionButton, CardWrapper } from './styled'
import Image from 'next/image'
import useActions from '../../hooks/useActions'
import { useMediaQuery } from '@mui/material'
import { landscapeOrientation } from '../../styles/device'

export const userTypes = {
  BIDDER: 'BIDDER',
  ADMIN: 'ADMIN',
  LOGGED_OUT: 'LOGGED_OUT'
}

const AuctionUnAvailable = ({ userType = userTypes.LOGGED_OUT }) => {
  const { MAIN, SUB, ICON_NAME } = constants.AUCTION_UNAVAILABLE[userType]
  const { toggleModal } = useActions()
  const matches = useMediaQuery((theme) => theme.breakpoints.up('md'))
  const landscapeMatches = useMediaQuery(landscapeOrientation)

  const renderContent =
    <>
      {!landscapeMatches && (
        <Image src={`/auctionIcon/${ICON_NAME}.svg`} alt='My SVG' width={100} height={100} style={{
          opacity: 0.87
        }} />
      )}
      <Typography mt={2.5} mb={1.5} lineHeight={1} variant='h5' color='primary.p200'>{MAIN}</Typography>
      <Typography fontWeight={100} textAlign={'center'} color='custom.lightGrey' width={'218px'}>{SUB}</Typography>
      {userType === userTypes.ADMIN && (
        <AuctionButton variant='contained' fullWidth={matches ? true : false} onClick={() => toggleModal(constants.MODAL_TYPE.START_AUCTION)}>
          {constants.CREATE_AUCTION}
        </AuctionButton>
      )}
    </>

  return (
    matches ?
      <AuctionUnAvailableWrapper>
        <CardWrapper height={'100%'}>
          <AuctionNotAvailable>
            {renderContent}
          </AuctionNotAvailable>
        </CardWrapper>
      </AuctionUnAvailableWrapper>
      :
      <AuctionNotAvailableSm>
        {renderContent}
      </AuctionNotAvailableSm>
  )
}

export default AuctionUnAvailable