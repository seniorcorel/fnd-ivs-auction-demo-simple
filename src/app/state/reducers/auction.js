import constants from '../../constants'
import { BID, BID_RESULT, SIGN_IN_SUCCESS, LOG_OUT, GET_AUTHENTICATED_USER_SUCCESS } from '../types'
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
            const product = action.payload.product ? { ...state.product, ...JSON.parse(action.payload.product) } : state.product
            const status = action.payload.product ? STARTED : state.status

            if (action.payload.username !== 'admin') {
                product.auctionStartTimeMilliSeconds = state.product.auctionStartTimeMilliSeconds
            }
            return {
                ...state,
                maxBid: {
                    bidValue: action.payload.bidValue,
                    bidSender: action.payload.bidSender,
                },
                bidResult: action.payload.bidResult,
                product,
                status,
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
        case SIGN_IN_SUCCESS:
        case GET_AUTHENTICATED_USER_SUCCESS:
            return {
                ...state,
                isAdmin: action.payload.isAdmin,
                username: action.payload.username
            }
        case LOG_OUT:
            return {
                ...state,
                isAdmin: false,
                username: null
            }
        case NOT_STARTED:
        default:
            return state
    }
}

export default reducer