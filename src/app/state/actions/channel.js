import {
  SET_BROADCAST_KEYS
} from '../types'

export const setBroadcastKeys = (keys) => {
  return async dispatch => {
    dispatch({
      type: SET_BROADCAST_KEYS,
      payload: keys
    })
  }
}