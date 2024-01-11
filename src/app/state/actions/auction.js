import { AUCTION_STATUS, BID, BID_RESULT, SET_USER } from '../types'

export const changeAuctionStatus = ({ status, bidResult = null, product = null, maxBid = null }) => {
  return dispatch => {
    if (status === AUCTION_STATUS.FINISHED) {
      dispatch({
        type: AUCTION_STATUS.FINISHED,
        payload: { bidResult }
      })
    } else if (status === AUCTION_STATUS.STARTED) {
      if (product.duration) {
        product.durationSeconds = product.duration * 60
        delete product.duration
      }
      dispatch({
        type: AUCTION_STATUS.STARTED,
        payload: {
          product,
          maxBid,
          bidResult
        }
      })
    } else {
      dispatch({ type: AUCTION_STATUS.NOT_STARTED })
    }
  }
}

export const bidAuction = ({ bidValue, bidSender, bidResult, product }) => {
  return dispatch => {
    dispatch({ type: BID, payload: { bidValue, bidSender, bidResult, product } })
  }
}

export const changeBidResult = (bidResult) => {
  return dispatch => {
    dispatch({ type: BID_RESULT, payload: bidResult })
  }
}

export const setUser = (userInfo) => {
  return dispatch => {
    dispatch({ type: SET_USER, payload: userInfo })
  }
}