import {
  GET_CHANNEL_SUCCESS,
  GET_CHANNEL_FAIL,
  GET_LIST_CHANNELS_SUCCESS,
} from '../types'

import fetchClient from '../../utils/fetchClient'
import { getCookie } from '../../utils/getCookies'

export const getListChannels = () => {
  return async dispatch => {
    try {
      const result = await fetchClient('/getListChannels', null, 'POST')
      if (result.length >= 1) {
        dispatch({ type: GET_LIST_CHANNELS_SUCCESS, payload: result[0].arn })
      }
      return result
    } catch (error) {
      return error
    }
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
