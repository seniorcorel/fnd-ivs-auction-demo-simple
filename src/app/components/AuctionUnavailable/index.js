import { Typography } from '@mui/material'
import constants from '../../constants'
import { AuctionUnAvailableWrapper, AuctionNotAvailable, AuctionNotAvailableSm, AuctionButton, CardWrapper } from './styled'
import useActions from '../../state/useActions'
import { useMediaQuery } from '@mui/material'

export const userTypes = {
  BIDDER: 'BIDDER',
  ADMIN: 'ADMIN',
}

const AuctionUnAvailable = ({ userType = userTypes.BIDDER }) => {
  const { MAIN, SUB } = constants.AUCTION_UNAVAILABLE[userType]
  const { toggleModal } = useActions()
  const matches = useMediaQuery((theme) => theme.breakpoints.up('md'))

  const renderContent =
    <>
      <Typography mt={2.5} mb={1.5} lineHeight={1} variant='h5' color='primary.p200'>{MAIN}</Typography>
      <Typography fontWeight={100} textAlign={'center'} color='custom.lightGrey' width={'218px'}>{SUB}</Typography>
      {userType === userTypes.ADMIN && (
        <AuctionButton variant='contained' fullWidth={true} onClick={() => toggleModal(constants.MODAL_TYPE.START_AUCTION)}>
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