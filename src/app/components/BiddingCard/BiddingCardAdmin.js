import constants from '../../constants'
import useActions from '../../state/useActions'
import Content from './Content'
import { useSelector } from 'react-redux'
import { AdminAuctionButtons } from './styled'
import { errorSecondary, purple500 } from '../../styles/colours'
const { END_AUCTION, CREATE_AUCTION } = constants

const BiddingCardAdmin = () => {
  const { toggleModal, changeAuctionStatus } = useActions()
  const { status } = useSelector(state => state.auction)

  const handleFinishAuction = () => {
    toggleModal(constants.MODAL_TYPE.END_AUCTION)
  }

  const handleCreateNewAuction = (e) => {
    e.preventDefault()
    changeAuctionStatus({ status: constants.AUCTION_STATUS.NOT_STARTED })
    toggleModal(constants.MODAL_TYPE.START_AUCTION)
  }
  return (
    <Content noBorder>
      {status === constants.AUCTION_STATUS.STARTED ? (
        <AdminAuctionButtons
          onClick={handleFinishAuction}
          variant="contained"
          bgColor={errorSecondary}
          bgColorHover={errorSecondary}
        >
          {END_AUCTION}
        </AdminAuctionButtons>
      ) : (
        <AdminAuctionButtons
          onClick={handleCreateNewAuction}
          variant="contained"
          bgColor={purple500}
          bgColorHover={purple500}
        >
          {CREATE_AUCTION}
        </AdminAuctionButtons>
      )}

    </Content>
  )
}

export default BiddingCardAdmin