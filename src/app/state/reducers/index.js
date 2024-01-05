import { combineReducers } from 'redux'
import auctionReducer from './auction'
import modalReducer from './modal'
import channelReducer from './channel'
import notificationReducer from './notification'
import showImageReducer from './showImage'
import page from './page'
import streamReducer from './stream'

const reducers = combineReducers({
    auction: auctionReducer,
    modal: modalReducer,
    channel: channelReducer,
    notification: notificationReducer,
    showImage: showImageReducer,
    page: page,
    stream: streamReducer
})

export default reducers