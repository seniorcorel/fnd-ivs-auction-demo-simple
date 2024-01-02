import { combineReducers } from 'redux'
import authReducer from './auth'
import auctionReducer from './auction'
import modalReducer from './modal'
import channelReducer from './channel'
import notificationReducer from './notification'
import showImageReducer from './showImage'
import page from './page'
import streamReducer from './stream'

const reducers = combineReducers({
    auth: authReducer,
    auction: auctionReducer,
    modal: modalReducer,
    channel: channelReducer,
    notification: notificationReducer,
    showImage: showImageReducer,
    page: page,
    stream: streamReducer
})

export default reducers