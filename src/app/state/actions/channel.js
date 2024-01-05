import {
  GET_CHANNEL_SUCCESS,
  GET_CHANNEL_FAIL,
  SET_BROADCAST_KEYS
} from '../types'

import fetchClient from '../../utils/fetchClient'
import { getCookie } from '../../utils/getCookies'

export const setBroadcastKeys = (keys) => {
  return async dispatch => {
    dispatch({
      type: SET_BROADCAST_KEYS,
      payload: keys
    })
  }
}

export const getChannel = (channelArn) => {
  const token = getCookie('token')
  return async dispatch => {
    try {
      const result = await fetchClient('/getChannel', { channelArn, token }, 'POST')
      dispatch({ type: GET_CHANNEL_SUCCESS, payload: result })
    } catch (err) {
      dispatch({ type: GET_CHANNEL_FAIL, payload: err })
    }
  }
}
