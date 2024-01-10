import constants from '../../constants'
import { BID, BID_RESULT, SET_USER } from '../types'
import { HYDRATE } from 'next-redux-wrapper'
const { NOT_STARTED, STARTED, FINISHED } = constants.AUCTION_STATUS

const initialState = {
    status: NOT_STARTED,
    bidResult: null,
    product: {
        productName: null,
        description: null,
        durationSeconds: null,
        initialBid: null,
        imageLink: null,
        auctionStartTimeMilliSeconds: 0,
    },
    maxBid: {
        bidValue: '0',
        bidSender: null
    },
    isAdmin: false,
    username: null
}

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case HYDRATE:
            return {
                ...action.payload.auction,
            }
        case BID:
            return {
                ...state,
                maxBid: {
                    bidValue: action.payload.bidValue,
                    bidSender: action.payload.bidSender,
                },
                bidResult: action.payload.bidResult,
            }
        case STARTED:
            if (state.status === STARTED) {
                return state
            }
            const productForStartedAction = action.payload.product
            if (state.isAdmin) {
                productForStartedAction.auctionStartTimeMilliSeconds = Date.now()
            }

            let maxBidForStarted = {
                bidValue: action.payload.product.initialBid,
                bidSender: null,
            }

            if (action.payload.maxBid) {
                maxBidForStarted = action.payload.maxBid
            }

            const bidResultForStarted = action.payload.bidResult ? action.payload.bidResult : null

            return {
                ...state,
                status: STARTED,
                maxBid: maxBidForStarted,
                product: productForStartedAction,
                bidResult: bidResultForStarted,
            }
        case FINISHED:
            const productForFinishedAction = action.payload.product ? action.payload.product : state.product
            const maxBidForFinishedAction = action.payload.maxBid ? action.payload.maxBid : state.maxBid
            return {
                ...state,
                status: FINISHED,
                bidResult: action.payload.bidResult,
                product: productForFinishedAction,
                maxBid: maxBidForFinishedAction
            }
        case BID_RESULT:
            return {
                ...state,
                bidResult: action.payload
            }
        case SET_USER:
            const { isAdmin, username } = action.payload
            return {
                ...state,
                isAdmin,
                username,
            }
        case NOT_STARTED:
        default:
            return state
    }
}

export default reducer