import { combineReducers } from 'redux'
import auctionReducer from './auction'
import modalReducer from './modal'
import channelReducer from './channel'
import notificationReducer from './notification'
import streamReducer from './stream'

const reducers = combineReducers({
    auction: auctionReducer,
    modal: modalReducer,
    channel: channelReducer,
    notification: notificationReducer,
    stream: streamReducer
})

export default reducers